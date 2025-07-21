<template>
  <BarAdmin />
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-5xl mx-auto">
      <!-- ปุ่มเพิ่มสมาชิกใหม่ -->
      <div class="flex justify-end mb-4">
        <button @click="toggleAddForm" class="bg-[#184c36] hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow font-semibold">
          {{ showAddForm ? 'ปิดฟอร์ม' : '+ เพิ่มสมาชิกใหม่' }}
        </button>
      </div>
      <!-- ฟอร์มเพิ่มสมาชิก (toggle) -->
      <div v-if="showAddForm" class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6 mb-8">
        <h2 class="text-xl font-bold text-[#184c36] mb-4 flex items-center gap-2">
          <span class="bg-green-100 text-[#184c36] rounded-full px-3 py-1 text-base font-semibold">เพิ่มสมาชิกใหม่</span>
        </h2>
        <form @submit.prevent="submitAddMember" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">ชื่อ-นามสกุล</label>
            <input v-model="addForm.fullName" required class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">Username</label>
            <input v-model="addForm.username" required minlength="6" class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
          </div>
          <div class="relative">
            <label class="block font-semibold mb-1 text-[#184c36]">Password</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="addForm.password" required minlength="8" class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition pr-10" />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-8 text-gray-500 focus:outline-none">
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">เบอร์โทร</label>
            <input v-model="addForm.personalPhone" required maxlength="10" pattern="[0-9]*" inputmode="numeric" class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">อีเมล</label>
            <input v-model="addForm.personalEmail" required type="email" class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">ระดับ</label>
            <select v-model="addForm.level" required class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
              <option value="">เลือก</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">ชื่อเฉพาะร้าน (optional)</label>
            <input v-model="addForm.display_name" class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
          </div>
          <div class="md:col-span-2">
            <label class="block font-semibold mb-1 text-[#184c36]">ที่อยู่</label>
            <input v-model="addForm.personalAddress" required class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
          </div>
          <!-- จังหวัด/อำเภอ/ตำบล/รหัสไปรษณีย์ -->
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">จังหวัด</label>
            <select v-model="addForm.personalProvinceId" required @change="loadDistricts" class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
              <option value="">เลือกจังหวัด</option>
              <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name_th }}</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">อำเภอ</label>
            <select v-model="addForm.personalDistrictId" required :disabled="!addForm.personalProvinceId" @change="loadSubdistricts" class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
              <option value="">เลือกอำเภอ</option>
              <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name_th }}</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">ตำบล</label>
            <select v-model="addForm.personalSubdistrictId" required :disabled="!addForm.personalDistrictId" @change="loadPostalCode" class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
              <option value="">เลือกตำบล</option>
              <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">{{ subdistrict.name_th }}</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">รหัสไปรษณีย์</label>
            <input v-model="addForm.personalPostalCode" readonly class="border rounded-lg px-3 py-2 w-full bg-gray-100 text-gray-500" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#184c36]">สถานะ</label>
            <select v-model="addForm.status" required class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
              <option value="active">active</option>
              <option value="blocked">blocked</option>
            </select>
          </div>
          <div class="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" class="px-4 py-2 text-[#184c36] border border-[#e6e6e6] rounded-lg hover:bg-gray-100" @click="clearAddForm">ล้าง</button>
            <button type="submit" class="bg-[#184c36] hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow font-semibold">บันทึก</button>
          </div>
        </form>
      </div>
      <!-- Search & Table -->
      <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6">
        <div class="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
          <input v-model="search" @input="filterMembers" placeholder="ค้นหาชื่อ/เบอร์/ระดับ..."
            class="border border-[#e6e6e6] rounded px-3 py-2 w-full md:w-80 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full border text-sm rounded-xl overflow-hidden">
            <thead class="bg-green-100 text-[#184c36] border-b border-[#e6e6e6]">
              <tr>
                <th class="px-4 py-2">ชื่อ</th>
                <th class="px-4 py-2">เบอร์โทร</th>
                <th class="px-4 py-2">ระดับ</th>
                <th class="px-4 py-2">ชื่อเฉพาะร้าน</th>
                <th class="px-4 py-2">วันที่เข้าร้าน</th>
                <th class="px-4 py-2">สถานะ</th>
                <th class="px-4 py-2">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in filteredMembers" :key="m._id" class="hover:bg-green-50">
                <td class="px-4 py-2">{{ m.member_id?.fullName }}</td>
                <td class="px-4 py-2">{{ m.member_id?.phone }}</td>
                <td class="px-4 py-2">{{ m.member_id?.level }}</td>
                <td class="px-4 py-2">{{ m.display_name || '-' }}</td>
                <td class="px-4 py-2">{{ formatDate(m.joined_at) }}</td>
                <td class="px-4 py-2">
                  <span :class="m.status === 'active' ? 'text-green-700' : 'text-red-500'">
                    {{ m.status === 'active' ? 'ใช้งาน' : 'ยกเลิก' }}
                  </span>
                </td>
                <td class="px-4 py-2">
                  <div class="flex gap-2 justify-center">
                    <button @click="viewMember(m)" class="text-blue-600 hover:text-blue-900" title="ดูข้อมูล">🛈</button>
                    <button @click="editMember(m)" class="text-yellow-600 hover:text-yellow-700" title="แก้ไข">✏️</button>
                    <button @click="deleteMember(m)" class="text-red-600 hover:text-red-900" title="ลบ/ยกเลิก">🗑️</button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredMembers.length === 0">
                <td colspan="7" class="text-center text-gray-400 py-4">ไม่พบสมาชิก</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal: View/แก้ไข (คงเดิม) -->
    <div v-if="viewingMember" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md">
        <h3 class="font-bold mb-4 text-[#184c36] text-xl">ข้อมูลสมาชิก</h3>
        <div class="mb-2">ชื่อ: {{ viewingMember.member_id?.fullName }}</div>
        <div class="mb-2">เบอร์โทร: {{ viewingMember.member_id?.phone }}</div>
        <div class="mb-2">ระดับ: {{ viewingMember.member_id?.level }}</div>
        <div class="mb-2">ชื่อเฉพาะร้าน: {{ viewingMember.display_name || '-' }}</div>
        <div class="mb-2">วันที่เข้าร้าน: {{ formatDate(viewingMember.joined_at) }}</div>
        <div class="mb-2">สถานะ: {{ viewingMember.status }}</div>
        <button class="mt-4 px-6 py-2 bg-[#184c36] hover:bg-green-700 text-white rounded shadow" @click="closeViewModal">ปิด</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import BarAdmin from '../../components/BarAdmin.vue';
