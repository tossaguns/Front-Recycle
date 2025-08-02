<template>
    <header class="w-full border-b border-[#e6e6e6] flex flex-col items-center relative z-20">
        <div class="w-full flex items-center justify-between px-6 py-3 gap-4">
            <!-- Logo -->
            <div class="flex items-center cursor-pointer" @click="goToHome">
                <div class="rounded-xl flex items-center justify-center">
                    <LogoIcon class="w-32 h-8 sm:w-36 sm:h-9 md:w-40 md:h-10" />
                </div>
            </div>

            <!-- Search Bar & จองคิว (Desktop) -->
            <div class="flex space-x-4 items-center hidden sm:flex">
                <form class="flex items-center" @submit.prevent="onSearch">
                    <div class="relative w-full">
                        <!-- ไอคอนแว่นขยายแบบ SVG -->
                        <SearchIcon
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

                        <!-- ช่องค้นหา -->
                        <input v-model="search" type="text" placeholder="พิมพ์ชื่อที่ต้องการค้นหา..."
                            class="w-full rounded-full border border-[#dcdcdc] bg-white px-4 py-[10px] pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388]" />
                    </div>

                    <button type="submit"
                        class="ml-2 bg-[#d6f5a6] hover:bg-[#b6e388] text-[#1a3d1a] text-sm font-medium rounded-full px-6 py-2 transition">
                        ค้นหา
                    </button>
                </form>

                <!-- จองคิว Button -->
                <button
                    class="ml-2 bg-[#184c36] hover:bg-[#0e2d1e] text-white text-sm font-medium rounded-full px-6 py-2 flex items-center gap-2 transition"
                    @click="goToPartnerStores">
                    จองคิว
                    <CalendarIcon class="w-5 h-5" />
                </button>
            </div>

            <!-- ปุ่มจองคิว + Hamburger (Mobile) -->
            <div class="flex items-center space-x-2 sm:hidden">
                <button
                    class="bg-[#184c36] hover:bg-[#0e2d1e] text-white text-sm font-medium rounded-full px-6 py-2 flex items-center gap-2 transition"
                    @click="goToPartnerStores">
                    จองคิว
                    <CalendarIcon class="w-5 h-5" />
                </button>
                <button class="p-2 rounded hover:bg-gray-100 focus:outline-none"
                    @click="showMobileMenu = !showMobileMenu">
                    <HamburgerIcon class="w-7 h-7 text-[#184c36]" />
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { LogoIcon, SearchIcon, CalendarIcon, HamburgerIcon } from '../icons';

const router = useRouter();
const showMobileMenu = ref(false);
const search = ref("");

// ฟังก์ชัน decode JWT token
function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}

// ฟังก์ชันตรวจสอบ role จาก JWT token
function getUserRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const decoded = decodeJWT(token);
    if (!decoded) return null;
    
    // ตรวจสอบ role จาก token (ปรับตามโครงสร้าง token ของคุณ)
    return decoded.role || decoded.userRole || null;
}

function goToHome() {
    // ตรวจสอบ role ของผู้ใช้จาก JWT token
    const userRole = getUserRole();
    
    if (userRole === 'partner') {
        // ถ้าเป็น partner ให้ไปหน้า HomePartner
        router.push('/homepartner');
    } else if (userRole === 'member') {
        // ถ้าเป็น member ให้ไปหน้า Home
        router.push('/');
    } else {
        // ถ้าไม่ได้ login ให้ไปหน้า Home (landing page)
        router.push('/');
    }
}

function goToPartnerStores() {
    router.push('/partnerstores');
}

function onSearch(e) {
    if (e) e.preventDefault();
    // ยังไม่มีการค้นหา
    console.log('Search functionality not implemented yet');
}
</script>

<style scoped>
/* Custom styles if needed */
</style> 