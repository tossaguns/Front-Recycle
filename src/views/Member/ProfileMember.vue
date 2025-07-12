<template>
  <div class="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
    <Bar />
    <main class="flex-1 flex flex-col items-center justify-center z-10 relative py-4 sm:py-6 md:py-8 lg:py-10">
      <h1 class="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#222] mb-4 sm:mb-5 md:mb-6 lg:mb-8 mt-2">
        แก้ไขข้อมูลส่วนตัว
      </h1>

      <div
        class="flex flex-col items-center w-full mx-auto bg-white rounded-2xl shadow-none p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl"
        @submit.prevent="saveEdit">

        <div class="relative mb-4 flex flex-col items-center">
          <img :src="profileImg" alt="profile" class="rounded-full object-cover border-4 border-white shadow-lg
                      w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32" />
          <label v-if="editMode"
            class="absolute bottom-2 right-2 cursor-pointer bg-[#e6f7e6] border border-[#b6e388] rounded-full p-1.5 sm:p-2 shadow hover:bg-[#b6e388] transition">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#184c36]" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <input type="file" accept="image/*" class="hidden" @change="onProfileImgChange" />
          </label>
        </div>

        <div class="bg-white rounded-2xl shadow-xl border-l-4 border-[#b6e388] w-full px-3 sm:px-5 py-4 sm:py-6">
          <div class="p-3 sm:p-4 md:p-6 lg:p-8">
            <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-2 border-b border-[#e6f7e6]">
              <div
                class="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-[#b6e388] to-[#184c36] rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div>
                <h2
                  class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#184c36] to-[#b6e388] bg-clip-text text-transparent">
                  ข้อมูลส่วนตัว
                </h2>
                <p class="text-xs sm:text-sm text-[#184c36] mt-1">
                  คุณสามารถแก้ไขหรือเพิ่มเติมข้อมูลด้านล่างได้
                </p>
              </div>
            </div>

            <form class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              <div class="space-y-1 sm:space-y-2">
                <label class="block text-xs sm:text-sm font-semibold text-[#184c36]">ชื่อ</label>
                <div class="relative">
                  <input v-model="form.fullName" type="text" :readonly="!editMode"
                    class="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none pr-10 sm:pr-12 text-sm sm:text-base" />
                </div>
              </div>

              <div class="space-y-1 sm:space-y-2">
                <label class="block text-xs sm:text-sm font-semibold text-[#184c36]">อีเมล</label>
                <div class="relative">
                  <input v-model="form.email" type="email" :readonly="!editMode"
                    class="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none pr-10 sm:pr-12 text-sm sm:text-base" />
                </div>
              </div>

              <div class="space-y-1 sm:space-y-2 sm:col-span-2 xl:col-span-1">
                <label class="block text-xs sm:text-sm font-semibold text-[#184c36]">เบอร์โทร</label>
                <div class="relative">
                  <input v-model="form.personalPhone" type="tel" :readonly="!editMode" inputmode="numeric"
                    pattern="[0-9]*" maxlength="10"
                    @input="form.personalPhone = form.personalPhone.replace(/[^0-9]/g, '')"
                    class="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none pr-10 sm:pr-12 text-sm sm:text-base" />
                </div>
              </div>

              <!-- ส่วนที่อยู่เพิ่มเติม -->
              <div class="sm:col-span-2 xl:col-span-3">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-[#184c36]">ที่อยู่</h3>
                  <button type="button" @click="openAddAddressModal" :disabled="!editMode"
                    class="bg-[#e6f7e6] hover:bg-[#b6e388] text-[#184c36] rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-semibold flex items-center gap-1 sm:gap-2 transition disabled:opacity-50 text-xs sm:text-sm">
                    เพิ่มที่อยู่ใหม่
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <!-- แสดงที่อยู่ที่มีอยู่ -->
                <div v-if="memberAddresses.length === 0" class="text-center py-8 text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>ยังไม่มีที่อยู่</p>
                </div>

                <div v-else class="space-y-4">
                  <div v-for="address in memberAddresses" :key="address._id" 
                    class="border border-[#e6f7e6] rounded-lg p-4 bg-[#f7faf0]">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                          <h4 class="font-semibold text-[#184c36]">{{ address.address_name }}</h4>
                          <span v-if="address.is_default" 
                            class="bg-[#b6e388] text-[#184c36] text-xs px-2 py-1 rounded-full">
                            ที่อยู่หลัก
                          </span>
                        </div>
                        <p class="text-sm text-gray-700 mb-1">{{ address.address }}</p>
                        <p class="text-sm text-gray-600">
                          {{ address.subdistrict }} {{ address.district }} {{ address.province }} {{ address.postal_code }}
                        </p>
                      </div>
                      <div v-if="editMode" class="flex gap-2">
                        <button @click="editAddress(address)" 
                          class="text-blue-600 hover:text-blue-800 p-1" type="button" title="แก้ไข">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button type="button" @click="deleteAddress(address._id)" 
                          class="text-red-600 hover:text-red-800 p-1" title="ลบ">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="flex gap-3 justify-center mt-6 w-full max-w-sm">
          <button v-if="!editMode"
            class="bg-[#b6e388] hover:bg-[#184c36] text-[#184c36] hover:text-white rounded-full px-6 sm:px-8 py-2 font-semibold transition w-full text-sm sm:text-base"
            @click="enableEdit">
            แก้ไขข้อมูล
          </button>

          <button v-if="editMode"
            class="bg-[#e6e6e6] hover:bg-[#b6e388] text-[#222] rounded-full px-6 sm:px-8 py-2 font-semibold transition w-1/2 text-sm sm:text-base"
            @click="cancelEdit">
            ยกเลิก
          </button>
          <button type="submit" v-if="editMode"
            class="bg-[#b6e388] hover:bg-[#184c36] text-[#184c36] hover:text-white rounded-full px-6 sm:px-8 py-2 font-semibold transition w-1/2 text-sm sm:text-base"
            @click="saveEdit">
            บันทึก
          </button>
        </div>
      </div>
    </main>

    <!-- Modal เพิ่ม/แก้ไขที่อยู่ -->
    <div v-if="showAddAddressModal || showEditAddressModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-[#184c36]">
            {{ showEditAddressModal ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่ใหม่' }}
          </h3>
          <button @click="closeAddressModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveAddress" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-[#184c36] mb-2">
              ชื่อที่อยู่ <span class="text-red-600">*</span>
            </label>
            <input v-model="addressForm.address_name" type="text" required
              placeholder="เช่น บ้าน, ที่ทำงาน, หอพัก"
              class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-[#184c36] mb-2">
              ที่อยู่ <span class="text-red-600">*</span>
            </label>
            <textarea v-model="addressForm.address" rows="3" required
              placeholder="บ้านเลขที่ / หมู่บ้าน / ถนน"
              class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none resize-none"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-semibold text-[#184c36] mb-2">
                จังหวัด <span class="text-red-600">*</span>
              </label>
              <select v-model="addressForm.province_id" required @change="loadAddressDistricts"
                class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none">
                <option value="">เลือกจังหวัด</option>
                <option v-for="province in provinces" :key="province.id" :value="province.id">
                  {{ province.name_th }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-[#184c36] mb-2">
                อำเภอ <span class="text-red-600">*</span>
              </label>
              <select v-model="addressForm.district_id" required @change="loadAddressSubdistricts"
                :disabled="!addressForm.province_id"
                class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none disabled:opacity-50">
                <option value="">เลือกอำเภอ</option>
                <option v-for="district in addressDistricts" :key="district.id" :value="district.id">
                  {{ district.name_th }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-[#184c36] mb-2">
                ตำบล <span class="text-red-600">*</span>
              </label>
              <select v-model="addressForm.subdistrict_id" required @change="loadAddressPostalCode"
                :disabled="!addressForm.district_id"
                class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none disabled:opacity-50">
                <option value="">เลือกตำบล</option>
                <option v-for="subdistrict in addressSubdistricts" :key="subdistrict.id" :value="subdistrict.id">
                  {{ subdistrict.name_th }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-[#184c36] mb-2">รหัสไปรษณีย์</label>
            <input v-model="addressForm.postal_code" type="text" readonly
              class="w-full px-4 py-3 border-2 border-[#e6f7e6] rounded-lg bg-gray-100 text-gray-500" />
          </div>

          <div class="flex items-center gap-2">
            <input v-model="addressForm.is_default" type="checkbox" id="isDefault"
              class="w-4 h-4 text-[#b6e388] bg-gray-100 border-gray-300 rounded focus:ring-[#b6e388] focus:ring-2" />
            <label for="isDefault" class="text-sm text-[#184c36]">
              ตั้งเป็นที่อยู่หลัก
            </label>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" @click="closeAddressModal"
              class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg px-4 py-3 font-semibold transition">
              ยกเลิก
            </button>
            <button type="submit"
              class="flex-1 bg-[#b6e388] hover:bg-[#184c36] text-[#184c36] hover:text-white rounded-lg px-4 py-3 font-semibold transition">
              {{ showEditAddressModal ? 'อัปเดต' : 'เพิ่มที่อยู่' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch, nextTick } from 'vue';
import Bar from '../../components/Bar.vue';
import Footer from '../../components/Footer.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const form = reactive({
  fullName: '',
  personalPhone: '',
  email: '',
  username: '',
});

const memberAddresses = ref([]);
const editMode = ref(false);
const originalForm = ref({});
const success = ref('');
const error = ref('');
const profileImg = ref('');
const profileImageFile = ref(null);

// Modal states
const showAddAddressModal = ref(false);
const showEditAddressModal = ref(false);
const editingAddressId = ref(null);

// Address form
const addressForm = reactive({
  address_name: '',
  address: '',
  province: '',
  district: '',
  subdistrict: '',
  postal_code: '',
  province_id: '',
  district_id: '',
  subdistrict_id: '',
  is_default: false
});

const provinces = ref([]);
// const personalDistricts = ref([]);
// const personalSubdistricts = ref([]);

// Address modal data
const addressDistricts = ref([]);
const addressSubdistricts = ref([]);

const router = useRouter();

const user = JSON.parse(localStorage.getItem('user') || '{}');
const userId = ref(user.id || user._id || '');

const clearMessages = () => {
  success.value = '';
  error.value = '';
};

const fetchUserData = async () => {
  clearMessages();
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/members/profile/${userId.value}`);
    if (response.status === 200) {
      const userData = response.data;
      form.fullName = userData.fullName || '';
      form.personalPhone = userData.personalPhone || '';
      form.email = userData.email || '';
      form.username = userData.username || '';

      profileImg.value = userData.profile_img || '';

      Object.assign(originalForm.value, form);
      originalForm.value.profileImg = profileImg.value;
      // Trigger cascading loads if IDs are already set
    }
  } catch (err) {
    error.value = 'ไม่สามารถดึงข้อมูลผู้ใช้ได้: ' + (err.response?.data?.error || err.message);
  }
};

async function saveEdit() {
  clearMessages();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email || !emailRegex.test(form.email)) {
    await Swal.fire({
      icon: 'error',
      title: 'รูปแบบอีเมลไม่ถูกต้อง',
      text: 'กรุณากรอกอีเมลให้ถูกต้อง',
      confirmButtonText: 'ตกลง'
    });
    return;
  }
  try {
    // 1. ถ้ามีรูปให้ส่งไปอัปโหลดก่อน
    if (profileImageFile.value) {
      const formData = new FormData();
      formData.append('profile', profileImageFile.value);

      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/members/upload-profile/${userId.value}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (uploadResponse.status === 200 && uploadResponse.data.url) {
        profileImg.value = uploadResponse.data.url;
      }
    }

    const profileData = { ...form, profile_img: profileImg.value };
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/members/update-profile/${userId.value}`,
      profileData
    );

    if (response.status === 200) {
      await Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ!',
        confirmButtonText: 'ตกลง'
      });
      editMode.value = false;
      Object.assign(originalForm.value, form);
      originalForm.value.profileImg = profileImg.value;
      profileImageFile.value = null;
      
      // โหลดที่อยู่ใหม่
      await loadMemberAddresses();
    } else {
      error.value = 'เกิดข้อผิดพลาดในการบันทึกข้อมูลส่วนตัว';
    }
  } catch (err) {
    error.value =
      'เกิดข้อผิดพลาด: ' +
      (err.response?.data?.error || err.message);
  } finally {
    setTimeout(() => {
      clearMessages();
    }, 5000);
  }
}

function onProfileImgChange(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      profileImg.value = ev.target.result;
    };
    reader.readAsDataURL(file);
    profileImageFile.value = file;
  } else {
    profileImageFile.value = null;
  }
}

// ฟังก์ชันการจัดการที่อยู่
const loadMemberAddresses = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/member-addresses/${userId.value}`);
    if (response.data.success) {
      memberAddresses.value = response.data.addresses;
    }
  } catch (error) {
    console.error('Error loading member addresses:', error);
  }
};

const resetAddressForm = () => {
  console.log('Resetting address form...');
  Object.assign(addressForm, {
    address_name: '',
    address: '',
    province: '',
    district: '',
    subdistrict: '',
    postal_code: '',
    province_id: '',
    district_id: '',
    subdistrict_id: '',
    is_default: false
  });
  addressDistricts.value = [];
  addressSubdistricts.value = [];
  console.log('Address form reset complete');
};

const openAddAddressModal = () => {
  resetAddressForm();
  showAddAddressModal.value = true;
  showEditAddressModal.value = false;
  editingAddressId.value = null;
  
  // รีเซ็ตข้อมูลอำเภอและตำบล
  addressDistricts.value = [];
  addressSubdistricts.value = [];
};

const editAddress = async (address) => {
  console.log('Editing address:', address);
  
  // รีเซ็ตฟอร์มก่อน
  resetAddressForm();
  
  // ตั้งค่าข้อมูลที่อยู่
  Object.assign(addressForm, {
    address_name: address.address_name,
    address: address.address,
    province: address.province,
    district: address.district,
    subdistrict: address.subdistrict,
    postal_code: address.postal_code,
    province_id: address.province_id,
    district_id: address.district_id,
    subdistrict_id: address.subdistrict_id,
    is_default: address.is_default
  });
  
  console.log('Address form set:', addressForm);
  
  // เปิด modal ก่อน
  showEditAddressModal.value = true;
  showAddAddressModal.value = false;
  editingAddressId.value = address._id;
  
  // รอให้ Vue อัปเดต DOM แล้วค่อยโหลดข้อมูล
  await nextTick();
  
  // รอให้ข้อมูลจังหวัดโหลดเสร็จก่อน
  if (provinces.value.length === 0) {
    await fetchProvincesAmphureTambon();
  }
  
  // รอสักครู่ให้ DOM อัปเดตเสร็จแล้วค่อยโหลดข้อมูล
  setTimeout(() => {
    console.log('Loading cascading data after timeout...');
    console.log('Current addressForm:', addressForm);
    console.log('Provinces loaded:', provinces.value.length);
    
    // โหลดอำเภอ
    loadAddressDistricts();
    
    // รอให้อำเภอโหลดเสร็จแล้วค่อยโหลดตำบล
    setTimeout(() => {
      console.log('Loading subdistricts after districts loaded...');
      loadAddressSubdistricts();
      
      // รอให้ตำบลโหลดเสร็จแล้วค่อยโหลดรหัสไปรษณีย์
      setTimeout(() => {
        console.log('Loading postal code after subdistricts loaded...');
        loadAddressPostalCode();
      }, 50);
    }, 50);
  }, 100);
};

const closeAddressModal = () => {
  showAddAddressModal.value = false;
  showEditAddressModal.value = false;
  editingAddressId.value = null;
  resetAddressForm();
  
  // รีเซ็ตข้อมูลอำเภอและตำบล
  addressDistricts.value = [];
  addressSubdistricts.value = [];
};

const saveAddress = async () => {
  try {
    // Validate required fields
    if (!addressForm.address_name || !addressForm.address || !addressForm.province_id || 
        !addressForm.district_id || !addressForm.subdistrict_id) {
      await Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    // Get province, district, subdistrict names
    const province = provinces.value.find(p => String(p.id) === String(addressForm.province_id));
    const district = addressDistricts.value.find(d => String(d.id) === String(addressForm.district_id));
    const subdistrict = addressSubdistricts.value.find(s => String(s.id) === String(addressForm.subdistrict_id));

    const addressData = {
      address_name: addressForm.address_name,
      address: addressForm.address,
      province: province?.name_th || '',
      district: district?.name_th || '',
      subdistrict: subdistrict?.name_th || '',
      postal_code: addressForm.postal_code,
      province_id: addressForm.province_id,
      district_id: addressForm.district_id,
      subdistrict_id: addressForm.subdistrict_id,
      is_default: addressForm.is_default
    };

    let response;
    if (showEditAddressModal.value && editingAddressId.value) {
      // Update existing address
      response = await axios.put(
        `${import.meta.env.VITE_API_URL}/member-addresses/${userId.value}/${editingAddressId.value}`,
        addressData
      );
    } else {
      // Add new address
      response = await axios.post(
        `${import.meta.env.VITE_API_URL}/member-addresses/${userId.value}`,
        addressData
      );
    }

    if (response.data.success) {
      await Swal.fire({
        icon: 'success',
        title: showEditAddressModal.value ? 'อัปเดตที่อยู่สำเร็จ' : 'เพิ่มที่อยู่สำเร็จ',
        confirmButtonText: 'ตกลง'
      });
      
      closeAddressModal();
      await loadMemberAddresses();
    }
  } catch (error) {
    console.error('Error saving address:', error);
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: error.response?.data?.error || 'เกิดข้อผิดพลาดในการบันทึกที่อยู่',
      confirmButtonText: 'ตกลง'
    });
  }
};

const deleteAddress = async (addressId) => {
  try {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'ยืนยันการลบ',
      text: 'คุณต้องการลบที่อยู่นี้หรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });

    if (result.isConfirmed) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/member-addresses/${userId.value}/${addressId}`
      );

      if (response.data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'ลบที่อยู่สำเร็จ',
          confirmButtonText: 'ตกลง'
        });
        await loadMemberAddresses();
      }
    }
  } catch (error) {
    console.error('Error deleting address:', error);
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: error.response?.data?.error || 'เกิดข้อผิดพลาดในการลบที่อยู่',
      confirmButtonText: 'ตกลง'
    });
  }
};