import Swal from 'sweetalert2';

const members = ref([]);
const filteredMembers = ref([]);
const search = ref('');
const showModal = ref(false);
const isEditing = ref(false);
const isSubmitting = ref(false);
const viewingMember = ref(null);
const form = reactive({
  fullName: '', username: '', password: '', phone: '', address: '', province: '', district: '', subDistrict: '', postalCode: '', level: '', display_name: '', status: 'active',
});
const partnerId = localStorage.getItem('partnerId') || '';

function formatDate(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('th-TH');
}

async function loadMembers() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/partner-members?partner_id=${partnerId}`);
  members.value = res.data;
  filteredMembers.value = res.data;
}

function filterMembers() {
  const q = search.value.trim().toLowerCase();
  filteredMembers.value = members.value.filter(m => {
    const mem = m.member_id || {};
    return (
      (mem.fullName && mem.fullName.toLowerCase().includes(q)) ||
      (mem.phone && mem.phone.includes(q)) ||
      (mem.level && mem.level.toLowerCase().includes(q)) ||
      (m.display_name && m.display_name.toLowerCase().includes(q))
    );
  });
}

function openAddModal() {
  isEditing.value = false;
  Object.assign(form, { fullName: '', username: '', password: '', phone: '', address: '', province: '', district: '', subDistrict: '', postalCode: '', level: '', display_name: '', status: 'active' });
  showModal.value = true;
}

function editMember(m) {
  isEditing.value = true;
  Object.assign(form, {
    fullName: m.member_id?.fullName || '',
    username: m.member_id?.username || '',
    password: '',
    phone: m.member_id?.phone || '',
    address: m.member_id?.address || '',
    province: m.member_id?.province || '',
    district: m.member_id?.district || '',
    subDistrict: m.member_id?.subDistrict || '',
    postalCode: m.member_id?.postalCode || '',
    level: m.member_id?.level || '',
    display_name: m.display_name || '',
    status: m.status || 'active',
  });
  form._id = m._id;
  showModal.value = true;
}

function viewMember(m) {
  viewingMember.value = m;
}
function closeViewModal() {
  viewingMember.value = null;
}
function closeModal() {
  showModal.value = false;
}

function clearForm() {
  Object.assign(form, { fullName: '', username: '', password: '', phone: '', address: '', province: '', district: '', subDistrict: '', postalCode: '', level: '', display_name: '', status: 'active' });
}

// async function submitForm() {
//   isSubmitting.value = true;
//   try {
//     if (isEditing.value) {
//       // update partner-member (display_name, status)
//       await axios.put(`${import.meta.env.VITE_API_URL}/partner-members/${form._id}`, {
//         display_name: form.display_name,
//         status: form.status,
//         level: form.level,
//       });
//       // update member info
//       await axios.put(`${import.meta.env.VITE_API_URL}/members/${form.username}`, {
//         fullName: form.fullName,
//         phone: form.phone,
//         address: form.address,
//         province: form.province,
//         district: form.district,
//         subDistrict: form.subDistrict,
//         postalCode: form.postalCode,
//         ...(form.password ? { password: form.password } : {})
//       });
//       await Swal.fire({ icon: 'success', title: 'บันทึกสำเร็จ', showConfirmButton: false, timer: 1200 });
//     } else {
//       // create member
//       const memberRes = await axios.post(`${import.meta.env.VITE_API_URL}/members`, {
//         fullName: form.fullName,
//         username: form.username,
//         password: form.password,
//         phone: form.phone,
//         address: form.address,
//         province: form.province,
//         district: form.district,
//         subDistrict: form.subDistrict,
//         postalCode: form.postalCode,
//         level: form.level,
//         status: form.status
//       });
//       // create partner-member
//       await axios.post(`${import.meta.env.VITE_API_URL}/partner-members`, {
//         partner_id: partnerId,
//         member_id: memberRes.data._id,
//         display_name: form.display_name,
//         status: form.status
//       });
//       await Swal.fire({ icon: 'success', title: 'เพิ่มสมาชิกสำเร็จ', showConfirmButton: false, timer: 1200 });
//     }
//     await loadMembers();
//     showModal.value = false;
//   } catch (err) {
//     await Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: err?.response?.data?.error || err.message });
//   } finally {
//     isSubmitting.value = false;
//   }
// }

async function deleteMember(m) {
  const result = await Swal.fire({
    title: 'ยืนยันการลบ/ยกเลิกสมาชิก?',
    text: 'คุณต้องการลบ/ยกเลิกสมาชิกนี้หรือไม่',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก'
  });
  if (result.isConfirmed) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/partner-members/${m._id}`);
    await loadMembers();
    Swal.fire('ลบสำเร็จ', 'ลบสมาชิกเรียบร้อยแล้ว', 'success');
  }
}

