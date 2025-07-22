<template>
  <BarAdmin />
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- ปุ่มเพิ่มสมาชิกใหม่ -->
      <div class="flex justify-end mb-4 mr-4">
        <button @click="toggleAddForm"
          class="bg-[#184c36] hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow font-semibold">
          {{ showAddForm ? 'ปิดฟอร์ม' : '+ เพิ่มสมาชิกใหม่' }}
        </button>
      </div>
      <!-- ฟอร์มเพิ่มสมาชิก (toggle) -->
      <div v-if="showAddForm" class="bg-white rounded-2xl shadow-2xl border border-[#e6e6e6] p-8 mb-8 animate-fadeIn">
        <h2 class="text-2xl font-bold text-[#184c36] mb-6 flex items-center gap-2">
          <span
            class="bg-gradient-to-r from-green-100 to-green-200 text-[#184c36] rounded-full px-4 py-2 text-lg font-semibold shadow">เพิ่มสมาชิกใหม่</span>
        </h2>
        <form @submit.prevent="submitAddMember" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">ชื่อ-นามสกุล</label>
            <input v-model="addForm.fullName" required
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm" />
          </div>
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">Username</label>
            <input v-model="addForm.username" required minlength="6"
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm" />
          </div>
          <div class="relative">
            <label class="block font-semibold mb-2 text-[#184c36]">Password</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="addForm.password" required minlength="8"
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition pr-10 text-base shadow-sm" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-9 text-gray-500 focus:outline-none">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" class="w-6 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 10a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-1.02 0-2.01-.13-2.958-.375M15.54 15.54L2.46 2.46" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                class="w-6 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">เบอร์โทร</label>
            <input v-model="addForm.personalPhone" required maxlength="10" pattern="[0-9]*" inputmode="numeric"
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm" />
          </div>
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">อีเมล</label>
            <input v-model="addForm.personalEmail" required type="email"
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm" />
          </div>
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">ระดับ</label>
            <select v-model="addForm.level" required
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm">
              <option value="">เลือก</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">ชื่อเฉพาะร้าน (optional)</label>
            <p class="text-xs text-gray-500 mb-1 ml-1">ใช้สำหรับแสดงชื่อเล่นหรือชื่อร้านที่ต้องการให้แสดงในระบบ
              (ถ้าไม่กรอกจะใช้ชื่อจริง)</p>
            <input v-model="addForm.display_name"
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm" />
          </div>
          <div class="md:col-span-2">
            <label class="block font-semibold mb-2 text-[#184c36]">ที่อยู่</label>
            <input v-model="addForm.personalAddress" required
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm" />
          </div>
          <!-- จังหวัด/อำเภอ/ตำบล/รหัสไปรษณีย์ -->
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">จังหวัด</label>
            <select v-model="addForm.personalProvinceId" required @change="loadDistricts"
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm">
              <option value="">เลือกจังหวัด</option>
              <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name_th }}
              </option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">อำเภอ</label>
            <select v-model="addForm.personalDistrictId" required :disabled="!addForm.personalProvinceId"
              @change="loadSubdistricts"
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm">
              <option value="">เลือกอำเภอ</option>
              <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name_th }}
              </option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">ตำบล</label>
            <select v-model="addForm.personalSubdistrictId" required :disabled="!addForm.personalDistrictId"
              @change="loadPostalCode"
              class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm">
              <option value="">เลือกตำบล</option>
              <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">{{
                subdistrict.name_th }}</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">รหัสไปรษณีย์</label>
            <input v-model="addForm.personalPostalCode" readonly
              class="border rounded-xl px-4 py-2 w-full bg-gray-100 text-gray-500 text-base shadow-sm" />
          </div>
          <div class="md:col-span-2 flex justify-end gap-3 mt-4">
            <button type="button"
              class="px-5 py-2 text-[#184c36] border border-[#e6e6e6] rounded-xl hover:bg-green-50 font-semibold shadow-sm transition"
              @click="clearAddForm">ล้าง</button>
            <button type="submit"
              class="bg-gradient-to-r from-[#184c36] to-green-700 hover:from-green-700 hover:to-[#184c36] text-white px-8 py-2 rounded-xl shadow font-semibold text-base transition">บันทึก</button>
          </div>
        </form>
      </div>
      <!-- Search & Table -->
      <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-[#184c36]">สมาชิกของร้าน</h2>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
          <input v-model="search" @input="filterMembers" placeholder="ค้นหาชื่อ/เบอร์/ระดับ..."
            class="border border-[#e6e6e6] rounded px-3 py-2 w-full md:w-80 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full border text-sm rounded-xl overflow-hidden responsive-table">
            <thead class="bg-green-100 text-[#184c36] border-b border-[#e6e6e6]">
              <tr>
                <th class="px-6 py-4 font-semibold text-base text-left">ชื่อ</th>
                <th class="px-6 py-4 font-semibold text-base text-left hidden sm:table-cell">เบอร์โทร</th>
                <th class="px-6 py-4 font-semibold text-base text-left hidden md:table-cell">ระดับ</th>
                <th class="px-6 py-4 font-semibold text-base text-left hidden md:table-cell">ชื่อเฉพาะร้าน</th>
                <th class="px-6 py-4 font-semibold text-base text-left hidden lg:table-cell">วันที่เข้าร้าน</th>
                <th class="px-6 py-4 font-semibold text-base text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredMembers.length === 0">
                <td colspan="7" class="text-center text-gray-400 py-8 text-lg">ไม่พบสมาชิก</td>
              </tr>
              <tr v-else v-for="m in filteredMembers" :key="m._id"
                class="transition-all border-b border-[#e6e6e6] hover:bg-green-50/70 group responsive-row">
                <td class="px-6 py-4 flex items-center gap-3 min-w-[180px]">
                  <span
                    class="inline-block w-10 h-10 rounded-full bg-gradient-to-br from-green-200 to-green-100 text-[#184c36] flex items-center justify-center font-bold text-lg border-2 border-white shadow group-hover:scale-105 transition-transform">
                    {{ m.memberProfile?.fullName?.charAt(0) || '-' }}
                  </span>
                  <span class="ml-2 font-medium text-base">{{ m.memberProfile?.fullName || '-' }}</span>
                  <div class="block sm:hidden text-xs text-gray-500 mt-1">{{ m.memberProfile?.personalPhone || '-' }}
                  </div>
                </td>
                <td class="px-6 py-4 text-base hidden sm:table-cell">{{ m.memberProfile?.personalPhone || '-' }}</td>
                <td class="px-6 py-4">
                  <span v-if="m.level"
                    class="inline-block px-2 py-1 rounded bg-green-100 text-[#184c36] font-semibold text-sm">{{ m.level
                    }}</span>
                  <span v-else>-</span>
                </td>
                <td class="px-6 py-4 text-base hidden md:table-cell">{{ m.display_name || '-' }}</td>
                <td class="px-6 py-4 text-base hidden lg:table-cell">{{ formatDate(m.joined_at) || '-' }}</td>
                <td class="px-6 py-4">
                  <div class="flex gap-2 justify-center items-center">
                    <button @click="viewMember(m)"
                      class="text-blue-600 hover:text-blue-900 bg-blue-50 rounded-full p-2 w-9 h-9 flex items-center justify-center shadow-sm transition-all"
                      title="ดูข้อมูล">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button @click="editMember(m)"
                      class="text-yellow-600 hover:text-yellow-700 bg-yellow-50 rounded-full p-2 w-9 h-9 flex items-center justify-center shadow-sm transition-all"
                      title="แก้ไข">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5h2m-1 0v14m-7-7h14" />
                      </svg>
                    </button>
                    <button @click="deleteMember(m)"
                      class="text-red-600 hover:text-red-900 bg-red-50 rounded-full p-2 w-9 h-9 flex items-center justify-center shadow-sm transition-all"
                      title="ลบ/ยกเลิก">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal: View/แก้ไข (คงเดิม) -->
    <div v-if="viewingMember" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div
        class="bg-white rounded-2xl shadow-2xl border border-[#e6e6e6] p-8 w-full max-w-lg relative animate-fadeIn responsive-modal">
        <button class="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl" @click="closeViewModal"
          title="ปิด">&times;</button>
        <h3 class="font-bold mb-6 text-[#184c36] text-2xl flex items-center gap-2">
          <svg xmlns='http://www.w3.org/2000/svg' class='h-7 w-7 text-[#184c36]' fill='none' viewBox='0 0 24 24'
            stroke='currentColor'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
              d='M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
          ข้อมูลสมาชิก
        </h3>
        <div class="mb-6 flex items-center gap-4 flex-wrap">
          <span
            class="inline-block w-16 h-16 rounded-full bg-gradient-to-br from-green-200 to-green-100 text-[#184c36] flex items-center justify-center font-bold text-3xl border-4 border-white shadow-lg">
            {{ viewingMember.memberProfile?.fullName?.charAt(0) || '-' }}
          </span>
          <span class="text-2xl font-semibold break-all">{{ viewingMember.memberProfile?.fullName || '-' }}</span>
        </div>
        <div class="mb-3 text-base flex flex-col gap-1 space-y-2">
          <div><span class="font-semibold">เบอร์โทร :</span> {{ viewingMember.memberProfile?.personalPhone || '-' }}
          </div>
          <div><span class="font-semibold">ระดับ :</span> {{ viewingMember.level || '-' }}</div>
          <div><span class="font-semibold">ชื่อเฉพาะร้าน :</span> {{ viewingMember.display_name || '-' }}</div>
          <div><span class="font-semibold">วันที่เข้าร้าน :</span> {{ formatDate(viewingMember.joined_at) }}</div>
        </div>
        <hr class="my-4 border-green-200">
        <div class="mb-2 text-base">
          <span class="font-semibold">ที่อยู่หลัก:</span>
          <template v-if="viewingMember.defaultAddress && viewingMember.defaultAddress.address">
            <div class="bg-green-50 rounded-xl p-4 mt-2 text-[#184c36] shadow-sm border border-green-100">
              <div v-if="viewingMember.defaultAddress.address_name" class="font-semibold mb-1 text-green-900">{{
                viewingMember.defaultAddress.address_name }}</div>
              <div class="mb-1 break-all">{{ viewingMember.defaultAddress.address }}</div>
              <div class="text-sm text-green-800">
                ต.{{ viewingMember.defaultAddress.subdistrict }}
                อ.{{ viewingMember.defaultAddress.district }}
                จ.{{ viewingMember.defaultAddress.province }}
                {{ viewingMember.defaultAddress.postal_code ? viewingMember.defaultAddress.postal_code : '' }}
              </div>
            </div>
          </template>
          <template v-else>
            <span class="text-gray-400">ไม่มีที่อยู่หลัก</span>
          </template>
        </div>
      </div>
    </div>
    <!-- Modal: Edit Member -->
    <div v-if="editingMember" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl border border-[#e6e6e6] p-8 w-full max-w-md relative animate-fadeIn">
        <button class="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl" @click="closeEditModal" title="ปิด">&times;</button>
        <h3 class="font-bold mb-6 text-[#184c36] text-2xl flex items-center gap-2">
          <svg xmlns='http://www.w3.org/2000/svg' class='h-7 w-7 text-[#184c36]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11 5h2m-1 0v14m-7-7h14' /></svg>
          แก้ไขสมาชิก
        </h3>
        <form @submit.prevent="submitEditMember" class="flex flex-col gap-5">
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">ระดับ</label>
            <select v-model="editForm.level" required class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm">
              <option value="">เลือกระดับ</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-[#184c36]">ชื่อเฉพาะร้าน</label>
            <input v-model="editForm.display_name" class="border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-base shadow-sm" placeholder="ชื่อเฉพาะร้าน (ถ้ามี)" />
          </div>
          <div class="flex justify-end gap-3 mt-2">
            <button type="button" class="px-5 py-2 text-[#184c36] border border-[#e6e6e6] rounded-xl hover:bg-green-50 font-semibold shadow-sm transition" @click="closeEditModal">ยกเลิก</button>
            <button type="submit" class="bg-gradient-to-r from-[#184c36] to-green-700 hover:from-green-700 hover:to-[#184c36] text-white px-8 py-2 rounded-xl shadow font-semibold text-base transition">บันทึก</button>
          </div>
        </form>
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
const viewingMember = ref(null);

const partner = JSON.parse(localStorage.getItem('partner') || '{}');
const partnerId = partner.id || partner._id;

function formatDate(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('th-TH');
}

async function loadMembers() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/partner-members`);
  const filtered = res.data.filter(pm => {
    if (typeof pm.partner_id === 'object' && pm.partner_id !== null) {
      return pm.partner_id._id === partnerId;
    }
    return pm.partner_id === partnerId;
  });
  const withProfile = await Promise.all(filtered.map(async pm => {
    const memberId = typeof pm.member_id === 'object' && pm.member_id !== null
      ? pm.member_id._id
      : pm.member_id;
    const [profileRes, addressRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/members/profile/${memberId}`),
      axios.get(`${import.meta.env.VITE_API_URL}/member-addresses/${memberId}`)
    ]);
    let addresses = [];
    if (Array.isArray(addressRes.data)) {
      addresses = addressRes.data;
    } else if (Array.isArray(addressRes.data.addresses)) {
      addresses = addressRes.data.addresses;
    } else if (addressRes.data && typeof addressRes.data === 'object') {
      addresses = [addressRes.data];
    }
    const defaultAddress = addresses.find(addr => addr.is_default);
    return {
      ...pm,
      memberProfile: profileRes.data,
      defaultAddress,
    };
  }));
  members.value = withProfile;
  filteredMembers.value = withProfile;
}

