<template>
    <BarAdmin />
    <div class="min-h-screen bg-gradient-to-br from-[#e6f7e6] via-white to-[#b6e388] pb-8">
        <div class="container mx-auto px-4 py-8 max-w-7xl">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#184c36] to-[#b6e388] bg-clip-text text-transparent mb-2">จัดการพนักงาน</h1>
                <p class="text-[#184c36] text-sm sm:text-base max-w-2xl">จัดการข้อมูลพนักงานในร้านของคุณ</p>
            </div>

            <!-- Search and Add Button -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <!-- Search -->
                <div class="relative w-full sm:w-96">
                    <input v-model="searchQuery" @input="searchEmployees" type="text"
                        placeholder="ค้นหาด้วยชื่อ, นามสกุล, หรือรหัสพนักงาน..."
                        class="w-full pl-10 pr-4 py-2 border-2 border-[#e6f7e6] rounded-lg focus:ring-2 focus:ring-[#b6e388] focus:border-[#b6e388] bg-white text-[#184c36]" />
                    <svg class="absolute left-3 top-2.5 h-5 w-5 text-[#b6e388]" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <!-- Add Employee Button -->
                <button @click="openAddModal"
                    class="bg-gradient-to-r from-[#184c36] to-[#b6e388] hover:from-[#b6e388] hover:to-[#184c36] text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow font-semibold transition-all duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    เพิ่มพนักงาน
                </button>
            </div>

            <!-- Employee Table -->
            <div class="bg-white rounded-2xl shadow-xl border-l-4 border-[#b6e388] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-[#e6f7e6]">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    รหัสพนักงาน</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ชื่อ-นามสกุล</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ตำแหน่ง</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    เบอร์โทร</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    สถานะ</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    จัดการ</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="employee in employees" :key="employee._id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ employee.employeeId }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ employee.firstname }} {{ employee.lastname }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ employee.position }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ employee.phone }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="[
                                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                                        employee.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    ]">
                                        {{ employee.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div class="flex items-center gap-2">
                                        <button @click="viewEmployee(employee)"
                                            class="text-blue-600 hover:text-blue-900">
                                            ข้อมูล
                                        </button>
                                        <button @click="editEmployee(employee)"
                                            class="text-green-600 hover:text-green-900">
                                            แก้ไข
                                        </button>
                                        <button @click="deleteEmployee(employee)"
                                            class="text-red-600 hover:text-red-900">
                                            ลบ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Empty State -->
                <div v-if="employees.length === 0" class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">ไม่มีพนักงาน</h3>
                    <p class="mt-1 text-sm text-gray-500">เริ่มต้นด้วยการเพิ่มพนักงานคนแรก</p>
                </div>
            </div>
        </div>

        <!-- Add/Edit Employee Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl shadow-xl border-l-4 border-[#b6e388] w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto p-4 sm:p-8 overflow-hidden max-h-screen sm:max-h-[90vh] overflow-y-auto">
                <div class="pt-2 sm:pt-6 pb-4 border-b border-[#e6f7e6] px-2 sm:px-0">
                    <h3 class="text-2xl font-bold bg-gradient-to-r from-[#184c36] to-[#b6e388] bg-clip-text text-transparent mb-2">
                        {{ isEditing ? 'แก้ไขพนักงาน' : 'เพิ่มพนักงานใหม่' }}
                    </h3>
                    <p class="text-[#184c36] text-sm">กรอกข้อมูลพนักงานให้ครบถ้วน</p>
                </div>
                <form @submit.prevent="submitForm" class="py-4 sm:py-6 space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-[#184c36] mb-1">ชื่อ</label>
                            <input v-model="form.firstname" type="text" required
                                class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg focus:outline-none focus:border-[#184c36] focus:ring-2 focus:ring-[#b6e388]/20 text-sm transition-all duration-200" />
                        </div>
                        <div>
                            <label class="block text-xs sm:text-sm font-medium text-[#184c36] mb-1">นามสกุล</label>
                            <input v-model="form.lastname" type="text" required
                                class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg focus:outline-none focus:border-[#184c36] focus:ring-2 focus:ring-[#b6e388]/20 text-sm transition-all duration-200" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-[#184c36] mb-1">ตำแหน่ง</label>
                        <input v-model="form.position" type="text" required
                            class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg focus:outline-none focus:border-[#184c36] focus:ring-2 focus:ring-[#b6e388]/20 text-sm transition-all duration-200" />
                    </div>
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-[#184c36] mb-1">เบอร์โทรศัพท์</label>
                        <input v-model="form.phone" type="tel" required
                            class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg focus:outline-none focus:border-[#184c36] focus:ring-2 focus:ring-[#b6e388]/20 text-sm transition-all duration-200" />
                    </div>
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-[#184c36] mb-1">รหัสผ่าน</label>
                        <input v-model="form.password" type="password" :required="!isEditing"
                            class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg focus:outline-none focus:border-[#184c36] focus:ring-2 focus:ring-[#b6e388]/20 text-sm transition-all duration-200"
                            :placeholder="isEditing ? 'เว้นว่างถ้าไม่ต้องการเปลี่ยนรหัสผ่าน' : 'กรอกรหัสผ่าน'" />
                    </div>
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-[#184c36] mb-1">อีเมล</label>
                        <input v-model="form.email" type="email"
                            class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg focus:outline-none focus:border-[#184c36] focus:ring-2 focus:ring-[#b6e388]/20 text-sm transition-all duration-200" />
                    </div>
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-[#184c36] mb-1">ที่อยู่</label>
                        <textarea v-model="form.address" rows="3"
                            class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg focus:outline-none focus:border-[#184c36] focus:ring-2 focus:ring-[#b6e388]/20 text-sm transition-all duration-200"></textarea>
                    </div>
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-[#184c36] mb-1">สถานะ</label>
                        <div class="flex items-center gap-4">
                            <label class="flex items-center">
                                <input type="radio" v-model="form.status" value="active" class="mr-2">
                                <span class="text-xs sm:text-sm">ใช้งาน</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" v-model="form.status" value="inactive" class="mr-2">
                                <span class="text-xs sm:text-sm">ไม่ใช้งาน</span>
                            </label>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
                        <button type="button" @click="closeModal"
                            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold shadow w-full sm:w-auto">
                            ยกเลิก
                        </button>
                        <button type="submit" :disabled="isSubmitting"
                            class="px-4 py-2 bg-gradient-to-r from-[#184c36] to-[#b6e388] text-white rounded-lg font-semibold shadow hover:from-[#b6e388] hover:to-[#184c36] disabled:opacity-50 w-full sm:w-auto">
                            {{ isSubmitting ? 'กำลังบันทึก...' : (isEditing ? 'อัปเดต' : 'เพิ่มพนักงาน') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- View Employee Modal -->
        <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto overflow-hidden p-0">
                <!-- Header -->
                <div class="flex flex-col items-center pt-8 pb-4 px-8 border-b border-[#e6f7e6]">
                    <div class="w-20 h-20 rounded-full bg-[#e6f7e6] flex items-center justify-center text-3xl font-bold text-[#184c36] mb-2">
                        {{ selectedEmployee.firstname ? selectedEmployee.firstname.charAt(0) : '?' }}
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-[#184c36]">{{ selectedEmployee.firstname }} {{ selectedEmployee.lastname }}</div>
                        <div class="text-base text-[#184c36] mt-1">{{ selectedEmployee.position }}</div>
                        <span class="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold"
                            :class="selectedEmployee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                            {{ selectedEmployee.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน' }}
                        </span>
                    </div>
                </div>
                <!-- Main Info -->
                <div class="px-8 py-6 space-y-4">
                    <div class="flex items-center gap-3 text-[#184c36] text-base">
                        <svg class="w-5 h-5 text-[#b6e388]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6" /></svg>
                        <span class="font-semibold">รหัสพนักงาน:</span>
                        <span class="text-gray-700">{{ selectedEmployee.employeeId }}</span>
                    </div>
                    <div class="flex items-center gap-3 text-[#184c36] text-base">
                        <svg class="w-5 h-5 text-[#b6e388]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span class="font-semibold">วันที่เริ่มงาน:</span>
                        <span class="text-gray-700">{{ selectedEmployee.hireDate ? new Date(selectedEmployee.hireDate).toLocaleDateString('th-TH') : '-' }}</span>
                    </div>
                    <div class="flex items-center gap-3 text-[#184c36] text-base" v-if="selectedEmployee.phone">
                        <svg class="w-5 h-5 text-[#b6e388]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        <span class="font-semibold">เบอร์โทร:</span>
                        <span class="text-gray-700">{{ selectedEmployee.phone }}</span>
                    </div>
                    <div class="flex items-center gap-3 text-[#184c36] text-base" v-if="selectedEmployee.email">
                        <svg class="w-5 h-5 text-[#b6e388]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm-8 0v1a4 4 0 008 0v-1" /></svg>
                        <span class="font-semibold">อีเมล:</span>
                        <span class="text-gray-700">{{ selectedEmployee.email }}</span>
                    </div>
                    <div class="flex items-center gap-3 text-[#184c36] text-base" v-if="selectedEmployee.address">
                        <svg class="w-5 h-5 text-[#b6e388]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span class="font-semibold">ที่อยู่:</span>
                        <span class="text-gray-700">{{ selectedEmployee.address }}</span>
                    </div>
                </div>
                <div class="flex justify-end px-8 pb-6">
                    <button @click="closeViewModal"
                        class="px-4 py-2 bg-gradient-to-r from-[#e6f7e6] to-[#b6e388] text-[#184c36] rounded-lg font-semibold shadow hover:bg-[#e6f7e6]">
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BarAdmin from '../../components/BarAdmin.vue';
import Swal from 'sweetalert2';

const router = useRouter();

// Reactive data
const employees = ref([]);
const searchQuery = ref('');
const showModal = ref(false);
const showViewModal = ref(false);
const isEditing = ref(false);
const isSubmitting = ref(false);
const selectedEmployee = ref({});

// Form data
const form = reactive({
    firstname: '',
    lastname: '',
    position: '',
    phone: '',
    password: '',
    email: '',
    address: '',
    status: 'active',
    // department: '',
    // salary: '',
    // emergencyContact: {
    //     name: '',
    //     phone: '',
    //     relationship: ''
    // }
});

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Load employees
const loadEmployees = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/employees`);
        employees.value = response.data.data;
    } catch (error) {
        console.error('Error loading employees:', error);
        if (error.response?.status === 401) {
            alert('กรุณาเข้าสู่ระบบใหม่');
            router.push('/login');
        }
    }
};

// Search employees
const searchEmployees = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/employees`, {
            params: { search: searchQuery.value }
        });
        employees.value = response.data.data;
    } catch (error) {
        console.error('Error searching employees:', error);
    }
};

// Open add modal
const openAddModal = () => {
    isEditing.value = false;
    resetForm();
    showModal.value = true;
};

// Edit employee
const editEmployee = (employee) => {
    isEditing.value = true;
    selectedEmployee.value = employee;

    // Fill form with employee data
    Object.assign(form, {
        firstname: employee.firstname,
        lastname: employee.lastname,
        position: employee.position,
        phone: employee.phone,
        password: '', // ไม่แสดง password เดิม
        email: employee.email || '',
        address: employee.address || '',
        status: employee.status || 'active',
        // department: employee.department || '',
        // salary: employee.salary || '',
        // emergencyContact: {
        //     name: employee.emergencyContact?.name || '',
        //     phone: employee.emergencyContact?.phone || '',
        //     relationship: employee.emergencyContact?.relationship || ''
        // }
    });

    showModal.value = true;
};

// View employee
const viewEmployee = (employee) => {
    selectedEmployee.value = employee;
    showViewModal.value = true;
};

// Submit form
const submitForm = async () => {
    isSubmitting.value = true;

    try {
        const formData = { ...form };

        // ถ้าเป็นการแก้ไขและไม่มี password ใหม่ ให้ลบ password ออกจาก formData
        if (isEditing.value && !formData.password) {
            delete formData.password;
        }

        if (isEditing.value) {
            await axios.put(`${import.meta.env.VITE_API_URL}/employees/${selectedEmployee.value._id}`, formData);
            await Swal.fire({
                icon: 'success',
                title: 'อัปเดตข้อมูลพนักงานสำเร็จ',
                showConfirmButton: false,
                timer: 1200
            });
        } else {
            await axios.post(`${import.meta.env.VITE_API_URL}/employees`, formData);
            await Swal.fire({
                icon: 'success',
                title: 'เพิ่มพนักงานสำเร็จ',
                showConfirmButton: false,
                timer: 1200
            });
        }

        await loadEmployees();
        closeModal();
    } catch (error) {
        console.error('Error submitting form:', error);
        await Swal.fire({
            icon: 'error',
            title: isEditing.value ? 'อัปเดตข้อมูลพนักงานไม่สำเร็จ' : 'เพิ่มพนักงานไม่สำเร็จ',
            text: error.response?.data?.error || error.message,
            confirmButtonText: 'ตกลง'
        });
    } finally {
        isSubmitting.value = false;
    }
};

// Toggle employee status (removed from table, now handled in edit form)
const toggleStatus = async (employee) => {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/employees/${employee._id}/status`);
        await loadEmployees();
    } catch (error) {
        console.error('Error toggling status:', error);
    }
};

// Delete employee
const deleteEmployee = async (employee) => {
    const result = await Swal.fire({
        title: `คุณต้องการลบพนักงาน <br> ${employee.firstname} ${employee.lastname} <br>หรือไม่?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: '#e53e3e',
        cancelButtonColor: '#b6e388'
    });
    if (result.isConfirmed) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/employees/${employee._id}`);
            await loadEmployees();
            await Swal.fire({
                icon: 'success',
                title: 'ลบพนักงานสำเร็จ',
                showConfirmButton: false,
                timer: 1200
            });
        } catch (error) {
            console.error('Error deleting employee:', error);
            await Swal.fire({
                icon: 'error',
                title: 'ลบพนักงานไม่สำเร็จ',
                text: error.response?.data?.error || error.message,
                confirmButtonText: 'ตกลง'
            });
        }
    }
};

// Close modal
const closeModal = () => {
    showModal.value = false;
    resetForm();
};

// Close view modal
const closeViewModal = () => {
    showViewModal.value = false;
    selectedEmployee.value = {};
};

// Reset form
const resetForm = () => {
    Object.assign(form, {
        firstname: '',
        lastname: '',
        position: '',
        phone: '',
        password: '',
        email: '',
        address: '',
        status: 'active',
        // department: '',
        // salary: '',
        // emergencyContact: {
        //     name: '',
        //     phone: '',
        //     relationship: ''
        // }
    });
};

// Load employees on mount
onMounted(() => {
    loadEmployees();
});
</script>