// จังหวัด/อำเภอ/ตำบล/รหัสไปรษณีย์
const provinces = ref([]);
const districts = ref([]);
const subdistricts = ref([]);

const showAddForm = ref(false);
const showPassword = ref(false);

const addForm = reactive({
  fullName: '',
  username: '',
  password: '',
  email: '',
  personalPhone: '',
  level: '',
  display_name: '',
  personalEmail: '',
  personalAddress: '',
  personalProvinceId: '',
  personalProvince: '',
  personalDistrictId: '',
  personalDistrict: '',
  personalSubdistrictId: '',
  personalSubdistrict: '',
  personalPostalCode: '',
  status: 'active',
});

function toggleAddForm() {
  showAddForm.value = !showAddForm.value;
}

function clearAddForm() {
  Object.assign(addForm, { fullName: '', username: '', password: '', personalPhone: '', personalEmail: '', level: '', display_name: '', personalAddress: '', personalProvinceId: '', personalProvince: '', personalDistrictId: '', personalDistrict: '', personalSubdistrictId: '', personalSubdistrict: '', personalPostalCode: '', status: 'active' });
}

async function fetchProvinces() {
  const res = await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json');
  provinces.value = res.data.sort((a, b) => a.name_th.localeCompare(b.name_th, 'th'));
}