function filterMembers() {
  const q = search.value.trim().toLowerCase();
  filteredMembers.value = members.value.filter(m => {
    const mem = m.memberProfile || {};
    return (
      (mem.fullName && mem.fullName.toLowerCase().includes(q)) ||
      (mem.personalPhone && mem.personalPhone.includes(q)) ||
      (m.level && String(m.level).toLowerCase().includes(q)) ||
      (m.display_name && m.display_name.toLowerCase().includes(q))
    );
  });
}

function viewMember(m) {
  viewingMember.value = m;
}
function closeViewModal() {
  viewingMember.value = null;
}

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
});

function toggleAddForm() {
  showAddForm.value = !showAddForm.value;
}

function clearAddForm() {
  Object.assign(addForm, { fullName: '', username: '', password: '', personalPhone: '', personalEmail: '', level: '', display_name: '', personalAddress: '', personalProvinceId: '', personalProvince: '', personalDistrictId: '', personalDistrict: '', personalSubdistrictId: '', personalSubdistrict: '', personalPostalCode: '' });
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
      email: addForm.personalEmail,
    });
    const member_id = memberRes.data.member?._id || memberRes.data._id;
    if (!member_id) throw new Error('สร้างสมาชิกไม่สำเร็จ');

    // 2. อัปเดตชื่อ-นามสกุล และเบอร์โทร
    await axios.put(`${import.meta.env.VITE_API_URL}/members/update-profile/${member_id}`, {
      fullName: addForm.fullName,
      personalPhone: addForm.personalPhone,
    });

    // 3. เพิ่มที่อยู่ใหม่
    await axios.post(`${import.meta.env.VITE_API_URL}/member-addresses/${member_id}`, {
      address_name: 'ที่อยู่หลัก',
      address: addForm.personalAddress,
      province: addForm.personalProvince,
      district: addForm.personalDistrict,
      subdistrict: addForm.personalSubdistrict,
      postal_code: addForm.personalPostalCode,
      province_id: addForm.personalProvinceId,
      district_id: addForm.personalDistrictId,
      subdistrict_id: addForm.personalSubdistrictId,
      is_default: true
    });

    // 4. สร้าง partner-member (ส่ง level ไปด้วย)
    await axios.post(`${import.meta.env.VITE_API_URL}/partner-members`, {
      partner_id: partnerId,
      member_id,
      level: addForm.level,
      display_name: addForm.display_name,
    });
    Swal.fire('เพิ่มสมาชิกสำเร็จ', '', 'success');
    clearAddForm();
    showAddForm.value = false;
    loadMembers();
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err?.response?.data?.error || err.message, 'error');
  }
}

