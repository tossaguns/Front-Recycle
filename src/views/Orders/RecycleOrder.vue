<template>
  <BarNoMenu 
    :showBackNavigation="true"
    pageTitle="จองคิวขายสินค้ารีไซเคิล"
    backRoute="/partnerstores"
  />
  <div class="min-h-screen flex flex-col bg-white pt-20">
    <main class="flex-1 max-w-5xl mx-auto w-full px-4 py-10 flex flex-col gap-8 relative mt-0 md:mt-5">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-[#222]">จองคิวขายสินค้ารีไซเคิล</h1>
      <!-- User Info -->
      <div class="flex items-center gap-4 mb-6">
        <img :src="memberData.profile_img" class="w-12 h-12 rounded-full object-cover border-2 border-[#b6e388]" />
        <div class="flex flex-col">
          <span class="font-semibold text-lg">{{ memberData.fullName }}</span>
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
          <!-- <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">ชื่อ</label>
            <input type="text" v-model="bookingData.name"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white" />
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">หมายเลขโทรศัพท์</label>
            <input type="text" v-model="bookingData.phone"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white"
              placeholder="0891234567" />
          </div> -->
          <!-- เลือกประเภทสินค้า -->
<div class="flex flex-col gap-4">
  <label class="font-medium text-[#184c36]">เลือกประเภทสินค้า</label>
  <div class="relative mb-2">
    <input v-model="categorySearch" @focus="categoryDropdownOpen = true"
      @input="categoryDropdownOpen = true" @blur="categoryDropdownOpen = false"
      placeholder="ค้นหาหรือเลือกประเภทสินค้า"
      class="border border-[#b6e388] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-[#b6e388] focus:border-[#b6e388] transition" />
    <button v-if="selectedCategory" @click="clearCategory" type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
      ❌
    </button>
    <ul v-if="categoryDropdownOpen"
      class="absolute z-10 bg-white border border-[#b6e388] rounded w-full max-h-40 overflow-auto mt-1 shadow">
      <li v-for="cat in filteredCategoriesSearch" :key="cat._id"
        class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
        @mousedown.prevent="selectCategory(cat)">
        {{ cat.name }}
      </li>
      <li v-if="filteredCategoriesSearch.length === 0" class="px-3 py-2 text-gray-400">ไม่พบข้อมูล</li>
    </ul>
  </div>
</div>

<!-- เลือกประเภทย่อย -->
<div class="flex flex-col gap-4" v-if="selectedCategory">
  <label class="font-medium text-[#184c36]">เลือกประเภทย่อย</label>
  <div class="relative mb-2">
    <input v-model="subCategorySearch" @focus="subCategoryDropdownOpen = true"
      @input="subCategoryDropdownOpen = true" @blur="subCategoryDropdownOpen = false"
      placeholder="ค้นหาหรือเลือกประเภทย่อย"
      class="border border-[#b6e388] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-[#b6e388] focus:border-[#b6e388] transition" />
    <button v-if="selectedSubCategory" @click="clearSubCategory" type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
      ❌
    </button>
    <ul v-if="subCategoryDropdownOpen"
      class="absolute z-10 bg-white border border-[#b6e388] rounded w-full max-h-40 overflow-auto mt-1 shadow">
      <li v-for="sub in filteredSubCategoriesSearch" :key="sub._id"
        class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
        @mousedown.prevent="selectSubCategory(sub)">
        {{ sub.name }}
      </li>
      <li v-if="filteredSubCategoriesSearch.length === 0" class="px-3 py-2 text-gray-400">ไม่พบข้อมูล</li>
    </ul>
  </div>
</div>

<!-- เลือกสินค้า -->
<div class="flex flex-col gap-4" v-if="selectedCategory && selectedSubCategory">
  <label class="font-medium text-[#184c36]">เลือกสินค้า</label>
  <div class="relative mb-2">
    <input v-model="productSearch" @focus="productDropdownOpen = true"
      @input="productDropdownOpen = true" @blur="productDropdownOpen = false"
      placeholder="ค้นหาหรือเลือกสินค้า"
      class="border border-[#b6e388] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-[#b6e388] focus:border-[#b6e388] transition" />
    <button v-if="selectedProduct" @click="clearProduct" type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
      ❌
    </button>
    <ul v-if="productDropdownOpen"
      class="absolute z-10 bg-white border border-[#b6e388] rounded w-full max-h-40 overflow-auto mt-1 shadow">
      <li v-for="prod in filteredProductsSearch" :key="prod._id"
        class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
        @mousedown.prevent="selectProduct(prod)">
        {{ prod.name }}
      </li>
      <li v-if="filteredProductsSearch.length === 0" class="px-3 py-2 text-gray-400">ไม่พบข้อมูล</li>
    </ul>
  </div>
</div>

          <!-- จำนวนกิโลกรัม: แสดงเลย -->
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">จำนวน (กิโลกรัม)</label>
            <input type="number" v-model.number="sellAmount" :min="1" :max="selectedProductObj?.maxAmount || 999"
              class="rounded-full border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white"
              placeholder="จำนวนกิโลกรัม" @input="handleAmountInput" />
            <div v-if="selectedProductObj && sellAmount > selectedProductObj.maxAmount"
              class="text-red-600 text-xs mt-1">
              จำนวนสูงสุดที่ขายได้คือ {{ selectedProductObj.maxAmount }} กิโลกรัม
            </div>
            <!-- ปุ่มเพิ่มสินค้า -->
            <button type="button" @click="addItem" :disabled="!selectedProduct"
              class="bg-[#b6e388] hover:bg-[#a4d376] text-[#184c36] font-semibold py-2 px-4 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
              เพิ่มสินค้า
            </button>
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
              *ค่าจัดส่ง 15 บาท จะถูกหักจากยอดเงินที่ได้รับจากการขายสินค้า
            </span>
          </div>
          <div class="flex flex-col gap-4">
            <label class="font-medium text-[#184c36]">หมายเหตุเพิ่มเติม</label>
            <textarea v-model="bookingData.notes" rows="3"
              class="rounded-xl border border-[#b6e388] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white resize-none"
              placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"></textarea>
          </div>
        </div>

        <!-- อัปโหลดรูปภาพสินค้า/หน้าบ้าน และ Google Maps -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <!-- อัปโหลดรูปภาพสินค้า -->
          <div class="flex flex-col gap-3">
            <label class="font-normal sm:font-medium text-sm text-md text-[#184c36]">อัปโหลดรูปภาพสินค้า</label>
            <label
              class="aspect-square bg-[#f7faf0] rounded-xl flex items-center justify-center text-gray-300 border border-dashed border-[#b6e388] cursor-pointer hover:bg-[#edf5e1] transition">
              <span>เพิ่มรูปภาพสินค้า</span>
              <input type="file" accept="image/*" class="hidden" @change="handleImageUpload($event, 'product')" />
            </label>
            <div class="text-xs text-gray-500" v-if="uploadedImages.product && uploadedImages.product.name">{{
              uploadedImages.product.name }}</div>
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
              <div class="text-xs text-gray-500" v-if="uploadedImages.front && uploadedImages.front.name">{{
                uploadedImages.front.name }}</div>
            </div>

            <!-- Google Maps สำหรับปักหมุดตำแหน่ง -->
            <div class="flex flex-col gap-3">
              <label class="font-normal sm:font-medium text-sm text-md text-[#184c36]">ปักหมุดตำแหน่งหน้าบ้าน</label>
              <div class="relative">
                <!-- Google Maps Container -->
                <div id="google-map" class="w-full h-64 rounded-xl border-2 border-[#b6e388] overflow-hidden"></div>
                
                <!-- ปุ่มค้นหาตำแหน่งปัจจุบัน -->
                <button 
                  @click="getCurrentLocation" 
                  type="button"
                  class="absolute top-2 right-2 bg-white hover:bg-gray-50 text-[#184c36] p-2 rounded-lg shadow-md transition-colors"
                  title="ค้นหาตำแหน่งปัจจุบัน">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>

                <!-- แสดงพิกัดที่เลือก -->
                <div v-if="selectedLocation.lat && selectedLocation.lng" 
                     class="absolute bottom-2 left-2 bg-white bg-opacity-90 px-3 py-2 rounded-lg text-xs text-[#184c36]">
                  <div>ละติจูด: {{ selectedLocation.lat.toFixed(6) }}</div>
                  <div>ลองจิจูด: {{ selectedLocation.lng.toFixed(6) }}</div>
                </div>
              </div>
              
              <!-- คำแนะนำ -->
              <div class="text-xs text-gray-500">
                คลิกบนแผนที่เพื่อปักหมุดตำแหน่งหน้าบ้านของคุณ
              </div>
            </div>
          </template>
        </div>

        <!-- รายการสินค้าที่เลือก -->
        <div v-if="selectedItems.length > 0" class="bg-[#f7faf0] rounded-xl p-6 mt-6">
          <h3 class="font-semibold text-[#184c36] mb-4 text-lg">รายการสินค้าที่เลือก</h3>
          <div class="space-y-4">
            <div v-for="(item, index) in selectedItems" :key="index" class="bg-white rounded-lg p-4 shadow-sm">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h4 class="font-medium text-[#184c36]">{{ item.product_name }}</h4>
                  <p class="text-sm text-gray-600 mt-1">
                    จำนวน: {{ item.amount }} กิโลกรัม | ราคา: ฿{{ item.unit_price }}/กก.
                  </p>
                  <p class="text-sm font-medium text-[#184c36] mt-1">
                    ยอดรวม: ฿{{ item.subtotal.toLocaleString() }}
                  </p>
                </div>
                <button type="button" @click="removeItem(index)" class="text-red-500 hover:text-red-700 p-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- สรุปราคา -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">ราคาสินค้ารวม:</span>
              <span class="font-medium">฿{{ totalPrice.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">ค่าจัดส่ง:</span>
              <span class="font-medium text-red-600">-฿{{ pickupFee.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center text-lg font-semibold text-[#184c36]">
              <span>เงินที่ได้รับจริง:</span>
              <span>฿{{ grandTotal.toLocaleString() }}</span>
            </div>
          </div>
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
            <hr />
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
                  <span class="font-medium">{{ partnerData.partnerCompanyAddress }} ต.{{
                    partnerData.partnerCompanySubdistrict
                  }} อ.{{ partnerData.partnerCompanyDistrict }} จ.{{ partnerData.partnerCompanyProvince }} {{
                      partnerData.partnerCompanyPostalCode }}</span>
                </div>
              </div>
            </div>
            <hr />
            <!-- ข้อมูลสินค้า -->
            <div v-if="selectedItems.length > 0">
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">ข้อมูลสินค้า</h3>
              <div class="flex flex-col gap-1 mb-2">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">จำนวนรายการ:</span>
                  <span class="font-medium">{{ selectedItems.length }} รายการ</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ราคาสินค้ารวม:</span>
                  <span class="font-medium">฿{{ totalPrice.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ค่าจัดส่ง:</span>
                  <span class="font-medium text-red-600">-฿{{ pickupFee.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center font-semibold text-[#184c36]">
                  <span>เงินที่ได้รับจริง:</span>
                  <span>฿{{ grandTotal.toLocaleString() }}</span>
                </div>
              </div>
            </div>
            <hr />
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
                <div v-if="deliveryType === 'ให้รถเข้ารับสินค้า' && bookingData.address"
                  class="flex justify-between items-center">
                  <span class="text-gray-600">ที่อยู่รับสินค้า:</span>
                  <span class="font-medium text-sm">{{ bookingData.address }}</span>
                </div>
                <div v-if="bookingData.notes" class="flex justify-between items-center">
                  <span class="text-gray-600">หมายเหตุ:</span>
                  <span class="font-medium text-sm">{{ bookingData.notes }}</span>
                </div>
              </div>
            </div>
            <hr />
            <!-- รูปภาพที่อัปโหลด -->
            <div>
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">รูปภาพที่อัปโหลด</h3>
              <div v-if="Object.values(uploadedImages).some(img => img)" class="flex flex-col gap-2 mb-2">
                <div class="flex gap-2 flex-wrap">
                  <div v-if="uploadedImages.product" class="text-sm text-blue-600">✓ รูปสินค้า</div>
                  <div v-if="uploadedImages.front" class="text-sm text-blue-600">✓ รูปหน้าบ้าน</div>
                </div>
              </div>
              <div v-else class="flex flex-col gap-2 mb-2">
                <div class="text-sm text-blue-600">ยังไม่มีรูปภาพที่อัปโหลด</div>
              </div>
            </div>

            <!-- ข้อมูลตำแหน่ง (เฉพาะเมื่อเลือกให้รถเข้ารับสินค้า) -->
            <div v-if="deliveryType === 'ให้รถเข้ารับสินค้า' && selectedLocation.lat && selectedLocation.lng">
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">ข้อมูลตำแหน่ง</h3>
              <div class="flex flex-col gap-1 mb-2">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ละติจูด:</span>
                  <span class="font-medium text-sm">{{ selectedLocation.lat.toFixed(6) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">ลองจิจูด:</span>
                  <span class="font-medium text-sm">{{ selectedLocation.lng.toFixed(6) }}</span>
                </div>
              </div>
            </div>
            <hr />
            <!-- ยอดเงิน -->
            <div v-if="selectedItems.length > 0">
              <h3 class="font-semibold text-[#184c36] mb-2 text-base">ยอดเงิน</h3>
              <div class="flex flex-col gap-1 mb-2">
                <div class="flex flex-col">
                  <span class="text-[#184c36] font-semibold">ยอดเงินที่ได้รับจากการขายรีไซเคิล</span>
                  <span class="text-lg font-bold text-[#184c36]">
                    ฿ {{ totalPrice.toLocaleString() }} บาท
                  </span>
                </div>
                <div v-if="deliveryType === 'ให้รถเข้ารับสินค้า'" class="flex flex-col">
                  <span class="text-gray-500 text-sm">หักค่าบริการการจัดส่ง</span>
                  <span class="text-base font-semibold text-red-600">-฿ {{ pickupFee.toLocaleString() }} บาท</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-black text-md font-semibold">เงินที่ได้รับจริง</span>
                  <span class="text-lg font-bold text-[#184c36]">
                    ฿ {{ grandTotal.toLocaleString() }} บาท
                  </span>
                </div>
              </div>
            </div>
            <hr />
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
                    • ยอดเงินที่ได้รับอาจเปลี่ยนแปลงตามน้ำหนักและคุณภาพของสินค้า<br>
                    • ค่าจัดส่ง 15 บาท จะถูกหักจากยอดเงินที่ได้รับจากการขายสินค้า
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
            <button type="submit" :disabled="selectedItems.length === 0"
              class="bg-[#184c36] text-white px-10 py-2 rounded-full text-sm hover:bg-[#145029] transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed">
              {{ selectedItems.length === 0 ? 'กรุณาเลือกสินค้า' : 'จองคิว' }}
            </button>
          </div>
        </div>
      </form>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import BarNoMenu from '../../components/BarNoMenu.vue';
import Footer from '../../components/Footer.vue';
import Swal from 'sweetalert2'

const router = useRouter();
const deliveryType = ref('จัดส่งด้วยต้นเอง');
const today = new Date().toISOString().split('T')[0];

// ข้อมูล partner
const partner = JSON.parse(localStorage.getItem('selectedPartner') || '{}');
const partnerId = ref(partner.id || partner._id);

// ข้อมูลทั้งหมด
const allProducts = ref([]); // โหลดจาก backend
const allCategories = ref([]); // โหลดจาก backend
const allSubcategories = ref([]); // โหลดจาก backend

const categorySearch = ref('');
const subCategorySearch = ref('');
const productSearch = ref('');
const categoryDropdownOpen = ref(false);
const subCategoryDropdownOpen = ref(false);
const productDropdownOpen = ref(false);

// โหลดข้อมูลทั้งหมดครั้งเดียว
onMounted(async () => {
  const [productsPartnerRes, categoriesRes, subcategoriesRes] = await Promise.all([
    axios.get(`${import.meta.env.VITE_API_URL}/product-partners/shop/${partnerId.value}`),
    axios.get(`${import.meta.env.VITE_API_URL}/categories`),
    axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/all`)
  ]);
  allProducts.value = productsPartnerRes.data || [];
  allCategories.value = categoriesRes.data.categories || categoriesRes.data || [];
  allSubcategories.value = subcategoriesRes.data.subcategories || subcategoriesRes.data || [];
  // ... (โหลด member/partner data อื่นๆ ตามเดิม)
  loadMemberData();
  loadPartnerData();
  
  // โหลด Google Maps เมื่อเลือก "ให้รถเข้ารับสินค้า"
  if (deliveryType.value === 'ให้รถเข้ารับสินค้า') {
    initGoogleMaps();
  }
});

// // กรองเฉพาะสินค้าของร้านนี้
// const partnerProducts = computed(() =>
//   allProducts.value.filter(p => (p.shopId?._id || p.shopId) === partnerId.value)
// );
// กรอง categories เฉพาะที่มีใน partnerProducts
const partnerCategoryIds = computed(() =>
  [...new Set(allProducts.value.map(p => (p.productId?.category_id?._id || p.productId?.category_id || p.category_id?._id || p.category_id)))]
);
const partnerCategories = computed(() =>
  allCategories.value.filter(c => partnerCategoryIds.value.includes(c._id))
);
// กรอง subcategories เฉพาะที่มีใน partnerProducts
const partnerSubCategoryIds = computed(() =>
  [...new Set(allProducts.value.map(p => (p.productId?.subCategoryId?._id || p.productId?.subCategoryId || p.subCategoryId?._id || p.subCategoryId)).filter(Boolean))]
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
  allProducts.value
    .filter(p =>
      (p.productId?.subCategoryId?._id || p.productId?.subCategoryId || p.subCategoryId?._id || p.subCategoryId) === selectedSubCategory.value
    )
    .map(p => ({
      ...p,
      name: p.productId?.name || p.name || '-', // ให้มี field name สำหรับแสดงใน dropdown
      _id: p._id // ใช้ _id ของ product-partner
    }))
);

const filteredCategoriesSearch = computed(() =>
  partnerCategories.value.filter(cat =>
    cat.name.toLowerCase().includes(categorySearch.value.toLowerCase())
  )
);

const filteredSubCategoriesSearch = computed(() =>
  filteredSubCategories.value.filter(sub =>
    sub.name.toLowerCase().includes(subCategorySearch.value.toLowerCase())
  )
);

const filteredProductsSearch = computed(() =>
  filteredProducts.value.filter(prod =>
    prod.name.toLowerCase().includes(productSearch.value.toLowerCase())
  )
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
  // member_id: userId.value,
  store_id: partnerId.value,
  // phone: user.personalPhone,
  date: '',
  time: '',
  address: '',
  notes: ''
});

// ข้อมูลรูปภาพ
const uploadedImages = ref({
  product: null,
  front: null
});

// ข้อมูลตำแหน่งที่เลือกจาก Google Maps
const selectedLocation = ref({
  lat: null,
  lng: null
});

// Google Maps variables
let map = null;
let marker = null;

// รายการสินค้าที่เลือก
const selectedItems = ref([]);

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

const handleCategoryChange = () => {
  selectedSubCategory.value = '';
  selectedProduct.value = '';
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

    if (selectedItems.value.length === 0) {
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

    // ตรวจสอบว่ามีการปักหมุดตำแหน่งหรือไม่ (เฉพาะเมื่อเลือกให้รถเข้ารับสินค้า)
    if (deliveryType.value === 'ให้รถเข้ารับสินค้า' && (!selectedLocation.value.lat || !selectedLocation.value.lng)) {
      await Swal.fire({
        icon: 'warning',
        title: 'ยังไม่ได้ปักหมุดตำแหน่ง',
        text: 'กรุณาปักหมุดตำแหน่งหน้าบ้านบนแผนที่',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    // แสดง loading
    Swal.fire({
      title: 'กำลังดำเนินการ',
      text: 'กรุณารอสักครู่...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // เตรียมข้อมูลสำหรับส่งไป API
    const orderData = {
      member_id: userId.value,
      store_id: partnerId.value,
      booking_datetime: `${bookingData.value.date}T${bookingData.value.time}:00`,
      delivery_type: deliveryType.value === 'ให้รถเข้ารับสินค้า' ? 'ให้รถเข้ารับสินค้า' : 'จัดส่งด้วยต้นเอง',
      pickup_fee: pickupFee.value,
      notes: bookingData.value.notes,
      address: bookingData.value.address,
      phone: bookingData.value.phone,
      // เพิ่มพิกัดตำแหน่ง (เฉพาะเมื่อเลือกให้รถเข้ารับสินค้า)
      latitude: deliveryType.value === 'ให้รถเข้ารับสินค้า' ? selectedLocation.value.lat : null,
      longitude: deliveryType.value === 'ให้รถเข้ารับสินค้า' ? selectedLocation.value.lng : null,
      items: selectedItems.value.map(item => ({
        product_id: item.product_id,
        category_id: item.category_id,
        subcategory_id: item.subcategory_id,
        amount: item.amount,
        unit_price: item.unit_price,
        notes: item.notes
      }))
    };

    // สร้างการจองคิวก่อน (ไม่มีรูปภาพ)
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders/create`, orderData);

    if (response.data.success) {
      const orderId = response.data.order_id;

      // อัปโหลดรูปภาพ (ถ้ามี)
      const uploadedFiles = [];
      const uploadedTypes = [];

      for (const [type, file] of Object.entries(uploadedImages.value)) {
        if (file) {
          uploadedFiles.push(file);
          uploadedTypes.push(type);
        }
      }

      if (uploadedFiles.length > 0) {
        try {
          const formData = new FormData();
          uploadedFiles.forEach(file => {
            formData.append('images', file);
          });
          formData.append('types', JSON.stringify(uploadedTypes));

          await axios.post(`${import.meta.env.VITE_API_URL}/orders/${orderId}/images`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } catch (uploadError) {
          console.error('Error uploading images:', uploadError);
          // แม้รูปภาพอัปโหลดไม่สำเร็จ แต่การจองคิวสำเร็จแล้ว
        }
      }

      // ปิด loading และแสดงข้อความสำเร็จ
      Swal.close();
      await Swal.fire({
        icon: 'success',
        title: 'จองคิวสำเร็จ',
        text: 'การจองคิวของคุณได้รับการบันทึกเรียบร้อยแล้ว',
        confirmButtonText: 'ตกลง'
      });
      router.push('/partnerstores');
    }
  } catch (error) {
    console.error('Error creating order:', error);
    // ปิด loading และแสดงข้อความ error
    Swal.close();
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'เกิดข้อผิดพลาดในการจองคิว กรุณาลองใหม่อีกครั้ง',
      confirmButtonText: 'ตกลง'
    });
  }
};

// ยกเลิกการจอง
const cancelBooking = () => {
  router.push('/partnerdetail');
};

// กลับไปหน้าร้านค้า
const goBack = () => {
  router.push('/partnerdetail');
};

// โหลดที่อยู่เมื่อเลือก "ให้รถเข้ารับสินค้า"
watch(deliveryType, (val) => {
  if (val === 'ให้รถเข้ารับสินค้า') {
    loadMemberAddresses();
    // เริ่มต้น Google Maps เมื่อเลือกให้รถเข้ารับสินค้า
    nextTick(() => {
      initGoogleMaps();
    });
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

function selectCategory(cat) {
  selectedCategory.value = cat._id;
  categorySearch.value = cat.name;
  categoryDropdownOpen.value = false;
  selectedSubCategory.value = '';
  subCategorySearch.value = '';
  selectedProduct.value = '';
  productSearch.value = '';
}
function selectSubCategory(sub) {
  selectedSubCategory.value = sub._id;
  subCategorySearch.value = sub.name;
  subCategoryDropdownOpen.value = false;
  selectedProduct.value = '';
  productSearch.value = '';
}
function selectProduct(prod) {
  selectedProduct.value = prod._id;
  productSearch.value = prod.name;
  productDropdownOpen.value = false;
}
function clearCategory() {
  selectedCategory.value = '';
  categorySearch.value = '';
  selectedSubCategory.value = '';
  subCategorySearch.value = '';
  selectedProduct.value = '';
  productSearch.value = '';
}
function clearSubCategory() {
  selectedSubCategory.value = '';
  subCategorySearch.value = '';
  selectedProduct.value = '';
  productSearch.value = '';
}
function clearProduct() {
  selectedProduct.value = '';
  productSearch.value = '';
}

// เพิ่มสินค้าลงในรายการ
const addItem = async () => {
  if (!selectedProduct.value || !sellAmount.value) {
    await Swal.fire({
      icon: 'warning',
      title: 'ข้อมูลไม่ครบถ้วน',
      text: 'กรุณาเลือกสินค้าและจำนวน',
      confirmButtonText: 'ตกลง'
    });
    return;
  }

  const product = selectedProductObj.value;
  const existingItem = selectedItems.value.find(item => item.product_id === selectedProduct.value);

  if (existingItem) {
    existingItem.amount += sellAmount.value;
    existingItem.subtotal = existingItem.amount * existingItem.unit_price;
  } else {
    selectedItems.value.push({
      product_id: selectedProduct.value,
      category_id: selectedCategory.value,
      subcategory_id: selectedSubCategory.value,
      amount: sellAmount.value,
      unit_price: product.price_per_kg,
      subtotal: sellAmount.value * product.price_per_kg,
      notes: '',
      product_name: product.productId?.name || '-',
    });
  }

  // รีเซ็ตฟอร์ม
  selectedProduct.value = '';
  selectedSubCategory.value = '';
  selectedCategory.value = '';
  sellAmount.value = 1;
};

// ลบสินค้าออกจากรายการ
const removeItem = (index) => {
  selectedItems.value.splice(index, 1);
};

// คำนวณราคารวม
const totalPrice = computed(() => {
  return selectedItems.value.reduce((total, item) => total + item.subtotal, 0);
});

// คำนวณค่าจัดส่ง
const pickupFee = computed(() => {
  return deliveryType.value === 'ให้รถเข้ารับสินค้า' ? 15 : 0;
});

// ราคารวมทั้งหมด (เงินที่ลูกค้าได้จริง = ราคาสินค้า - ค่าจัดส่ง)
const grandTotal = computed(() => {
  return totalPrice.value - pickupFee.value;
});

// ========== Google Maps Functions ==========

// เริ่มต้น Google Maps
const initGoogleMaps = () => {
  // ตรวจสอบว่า Google Maps API โหลดแล้วหรือยัง
  if (typeof google === 'undefined') {
    // ถ้ายังไม่โหลด ให้โหลด Google Maps API
    loadGoogleMapsAPI();
    return;
  }
  
  // สร้างแผนที่
  createMap();
};

// โหลด Google Maps API
const loadGoogleMapsAPI = () => {
  // ตรวจสอบว่าโหลดแล้วหรือยัง
  if (window.google && window.google.maps) {
    createMap();
    return;
  }

  // สร้าง script tag สำหรับโหลด Google Maps API
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    createMap();
  };
  script.onerror = () => {
    console.error('ไม่สามารถโหลด Google Maps API ได้');
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'ไม่สามารถโหลดแผนที่ได้ กรุณาลองใหม่อีกครั้ง',
      confirmButtonText: 'ตกลง'
    });
  };
  document.head.appendChild(script);
};

// สร้างแผนที่
const createMap = () => {
  const mapContainer = document.getElementById('google-map');
  if (!mapContainer) {
    console.error('ไม่พบ element สำหรับแผนที่');
    return;
  }

  // ตำแหน่งเริ่มต้น (กรุงเทพฯ)
  const defaultLocation = { lat: 13.7563, lng: 100.5018 };
  
  // สร้างแผนที่
  map = new google.maps.Map(mapContainer, {
    center: defaultLocation,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  });

  // เพิ่ม event listener สำหรับคลิกบนแผนที่
  map.addListener('click', (event) => {
    placeMarker(event.latLng);
  });

  // พยายามหาตำแหน่งปัจจุบัน
  getCurrentLocation();
};

// วาง marker บนแผนที่
const placeMarker = (latLng) => {
  // ลบ marker เดิม (ถ้ามี)
  if (marker) {
    marker.setMap(null);
  }

  // สร้าง marker ใหม่
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: 'ตำแหน่งหน้าบ้าน',
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill="#b6e388" stroke="#184c36" stroke-width="2"/>
          <circle cx="16" cy="16" r="4" fill="#184c36"/>
        </svg>
      `),
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
    }
  });

  // บันทึกพิกัดที่เลือก
  selectedLocation.value = {
    lat: latLng.lat(),
    lng: latLng.lng()
  };

  // แสดงข้อมูลพิกัด
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 8px; font-family: Arial, sans-serif;">
        <div style="font-weight: bold; color: #184c36; margin-bottom: 4px;">ตำแหน่งหน้าบ้าน</div>
        <div style="font-size: 12px; color: #666;">
          ละติจูด: ${latLng.lat().toFixed(6)}<br>
          ลองจิจูด: ${latLng.lng().toFixed(6)}
        </div>
      </div>
    `
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });

  // ปิด info window หลังจาก 3 วินาที
  setTimeout(() => {
    infoWindow.close();
  }, 3000);
};

// หาตำแหน่งปัจจุบัน
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    Swal.fire({
      icon: 'warning',
      title: 'ไม่รองรับการระบุตำแหน่ง',
      text: 'เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่งปัจจุบัน',
      confirmButtonText: 'ตกลง'
    });
    return;
  }

  // แสดง loading
  Swal.fire({
    title: 'กำลังค้นหาตำแหน่ง',
    text: 'กรุณารอสักครู่...',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // ปิด loading
      Swal.close();

      // ย้ายแผนที่ไปตำแหน่งปัจจุบัน
      if (map) {
        map.setCenter(pos);
        placeMarker(new google.maps.LatLng(pos.lat, pos.lng));
      }
    },
    (error) => {
      // ปิด loading
      Swal.close();
      
      let errorMessage = 'เกิดข้อผิดพลาดในการค้นหาตำแหน่ง';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'กรุณาอนุญาตให้เข้าถึงตำแหน่งของคุณ';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'ไม่สามารถระบุตำแหน่งได้';
          break;
        case error.TIMEOUT:
          errorMessage = 'หมดเวลาการค้นหาตำแหน่ง';
          break;
      }

      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถค้นหาตำแหน่งได้',
        text: errorMessage,
        confirmButtonText: 'ตกลง'
      });
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  );
};
</script>

<style scoped>
main {
  background: url('/src/assets/bg-watermark.png') no-repeat right bottom;
  background-size: 40% auto;
}
</style>