// Address modal cascading functions
const loadAddressDistricts = () => {
  console.log('loadAddressDistricts: province_id =', addressForm.province_id);
  console.log('Provinces available:', provinces.value.length);
  
  addressDistricts.value = [];
  addressSubdistricts.value = [];
  
  // ไม่รีเซ็ต district_id และ subdistrict_id เมื่อแก้ไข
  if (!showEditAddressModal.value) {
    addressForm.district_id = '';
    addressForm.subdistrict_id = '';
    addressForm.postal_code = '';
  }

  if (!addressForm.province_id) {
    console.log('No province_id provided');
    return;
  }

  const province = provinces.value.find(p => String(p.id) === String(addressForm.province_id));
  console.log('Found province:', province);
  
  if (province && province.amphure) {
    addressDistricts.value = province.amphure || [];
    console.log('Loaded districts:', addressDistricts.value.length);
    
    // ถ้าเป็นโหมดแก้ไข ให้โหลดตำบลด้วย
    if (showEditAddressModal.value && addressForm.district_id) {
      setTimeout(() => {
        loadAddressSubdistricts();
      }, 50);
    }
  } else {
    console.log('Province not found or no amphure data');
  }
};

const loadAddressSubdistricts = () => {
  console.log('loadAddressSubdistricts: district_id =', addressForm.district_id);
  console.log('Districts available:', addressDistricts.value.length);
  
  addressSubdistricts.value = [];
  
  // ไม่รีเซ็ต subdistrict_id เมื่อแก้ไข
  if (!showEditAddressModal.value) {
    addressForm.subdistrict_id = '';
    addressForm.postal_code = '';
  }

  if (!addressForm.district_id) {
    console.log('No district_id provided');
    return;
  }

  const district = addressDistricts.value.find(d => String(d.id) === String(addressForm.district_id));
  console.log('Found district:', district);
  
  if (district && district.tambon) {
    addressSubdistricts.value = district.tambon || [];
    console.log('Loaded subdistricts:', addressSubdistricts.value.length);
  } else {
    console.log('District not found or no tambon data');
  }
};

