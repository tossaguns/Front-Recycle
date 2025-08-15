<template>
    <header
        class="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-[#e6e6e6] flex flex-col items-center">
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

        <!-- เมนู Mobile -->
        <transition name="fade">
            <nav v-if="showMobileMenu"
                class="w-full bg-white px-6 py-4 sm:hidden shadow-md z-50 absolute top-full left-0">
                <ul class="flex flex-col gap-4 text-base text-[#184c36] font-medium">
                    <li :class="['menu-underline', $route.path === '/' || $route.path === '/homepartner' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="goToHome">หน้าหลัก</li>
                    <li :class="['menu-underline', $route.path === '/buybackprice' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="$router.push('/buybackprice')">ราคารับซื้อ – ขาย</li>
                    <li :class="['menu-underline', $route.path === '/category' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="$router.push('/category')">หมวดหมู่สินค้า</li>
                    <li :class="['menu-underline', $route.path === '/partnerstores' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="$router.push('/partnerstores')">ร้านค้า</li>
                    <li v-if="authStore.isAuthenticated" class="relative group cursor-pointer">
                        <!-- ปุ่มหลัก -->
                        <div :class="[
                            'menu-underline',
                            ($route.path === '/pos/buyorder' || $route.path === '/pos/sellorder' || $route.path === '/pos/storeproduct')
                                ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]'
                                : ''
                        ]">
                            Pos
                        </div>

                        <!-- เมนูย่อย (โผล่มาเมื่อ hover หรือคลิก) -->
                        <ul
                            class="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                            <li @click="$router.push('/pos/buyorder')"
                                class="px-4 py-2 hover:bg-[#e6f7e6] cursor-pointer">
                                รับซื้อสินค้า
                            </li>
                            <li @click="$router.push('/pos/sellorder')"
                                class="px-4 py-2 hover:bg-[#e6f7e6] cursor-pointer">
                                ขายสินค้า
                            </li>
                            <li @click="$router.push('/pos/storeproduct')"
                                class="px-4 py-2 hover:bg-[#e6f7e6] cursor-pointer">
                                จัดการสินค้าในสต็อก
                            </li>
                        </ul>
                    </li>
                    <li v-if="authStore.isAuthenticated"
                        :class="['menu-underline', $route.path === '/profilemember' || $route.path === '/profilepartner' ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : '', 'cursor-pointer']"
                        @click="goToAccountSettings">การตั้งค่าบัญชี</li>
                    <li v-if="authStore.isAuthenticated"
                        class="menu-underline cursor-pointer text-red-600 hover:text-red-800" @click="handleLogout">
                        ออกจากระบบ</li>
                </ul>
            </nav>
        </transition>

        <!-- เส้นแบ่ง -->
        <div class="w-full h-[1px] bg-[#e6e6e6] hidden sm:block"></div>

        <!-- เมนู (Desktop) -->
        <nav class="w-full pl-0 sm:pl-20 py-3 justify-center sm:justify-start hidden sm:flex bg-[#2BAC75]">
            <ul class="flex gap-6 text-sm text-[#ffff] font-medium">
                <li :class="['menu-underline', $route.path === '/' || $route.path === '/homepartner' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="goToHome">หน้าหลัก</li>
                <li :class="['menu-underline', $route.path === '/buybackprice' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="$router.push('/buybackprice')">ราคารับซื้อ – ขาย</li>
                <li :class="['menu-underline', $route.path === '/category' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="$router.push('/category')">หมวดหมู่สินค้า</li>
                <li :class="['menu-underline', $route.path === '/partnerstores' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="$router.push('/partnerstores')">ร้านค้า</li>
                <li v-if="authStore.isAuthenticated" class="relative group">
                    <span class="menu-underline cursor-pointer block"
                        :class="$route.path.startsWith('/pos') ? 'active font-semibold border-b-2 border-[#b6e388] pb-[2px]' : ''">
                        POS
                    </span>

                    <!-- เมนูย่อย -->
                    <ul
                        class="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                        <li>
                            <router-link to="/pos/buyorder" class="block px-4 py-2 text-[#184c36] hover:bg-slate-100">
                                รับซื้อสินค้า
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/pos/sellorder" class="block px-4 py-2 text-[#184c36] hover:bg-slate-100">
                                ขายสินค้า
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/pos/storeproduct"
                                class="block px-4 py-2 text-[#184c36] hover:bg-slate-100">
                                จัดการสินค้าในสต็อก
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li v-if="authStore.isAuthenticated"
                    :class="['menu-underline', $route.path === '/profilemember' || $route.path === '/profilepartner' ? 'active text-[#184c36] font-semibold border-b-2 border-[#b6e388] pb-[2px]' : 'hover:text-[#184c36]', 'cursor-pointer']"
                    @click="goToAccountSettings">การตั้งค่าบัญชี</li>
                <li v-if="authStore.isAuthenticated"
                    class="menu-underline cursor-pointer text-red-600 hover:text-red-800" @click="handleLogout">
                    ออกจากระบบ</li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LogoIcon, SearchIcon, CalendarIcon, HamburgerIcon } from '../icons';

