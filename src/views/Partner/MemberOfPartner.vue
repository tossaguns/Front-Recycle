<template>
    <BarAdmin />
    <div class="max-w-full mx-auto bg-white rounded-xl shadow border border-[#e6e6e6] p-8">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-[#184c36]">สมาชิก</h2>
            <button class="bg-[#184c36] hover:bg-green-700 text-white px-6 py-2 rounded shadow-sm transition"
                @click="showAddModal = true">+ เพิ่มสมาชิก</button>
        </div>

        <!-- Modal เพิ่มสมาชิก -->
        <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-8 w-full max-w-2xl relative">
                <h2 class="text-xl font-bold text-[#184c36] mb-6">เพิ่มสมาชิกใหม่</h2>
                <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="handleAddMember">
                    <div>
                        <label class="block font-semibold mb-1 text-[#184c36]">ชื่อ-นามสกุล</label>
                        <input v-model="form.fullName" required
                            class="border border-[#e6e6e6] rounded px-3 py-2 w-full" />
                    </div>
                    <div>
                        <label class="block font-semibold mb-1 text-[#184c36]">Username</label>
                        <input v-model="form.username" required
                            class="border border-[#e6e6e6] rounded px-3 py-2 w-full" />
                    </div>
                    <div>
                        <label class="block font-semibold mb-1 text-[#184c36]">Password</label>
                        <input v-model="form.password" type="password" required
                            class="border border-[#e6e6e6] rounded px-3 py-2 w-full" />
                    </div>
                    <div>
                        <label class="block font-semibold mb-1 text-[#184c36]">เบอร์โทร</label>
                        <input v-model="form.phone" required class="border border-[#e6e6e6] rounded px-3 py-2 w-full" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block font-semibold mb-1 text-[#184c36]">ที่อยู่</label>
                        <input v-model="form.address" required
                            class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-2"
                            placeholder="บ้านเลขที่ หมู่ ถนน" />
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
                            <select v-model="form.province_id" required @change="loadDistricts" class="border border-[#e6e6e6] rounded px-3 py-2 w-full">
                                <option value="">เลือกจังหวัด</option>
                                <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name_th }}</option>
                            </select>
                            <select v-model="form.district_id" required @change="loadSubdistricts" :disabled="!form.province_id" class="border border-[#e6e6e6] rounded px-3 py-2 w-full">
                                <option value="">เลือกอำเภอ</option>
                                <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name_th }}</option>
                            </select>
                            <select v-model="form.subdistrict_id" required @change="setZipcode" :disabled="!form.district_id" class="border border-[#e6e6e6] rounded px-3 py-2 w-full">
                                <option value="">เลือกตำบล</option>
                                <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">{{ subdistrict.name_th }}</option>
                            </select>
                            <input v-model="form.zipcode" readonly class="border border-[#e6e6e6] rounded px-3 py-2 w-full bg-gray-100 text-gray-500" placeholder="รหัสไปรษณีย์" />
                        </div>
                    </div>
                    <div>
                        <label class="block font-semibold mb-1 text-[#184c36]">ระดับ</label>
                        <select v-model="form.level" required class="border border-[#e6e6e6] rounded px-3 py-2 w-full">
                            <option value="">เลือก</option>
                            <option value="3">3 (สูงสุด)</option>
                            <option value="2">2</option>
                            <option value="1">1 (ต่ำสุด)</option>
                        </select>
                    </div>
                    <div class="md:col-span-2 flex justify-end gap-2 mt-4">
                        <button type="button"
                            class="px-6 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                            @click="showAddModal = false">ยกเลิก</button>
                        <button
                            class="bg-[#184c36] hover:bg-green-700 text-white px-8 py-2 rounded shadow-sm disabled:opacity-50 transition"
                            :disabled="!canAddMember">เพิ่มสมาชิก</button>
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
                            <button class="text-blue-600 hover:underline mr-2"
                                @click="viewMember(member)">ดูข้อมูล</button>
                            <button class="text-yellow-600 hover:underline mr-2"
                                @click="editMember(member)">แก้ไข</button>
                            <button class="text-red-600 hover:underline" @click="cancelMember(member)">ยกเลิก</button>
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
    provinces.value = res.data;
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