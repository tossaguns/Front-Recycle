<template>
    <header class="w-full border-b border-[#e6e6e6] flex flex-col items-center relative z-20">
        <div class="w-full flex items-center justify-between px-6 py-3 gap-4">
            <!-- Logo -->
            <div class="flex items-center cursor-pointer" @click="$router.push('/dashboardpartner')">
                <div class="rounded-xl w-12 h-10 flex items-center justify-center">
                    <img src="../assets/logorecycle.png" alt="logo" class="h-10" />
                </div>
                <span class="ml-2 text-lg font-bold text-[#184c36]">Employee Panel</span>
            </div>

            <!-- Search Bar (Desktop) -->
            <div class="flex space-x-4 items-center hidden sm:flex">
                <form class="flex items-center">
                    <div class="relative w-full">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input type="text" placeholder="ค้นหา..."
                            class="w-full rounded-full border border-[#dcdcdc] bg-white px-4 py-[10px] pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388]" />
                    </div>
                    <button type="submit"
                        class="ml-2 bg-[#d6f5a6] hover:bg-[#b6e388] text-[#1a3d1a] text-sm font-medium rounded-full px-6 py-2 transition">
                        ค้นหา
                    </button>
                </form>
            </div>

            <!-- Hamburger (Mobile) -->
            <div class="flex items-center space-x-2 sm:hidden">
                <button class="p-2 rounded hover:bg-gray-100 focus:outline-none"
                    @click="showMobileMenu = !showMobileMenu">
                    <svg class="w-7 h-7 text-[#184c36]" fill="none" stroke="currentColor" stroke-width="2"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- เมนู Mobile -->
        <transition name="fade">
            <nav v-if="showMobileMenu"
                class="w-full bg-white px-6 py-4 sm:hidden shadow-md z-50 absolute top-full left-0">
                <ul class="flex flex-col gap-4 text-base text-[#184c36] font-medium">
                    <li :class="['menu-underline', $route.path === '/employee/sales' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/employee/sales')">ขายสินค้า</li>
                    <li :class="['menu-underline', $route.path === '/employee/members' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/employee/members')">สมาชิก</li>
                    <li :class="['menu-underline', $route.path === '/addproduct' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/addproduct')">จัดการสินค้า</li>
                    <li v-if="authStore.isAuthenticated" class="menu-underline cursor-pointer text-red-600 hover:text-red-800" @click="handleLogout">ออกจากระบบ</li>
                    <li v-else class="menu-underline cursor-pointer text-[#184c36] hover:text-[#b6e388]" @click="router.push('/login')">เข้าสู่ระบบ</li>
                </ul>
            </nav>
        </transition>

        <!-- เส้นแบ่ง -->
        <div class="w-full h-[1px] bg-[#e6e6e6] hidden sm:block"></div>

        <!-- เมนู (Desktop) -->
        <nav class="w-full pl-0 sm:pl-20 py-3 justify-center sm:justify-start hidden sm:flex">
            <ul class="flex gap-2 md:gap-6 text-xs lg:text-sm text-[#222] font-medium">
                <li :class="['menu-underline', $route.path === '/employee/sales' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/employee/sales')">ขายสินค้า</li>
                <li :class="['menu-underline', $route.path === '/employee/members' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/employee/members')">สมาชิก</li>
                <li :class="['menu-underline', $route.path === '/addproduct' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/addproduct')">จัดการสินค้า</li>
                <li v-if="authStore.isAuthenticated" class="menu-underline cursor-pointer text-red-600 hover:text-red-800" @click="handleLogout">ออกจากระบบ</li>
                <li v-else class="menu-underline cursor-pointer text-[#184c36] hover:text-[#b6e388]" @click="router.push('/login')">เข้าสู่ระบบ</li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const showMobileMenu = ref(false);

function navigateTo(path) {
    router.push(path);
    showMobileMenu.value = false; // ปิด mobile menu เมื่อเลือกเมนู
}

function handleLogout() {
    authStore.logout();
    router.push('/login');
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.menu-underline {
    position: relative;
    cursor: pointer;
}

.menu-underline::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #b6e388;
    border-radius: 2px;
    transform: scaleX(0);
    transition: transform 0.25s cubic-bezier(.4, 0, .2, 1);
}

.menu-underline.active::after {
    transform: scaleX(1);
}

.menu-underline:hover::after {
    transform: scaleX(1);
}
</style> 