const editingMember = ref(null);
const editForm = reactive({ level: '', display_name: '' });

function editMember(m) {
  editingMember.value = m;
  editForm.level = m.level ? String(m.level) : '';
  editForm.display_name = m.display_name || '';
}
function closeEditModal() {
  editingMember.value = null;
}
async function submitEditMember() {
  if (!editForm.level) {
    Swal.fire('กรุณาเลือกระดับ', '', 'warning');
    return;
  }
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/partner-members/${editingMember.value._id}`, {
      level: editForm.level,
      display_name: editForm.display_name,
    });
    Swal.fire('บันทึกสำเร็จ', '', 'success');
    closeEditModal();
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
.animate-fadeIn {
  animation: fadeIn 0.25s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ตารางและ modal พรีเมียม */
table {
  font-family: 'Sarabun', 'Prompt', 'Kanit', 'sans-serif';
}

th,
td {
  vertical-align: middle;
}

tr {
  transition: background 0.2s;
}

hr {
  border-width: 1.5px;
}

@media (max-width: 1024px) {

  .responsive-table th:nth-child(5),
  .responsive-table td:nth-child(5) {
    display: none;
  }
}

@media (max-width: 900px) {

  .responsive-table th:nth-child(3),
  .responsive-table td:nth-child(3),
  .responsive-table th:nth-child(4),
  .responsive-table td:nth-child(4) {
    display: none;
  }
}

@media (max-width: 640px) {

  .responsive-table th:not(:first-child):not(:last-child),
  .responsive-table td:not(:first-child):not(:last-child) {
    display: none;
  }

  .responsive-row td {
    padding: 12px 8px;
    font-size: 15px;
  }

  .responsive-table {
    font-size: 15px;
  }

  .responsive-table th,
  .responsive-table td {
    min-width: 0;
  }
}

@media (max-width: 600px) {
  .responsive-modal {
    max-width: 98vw !important;
    padding: 1.2rem !important;
    border-radius: 1rem !important;
  }

  .responsive-modal h3 {
    font-size: 1.2rem !important;
  }

  .responsive-modal .w-16,
  .responsive-modal .h-16 {
    width: 3.2rem !important;
    height: 3.2rem !important;
    font-size: 1.5rem !important;
  }

  .responsive-modal .text-2xl {
    font-size: 1.1rem !important;
  }

  .responsive-modal .p-4 {
    padding: 0.7rem !important;
  }
}

.add-member-form input:focus,
.add-member-form select:focus {
  outline: none;
  box-shadow: 0 0 0 2px #bbf7d0;
}

@media (max-width: 900px) {
  .add-member-form {
    padding: 1.2rem !important;
  }
}
</style>