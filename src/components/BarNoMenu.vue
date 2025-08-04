<template>
    <header class="w-full border-b border-[#e6e6e6] flex flex-col items-center relative z-20">
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
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import LogoIcon from '../icons/LogoIcon.vue';
import CalendarIcon from '../icons/CalendarIcon.vue';

const router = useRouter();
const authStore = useAuthStore();

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