const loadAddressPostalCode = () => {
  console.log('loadAddressPostalCode: subdistrict_id =', addressForm.subdistrict_id);
  console.log('Subdistricts available:', addressSubdistricts.value.length);
  
  // ไม่รีเซ็ต postal_code เมื่อแก้ไข
  if (!showEditAddressModal.value) {
    addressForm.postal_code = '';
  }
  
  if (!addressForm.subdistrict_id) {
    console.log('No subdistrict_id provided');
    return;
  }

  const subdistrict = addressSubdistricts.value.find(s => String(s.id) === String(addressForm.subdistrict_id));
  console.log('Found subdistrict:', subdistrict);
  
  if (subdistrict) {
    addressForm.postal_code = subdistrict.zip_code || '';
    console.log('Set postal_code:', addressForm.postal_code);
  } else {
    console.log('Subdistrict not found');
  }
};

function enableEdit() {
  clearMessages();
  Object.assign(originalForm.value, form);
  originalForm.value.profileImg = profileImg.value;
  editMode.value = true;
}

function cancelEdit() {
  clearMessages();
  Object.assign(form, originalForm.value);
  profileImg.value = originalForm.value.profileImg;
  profileImageFile.value = null;
  editMode.value = false;
}

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || (!user._id && !user.id)) {
    router.push('/login');
    return;
  }
  await fetchProvincesAmphureTambon();
  await fetchUserData();
  await loadMemberAddresses();
});