const authStore = useAuthStore();
const showMobileMenu = ref(false);
const router = useRouter();

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

function goToPartnerStores() {
    router.push('/partnerstores');
}

// ฟังก์ชัน decode JWT token
function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
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
    } else if (userRole === 'member' || authStore.isAuthenticated) {
        // ถ้าเป็น member หรือ login แล้ว ให้ไปหน้า Home
        router.push('/');
    } else {
        // ถ้าไม่ได้ login ให้ไปหน้า Home (landing page)
        router.push('/');
    }
}

function goToAccountSettings() {
    // ตรวจสอบ role ของผู้ใช้จาก JWT token
    const userRole = getUserRole();

    if (userRole === 'partner') {
        // ถ้าเป็น partner ให้ไปหน้า ProfilePartner
        router.push('/profilepartner');
    } else if (userRole === 'member') {
        // ถ้าเป็น member ให้ไปหน้า ProfileMember
        router.push('/profilemember');
    }
}

function goToPos() {
    const userRole = getUserRole();
    // ตรวจสอบ role ของผู้ใช้จาก authStore
    if (userRole === 'partner' || userRole === 'employee') {
        // ถ้าเป็น partner หรือ employee ให้ไปหน้า Pos
        router.push('/pos/buyorder');
    } else {
        // ถ้าไม่ใช่ role ที่กำหนด ให้แสดงข้อความแจ้งเตือน
        Swal.fire({
            icon: 'warning',
            title: 'ไม่สามารถเข้าถึงได้',
            text: 'คุณไม่มีสิทธิ์เข้าถึงหน้าดังกล่าว'
        });
    }
}

// --- ระบบค้นหา ---
const search = ref("");
const categories = ref([]);
const subcategories = ref([]);
const products = ref([]);
const stores = ref([]);

onMounted(async () => {
    // ดึงชื่อหมวดหมู่หลัก
    try {
        const resCat = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        categories.value = Array.isArray(resCat.data) ? resCat.data.map(c => c.name) : [];
    } catch { }
    // ดึงชื่อหมวดหมู่ย่อย
    try {
        const resSub = await axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/all`);
        subcategories.value = Array.isArray(resSub.data) ? resSub.data.map(s => s.name) : [];
    } catch { }
    // ดึงชื่อสินค้า
    try {
        const resProd = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        products.value = Array.isArray(resProd.data) ? resProd.data.map(p => p.name) : [];
    } catch { }
    // ดึงชื่อร้านค้า
    try {
        const resStore = await axios.get(`${import.meta.env.VITE_API_URL}/partners`);
        const partnerList = resStore.data.data;
        stores.value = Array.isArray(partnerList) ? partnerList.map(p => p.companyName) : [];
    } catch { }
});

async function onSearch(e) {
    if (e) e.preventDefault();
    const keyword = search.value.trim();
    if (!keyword) return;
    // ค้นหาในหมวดหมู่หลัก
    if (categories.value.includes(keyword)) {
        router.push({ path: '/category', query: { highlight: keyword } });
        return;
    }
    // ค้นหาในหมวดหมู่ย่อย
    if (subcategories.value.includes(keyword)) {
        router.push({ path: '/subcategory', query: { highlight: keyword } });
        return;
    }
    // ค้นหาในสินค้า
    if (products.value.includes(keyword)) {
        router.push({ path: '/productcategory', query: { highlight: keyword } });
        return;
    }
    // ค้นหาในร้านค้า
    if (stores.value.includes(keyword)) {
        router.push({ path: '/partnerstores', query: { highlight: keyword } });
        return;
    }
    // ค้นหาราคารับซื้อ-ขาย
    if (["ราคา", "ราคารับซื้อ", "ราคารับซื้อ-ขาย", "buyback", "price"].some(k => keyword.includes(k))) {
        router.push({ path: '/buybackprice' });
        return;
    }
    // ไม่พบอะไรเลย
    await Swal.fire({
        icon: 'warning',
        title: 'ไม่พบข้อมูลที่ค้นหา',
        confirmButtonText: 'ตกลง'
    });
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
