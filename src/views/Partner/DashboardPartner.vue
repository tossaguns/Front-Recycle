<template>
    <BarAdmin />
    <div class="min-h-screen bg-gray-50">
        <!-- Header Section -->
        <div class="bg-white shadow-sm border-b border-[#e6e6e6]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-[#184c36]">แดชบอร์ดพาร์ทเนอร์</h1>
                        <p class="text-gray-600 mt-1">ยินดีต้อนรับ {{ authStore.user.fullName || authStore.user.username }}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-500">วันที่</p>
                        <p class="text-lg font-semibold text-[#184c36]">{{ currentDate }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Cards Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- ลูกค้า Card -->
                <div class="bg-white rounded-xl shadow-sm border border-[#e6e6e6] p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">ลูกค้าทั้งหมด</p>
                            <p class="text-3xl font-bold text-[#184c36] mt-2">{{ customerCount }}</p>
                            <p class="text-sm text-green-600 mt-1 flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                                </svg>
                                +12% จากเดือนที่แล้ว
                            </p>
                        </div>
                        <div class="bg-[#d6f5a6] rounded-full p-3">
                            <svg class="w-8 h-8 text-[#184c36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- ออเดอร์ Card -->
                <div class="bg-white rounded-xl shadow-sm border border-[#e6e6e6] p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">ออเดอร์ทั้งหมด</p>
                            <p class="text-3xl font-bold text-[#184c36] mt-2">{{ orderCount }}</p>
                            <p class="text-sm text-green-600 mt-1 flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                                </svg>
                                +18% จากเดือนที่แล้ว
                            </p>
                        </div>
                        <div class="bg-[#d6f5a6] rounded-full p-3">
                            <svg class="w-8 h-8 text-[#184c36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- รายได้ Card -->
                <div class="bg-white rounded-xl shadow-sm border border-[#e6e6e6] p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">รายได้ของร้าน</p>
                            <p class="text-3xl font-bold text-[#184c36] mt-2">฿{{ formatNumber(monthlyRevenue) }}</p>
                            <p class="text-sm text-green-600 mt-1 flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                                </svg>
                                +15% จากเดือนที่แล้ว
                            </p>
                        </div>
                        <div class="bg-[#d6f5a6] rounded-full p-3">
                            <svg class="w-8 h-8 text-[#184c36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- สินค้าทั้งหมด Card -->
                <div class="bg-white rounded-xl shadow-sm border border-[#e6e6e6] p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">สินค้าของร้าน</p>
                            <p class="text-3xl font-bold text-[#184c36] mt-2">{{ productCount }}</p>
                            <p class="text-sm text-green-600 mt-1 flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                                </svg>
                                +5% จากเดือนที่แล้ว
                            </p>
                        </div>
                        <div class="bg-[#d6f5a6] rounded-full p-3">
                            <svg class="w-8 h-8 text-[#184c36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m8-4v10l-8 4M4 7v10l8 4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- รายได้รายเดือน Chart -->
                <div class="bg-white rounded-xl shadow-sm border border-[#e6e6e6] p-6">
                    <h3 class="text-lg font-semibold text-[#184c36] mb-4">รายได้ร้านรายเดือน</h3>
                    <div class="h-64 flex items-end justify-between space-x-2">
                        <div v-for="(month, index) in monthlyData" :key="index" class="flex-1 flex flex-col items-center">
                            <div class="w-full bg-gray-200 rounded-t" :style="{ height: (month.value / maxRevenue) * 200 + 'px' }">
                                <div class="w-full bg-[#d6f5a6] rounded-t transition-all duration-300 hover:bg-[#b6e388]" :style="{ height: (month.value / maxRevenue) * 200 + 'px' }"></div>
                            </div>
                            <p class="text-xs text-gray-600 mt-2">{{ month.label }}</p>
                        </div>
                    </div>
                </div>

                <!-- สถิติล่าสุด -->
                <div class="bg-white rounded-xl shadow-sm border border-[#e6e6e6] p-6">
                    <h3 class="text-lg font-semibold text-[#184c36] mb-4">กิจกรรมล่าสุด</h3>
                    <div class="space-y-4">
                        <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-center space-x-3">
                            <div class="w-2 h-2 bg-[#d6f5a6] rounded-full"></div>
                            <div class="flex-1">
                                <p class="text-sm text-gray-800">{{ activity.title }}</p>
                                <p class="text-xs text-gray-500">{{ activity.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import BarAdmin from '../../components/BarAdmin.vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Data สำหรับ partner
const customerCount = ref(156);
const orderCount = ref(89);
const monthlyRevenue = ref(125000);
const productCount = ref(45);

// Monthly revenue data for chart
const monthlyData = ref([
    { label: 'ม.ค.', value: 95000 },
    { label: 'ก.พ.', value: 88000 },
    { label: 'มี.ค.', value: 102000 },
    { label: 'เม.ย.', value: 115000 },
    { label: 'พ.ค.', value: 118000 },
    { label: 'มิ.ย.', value: 125000 }
]);

// Recent activities สำหรับ partner
const recentActivities = ref([
    { title: 'ออเดอร์ใหม่ #ORD-2024-001', time: '2 นาทีที่แล้ว' },
    { title: 'สินค้าใหม่เพิ่ม: รีไซเคิลพลาสติก', time: '15 นาทีที่แล้ว' },
    { title: 'ลูกค้าใหม่: คุณสมชาย ใจดี', time: '1 ชั่วโมงที่แล้ว' },
    { title: 'รายงานประจำเดือนอัปโหลดแล้ว', time: '2 ชั่วโมงที่แล้ว' },
    { title: 'ออเดอร์เสร็จสิ้น: #ORD-2024-000', time: '3 ชั่วโมงที่แล้ว' }
]);

// Computed
const currentDate = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

const maxRevenue = computed(() => {
    return Math.max(...monthlyData.value.map(item => item.value));
});

// Methods
const formatNumber = (num) => {
    return num.toLocaleString('th-TH');
};

// Lifecycle
onMounted(() => {
    // ตรวจสอบสิทธิ์การเข้าถึง
    if (!authStore.isPartnerOrAdmin()) {
        router.push('/login');
        return;
    }
    
    console.log('Dashboard loaded for role:', authStore.user.role);
});
</script>

<style scoped>
/* Custom styles if needed */
</style>