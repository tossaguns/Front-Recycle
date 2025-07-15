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
                            <span class="font-semibold text-base">{{ store?.fullName || '-' }}</span>
                            <span class="text-xs text-gray-500">{{ companyFullAddress }}</span>
                        </div>
                    </div></div>
                    <div class="mt-6 w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
                        <img :src="store?.banner || '/src/assets/bannerSlider1.png'" class="w-full h-64 object-cover" />
                    </div>
                </div>
                <!-- Right: Product List -->
                <div class="flex-1 flex flex-col items-center md:items-start">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                        <h2 class="font-bold text-lg">รายการสินค้าที่รับชื้อ</h2>
                        <input
                            v-model="searchProduct"
                            type="text"
                            placeholder="ค้นหาสินค้า..."
                            class="rounded-full border border-[#e6e6e6] px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] w-full sm:w-64"
                        />
                    </div>
                    <div
                        class="w-full flex flex-col gap-2"
                        :class="filteredProducts && filteredProducts.length > 4 ? 'overflow-y-auto max-h-80' : ''"
                    >
                        <div
                            v-for="item in filteredProducts"
                            :key="item._id"
                            class="flex items-center bg-white rounded-xl shadow p-2 md:p-3 gap-3 border border-[#e6e6e6]"
                        >
                            <img
                                :src="item.image || item.img || '/src/assets/NoPicture.webp'"
                                class="w-16 h-16 rounded-lg object-cover border"
                                :alt="item.name"
                            />
                            <div class="flex-1 flex flex-col justify-center">
                                <div class="font-semibold text-base text-[#222]">{{ item.name }}</div>
                                <div class="text-xs text-gray-400">ราคา {{ item.price_per_kg || '-' }} บาท/กก.</div>
                            </div>
                            <div>
                                <span class="bg-[#f6b26b] text-[#7a3e00] rounded-full px-5 py-1 text-sm font-bold shadow">
                                    {{ item.maxAmount || 1 }} โควต้า
                                </span>
                            </div>
                        </div>
                        <div v-if="!filteredProducts || !filteredProducts.length" class="text-center text-gray-400 py-8">
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
import { useRouter } from 'vue-router';
import Bar from '../../components/Bar.vue';
import Footer from '../../components/Footer.vue';
import axios from 'axios';

const router = useRouter();
const store = ref(null);
const products = ref([]);
const searchProduct = ref('');
const filteredProducts = computed(() =>
  products.value.filter(
    p => p.name && p.name.toLowerCase().includes(searchProduct.value.toLowerCase())
  )
);

onMounted(async () => {
  const partner = JSON.parse(localStorage.getItem('partner') || '{}');
  if (!partner || (!partner._id && !partner.id)) {
    router.push('/partnerstores');
    return;
  }
  store.value = partner;

  // ดึงสินค้าทั้งหมดแล้ว filter เฉพาะที่ shopId === partner._id
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    console.log("res", res.data)
    if (res.data && Array.isArray(res.data.products)) {
      products.value = res.data.products.filter(
        p => String(p.shopId) === String(partner._id)
      );
    }
  } catch (e) {
    products.value = [];
  }
});

const companyFullAddress = computed(() => {
  if (!store.value) return '-';
  const s = store.value;
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
            partnerName: store.value.fullName,
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
