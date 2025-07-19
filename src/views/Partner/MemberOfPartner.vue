<template>
    <BarAdmin />
    <div class="max-w-full mx-auto bg-white rounded-xl shadow border border-[#e6e6e6] p-8">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-[#184c36]">สมาชิก</h2>
            <button class="bg-gradient-to-r from-[#184c36] to-[#b6e388] hover:from-[#b6e388] hover:to-[#184c36] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                @click="showAddModal = true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                เพิ่มสมาชิก
            </button>
        </div>

        <!-- Modal เพิ่มสมาชิก -->
        <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow-xl border border-[#e6e6e6] p-8 w-full max-w-2xl relative">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-[#e6f7e6]">
                    <div class="w-12 h-12 bg-gradient-to-br from-[#b6e388] to-[#184c36] rounded-xl flex items-center justify-center shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold bg-gradient-to-r from-[#184c36] to-[#b6e388] bg-clip-text text-transparent">เพิ่มสมาชิกใหม่</h2>
                        <p class="text-sm text-[#184c36] mt-1">กรุณากรอกข้อมูลสมาชิกให้ครบถ้วน</p>
                    </div>
                </div>
                <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="handleAddMember">
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-[#184c36]">
                            ชื่อ-นามสกุล <span class="text-red-600">*</span>
                        </label>
                        <input v-model="form.fullName" required placeholder="กรอกชื่อ-นามสกุล"
                            class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none" />
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-[#184c36]">
                            Username <span class="text-red-600">*</span>
                        </label>
                        <input v-model="form.username" required placeholder="กรอก username"
                            class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none" />
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-[#184c36]">
                            Password <span class="text-red-600">*</span>
                        </label>
                        <input v-model="form.password" type="password" required placeholder="กรอกรหัสผ่าน"
                            class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none" />
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-[#184c36]">
                            เบอร์โทร <span class="text-red-600">*</span>
                        </label>
                        <input v-model="form.phone" required placeholder="0812345678"
                            class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none" />
                    </div>
                    <div class="md:col-span-2 space-y-2">
                        <label class="block text-sm font-semibold text-[#184c36]">
                            ที่อยู่ <span class="text-red-600">*</span>
                        </label>
                        <input v-model="form.address" required placeholder="บ้านเลขที่ หมู่ ถนน"
                            class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none mb-3" />
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <select v-model="form.province_id" required @change="loadDistricts" 
                                class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white">
                                <option value="">เลือกจังหวัด</option>
                                <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name_th }}</option>
                            </select>
                            <select v-model="form.district_id" required @change="loadSubdistricts" :disabled="!form.province_id" 
                                class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                                <option value="">เลือกอำเภอ</option>
                                <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name_th }}</option>
                            </select>
                            <select v-model="form.subdistrict_id" required @change="setZipcode" :disabled="!form.district_id" 
                                class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                                <option value="">เลือกตำบล</option>
                                <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">{{ subdistrict.name_th }}</option>
                            </select>
                            <input v-model="form.zipcode" readonly placeholder="รหัสไปรษณีย์"
                                class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg bg-gray-100 text-gray-500" />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-[#184c36]">
                            ระดับ <span class="text-red-600">*</span>
                        </label>
                        <select v-model="form.level" required 
                            class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 transition-all duration-300 outline-none bg-white">
                            <option value="">เลือกระดับ</option>
                            <option value="3">3 (สูงสุด)</option>
                            <option value="2">2</option>
                            <option value="1">1 (ต่ำสุด)</option>
                        </select>
                    </div>
                    <div class="md:col-span-2 flex justify-end gap-3 mt-6">
                        <button type="button"
                            class="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
                            @click="showAddModal = false">
                            <span class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                ยกเลิก
                            </span>
                        </button>
                        <button
                            class="bg-gradient-to-r from-[#184c36] to-[#b6e388] hover:from-[#b6e388] hover:to-[#184c36] disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                            :disabled="!canAddMember">
                            <span class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                เพิ่มสมาชิก
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <h2 class="text-xl font-bold text-[#184c36] mb-4">ค้นหาสมาชิก</h2>
        <div class="mb-6">
            <input v-model="searchKeyword" placeholder="ค้นหาชื่อ-นามสกุล, ระดับ, เบอร์โทร..." class="border border-[#e6e6e6] rounded px-3 py-2 w-full max-w-md" />
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full border text-sm rounded-xl overflow-hidden">
                <thead class="bg-green-100 text-[#184c36] border-b border-[#e6e6e6]">
                    <tr>
                        <th class="px-4 py-2 border-[#e6e6e6] text-center">ชื่อ-นามสกุล</th>
                        <th class="px-4 py-2 border-[#e6e6e6] text-center cursor-pointer select-none"
                            @click="toggleSortLevel">
                            ระดับ
                            <span v-if="sortLevel === 'asc'">▲</span>
                            <span v-else-if="sortLevel === 'desc'">▼</span>
                        </th>
                        <th class="px-4 py-2 border-[#e6e6e6] text-center">เบอร์โทร</th>
                        <th class="px-4 py-2 border-[#e6e6e6] text-center">ที่อยู่</th>
                        <th class="px-4 py-2 border-[#e6e6e6] text-center">จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="member in filteredAndSortedMembers" :key="member.id" class="hover:bg-green-50">
                        <td class="px-4 py-3 border-b border-[#e6e6e6] text-center">{{ member.fullName }}</td>
                        <td class="px-4 py-3 border-b border-[#e6e6e6] text-center">{{ member.level }}</td>
                        <td class="px-4 py-3 border-b border-[#e6e6e6] text-center">{{ member.phone }}</td>
                        <td class="px-4 py-3 border-b border-[#e6e6e6] text-center max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {{ member.address }} {{ member.subdistrict }} {{ member.district }} {{ member.province }} {{ member.zipcode }}
                        </td>
                        <td class="px-4 py-3 border-b border-[#e6e6e6] text-center">
                            <div class="flex justify-center items-center gap-3">
                                <button class="text-blue-600 hover:underline" title="ดูข้อมูล" @click="viewMember(member)">🛈</button>
                                <button class="text-yellow-600 hover:underline" title="แก้ไข" @click="editMember(member)">✏️</button>
                                <button class="text-orange-600 hover:underline" title="ยกเลิก" @click="cancelMember(member)">🚫</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filteredAndSortedMembers.length === 0">
                        <td colspan="5" class="text-center text-gray-400 py-4">ไม่พบสมาชิก</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BarAdmin from '../../components/BarAdmin.vue';
import axios from 'axios';

// mock data
const members = ref([
    { id: 1, fullName: 'สมชาย ใจดี', username: 'somchai', phone: '0812345678', address: '123/4', province: 'กรุงเทพ', district: 'บางรัก', subdistrict: 'สีลม', zipcode: '10500', level: 2 },
    { id: 2, fullName: 'สมหญิง สวยงาม', username: 'somying', phone: '0898765432', address: '56/7', province: 'เชียงใหม่', district: 'เมือง', subdistrict: 'สุเทพ', zipcode: '50000', level: 1 },
    { id: 3, fullName: 'ประยุทธ์ ขยัน', username: 'prayut', phone: '0865432198', address: '99/1', province: 'ขอนแก่น', district: 'เมือง', subdistrict: 'ในเมือง', zipcode: '40000', level: 3 },
]);

const form = ref({
    fullName: '',
    username: '',
    password: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    subdistrict: '',
    zipcode: '',
    province_id: '',
    district_id: '',
    subdistrict_id: '',
    level: '',
});

const showAddModal = ref(false);

const provinces = ref([]);
const districts = ref([]);
const subdistricts = ref([]);

onMounted(async () => {
    // โหลดข้อมูลจังหวัด
    const res = await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json');
    // เรียงลำดับจังหวัดตามตัวอักษร ก-ฮ
    provinces.value = res.data.sort((a, b) => a.name_th.localeCompare(b.name_th, 'th'));
});

function loadDistricts() {
    const province = provinces.value.find(p => String(p.id) === String(form.value.province_id));
    districts.value = province ? province.amphure : [];
    form.value.district_id = '';
    form.value.subdistrict_id = '';
    form.value.zipcode = '';
    subdistricts.value = [];
}

function loadSubdistricts() {
    const district = districts.value.find(d => String(d.id) === String(form.value.district_id));
    subdistricts.value = district ? district.tambon : [];
    form.value.subdistrict_id = '';
    form.value.zipcode = '';
}

function setZipcode() {
    const subdistrict = subdistricts.value.find(s => String(s.id) === String(form.value.subdistrict_id));
    form.value.zipcode = subdistrict ? subdistrict.zip_code : '';
}

const searchKeyword = ref('');

const canAddMember = computed(() => {
    return form.value.fullName && form.value.username && form.value.password && form.value.phone && form.value.address && form.value.province_id && form.value.district_id && form.value.subdistrict_id && form.value.zipcode && form.value.level;
});

function handleAddMember() {
    // mock add
    const province = provinces.value.find(p => String(p.id) === String(form.value.province_id));
    const district = districts.value.find(d => String(d.id) === String(form.value.district_id));
    const subdistrict = subdistricts.value.find(s => String(s.id) === String(form.value.subdistrict_id));
    members.value.push({
        id: Date.now(),
        fullName: form.value.fullName,
        username: form.value.username,
        phone: form.value.phone,
        address: form.value.address,
        province: province ? province.name_th : '',
        district: district ? district.name_th : '',
        subdistrict: subdistrict ? subdistrict.name_th : '',
        zipcode: form.value.zipcode,
        level: Number(form.value.level),
    });
    form.value = { fullName: '', username: '', password: '', phone: '', address: '', province: '', district: '', subdistrict: '', zipcode: '', province_id: '', district_id: '', subdistrict_id: '', level: '' };
    showAddModal.value = false;
}

const sortLevel = ref('desc');

const filteredAndSortedMembers = computed(() => {
  let arr = members.value.filter(m => {
    const keyword = searchKeyword.value.trim().toLowerCase();
    if (!keyword) return true;
    const matchName = m.fullName && m.fullName.toLowerCase().includes(keyword);
    const matchLevel = m.level && String(m.level).includes(keyword);
    let matchPhone = false;
    if (keyword.startsWith('0')) {
      matchPhone = m.phone && m.phone.includes(keyword);
    }
    return matchName || matchLevel || matchPhone;
  });
  arr = arr.slice().sort((a, b) => sortLevel.value === 'asc' ? a.level - b.level : b.level - a.level);
  return arr;
});

function toggleSortLevel() {
    sortLevel.value = sortLevel.value === 'asc' ? 'desc' : 'asc';
}

function viewMember(member) {
    alert('ดูข้อมูล: ' + member.fullName);
}
function editMember(member) {
    alert('แก้ไข: ' + member.fullName);
}
function cancelMember(member) {
    alert('ยกเลิก: ' + member.fullName);
}
</script>

<style scoped>
/* เพิ่มเติมถ้าต้องการ */
</style>