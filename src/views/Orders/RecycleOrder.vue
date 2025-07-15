<template>
  <div class="min-h-screen flex flex-col bg-white">
    <Bar />
    <main class="flex-1 max-w-5xl mx-auto w-full px-4 py-10 flex flex-col gap-8 relative">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-[#222]">จองคิวขายสินค้ารีไซเคิล</h1>
      <!-- User Info -->
      <div class="flex items-center gap-4 mb-6">
        <img :src="memberData.profile_img" class="w-12 h-12 rounded-full object-cover border-2 border-[#b6e388]" />
        <div class="flex flex-col">
          <span class="font-semibold text-lg">{{ memberData.fullName }}</span>
          <span class="inline-block bg-[#e6f7e6] text-[#184c36] px-3 py-1 rounded-full text-xs font-semibold mt-1">50
            โควต้า</span>
        </div>
      </div>

      <!-- Partner Info -->
      <div v-if="partnerData.partnerCompanyName" class="bg-[#f7faf0] rounded-xl p-4 mb-6">
        <h3 class="font-semibold text-[#184c36] mb-2">ร้านที่เลือก</h3>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-[#b6e388] rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-[#184c36]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p class="font-medium text-[#184c36]">{{ partnerData.partnerCompanyName }}</p>
            <p class="text-sm text-gray-600">{{ partnerData.partnerCompanyAddress }} {{
              partnerData.partnerCompanySubdistrict }} {{ partnerData.partnerCompanyDistrict }} {{
                partnerData.partnerCompanyProvince }}</p>
          </div>
        </div>
      </div>
      <!-- Form -->
      <form @submit.prevent="confirmBooking" class="p-6 grid grid-cols-1 gap-6">
        <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">เลือกจังหวัด</label>
            <select v-model="selectedProvince" @change="handleProvinceChange"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white">
              <option value="">เลือกจังหวัด</option>
              <option v-for="province in provinces" :key="province.id" :value="province.id">
                {{ province.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">เลือกอำเภอ</label>
            <select v-model="selectedDistrict" @change="handleDistrictChange"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white">
              <option value="">เลือกอำเภอ</option>
              <option v-for="district in districts" :key="district.id" :value="district.id">
                {{ district.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">เลือกตำบล</label>
            <select v-model="selectedSubdistrict"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white">
              <option value="">เลือกตำบล</option>
              <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">
                {{ subdistrict.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-4 relative">
            <label class="font-medium text-[#184c36]">ค้นหาชื่อร้านค้าที่ต้องการ</label>
            <div class="relative">
              <svg class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text"
                class="pl-10 rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white w-full"
                placeholder="ค้นชื่อร้าน.." />
            </div>
          </div>
        </div> -->

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">ชื่อ</label>
            <input type="text" v-model="bookingData.name"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white" />
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">หมายเลขโทรศัพท์</label>
            <input type="text" v-model="bookingData.phone"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white"
              placeholder="0891234567" />
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">เลือกประเภทสินค้า</label>
            <select v-model="selectedCategory" @change="handleCategoryChange"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white">
              <option value="">เลือกประเภทสินค้า</option>
              <option v-for="cat in partnerCategories" :key="cat._id" :value="cat._id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">เลือกประเภทย่อย</label>
            <select v-model="selectedSubCategory" :disabled="!selectedCategory"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white">
              <option value="">เลือกประเภทย่อย</option>
              <option v-for="sub in filteredSubCategories" :key="sub._id" :value="sub._id">
                {{ sub.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">เลือกสินค้า</label>
            <select v-model="selectedProduct" :disabled="!selectedSubCategory"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white">
              <option value="">เลือกสินค้า</option>
              <option v-for="prod in filteredProducts" :key="prod._id" :value="prod._id">
                {{ prod.name }}
              </option>
            </select>
          </div>

          <!-- จำนวนกิโลกรัม: แสดงเมื่อเลือกสินค้าแล้ว -->
          <div class="flex flex-col gap-4" v-if="selectedProductObj">
            <label class="font-medium text-[#184c36]">จำนวน (กิโลกรัม)</label>
            <input
              type="number"
              v-model.number="sellAmount"
              :min="1"
              :max="selectedProductObj.maxAmount"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white"
              placeholder="จำนวนกิโลกรัม"
              @input="handleAmountInput"
            />
            <div v-if="sellAmount > selectedProductObj.maxAmount" class="text-red-600 text-xs mt-1">
              จำนวนสูงสุดที่ขายได้คือ {{ selectedProductObj.maxAmount }} กิโลกรัม
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">เลือกวันที่จอง</label>
            <input type="date" :min="today" v-model="bookingData.date"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white" />
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-semibold text-[#184c36] text-base">เลือกเวลา</label>
            <input type="time" v-model="bookingData.time"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm text-[#184c36] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388]" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-4" v-if="deliveryType === 'ให้รถเข้ารับสินค้า'">
            <label class="font-medium text-[#184c36]">เลือกที่อยู่สำหรับรับจุดรับสินค้า</label>
            <select v-model="selectedMemberAddressId" @change="onSelectMemberAddress"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white">
              <option v-for="addr in memberAddresses" :key="addr._id" :value="addr._id">
                {{ formatAddress(addr) }}
                <span v-if="addr.is_default"> (ที่อยู่หลัก)</span>
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-medium text-[#184c36]">เลือกการจัดส่ง</label>
            <select v-model="deliveryType"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white">
              <option>จัดส่งด้วยต้นเอง</option>
              <option>ให้รถเข้ารับสินค้า</option>
            </select>
            <span class="text-xs text-gray-500 pl-5">
              *กรณีที่ให้ทางร้านเข้ามารับและไม่ส่งสินค้าตามที่กำหนด มีค่าปรับ
            </span>
          </div>
        </div>

        <!-- อัปโหลดรูปภาพสินค้า/หน้าบ้าน/ปักหมุด -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
          <!-- อัปโหลดรูปภาพสินค้า -->
          <div class="flex flex-col gap-3">
            <label class="font-normal sm:font-medium text-sm text-md text-[#184c36]">อัปโหลดรูปภาพสินค้า</label>
            <label
              class="aspect-square bg-[#f7faf0] rounded-xl flex items-center justify-center text-gray-300 border border-dashed border-[#b6e388] cursor-pointer hover:bg-[#edf5e1] transition">
              <span>เพิ่มรูปภาพสินค้า</span>
              <input type="file" accept="image/*" class="hidden" @change="handleImageUpload($event, 'product')" />
            </label>
            <div class="text-xs text-gray-500" v-if="uploadedImages.product && uploadedImages.product.name">{{ uploadedImages.product.name }}</div>
          </div>

          <!-- เฉพาะให้รถเข้ารับสินค้า -->
          <template v-if="deliveryType === 'ให้รถเข้ารับสินค้า'">
            <div class="flex flex-col gap-3">
              <label class="font-normal sm:font-medium text-sm text-md text-[#184c36]">อัปโหลดรูปหน้าบ้าน</label>
              <label
                class="aspect-square bg-[#f7faf0] rounded-xl flex items-center justify-center text-gray-300 border border-dashed border-[#b6e388] cursor-pointer hover:bg-[#edf5e1] transition">
                <span>เพิ่มรูปหน้าบ้าน</span>
                <input type="file" accept="image/*" class="hidden" @change="handleImageUpload($event, 'front')" />
              </label>
              <div class="text-xs text-gray-500" v-if="uploadedImages.front && uploadedImages.front.name">{{ uploadedImages.front.name }}</div>
            </div>

            <div class="flex flex-col gap-3">
              <label class="font-normal sm:font-medium text-sm text-md text-[#184c36]">อัปโหลดรูปปักหมุดแผนที่</label>
              <label
                class="aspect-square bg-[#f7faf0] rounded-xl flex items-center justify-center text-gray-300 border border-dashed border-[#b6e388] cursor-pointer hover:bg-[#edf5e1] transition">
                <span>เพิ่มรูปปักหมุด</span>
                <input type="file" accept="image/*" class="hidden" @change="handleImageUpload($event, 'map')" />
              </label>
              <div class="text-xs text-gray-500" v-if="uploadedImages.map && uploadedImages.map.name">{{ uploadedImages.map.name }}</div>
            </div>
          </template>
        </div>


        <!-- Summary -->
        <div class="rounded-2xl shadow border-t-4 border-lime-400 p-6 mt-8 w-full bg-white">
          <div class="flex flex-col gap-6">
            <!-- ข้อมูล Member -->
            <div>
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">ข้อมูลลูกค้า</h3>
              <div class="flex flex-col gap-1 mb-2">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ชื่อลูกค้า:</span>
                  <span class="font-medium">{{ memberData.fullName }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">เบอร์โทร:</span>
                  <span class="font-medium">{{ memberData.personalPhone }}</span>
                </div>
              </div>
            </div>
            <hr/>
            <!-- ข้อมูล Partner -->
            <div>
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">ข้อมูลร้านค้า</h3>
              <div class="flex flex-col gap-1 mb-2">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ร้านค้า:</span>
                  <span class="font-medium">{{ partnerData.partnerCompanyName }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ที่อยู่:</span>
                  <span class="font-medium">{{ partnerData.partnerCompanyAddress }} ต.{{ partnerData.partnerCompanySubdistrict }} อ.{{ partnerData.partnerCompanyDistrict }} จ.{{ partnerData.partnerCompanyProvince }} {{ partnerData.partnerCompanyPostalCode }}</span>
                </div>
              </div>
            </div>
            <hr/>
            <!-- ข้อมูลสินค้า -->
            <div v-if="selectedProduct">
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">ข้อมูลสินค้า</h3>
              <div class="flex flex-col gap-1 mb-2">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ประเภทสินค้า:</span>
                  <span class="font-medium">{{ selectedCategoryObj?.name || '' }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">หมวดหมู่ย่อย:</span>
                  <span class="font-medium">{{ selectedSubCategoryObj?.name || '' }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">สินค้า:</span>
                  <span class="font-medium">{{ selectedProductObj?.name || '' }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ราคาต่อกิโลกรัม:</span>
                  <span class="font-medium">฿{{ selectedProductObj?.price_per_kg || 0 }}/กก.</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">จำนวน:</span>
                  <span class="font-medium">{{ sellAmount }} กิโลกรัม</span>
                </div>
              </div>
            </div>
            <hr/>
            <!-- ข้อมูลการจอง -->
            <div v-if="bookingData.date && bookingData.time">
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">ข้อมูลการจอง</h3>
              <div class="flex flex-col gap-1 mb-2">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">วันที่จอง:</span>
                  <span class="font-medium">{{ new Date(bookingData.date).toLocaleDateString('th-TH') }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">เวลา:</span>
                  <span class="font-medium">{{ bookingData.time }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ประเภทการจัดส่ง:</span>
                  <span class="font-medium">{{ deliveryType }}</span>
                </div>
                <div v-if="deliveryType === 'ให้รถเข้ารับสินค้า' && bookingData.address" class="flex justify-between items-center">
                  <span class="text-gray-600">ที่อยู่รับสินค้า:</span>
                  <span class="font-medium text-sm">{{ bookingData.address }}</span>
                </div>
              </div>
            </div>
            <hr/>
            <!-- รูปภาพที่อัปโหลด -->
            <div>
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">รูปภาพที่อัปโหลด</h3>
              <div v-if="Object.values(uploadedImages).some(img => img)" class="flex flex-col gap-2 mb-2">
                <div class="flex gap-2 flex-wrap">
                  <div v-if="uploadedImages.product" class="text-sm text-blue-600">✓ รูปสินค้า</div>
                  <div v-if="uploadedImages.front" class="text-sm text-blue-600">✓ รูปหน้าบ้าน</div>
                  <div v-if="uploadedImages.map" class="text-sm text-blue-600">✓ รูปปักหมุด</div>
                </div>
              </div>
              <div v-else class="flex flex-col gap-2 mb-2">
                <div class="text-sm text-blue-600">ยังไม่มีรูปภาพที่อัปโหลด</div>
              </div>
            </div>
            <hr/>
            <!-- ยอดเงิน -->
            <div>
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">ยอดเงิน</h3>
              <div class="flex flex-col gap-1 mb-2">
                <div class="flex flex-col">
                  <span class="text-[#184c36] font-semibold">ยอดเงินที่ได้รับจากการขายรีไซเคิล</span>
                  <span class="text-lg font-bold text-[#184c36]">
                    ฿ {{ (selectedProductObj?.price_per_kg || 0) * sellAmount }} บาท
                  </span>
                </div>
                <div v-if="deliveryType === 'ให้รถเข้ารับสินค้า'" class="flex flex-col">
                  <span class="text-gray-500 text-sm">ค่าบริการการจัดส่ง</span>
                  <span class="text-base font-semibold text-[#184c36]">฿ 15 บาท</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-black text-md font-semibold">ยอดรวม</span>
                  <span class="text-lg font-bold text-[#184c36]">
                    ฿ {{ ((selectedProductObj?.price_per_kg || 0) * sellAmount) + (deliveryType === 'ให้รถเข้ารับสินค้า' ? 15 : 0) }} บาท
                  </span>
                </div>
              </div>
            </div>
            <hr/>
            <!-- หมายเหตุ -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div class="flex items-start gap-2">
                <svg class="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p class="text-sm text-yellow-800 font-medium">หมายเหตุ</p>
                  <p class="text-xs text-yellow-700 mt-1">
                    • กรุณามาให้ตรงเวลาเพื่อความสะดวกในการให้บริการ<br>
                    • กรณีที่ให้ทางร้านเข้ามารับและไม่ส่งสินค้าตามที่กำหนด มีค่าปรับ<br>
                    • ยอดเงินที่ได้รับอาจเปลี่ยนแปลงตามน้ำหนักและคุณภาพของสินค้า
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4 gap-3">
            <button @click="cancelBooking" type="button"
              class="bg-gray-400 text-white px-10 py-2 rounded-full text-sm hover:bg-[#145029] transition duration-200">
              ยกเลิก
            </button>
            <button type="submit"
              class="bg-[#184c36] text-white px-10 py-2 rounded-full text-sm hover:bg-[#145029] transition duration-200">
              ยืนยัน
            </button>
          </div>
        </div>
      </form>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Bar from '../../components/Bar.vue';
import Footer from '../../components/Footer.vue';
import Swal from 'sweetalert2'

const router = useRouter();
const deliveryType = ref('จัดส่งด้วยต้นเอง');
const today = new Date().toISOString().split('T')[0];

// ข้อมูล partner
const partner = JSON.parse(localStorage.getItem('partner') || '{}');
const partnerId = ref(partner.id || partner._id);

// ข้อมูลทั้งหมด
const allProducts = ref([]); // โหลดจาก backend
const allCategories = ref([]); // โหลดจาก backend
const allSubcategories = ref([]); // โหลดจาก backend

// โหลดข้อมูลทั้งหมดครั้งเดียว
onMounted(async () => {
  const [productsRes, categoriesRes, subcategoriesRes] = await Promise.all([
    axios.get(`${import.meta.env.VITE_API_URL}/products`),
    axios.get(`${import.meta.env.VITE_API_URL}/categories`),
    axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/all`)
  ]);
  allProducts.value = productsRes.data.products || [];
  console.log('allProducts', allProducts.value);
  allCategories.value = categoriesRes.data.categories || categoriesRes.data || [];
  console.log('allCategories', allCategories.value);
  allSubcategories.value = subcategoriesRes.data.subcategories || subcategoriesRes.data || [];
  console.log('allSubcategories', allSubcategories.value);
  // ... (โหลด member/partner data อื่นๆ ตามเดิม)
  loadMemberData();
  loadPartnerData();
});

// กรองเฉพาะสินค้าของร้านนี้
const partnerProducts = computed(() =>
  allProducts.value.filter(p => (p.shopId?._id || p.shopId) === partnerId.value)
);
// กรอง categories เฉพาะที่มีใน partnerProducts
const partnerCategoryIds = computed(() =>
  [...new Set(partnerProducts.value.map(p => (p.category_id?._id || p.category_id)))]
);
const partnerCategories = computed(() =>
  allCategories.value.filter(c => partnerCategoryIds.value.includes(c._id))
);
// กรอง subcategories เฉพาะที่มีใน partnerProducts
const partnerSubCategoryIds = computed(() =>
  [...new Set(partnerProducts.value.map(p => (p.subCategoryId?._id || p.subCategoryId)).filter(Boolean))]
);
const partnerSubCategories = computed(() =>
  allSubcategories.value.filter(s => partnerSubCategoryIds.value.includes(s._id))
);

// State สำหรับ dropdown
const selectedCategory = ref('');
const selectedSubCategory = ref('');
const selectedProduct = ref('');

// กรอง subcategories ตาม category ที่เลือก
const filteredSubCategories = computed(() =>
  partnerSubCategories.value.filter(s => (s.categoryId?._id || s.categoryId) === selectedCategory.value)
);
// กรอง products ตาม subcategory ที่เลือก
const filteredProducts = computed(() =>
  partnerProducts.value.filter(p => (p.subCategoryId?._id || p.subCategoryId) === selectedSubCategory.value)
);

// ข้อมูล member
const memberData = ref({
  fullName: '',
  personalPhone: '',
  profile_img: '',
  username: '',
  personalProvince: '',
  personalDistrict: '',
  personalSubdistrict: '',
  personalProvinceId: '',
  personalDistrictId: '',
  personalSubdistrictId: '',
  role: '',
});

// ข้อมูลการจอง
const bookingData = ref({
  name: '',
  phone: '',
  productType: '',
  product: '',
  date: '',
  time: '',
  address: ''
});

// ข้อมูลรูปภาพ
const uploadedImages = ref({
  product: null,
  front: null,
  map: null
});

// --- เพิ่มสำหรับที่อยู่สมาชิก ---
const memberAddresses = ref([]);
const selectedMemberAddressId = ref('');

const user = JSON.parse(localStorage.getItem('user') || '{}');
const userId = ref(user.id || user._id);

const loadMemberData = async () => {
  try {
    if (userId) {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/members/profile/${userId.value}`);
      if (response.data) {
        memberData.value = {
          fullName: response.data.fullName,
          personalPhone: response.data.personalPhone,
          profile_img: response.data.profile_img
        };
        bookingData.value.name = memberData.value.fullName;
        bookingData.value.phone = memberData.value.personalPhone;
      }
    }
  } catch (error) {
    console.error('Error loading member data:', error);
    bookingData.value.name = memberData.value.fullName;
    bookingData.value.phone = memberData.value.personalPhone;
  }
};

const partnerData = ref({
  partnerfullName: '',
  partnerCompanyName: '',
  partnerCompanyPhone: '',
  partnerCompanyAddress: '',
  partnerCompanySubdistrict: '',
  partnerCompanyDistrict: '',
  partnerCompanyProvince: '',
  partnerCompanyPostalCode: '',
  partnerCompanyProvinceId: '',
  partnerCompanyDistrictId: '',
  partnerCompanySubdistrictId: '',
});

const loadPartnerData = async () => {
  try {
    if (partnerId.value) {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/partners/profile/${partnerId.value}`);
      console.log('response', response.data);
      if (response.data) {
        partnerData.value = {
          partnerfullName: response.data.fullName,
          partnerCompanyName: response.data.companyName,
          partnerCompanyPhone: response.data.companyPhone,
          partnerCompanyAddress: response.data.companyAddress,
          partnerCompanySubdistrict: response.data.companySubdistrict,
          partnerCompanyDistrict: response.data.companyDistrict,
          partnerCompanyProvince: response.data.companyProvince,
          partnerCompanyPostalCode: response.data.companyPostalCode,
          partnerCompanyProvinceId: response.data.companyProvinceId,
          partnerCompanyDistrictId: response.data.companyDistrictId,
        };
      }
    }
  } catch (error) {
    console.error('Error loading member data:', error);
  }
};

// ดึงข้อมูลสินค้า
const loadProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    const all = response.data.products || [];
    // กรองสินค้าเฉพาะร้านนี้
    const filtered = all.filter(p => p.store_id?._id === partnerId.value);
    allProducts.value = filtered;

    // ดึง category_id ที่ไม่ซ้ำกัน
    const categories = [];
    const seen = new Set();

    for (const product of filtered) {
      if (product.category_id && !seen.has(product.category_id._id)) {
        seen.add(product.category_id._id);
        categories.push(product.category_id);
      }
    }
  } catch (err) {
    console.error('Error loading products:', err);
    allProducts.value = [];
  }
};

const handleProductTypeChange = async () => {
  selectedProduct.value = '';
  // filterProductsByCategory(); // ลบฟังก์ชันที่ไม่ได้ใช้
  if (selectedCategory.value) { // ใช้ selectedCategory แทน selectedProductType
    await loadSubCategories(selectedCategory.value);
  } else {
    // subcategories.value = []; // ลบตัวแปรที่ไม่ได้ใช้
  }
};

// อัปโหลดรูปภาพ
const handleImageUpload = (event, type) => {
  const file = event.target.files[0];
  if (file) {
    uploadedImages.value[type] = file;
  }
};

// ยืนยันการจอง
const confirmBooking = async () => {
  try {
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!bookingData.value.name || !bookingData.value.phone || !bookingData.value.date || !bookingData.value.time) {
      await Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        confirmButtonText: 'ตกลง'
      });
      return;
    }
    if (!selectedProduct.value) {
      await Swal.fire({
        icon: 'warning',
        title: 'ยังไม่ได้เลือกสินค้า',
        text: 'กรุณาเลือกสินค้า',
        confirmButtonText: 'ตกลง'
      });
      return;
    }
    if (deliveryType.value === 'ให้รถเข้ารับสินค้า' && !bookingData.value.address) {
      await Swal.fire({
        icon: 'warning',
        title: 'ไม่มีที่อยู่รับสินค้า',
        text: 'กรุณาเลือกที่อยู่สำหรับรับสินค้า',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      await Swal.fire({
        icon: 'warning',
        title: 'ยังไม่ได้เข้าสู่ระบบ',
        text: 'กรุณาเข้าสู่ระบบก่อนทำรายการ',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    // เตรียมข้อมูลสำหรับส่งไป API
    const orderData = {
      user_id: userId.value,
      store_id: partnerData.value.id,
      date: bookingData.value.date,
      time: bookingData.value.time,
      delivery_type: deliveryType.value,
      products: [{
        product_id: selectedProduct.value,
        quantity: 1
      }],
      pickup_address: deliveryType.value === 'ให้รถเข้ารับสินค้า' ? bookingData.value.address : '',
      customer_name: bookingData.value.name,
      customer_phone: bookingData.value.phone
    };

    // อัปโหลดรูปภาพ (ถ้ามี)
    const images = [];
    for (const [type, file] of Object.entries(uploadedImages.value)) {
      if (file) {
        // ส่งรูปภาพไปยัง server และได้ URL กลับมา
        const formData = new FormData();
        formData.append('files', file);

        try {
          const uploadResponse = await axios.post(`${import.meta.env.VITE_API_URL}/partners/upload`, formData);
          if (uploadResponse.data.files && uploadResponse.data.files.length > 0) {
            images.push({
              type: type,
              url: uploadResponse.data.files[0].url
            });
          }
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
        }
      }
    }

    if (images.length > 0) {
      orderData.images = images;
    }

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/create`, orderData);

    if (response.data.success) {
      alert('จองคิวสำเร็จ');
      router.push('/partnerstores');
    }
  } catch (error) {
    console.error('Error booking:', error);
    alert('เกิดข้อผิดพลาดในการจองคิว');
  }
};

// ยกเลิกการจอง
const cancelBooking = () => {
  router.push('/partnerstores');
};

// โหลดที่อยู่เมื่อเลือก "ให้รถเข้ารับสินค้า"
watch(deliveryType, (val) => {
  if (val === 'ให้รถเข้ารับสินค้า') {
    loadMemberAddresses();
  }
});

// เพิ่มฟังก์ชัน onSelectMemberAddress
function onSelectMemberAddress() {
  const addr = memberAddresses.value.find(a => a._id === selectedMemberAddressId.value);
  if (addr) {
    bookingData.value.address = formatAddress(addr);
  }
}

const loadMemberAddresses = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/member-addresses/${userId.value}`);
    if (response.data.success) {
      memberAddresses.value = response.data.addresses;
      // ตั้ง default address
      const defaultAddr = memberAddresses.value.find(addr => addr.is_default);
      if (defaultAddr) {
        selectedMemberAddressId.value = defaultAddr._id;
        bookingData.value.address = formatAddress(defaultAddr);
      } else if (memberAddresses.value.length > 0) {
        selectedMemberAddressId.value = memberAddresses.value[0]._id;
        bookingData.value.address = formatAddress(memberAddresses.value[0]);
      }
    }
  } catch (error) {
    console.error('Error loading member addresses:', error);
  }
};

function formatAddress(addr) {
  return `${addr.address_name} ${addr.address} ต.${addr.subdistrict} อ.${addr.district} จ.${addr.province} ${addr.postal_code}`;
}

const selectedProductObj = computed(() => {
  return allProducts.value.find(p => p._id === selectedProduct.value);
});

const selectedCategoryObj = computed(() => {
  return allCategories.value.find(c => c._id === (selectedProductObj.value?.category_id?._id || selectedProductObj.value?.category_id));
});

const selectedSubCategoryObj = computed(() => {
  return allSubcategories.value.find(s => s._id === (selectedProductObj.value?.subCategoryId?._id || selectedProductObj.value?.subCategoryId));
});

// คำนวณราคาสินค้า
const selectedProductPrice = computed(() => {
  const product = allProducts.value.find(p => p._id === selectedProduct.value);
  return product ? product.price_per_kg : 0;
});

const sellAmount = ref(1);
function handleAmountInput() {
  if (sellAmount.value > (selectedProductObj.value?.maxAmount || 0)) {
    sellAmount.value = selectedProductObj.value.maxAmount;
  }
  if (sellAmount.value < 1) {
    sellAmount.value = 1;
  }
}
</script>

<style scoped>
main {
  background: url('/src/assets/bg-watermark.png') no-repeat right bottom;
  background-size: 40% auto;
}
</style>