function loadDistricts() {
  const province = provinces.value.find(p => p.id == addForm.personalProvinceId);
  if (province) {
    addForm.personalProvince = province.name_th;
    districts.value = province.amphure || [];
    addForm.personalDistrictId = '';
    addForm.personalDistrict = '';
    addForm.personalSubdistrictId = '';
    addForm.personalSubdistrict = '';
    addForm.personalPostalCode = '';
    subdistricts.value = [];
  }
}

function loadSubdistricts() {
  const district = districts.value.find(d => d.id == addForm.personalDistrictId);
  if (district) {
    addForm.personalDistrict = district.name_th;
    subdistricts.value = district.tambon || [];
    addForm.personalSubdistrictId = '';
    addForm.personalSubdistrict = '';
    addForm.personalPostalCode = '';
  }
}

function loadPostalCode() {
  const subdistrict = subdistricts.value.find(s => s.id == addForm.personalSubdistrictId);
  if (subdistrict) {
    addForm.personalSubdistrict = subdistrict.name_th;
    addForm.personalPostalCode = subdistrict.zip_code || '';
  }
}

async function submitAddMember() {
  try {
    // Validate เบอร์โทรเป็นตัวเลข
    if (!/^[0-9]{10}$/.test(addForm.personalPhone)) {
      Swal.fire('กรุณากรอกเบอร์โทร 10 หลัก (ตัวเลขเท่านั้น)', '', 'warning');
      return;
    }
    // 1. สร้าง member
    const memberRes = await axios.post(`${import.meta.env.VITE_API_URL}/members/register`, {
      username: addForm.username,
      password: addForm.password,
      role: 'member',
      fullName: addForm.fullName,
      personalPhone: addForm.personalPhone,
      personalEmail: addForm.personalEmail,
      email: addForm.email,
      personalAddress: addForm.personalAddress,
      personalProvince: addForm.personalProvince,
      personalDistrict: addForm.personalDistrict,
      personalSubdistrict: addForm.personalSubdistrict,
      personalPostalCode: addForm.personalPostalCode,
      personalProvinceId: addForm.personalProvinceId,
      personalDistrictId: addForm.personalDistrictId,
      personalSubdistrictId: addForm.personalSubdistrictId,
    });
    const member_id = memberRes.data.member?._id || memberRes.data._id;
    if (!member_id) throw new Error('สร้างสมาชิกไม่สำเร็จ');
    // 2. สร้าง partner-member
    const partnerId = localStorage.getItem('partnerId');
    await axios.post(`${import.meta.env.VITE_API_URL}/partner-members`, {
      partner_id: partnerId,
      member_id,
      level: addForm.level,
      status: addForm.status,
      display_name: addForm.display_name,
    });
    Swal.fire('เพิ่มสมาชิกสำเร็จ', '', 'success');
    clearAddForm();
    showAddForm.value = false;
    // รีเฟรชตารางสมาชิก (ควรมีฟังก์ชัน fetchMembers)
    loadMembers();
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err?.response?.data?.error || err.message, 'error');
  }
}

onMounted(() => {
  loadMembers();
  fetchProvinces();
});
</script>

<style scoped>
/* เพิ่มเติมถ้าต้องการ */
</style>