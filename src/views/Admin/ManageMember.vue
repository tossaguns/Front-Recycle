<template>
    <div class="min-h-screen bg-gradient-to-br from-[#e6f7e6] via-white to-[#b6e388]">
        <BarAdmin />
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-[#184c36] mb-2">จัดการสมาชิก</h1>
                <p class="text-[#666] text-lg">ดูและจัดการข้อมูลสมาชิกทั้งหมด</p>
            </div>
            <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gradient-to-r from-[#2BAC75] to-[#184c36] text-white">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs lg:text-sm font-semibold">ชื่อ</th>
                                <th class="px-6 py-4 text-left text-xs lg:text-sm font-semibold">อีเมล</th>
                                <th class="px-6 py-4 text-left text-xs lg:text-sm font-semibold hidden md:table-cell">
                                    เบอร์โทร</th>
                                <th class="px-6 py-4 text-left text-xs lg:text-sm font-semibold w-32 min-w-32 max-w-32"
                                    style="width:8rem;min-width:8rem;max-width:8rem;">สถานะ</th>
                                <th class="px-6 py-4 text-left text-xs lg:text-sm font-semibold hidden lg:table-cell">
                                    วันที่สมัคร</th>
                                <th class="px-6 py-4 text-center text-xs lg:text-sm font-semibold">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#f0f0f0]">
                            <tr v-for="member in members" :key="member._id" class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 text-xs lg:text-sm">
                                    <div>
                                        <p class="font-semibold text-[#184c36]">{{ member.fullName }}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-xs lg:text-sm">
                                    <p class="text-[#184c36]">{{ member.email }}</p>
                                </td>
                                <td class="px-6 py-4 text-xs lg:text-sm hidden md:table-cell">
                                    <p class="text-[#184c36]">{{ member.personalPhone }}</p>
                                </td>
                                <td class="px-6 py-4 text-xs lg:text-sm w-32 min-w-32 max-w-32"
                                    style="width:8rem;min-width:8rem;max-width:8rem;">
                                    <button @click="toggleStatus(member)" :class="[
                                        'w-full flex items-center justify-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-colors',
                                        member.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                            member.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                                                'bg-red-100 text-red-800 hover:bg-red-200'
                                    ]"
                                        :title="member.status === 'active' ? 'คลิกเพื่อปิดใช้งาน' : 'คลิกเพื่อเปิดใช้งาน'"
                                        style="outline: none; border: none;">
                                        <span v-if="member.status === 'active'">ใช้งาน</span>
                                        <span v-else-if="member.status === 'inactive'">ปิดใช้งาน</span>
                                        <span v-else>ปิดใช้งาน</span>
                                    </button>
                                </td>
                                <td class="px-6 py-4 hidden lg:table-cell text-xs lg:text-sm">
                                    <p class="text-xs lg:text-sm text-[#666]">{{ formatDate(member.createdAt) }}</p>
                                </td>
                                <td class="px-6 py-4 text-xs lg:text-sm">
                                    <button @click="viewMemberDetails(member)"
                                        :class="isSmallScreen ? 'p-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors flex items-center justify-center' : 'px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors'"
                                        aria-label="ดูรายละเอียด" title="ดูรายละเอียด">
                                        <template v-if="!isSmallScreen">
                                            ดูรายละเอียด
                                        </template>
                                        <template v-else>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </template>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="members.length === 0" class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">ไม่พบสมาชิก</h3>
                    <p class="mt-1 text-sm text-gray-500">ไม่มีสมาชิกที่ตรงกับเงื่อนไข</p>
                </div>
            </div>
            <!-- Member Details Modal -->
            <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-bold text-[#184c36] flex items-center gap-2">
                                <svg class="w-7 h-7 text-[#2BAC75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                รายละเอียดสมาชิก
                            </h3>
                            <button @click="showDetailsModal = false" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div v-if="selectedMember">
                            <!-- ข้อมูลส่วนตัว -->
                            <div class="mb-6">
                                <h4 class="font-semibold text-[#2BAC75] mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-[#2BAC75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    ข้อมูลส่วนตัว
                                </h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div><span class="font-bold text-[#184c36]">ชื่อ-นามสกุล:</span> {{ selectedMember.fullName }}</div>
                                    <div><span class="font-bold text-[#184c36]">อีเมล:</span> {{ selectedMember.email }}</div>
                                    <div><span class="font-bold text-[#184c36]">เบอร์โทร:</span> {{ selectedMember.personalPhone }}</div>
                                    <div><span class="font-bold text-[#184c36]">วันที่สมัคร:</span> {{ formatDate(selectedMember.createdAt) }}</div>
                                    <div class="md:col-span-2"><span class="font-bold text-[#184c36]">ที่อยู่หลัก:</span> {{ selectedMember.personalAddress }}</div>
                                </div>
                            </div>
                            <!-- ที่อยู่ทั้งหมด -->
                            <div>
                                <h4 class="font-semibold text-[#2BAC75] mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-[#2BAC75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    ที่อยู่ทั้งหมด
                                </h4>
                                <div v-if="memberAddresses.length === 0" class="text-gray-500 text-sm">ไม่มีข้อมูลที่อยู่</div>
                                <ul v-else class="space-y-3">
                                    <li v-for="address in memberAddresses" :key="address._id" class="border border-[#e6e6e6] rounded-lg p-3 bg-[#f9f9f9]">
                                        <div class="flex items-center gap-2 font-medium text-[#184c36]">
                                            <svg v-if="address.is_default" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {{ address.address_name }} <span v-if="address.is_default" class="text-xs text-green-600">(ที่อยู่หลัก)</span>
                                        </div>
                                        <div class="text-sm text-[#184c36]">{{ address.address }}</div>
                                        <div class="text-xs text-gray-500">{{ address.subdistrict }}, {{ address.district }}, {{ address.province }} {{ address.postal_code }}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BarAdmin from '../../components/BarAdmin.vue';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import Swal from 'sweetalert2';

const members = ref([]);
const isSmallScreen = ref(window.innerWidth <= 1193);
const authStore = useAuthStore();

const handleResize = () => {
    isSmallScreen.value = window.innerWidth <= 1193;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const thShortMonths = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const day = date.getDate();
    const month = thShortMonths[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
};

const showDetailsModal = ref(false);
const selectedMember = ref(null);
const memberAddresses = ref([]);

const viewMemberDetails = async (member) => {
    try {
        const token = authStore.token;
        if (!token) throw new Error('ไม่พบ Token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // ดึงข้อมูล profile ล่าสุด
        const profileRes = await axios.get(`${import.meta.env.VITE_API_URL}/members/profile/${member._id}`);
        selectedMember.value = profileRes.data;
        // ดึงที่อยู่ทั้งหมด
        const addressRes = await axios.get(`${import.meta.env.VITE_API_URL}/member-addresses/${member._id}`);
        memberAddresses.value = Array.isArray(addressRes.data.addresses) ? addressRes.data.addresses : [];
        showDetailsModal.value = true;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถโหลดรายละเอียดสมาชิกได้',
            confirmButtonText: 'ตกลง'
        });
    }
};

const toggleStatus = async (member) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    const confirmText = newStatus === 'active' ? 'คุณต้องการเปิดใช้งานสมาชิกนี้หรือไม่?' : 'คุณต้องการปิดใช้งานสมาชิกนี้หรือไม่?';
    const confirmButtonText = newStatus === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน';
    const result = await Swal.fire({
        title: 'ยืนยันการเปลี่ยนสถานะ',
        text: confirmText,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'ยกเลิก'
    });
    if (!result.isConfirmed) return;
    try {
        const token = authStore.token;
        if (!token) throw new Error('ไม่พบ Token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/members/${member._id}/status`, { id: member._id, status: newStatus });
        if (response.data && (response.data.success || response.data.status === newStatus)) {
            member.status = newStatus;
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ',
                text: `เปลี่ยนสถานะเป็น${newStatus === 'active' ? 'ใช้งาน' : 'ปิดใช้งาน'}เรียบร้อยแล้ว`,
                timer: 1200,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถเปลี่ยนสถานะได้',
                confirmButtonText: 'ตกลง'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถเปลี่ยนสถานะได้',
            confirmButtonText: 'ตกลง'
        });
    }
};

const loadMembers = async () => {
    try {
        const token = authStore.token;
        if (!token) throw new Error('ไม่พบ Token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/members/getall`);
        if (Array.isArray(response.data)) {
            members.value = response.data;
        } else if (Array.isArray(response.data.data)) {
            members.value = response.data.data;
        } else {
            members.value = [];
        }
    } catch (error) {
        members.value = [];
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถโหลดข้อมูลสมาชิกได้',
            confirmButtonText: 'ตกลง'
        });
    }
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
    loadMembers();
});
</script>
