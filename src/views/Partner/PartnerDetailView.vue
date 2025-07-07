<template>
    <div class="min-h-screen flex flex-col bg-[#fffbe9]">
        <!-- Bar/Header -->
        <Bar />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col items-center justify-start py-8 relative px-8">
            <div class="w-full max-w-6xl flex flex-col md:flex-row gap-8 relative z-10" v-if="store">
                <!-- Left: Store Info -->
                <div class="flex-1 flex flex-col items-center md:items-start">
                    <div class="">
                    <span
                        class="inline-block bg-[#b6e388] text-[#184c36] px-4 py-1 rounded-full text-sm font-semibold mb-4">{{
                            store?.name || '-' }}</span>
                    <div class="flex items-center gap-2 mb-2">
                        <img :src="store?.img || '/src/assets/NoPicture.webp'"
                            class="w-10 h-10 rounded-full object-cover border-2 border-[#b6e388]" />
                        <div class="flex flex-col">
                            <span class="font-semibold text-base">{{ store?.owner || '-' }}</span>
                            <span class="text-xs text-gray-500">{{ companyFullAddress }}</span>
                        </div>
                    </div></div>
                    <div class="mt-6 w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
                        <img :src="store?.banner || '/src/assets/bannerSlider1.png'" class="w-full h-64 object-cover" />
                    </div>
                </div>
                <!-- Right: Product List -->
                <div class="flex-1 flex flex-col items-center md:items-start">
                    <h2 class="font-bold text-lg mb-4">รายการสินค้าที่รับชื้อ</h2>
                    <div class="w-full flex flex-col gap-4">
                        <template v-if="store.items && store.items.length">
                            <div v-for="item in store.items" :key="item.name" class="flex items-center justify-between gap-2">
                                <div class="flex items-center gap-3">
                                    <img :src="item.img" class="w-12 h-12 rounded-lg object-cover border border-[#e6e6e6]" />
                                    <span class="font-medium">{{ item.name }}</span>
                                    <span class="text-xs text-gray-400">โดยร้านค้า</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span
                                        class="bg-[#f6eec7] text-[#184c36] px-3 py-1 rounded-full text-xs font-semibold">{{
                                        item.count }} โควต้า</span>
                                    <!-- <button
                                        class="bg-[#f6eec7] hover:bg-[#b6e388] text-[#184c36] px-3 py-1 rounded-full text-xs font-semibold transition">ดูสินค้า</button> -->
                                </div>
                            </div>
                        </template>
                        <div v-else class="text-center text-gray-400 py-8">
                            ไม่พบสินค้าที่รับซื้อ
                        </div>
                    </div>
                    <div class="flex gap-4 mt-8 w-full justify-end">
                        <button
                            class="border border-[#184c36] text-[#184c36] bg-white px-6 py-2 rounded-full font-medium hover:bg-[#f6eec7] transition flex items-center gap-2"
                            @click="goBack">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            ย้อนกลับ
                        </button>
                        <button
                            class="bg-[#184c36] text-white px-8 py-2 rounded-full font-medium hover:bg-[#0e2d1e] transition flex items-center gap-2"
                            @click="handleBookRecycleOrder">
                            จองคิว
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                                <path d="M9 16l2 2l4-4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Bar from '../../components/Bar.vue';
import Footer from '../../components/Footer.vue';

const route = useRoute();
const router = useRouter();
const storeId = String(route.params.id);
const store = ref(null);
const items = ref([]);

onMounted(async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const partner = JSON.parse(localStorage.getItem('partner') || '{}');
    if ((!user || (!user._id && !user.id)) && (!partner || (!partner._id && !partner.id))) {
        router.push('/login');
        return;
    }
    // ดึงข้อมูลร้านจาก backend
    let storeData = null;
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/partners`);
        if (res.data && Array.isArray(res.data.data)) {
            storeData = res.data.data.find(s => String(s._id) === String(storeId));
        }
    } catch (e) {
        storeData = null;
        console.error('partner error', e);
    }

    // ดึงข้อมูลสินค้าทั้งหมด แล้ว filter เฉพาะที่ store.id ตรงกัน
    let productList = [];
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        if (res.data && Array.isArray(res.data.products)) {
            productList = res.data.products
                .filter(p => {
                    const productStoreId = p.store_id?._id;
                    return String(productStoreId) === String(storeId);
                })
                .map(p => ({
                    name: p.name,
                    img: p.img || '/src/assets/NoPicture.webp',
                    count: 1,
                }));
        }
    } catch (e) {
        productList = [];
        console.error('product error', e);
    }

    // set ข้อมูลร้านและสินค้า
    store.value = storeData
        ? {
            _id: storeData._id,
            name: storeData.companyName,
            owner: storeData.username || '-',
            companyAddress: storeData.companyAddress || '',
            companySubdistrict: storeData.companySubdistrict || '',
            companyDistrict: storeData.companyDistrict || '',
            companyProvince: storeData.companyProvince || '',
            companyPostalCode: storeData.companyPostalCode || '',
            img: Array.isArray(storeData.shopImages)
                ? storeData.shopImages[0]
                : storeData.shopImages || '/src/assets/NoPicture.webp',
            banner: storeData.bannerImage || '/src/assets/bannerSlider1.png',
            items: productList,
        }
        : null;

    items.value = productList;
});

const companyFullAddress = computed(() => {
    if (!store.value) return '-';
    const s = store.value;
    // ถ้าไม่มีข้อมูล return '-'
    if (!s.companyAddress && !s.companySubdistrict && !s.companyDistrict && !s.companyProvince && !s.companyPostalCode) return '-';
    return `${s.companyAddress || ''} ต.${s.companySubdistrict || ''} อ.${s.companyDistrict || ''} จ.${s.companyProvince || ''} ${s.companyPostalCode || ''}`.replace(/ +/g, ' ').trim();
});

const goBack = () => {
    router.push('/partnerstores');
};

function handleBookRecycleOrder() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || (!user._id && !user.id)) {
        router.push('/login');
        return;
    }
    if (store.value) {
        // Map ข้อมูลร้านให้ครบถ้วนตามที่ RecycleOrder.vue ใช้
        const partnerData = {
            _id: store.value._id || store.value.id,
            partnerCompanyName: store.value.name || store.value.companyName,
            partnerCompanyAddress: store.value.companyAddress,
            partnerCompanySubdistrict: store.value.companySubdistrict,
            partnerCompanyDistrict: store.value.companyDistrict,
            partnerCompanyProvince: store.value.companyProvince,
            partnerCompanyPostalCode: store.value.companyPostalCode,
            partnerCompanyProvinceId: store.value.companyProvinceId,
            partnerCompanyDistrictId: store.value.companyDistrictId,
            partnerCompanySubdistrictId: store.value.companySubdistrictId,
            // เพิ่ม field อื่นๆ ตามต้องการ
        };
        localStorage.setItem('partner', JSON.stringify(partnerData));
        router.push({ path: '/recycleorder' });
    }
}
</script>

<style scoped>
.material-icons {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
}
</style>
