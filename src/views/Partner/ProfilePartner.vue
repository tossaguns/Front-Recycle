<template>
    <div class="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
        <BarAdmin />
        <main class="flex-1 flex flex-col items-center justify-center z-10 relative py-4 sm:py-6 md:py-8 lg:py-10">
            <h1
                class="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#222] mb-4 sm:mb-5 md:mb-6 lg:mb-8 mt-2">
                ข้อมูลบัญชี
            </h1>

            <div
                class="flex flex-col items-center w-full mx-auto bg-white rounded-2xl shadow-none p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl">
                <div class="relative mb-4 flex flex-col items-center">
                    <img :src="profileImg" alt="profile" class="rounded-full object-cover border-4 border-white shadow-lg
                        w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32" />
                </div>

                <div
                    class="bg-white rounded-2xl shadow-xl border-l-4 border-[#b6e388] w-full px-3 sm:px-5 py-4 sm:py-6">
                    <div class="p-3 sm:p-4 md:p-6 lg:p-8">
                        <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-2 border-b border-[#e6f7e6]">
                            <div
                                class="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-[#b6e388] to-[#184c36] rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2
                                    class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#184c36] to-[#b6e388] bg-clip-text text-transparent">
                                    ข้อมูลบัญชี
                                </h2>
                                <p class="text-xs sm:text-sm text-[#184c36] mt-1">
                                    รายละเอียดของร้านค้า
                                </p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                            <div class="space-y-1 sm:space-y-2">
                                <label
                                    class="block text-xs sm:text-sm font-semibold text-[#184c36]">ชื่อร้าน/ชื่อพาร์ทเนอร์</label>
                                <input v-model="form.fullName" type="text" readonly
                                    class="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] text-sm sm:text-base" />
                            </div>

                            <div class="space-y-1 sm:space-y-2">
                                <label class="block text-xs sm:text-sm font-semibold text-[#184c36]">อีเมล</label>
                                <input v-model="form.personalEmail" type="email" readonly
                                    class="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] text-sm sm:text-base" />
                            </div>

                            <div class="space-y-1 sm:space-y-2 sm:col-span-2 xl:col-span-1">
                                <label class="block text-xs sm:text-sm font-semibold text-[#184c36]">เบอร์โทร</label>
                                <input v-model="form.personalPhone" type="tel" readonly
                                    class="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] text-sm sm:text-base" />
                            </div>
                        </div>

                        <div class="mt-6 sm:col-span-2 xl:col-span-3">
                            <h3 class="text-lg font-semibold text-[#184c36] mb-4">ที่อยู่ร้าน/พาร์ทเนอร์</h3>
                            <div v-if="partnerAddresses.length === 0" class="text-center py-8 text-gray-500">
                                <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p>ยังไม่มีที่อยู่</p>
                            </div>
                            <div v-else class="space-y-4">
                                <div v-for="address in partnerAddresses" :key="address._id"
                                    class="border border-[#e6f7e6] rounded-lg p-4 bg-[#f7faf0]">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-2">
                                                <h4 class="font-semibold text-[#184c36]">{{ address.address_name }}</h4>
                                                <span v-if="address.is_default"
                                                    class="bg-[#b6e388] text-[#184c36] text-xs px-2 py-1 rounded-full">
                                                    ที่อยู่ร้าน
                                                </span>
                                            </div>
                                            <p class="text-sm text-gray-700 mb-1">{{ address.address }}</p>
                                            <p class="text-sm text-gray-600">
                                                {{ address.subdistrict }} {{ address.district }} {{ address.province }}
                                                {{ address.postal_code }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import BarAdmin from '../../components/BarAdmin.vue';
import axios from 'axios';

const profileImg = ref('/src/assets/logo3.png');
const form = reactive({
    fullName: '',
    personalEmail: '',
    personalPhone: '',
});
const partnerAddresses = ref([]);
const partner = JSON.parse(localStorage.getItem('partner') || '{}');
const partnerId = ref(partner.id || partner._id);

onMounted(async () => {
    await loadPartnerProfile();
});

async function loadPartnerProfile() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/partners/profile/${partnerId.value}`);
        const partnerData = response.data;

        form.fullName = partnerData.fullName || '';
        form.personalEmail = partnerData.personalEmail || '';
        form.personalPhone = partnerData.personalPhone || '';
        profileImg.value = partnerData.companyLogo || '/src/assets/logo3.png';

        // ✅ เอาเฉพาะที่อยู่บริษัท
        partnerAddresses.value = [
            {
                _id: 'company',
                address_name: 'ที่อยู่บริษัท',
                address: partnerData.companyAddress,
                subdistrict: partnerData.companySubdistrict,
                district: partnerData.companyDistrict,
                province: partnerData.companyProvince,
                postal_code: partnerData.companyPostalCode,
                is_default: true, // แสดง tag "ที่อยู่หลัก"
            }
        ];

    } catch (err) {
        console.error('โหลดข้อมูลโปรไฟล์พาร์ทเนอร์ไม่สำเร็จ', err);
        partnerAddresses.value = [];
    }
}
</script>

<style scoped></style>