const fetchProvincesAmphureTambon = async () => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json'
    );
    provinces.value = response.data;
  } catch (error) {
    console.error('Error fetching provinces: ', error);
    error.value = 'ไม่สามารถโหลดข้อมูลจังหวัดได้';
  }
};

// Watch สำหรับการเปลี่ยนแปลงจังหวัด
watch([() => provinces.value.length, () => addressForm.province_id], ([provLength, provId]) => {
  if (provLength && provId && (showAddAddressModal.value || showEditAddressModal.value)) {
    console.log('Province changed, loading districts...');
    loadAddressDistricts();
  }
});

// Watch สำหรับการเปลี่ยนแปลงอำเภอ
watch([() => addressDistricts.value.length, () => addressForm.district_id], ([distLength, distId]) => {
  if (distLength && distId && (showAddAddressModal.value || showEditAddressModal.value)) {
    console.log('District changed, loading subdistricts...');
    loadAddressSubdistricts();
  }
});

// Watch สำหรับการเปลี่ยนแปลงตำบล
watch([() => addressSubdistricts.value.length, () => addressForm.subdistrict_id], ([subLength, subId]) => {
  if (subLength && subId && (showAddAddressModal.value || showEditAddressModal.value)) {
    console.log('Subdistrict changed, loading postal code...');
    loadAddressPostalCode();
  }
});

// Watch สำหรับการเปิด modal แก้ไข
watch(showEditAddressModal, (newVal) => {
  if (newVal && addressForm.province_id) {
    console.log('Edit modal opened, loading cascading data...');
    // รอให้ DOM อัปเดตแล้วค่อยโหลดข้อมูล
    nextTick(() => {
      loadAddressDistricts();
      loadAddressSubdistricts();
    });
  }
});
</script>