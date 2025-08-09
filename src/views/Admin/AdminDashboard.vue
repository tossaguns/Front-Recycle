<template>
    <BarAdmin />
    <div class="min-h-screen bg-gradient-to-br from-[#e6f7e6] via-white to-[#b6e388] pt-20">
        <main class="max-w-7xl mx-auto px-4 sm:px-2 py-4 md:py-8 mt-0 md:mt-5">
            <div class="mb-4 sm:mb-6">
                <h1 class="text-2xl sm:text-3xl font-bold text-[#184c36] mb-1 sm:mb-2">ยินดีต้อนรับสู่ Admin Dashboard
                </h1>
                <p class="text-[#666] text-sm sm:text-lg">จัดการและติดตามข้อมูลระบบของคุณ</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <template v-if="isLoading">
                    <div
                        class="flex flex-col items-center justify-center py-10 sm:py-16 col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4">
                        <svg class="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-[#2BAC75]" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span
                            class="mt-2 sm:mt-4 text-[#2BAC75] text-sm sm:text-lg font-semibold">กำลังโหลดข้อมูล...</span>
                    </div>
                </template>

                <template v-else>
                    <div
                        class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div
                                    class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-3 sm:ml-4">
                                <p class="text-xs sm:text-sm font-medium text-[#666]">ร้านค้าทั้งหมด</p>
                                <p class="text-2xl sm:text-3xl font-bold text-[#184c36]">{{ stats.partners?.total || 0
                                    }}</p>
                            </div>
                        </div>
                        <div class="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-[#f0f0f0]">
                            <div class="flex justify-between text-xs sm:text-sm">
                                <span class="text-green-600 font-medium">อนุมัติแล้ว: {{ stats.partners?.approved || 0
                                }}</span>
                                <span class="text-yellow-600 font-medium">รออนุมัติ: {{ stats.partners?.pending || 0
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div
                                    class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4.354a4 4 0 110 5.292m0 5.354a4 4 0 100-5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-3 sm:ml-4">
                                <p class="text-xs sm:text-sm font-medium text-[#666]">สมาชิกทั้งหมด</p>
                                <p class="text-2xl sm:text-3xl font-bold text-[#184c36]">{{ stats.members?.total || 0 }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div
                                    class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-3 sm:ml-4">
                                <p class="text-xs sm:text-sm font-medium text-[#666]">การจองคิวทั้งหมด</p>
                                <p class="text-2xl sm:text-3xl font-bold text-[#184c36]">{{ stats.orders?.total || 0 }}
                                </p>
                            </div>
                        </div>
                        <div class="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-[#f0f0f0]">
                            <div class="flex justify-between text-xs sm:text-sm">
                                <span class="text-green-600 font-medium">สำเร็จ: {{ stats.orders?.completed || 0
                                    }}</span>
                                <span class="text-yellow-600 font-medium">รอยืนยัน: {{ stats.orders?.pending || 0
                                    }}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div
                                    class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-3 sm:ml-4">
                                <p class="text-xs sm:text-sm font-medium text-[#666]">รายได้รวม</p>
                                <p class="text-2xl sm:text-3xl font-bold text-[#184c36]">{{
                                    formatCurrency(stats.orders?.totalRevenue || 0) }}</p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-4 sm:p-6">
                    <div class="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 class="text-lg sm:text-xl font-bold text-[#184c36]">รายได้รายเดือน</h3>
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div v-if="isLoading" class="flex flex-col items-center justify-center py-10 sm:py-16">
                        <svg class="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-[#2BAC75]" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span
                            class="mt-2 sm:mt-4 text-[#2BAC75] text-sm sm:text-lg font-semibold">กำลังโหลดข้อมูล...</span>
                    </div>
                    <div v-else class="h-48 sm:h-64 flex items-end justify-between space-x-1 sm:space-x-2">
                        <div v-for="(month, index) in monthlyRevenue" :key="index"
                            class="flex-1 bg-gradient-to-t from-green-400 to-green-500 rounded-t-lg shadow-md hover:from-green-500 hover:to-green-600 transition-all duration-300"
                            :style="{ height: `${(month.revenue / maxRevenue) * 100}%` }"
                            :title="`${month.month}: ${formatCurrency(month.revenue)}`"></div>
                    </div>
                    <div class="mt-4 grid grid-cols-6 text-xs text-[#666] font-medium">
                        <span v-for="month in ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.']" :key="month">{{ month
                            }}</span>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-4 sm:p-6">
                    <div class="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 class="text-lg sm:text-xl font-bold text-[#184c36]">การจองคิวรายวัน (7 วันล่าสุด)</h3>
                        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div v-if="isLoading" class="flex flex-col items-center justify-center py-10 sm:py-16">
                        <svg class="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-[#2BAC75]" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span
                            class="mt-2 sm:mt-4 text-[#2BAC75] text-sm sm:text-lg font-semibold">กำลังโหลดข้อมูล...</span>
                    </div>
                    <div v-else class="h-48 sm:h-64 flex items-end justify-between space-x-1 sm:space-x-2">
                        <div v-for="(day, index) in dailyOrders" :key="index"
                            class="flex-1 bg-gradient-to-t from-blue-400 to-blue-500 rounded-t-lg shadow-md hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
                            :style="{ height: `${(day.count / maxOrders) * 100}%` }"
                            :title="`${day._id.day}/${day._id.month}: ${day.count} รายการ`"></div>
                    </div>
                    <div class="mt-4 grid grid-cols-7 text-xs text-[#666] font-medium">
                        <span v-for="i in 7" :key="i">{{ i }} วันก่อน</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-4 sm:p-6">
                    <div class="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 class="text-lg sm:text-xl font-bold text-[#184c36]">ร้านค้าที่ขายดีที่สุด</h3>
                        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div v-if="isLoading" class="flex flex-col items-center justify-center py-10 sm:py-16">
                        <svg class="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-[#2BAC75]" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span
                            class="mt-2 sm:mt-4 text-[#2BAC75] text-sm sm:text-lg font-semibold">กำลังโหลดข้อมูล...</span>
                    </div>
                    <div v-else class="space-y-4">
                        <div v-for="(partner, index) in topPartners" :key="partner.store_id.companyName"
                            class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300">
                            <div class="flex items-center">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-lg">
                                    {{ index + 1 }}
                                </div>
                                <div class="ml-3 sm:ml-4">
                                    <p class="font-semibold text-[#184c36] text-sm sm:text-base">{{
                                        partner.store_id.companyName }}
                                    </p>
                                    <p class="text-xs sm:text-sm text-[#666]">{{ partner.totalOrders }} รายการ</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-green-600 text-sm sm:text-lg">{{
                                    formatCurrency(partner.totalRevenue) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-4 sm:p-6">
                    <div class="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 class="text-lg sm:text-xl font-bold text-[#184c36]">สมาชิกที่ขายบ่อยที่สุด</h3>
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div v-if="isLoading" class="flex flex-col items-center justify-center py-10 sm:py-16">
                        <svg class="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-[#2BAC75]" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span
                            class="mt-2 sm:mt-4 text-[#2BAC75] text-sm sm:text-lg font-semibold">กำลังโหลดข้อมูล...</span>
                    </div>
                    <div v-else class="space-y-4">
                        <div v-for="(member, index) in topMembers" :key="member.member_id._id"
                            class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-all duration-300">
                            <div class="flex items-center">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-lg">
                                    {{ index + 1 }}
                                </div>
                                <div class="ml-3 sm:ml-4">
                                    <p class="font-semibold text-[#184c36] text-sm sm:text-base">{{
                                        member.member_id.fullName }}</p>
                                    <p class="text-xs sm:text-sm text-[#666]">{{ member.member_id.personalPhone }}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-green-600 text-sm sm:text-lg">{{ member.totalOrders }} รายการ
                                </p>
                                <p class="text-xs sm:text-sm text-[#666]">{{ formatCurrency(member.totalRevenue) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import BarAdmin from '../../components/BarAdmin.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const router = useRouter();
const authStore = useAuthStore();

// Reactive data
const stats = ref({});
const monthlyRevenue = ref([]);
const dailyOrders = ref([]);
const topPartners = ref([]);
const topMembers = ref([]);
const adminUser = ref(null);
const isLoading = ref(true);

// Computed properties
const maxRevenue = computed(() => {
    if (monthlyRevenue.value.length === 0) return 1;
    return Math.max(...monthlyRevenue.value.map(m => m.revenue));
});

const maxOrders = computed(() => {
    if (dailyOrders.value.length === 0) return 1;
    return Math.max(...dailyOrders.value.map(d => d.count));
});

// Methods
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB'
    }).format(amount);
};

const loadDashboardData = async () => {
    isLoading.value = true;
    try {
        const token = authStore.token;
        if (!token) {
            throw new Error('ไม่พบ Token');
        }

        // ตั้งค่า Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // ดึงข้อมูล Dashboard
        const [statsResponse, monthlyResponse, dailyResponse, topResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard/stats`),
            axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard/monthly-revenue`),
            axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard/daily-orders`),
            axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`),
        ]);

        if (statsResponse.data.success) {
            stats.value = statsResponse.data.data;
        }

        if (monthlyResponse.data.success) {
            monthlyRevenue.value = monthlyResponse.data.data;
        }

        if (dailyResponse.data.success) {
            dailyOrders.value = dailyResponse.data.data;
        }

        if (topResponse.data.success) {
            const orders = topResponse.data.data;
            console.log('Orders:', orders);
            const validStatuses = ['ยืนยันแล้ว', 'กำลังดำเนินการ', 'เสร็จสิ้น'];
            const storeTotals = {};

            orders.forEach(order => {
                if (validStatuses.includes(order.status)) {
                    const orderTotalRevenue = order.total_price;
                    const storeName = order.store_id.companyName;

                    if (!storeTotals[storeName]) {
                        storeTotals[storeName] = { totalRevenue: 0, totalOrders: 0 };
                    }
                    storeTotals[storeName].totalRevenue += orderTotalRevenue;
                    storeTotals[storeName].totalOrders++; // นับจำนวนออเดอร์
                }
            });

            const sortedStores = Object.keys(storeTotals)
                .map(storeName => ({
                    store_id: { companyName: storeName }, // สร้างโครงสร้างให้เหมือนข้อมูลเดิมเพื่อแสดงผลใน HTML ได้
                    totalRevenue: storeTotals[storeName].totalRevenue,
                    totalOrders: storeTotals[storeName].totalOrders,
                }))
                .sort((a, b) => b.totalRevenue - a.totalRevenue);

            // นำข้อมูลที่คำนวณและเรียงแล้วไปเก็บในตัวแปร ref
            topPartners.value = sortedStores;
        }

        if (topResponse.data.success) {
            const orders = topResponse.data.data;
            console.log('Orders:', orders);
            const validStatuses = ['ยืนยันแล้ว', 'กำลังดำเนินการ', 'เสร็จสิ้น'];
            const memberTotals = {};

            orders.forEach(order => {
                if (validStatuses.includes(order.status)) {
                    const orderTotalRevenue = order.total_price;
                    const memberId = order.member_id._id;
                    const memberName = order.member_id.fullName;
                    const memberPhone = order.member_id.personalPhone;

                    if (!memberTotals[memberId]) {
                        memberTotals[memberId] = {
                            fullName: memberName,
                            personalPhone: memberPhone,
                            totalRevenue: 0,
                            totalOrders: 0
                        };
                    }
                    memberTotals[memberId].totalRevenue += orderTotalRevenue;
                    memberTotals[memberId].totalOrders++; // นับจำนวนออเดอร์
                }
            });

            const sortedMember = Object.keys(memberTotals)
                .map(memberId => ({
                    member_id: { _id: memberId, fullName: memberTotals[memberId].fullName, personalPhone: memberTotals[memberId].personalPhone }, // สร้างโครงสร้างให้เหมือนข้อมูลเดิมเพื่อแสดงผลใน HTML ได้
                    totalRevenue: memberTotals[memberId].totalRevenue,
                    totalOrders: memberTotals[memberId].totalOrders,
                }))
                .sort((a, b) => b.totalRevenue - a.totalRevenue);

            // นำข้อมูลที่คำนวณและเรียงแล้วไปเก็บในตัวแปร ref
            topMembers.value = sortedMember;
            console.log('Top Members:', topMembers.value);
        }

    } catch (error) {
        console.error('Load dashboard data error:', error);

        if (error.response?.status === 401) {
            // Token หมดอายุหรือไม่ถูกต้อง
            authStore.logout();
            router.push('/');
            return;
        }

        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถโหลดข้อมูล Dashboard ได้',
            confirmButtonText: 'ตกลง'
        });
    } finally {
        isLoading.value = false;
    }
};

// Lifecycle
onMounted(() => {
    // ดึงข้อมูลผู้ใช้จาก authStore
    if (authStore.user && authStore.user.role === 'admin') {
        adminUser.value = authStore.user;
    }

    // โหลดข้อมูล Dashboard
    loadDashboardData();
});
</script>