<template>
    <div class="min-h-screen bg-gray-50">
        <BarAdmin />

        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">จัดการพนักงาน</h1>
                <p class="text-gray-600">จัดการข้อมูลพนักงานในร้านของคุณ</p>
            </div>

            <!-- Search and Add Button -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <!-- Search -->
                <div class="relative w-full sm:w-96">
                    <input v-model="searchQuery" @input="searchEmployees" type="text"
                        placeholder="ค้นหาด้วยชื่อ, นามสกุล, หรือรหัสพนักงาน..."
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <!-- Add Employee Button -->
                <button @click="openAddModal"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    เพิ่มพนักงาน
                </button>
            </div>

            <!-- Employee Table -->
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
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
                                        <button @click="toggleStatus(employee)" :class="[
                                            employee.status === 'active'
                                                ? 'text-orange-600 hover:text-orange-900'
                                                : 'text-green-600 hover:text-green-900'
                                        ]">
                                            {{ employee.status === 'active' ? 'ปิดใช้งาน' : 'เปิดใช้งาน' }}
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
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        {{ isEditing ? 'แก้ไขพนักงาน' : 'เพิ่มพนักงานใหม่' }}
                    </h3>

                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
                                <input v-model="form.firstname" type="text" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
                                <input v-model="form.lastname" type="text" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">ตำแหน่ง</label>
                            <input v-model="form.position" type="text" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                                    <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                <input v-model="form.phone" type="tel" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
                <input v-model="form.password" type="password" :required="!isEditing"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    :placeholder="isEditing ? 'เว้นว่างถ้าไม่ต้องการเปลี่ยนรหัสผ่าน' : 'กรอกรหัสผ่าน'" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                <input v-model="form.email" type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">ที่อยู่</label>
                            <textarea v-model="form.address" rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>

                        <!-- <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">แผนก</label>
                            <input v-model="form.department" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">เงินเดือน</label>
                            <input v-model="form.salary" type="number"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div> -->

                        <!-- Emergency Contact -->
                        <!-- <div class="border-t pt-4">
                            <h4 class="text-sm font-medium text-gray-700 mb-3">ข้อมูลติดต่อฉุกเฉิน</h4>
                            <div class="space-y-3">
                                <input v-model="form.emergencyContact.name" type="text"
                                    placeholder="ชื่อผู้ติดต่อฉุกเฉิน"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input v-model="form.emergencyContact.phone" type="tel" placeholder="เบอร์โทรฉุกเฉิน"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input v-model="form.emergencyContact.relationship" type="text"
                                    placeholder="ความสัมพันธ์"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div> -->

                        <div class="flex justify-end gap-3 pt-4">
                            <button type="button" @click="closeModal"
                                class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                                ยกเลิก
                            </button>
                            <button type="submit" :disabled="isSubmitting"
                                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                                {{ isSubmitting ? 'กำลังบันทึก...' : (isEditing ? 'อัปเดต' : 'เพิ่มพนักงาน') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- View Employee Modal -->
        <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">ข้อมูลพนักงาน</h3>

                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">รหัสพนักงาน</label>
                                <p class="text-sm text-gray-900">{{ selectedEmployee.employeeId }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">สถานะ</label>
                                <span :class="[
                                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                                    selectedEmployee.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                ]">
                                    {{ selectedEmployee.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน' }}
                                </span>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">ชื่อ</label>
                                <p class="text-sm text-gray-900">{{ selectedEmployee.firstname }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">นามสกุล</label>
                                <p class="text-sm text-gray-900">{{ selectedEmployee.lastname }}</p>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">ตำแหน่ง</label>
                            <p class="text-sm text-gray-900">{{ selectedEmployee.position }}</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
                            <p class="text-sm text-gray-900">{{ selectedEmployee.phone }}</p>
                        </div>

                        <div v-if="selectedEmployee.email">
                            <label class="block text-sm font-medium text-gray-700">อีเมล</label>
                            <p class="text-sm text-gray-900">{{ selectedEmployee.email }}</p>
                        </div>

                        <div v-if="selectedEmployee.address">
                            <label class="block text-sm font-medium text-gray-700">ที่อยู่</label>
                            <p class="text-sm text-gray-900">{{ selectedEmployee.address }}</p>
                        </div>

                        <!-- <div v-if="selectedEmployee.department">
              <label class="block text-sm font-medium text-gray-700">แผนก</label>
              <p class="text-sm text-gray-900">{{ selectedEmployee.department }}</p>
            </div>

            <div v-if="selectedEmployee.salary">
              <label class="block text-sm font-medium text-gray-700">เงินเดือน</label>
              <p class="text-sm text-gray-900">{{ selectedEmployee.salary.toLocaleString() }} บาท</p>
            </div> -->

                        <div v-if="selectedEmployee.hireDate">
                            <label class="block text-sm font-medium text-gray-700">วันที่เริ่มงาน</label>
                            <p class="text-sm text-gray-900">{{ new
                                Date(selectedEmployee.hireDate).toLocaleDateString('th-TH') }}</p>
                        </div>

                        <!-- <div v-if="selectedEmployee.emergencyContact?.name" class="border-t pt-4">
              <h4 class="text-sm font-medium text-gray-700 mb-3">ข้อมูลติดต่อฉุกเฉิน</h4>
              <div class="space-y-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700">ชื่อ</label>
                  <p class="text-sm text-gray-900">{{ selectedEmployee.emergencyContact.name }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">เบอร์โทร</label>
                  <p class="text-sm text-gray-900">{{ selectedEmployee.emergencyContact.phone }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">ความสัมพันธ์</label>
                  <p class="text-sm text-gray-900">{{ selectedEmployee.emergencyContact.relationship }}</p>
                </div>
              </div>
            </div> -->
                    </div>

                    <div class="flex justify-end pt-4">
                        <button @click="closeViewModal"
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                            ปิด
                        </button>
                    </div>
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
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/employees`, formData);
    }

    await loadEmployees();
    closeModal();
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// Toggle employee status
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
    if (confirm(`คุณต้องการลบพนักงาน ${employee.firstname} ${employee.lastname} หรือไม่?`)) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/employees/${employee._id}`);
            await loadEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
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
