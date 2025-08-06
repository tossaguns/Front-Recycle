<template>
    <header class="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-[#e6e6e6] flex flex-col items-center">
        <div class="w-full flex items-center justify-between px-6 py-3 gap-4">
            <!-- Logo -->
            <div class="flex items-center cursor-pointer" @click="$router.push('/admin/dashboard')">
                <div class="rounded-xl w-12 h-10 flex items-center justify-center">
                    <!-- <img src="../assets/logorecycle.png" alt="logo" class="h-10" /> -->
                    <RecycleIcon class="w-full h-full p-1 object-cover" />
                </div>
                <span class="ml-2 text-lg font-bold text-[#184c36]">Admin Panel</span>
            </div>

            <!-- Search Bar (Desktop) -->
            <div class="flex space-x-4 items-center hidden sm:flex">
                <form class="flex items-center">
                    <div class="relative w-full">
                        <!-- ไอคอนแว่นขยายแบบ SVG -->
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>

                        <!-- ช่องค้นหา -->
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
                    <li :class="['menu-underline', $route.path === '/admin/dashboard' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/admin/dashboard')">หน้าหลัก</li>
                    <li :class="['menu-underline', $route.path === '/admin/partners' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/admin/partners')">จัดการร้านค้า</li>
                    <li :class="['menu-underline', $route.path === '/admin/members' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/admin/members')">สมาชิกทั้งหมด</li>
                    <li :class="['menu-underline', $route.path === '/admin/orders' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/admin/orders')">การจองคิวทั้งหมด</li>
                    <li :class="['menu-underline', $route.path === '/admin/revenue' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/admin/revenue')">รายได้</li>
                    <li :class="['menu-underline', $route.path === '/admin/categories' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/admin/categories')">จัดการหมวดหมู่</li>
                    <li :class="['menu-underline', $route.path === '/admin/profile' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="navigateTo('/admin/profile')">การตั้งค่าบัญชี</li>
                    <li v-if="authStore.isAuthenticated"
                        class="menu-underline cursor-pointer text-red-600 hover:text-red-800" @click="handleLogout">
                        ออกจากระบบ</li>
                </ul>
            </nav>
        </transition>

        <!-- เส้นแบ่ง -->
        <div class="w-full h-[1px] bg-[#e6e6e6] hidden sm:block"></div>

        <!-- เมนู (Desktop) -->
        <nav class="w-full pl-0 sm:pl-20 py-3 bg-[#2BAC75] justify-center sm:justify-start hidden sm:flex">
            <ul class="flex gap-2 md:gap-6 text-xs lg:text-sm text-[#ffff] font-medium">
                <li :class="['menu-underline', $route.path === '/admin/dashboard' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/admin/dashboard')">หน้าหลัก</li>
                <li :class="['menu-underline', $route.path === '/admin/partners' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/admin/partners')">จัดการร้านค้า</li>
                <li :class="['menu-underline', $route.path === '/admin/members' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/admin/members')">สมาชิกทั้งหมด</li>
                <li :class="['menu-underline', $route.path === '/admin/orders' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/admin/orders')">การจองคิวทั้งหมด</li>
                <li :class="['menu-underline', $route.path === '/admin/revenue' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/admin/revenue')">รายได้</li>
                <li :class="['menu-underline', $route.path === '/admin/categories' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/admin/categories')">จัดการหมวดหมู่</li>
                <li :class="['menu-underline', $route.path === '/admin/profile' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="navigateTo('/admin/profile')">การตั้งค่าบัญชี</li>
                <li v-if="authStore.isAuthenticated"
                    class="menu-underline cursor-pointer text-red-600 hover:text-red-800" @click="handleLogout">
                    ออกจากระบบ</li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { RecycleIcon } from '../icons';
import Swal from 'sweetalert2';

const router = useRouter();
const authStore = useAuthStore();
const showMobileMenu = ref(false);

function navigateTo(path) {
    router.push(path);
    showMobileMenu.value = false; // ปิด mobile menu เมื่อเลือกเมนู
}

async function handleLogout() {
    const result = await Swal.fire({
        title: 'ยืนยันการออกจากระบบ',
        text: 'คุณต้องการออกจากระบบจริงหรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ออกจากระบบ',
        cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
        authStore.logout();
        // รอให้ authStore อัพเดทก่อน
        await new Promise(resolve => setTimeout(resolve, 100));
        // แสดง success message ก่อน แล้วค่อยรีเฟรช
        await Swal.fire({
            title: 'ออกจากระบบแล้ว!',
            text: 'คุณได้ออกจากระบบเรียบร้อยแล้ว',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
        // รีเฟรชหน้าเพื่อให้แสดง landing page
        window.location.reload();
    }
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

/* เพิ่ม animation ขยับ underline เมนู */
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
