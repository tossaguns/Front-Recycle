<template>
    <div class="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]">
        <!-- Admin Navigation Bar -->
        <BarAdmin />

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Welcome Section -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-[#184c36] mb-2">ยินดีต้อนรับสู่ Admin Dashboard</h1>
                <p class="text-[#666] text-lg">จัดการและติดตามข้อมูลระบบของคุณ</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- Partners Stats -->
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-[#666]">ร้านค้าทั้งหมด</p>
                            <p class="text-3xl font-bold text-[#184c36]">{{ stats.partners?.total || 0 }}</p>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-[#f0f0f0]">
                        <div class="flex justify-between text-sm">
                            <span class="text-green-600 font-medium">อนุมัติแล้ว: {{ stats.partners?.approved || 0 }}</span>
                            <span class="text-yellow-600 font-medium">รออนุมัติ: {{ stats.partners?.pending || 0 }}</span>
                        </div>
                    </div>
                </div>

                <!-- Members Stats -->
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-[#666]">สมาชิกทั้งหมด</p>
                            <p class="text-3xl font-bold text-[#184c36]">{{ stats.members?.total || 0 }}</p>
                        </div>
                    </div>
                </div>

                <!-- Orders Stats -->
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-[#666]">การจองคิวทั้งหมด</p>
                            <p class="text-3xl font-bold text-[#184c36]">{{ stats.orders?.total || 0 }}</p>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-[#f0f0f0]">
                        <div class="flex justify-between text-sm">
                            <span class="text-green-600 font-medium">สำเร็จ: {{ stats.orders?.completed || 0 }}</span>
                            <span class="text-yellow-600 font-medium">รอยืนยัน: {{ stats.orders?.pending || 0 }}</span>
                        </div>
                    </div>
                </div>

                <!-- Revenue Stats -->
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-[#666]">รายได้รวม</p>
                            <p class="text-3xl font-bold text-[#184c36]">{{ formatCurrency(stats.orders?.totalRevenue || 0) }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <!-- Monthly Revenue Chart -->
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-[#184c36]">รายได้รายเดือน</h3>
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div class="h-64 flex items-end justify-between space-x-2">
                        <div v-for="(month, index) in monthlyRevenue" :key="index" 
                             class="flex-1 bg-gradient-to-t from-green-400 to-green-500 rounded-t-lg shadow-md hover:from-green-500 hover:to-green-600 transition-all duration-300"
                             :style="{ height: `${(month.revenue / maxRevenue) * 100}%` }"
                             :title="`${month.month}: ${formatCurrency(month.revenue)}`"></div>
                    </div>
                    <div class="mt-4 grid grid-cols-6 text-xs text-[#666] font-medium">
                        <span v-for="month in ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.']" :key="month">{{ month }}</span>
                    </div>
                </div>

                <!-- Daily Orders Chart -->
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-[#184c36]">การจองคิวรายวัน (7 วันล่าสุด)</h3>
                        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div class="h-64 flex items-end justify-between space-x-2">
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

            <!-- Top Performers -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Top Partners -->
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-[#184c36]">ร้านค้าที่ขายดีที่สุด</h3>
                        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div class="space-y-4">
                        <div v-for="(partner, index) in topPartners" :key="partner._id"
                            class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                    {{ index + 1 }}
                                </div>
                                <div class="ml-4">
                                    <p class="font-semibold text-[#184c36]">{{ partner.partnerName }}</p>
                                    <p class="text-sm text-[#666]">{{ partner.totalOrders }} รายการ</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-green-600 text-lg">{{ formatCurrency(partner.totalRevenue) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Top Members -->
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-[#184c36]">สมาชิกที่ขายบ่อยที่สุด</h3>
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div class="space-y-4">
                        <div v-for="(member, index) in topMembers" :key="member._id"
                            class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-all duration-300">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                    {{ index + 1 }}
                                </div>
                                <div class="ml-4">
                                    <p class="font-semibold text-[#184c36]">{{ member.memberName }}</p>
                                    <p class="text-sm text-[#666]">{{ member.memberPhone }}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-green-600 text-lg">{{ member.totalOrders }} รายการ</p>
                                <p class="text-sm text-[#666]">{{ formatCurrency(member.totalRevenue) }}</p>
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
    try {
        const token = authStore.token;
        if (!token) {
            throw new Error('ไม่พบ Token');
        }

        // ตั้งค่า Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // ดึงข้อมูล Dashboard
        const [statsResponse, monthlyResponse, dailyResponse, partnersResponse, membersResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard/stats`),
            axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard/monthly-revenue`),
            axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard/daily-orders`),
            axios.get(`${import.meta.env.VITE_API_URL}/admin/partners?limit=5`),
            axios.get(`${import.meta.env.VITE_API_URL}/admin/members?limit=5`)
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

        if (partnersResponse.data.success) {
            topPartners.value = partnersResponse.data.data;
        }

        if (membersResponse.data.success) {
            topMembers.value = membersResponse.data.data;
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
    }
};

// ลบ handleLogout function ออกเพราะ BarAdmin จะจัดการ logout ให้แล้ว

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