<template>
    <div class="fixed top-0 left-0 w-full z-50">
    <header class="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-[#e6e6e6] flex flex-col items-center">
        <div class="w-full flex items-center justify-between px-6 py-3 gap-4">
            <!-- Logo -->
            <div class="flex items-center cursor-pointer" @click="goToHome">
                <div class="rounded-xl flex items-center justify-center">
                    <LogoIcon class="w-32 h-8 sm:w-36 sm:h-9 md:w-40 md:h-10" />
                </div>
            </div>

            <!-- จองคิว Button (Desktop) -->
            <div class="hidden sm:flex">
                <button
                    class="bg-[#184c36] hover:bg-[#0e2d1e] text-white text-sm font-medium rounded-full px-6 py-2 flex items-center gap-2 transition"
                    @click="goToPartnerStores">
                    จองคิว
                    <CalendarIcon class="w-5 h-5" />
                </button>
            </div>

            <!-- ปุ่มจองคิว (Mobile) -->
            <div class="flex items-center space-x-2 sm:hidden">
                <button
                    class="bg-[#184c36] hover:bg-[#0e2d1e] text-white text-sm font-medium rounded-full px-6 py-2 flex items-center gap-2 transition"
                    @click="goToPartnerStores">
                    จองคิว
                    <CalendarIcon class="w-5 h-5" />
                </button>
            </div>
        </div>
    </header>

    <!-- Back Navigation Header -->
    <div v-if="showBackNavigation" class="bg-[#106154] py-4 px-6 mt-14 md:mt-16">
        <div class="flex items-center">
            <button @click="goBack" class="flex items-center text-white hover:text-gray-200 transition-colors">
                <ChevronLeftIcon class="w-6 h-6 mr-2" />
                <span class="text-lg font-medium">{{ computedPageTitle }}</span>
            </button>
        </div>
    </div>
</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import LogoIcon from '../icons/LogoIcon.vue';
import CalendarIcon from '../icons/CalendarIcon.vue';
import ChevronLeftIcon from '../icons/ChevronLeftIcon.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Props
const props = defineProps({
    showBackNavigation: {
        type: Boolean,
        default: false
    },
    pageTitle: {
        type: String,
        default: ''
    },
    backRoute: {
        type: String,
        default: ''
    }
});

// Computed properties for dynamic page title
const computedPageTitle = computed(() => {
    if (props.pageTitle) return props.pageTitle;
    
    // Fallback to route-based titles
    const routeTitles = {
        '/activity': 'กิจกรรม',
        '/dashboardpartner': 'แดชบอร์ดพาร์ทเนอร์',
        '/manageemployee': 'จัดการพนักงาน',
        '/memberofpartner': 'สมาชิกของพาร์ทเนอร์',
        '/addproduct': 'เพิ่มสินค้า',
        '/recycleorder': 'ออเดอร์รีไซเคิล',
        '/member/orders': 'ออเดอร์ของฉัน'
    };
    
    return routeTitles[route.path] || 'กลับ';
});

const goBack = () => {
    if (props.backRoute) {
        router.push(props.backRoute);
    } else {
        router.back();
    }
};

const goToHome = () => {
    if (authStore.user.role === 'partner') {
        router.push('/homepartner');
    } else {
        router.push('/');
    }
};

const goToPartnerStores = () => {
    router.push('/partnerstores');
};
</script>

<style scoped>
.menu-underline {
    position: relative;
}

.menu-underline::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #b6e388;
    transition: width 0.3s ease;
}

.menu-underline:hover::after {
    width: 100%;
}

.menu-underline.active::after {
    width: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style> 