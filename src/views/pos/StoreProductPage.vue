<template>
  <!-- BarNoMenu Component (สมมติว่ามีอยู่แล้ว) -->
  <BarNoMenu :showBackNavigation="true" pageTitle="คลังสินค้า" backRoute="/homepartner" />
  <div class="min-h-screen bg-gray-50 pb-5 pt-24">

    <!-- ฟอร์มสร้าง/แก้ไขสินค้า -->
    <div class="max-w-full mx-5 md:mx-10 bg-white rounded-xl shadow border border-[#e6e6e6] p-3 md:p-8 mt-10">
      <h2 class="text-2xl font-bold text-[#184c36] mb-8">{{ editMode ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า' }}</h2>
      <form @submit.prevent="saveStoreProduct" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

        <!-- 1. ประเภทหลัก -->
        <div class="flex-1">
          <label class="block font-semibold mb-2 text-[#184c36]">ประเภทหลัก</label>
          <div class="relative mb-2">
            <input v-model="categorySearch" @focus="categoryDropdownOpen = true" @input="categoryDropdownOpen = true"
              @blur="categoryDropdownOpen = false" placeholder="ค้นหาหรือเลือกประเภทหลัก"
              class="border border-[#e6e6e6] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
            <!-- เปลี่ยนจาก selectedCategoryId เป็น form.categoryId สำหรับปุ่ม X -->
            <button v-if="form.categoryId" @click="clearCategory" type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
              ❌
            </button>
            <ul v-if="categoryDropdownOpen"
              class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full max-h-40 overflow-auto mt-1 shadow">
              <li v-for="cat in filteredCategories" :key="cat.id"
                class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
                @mousedown.prevent="selectCategory(cat)">
                {{ cat.name }}</li>
              <li v-if="filteredCategories.length === 0" class="px-3 py-2 text-gray-400">ไม่พบข้อมูล</li>
            </ul>
          </div>
          <div class="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 mb-2">
            <button class="bg-green-100 text-[#184c36] hover:bg-green-200 px-4 py-2 rounded shadow-sm"
              @click="showCategoryModal = true">สร้างใหม่</button>
            <span class="text-xs text-gray-500 mt-1 md:mt-0">💡 คำแนะนำ: ค้นหาก่อนเพื่อหลีกเลี่ยงการสร้างซ้ำ</span>
          </div>
        </div>

        <!-- 2. ประเภทย่อย (แสดงเมื่อเลือกประเภทหลักแล้ว) -->
        <!-- เปลี่ยน v-if="selectedCategoryId" เป็น v-if="form.categoryId" -->
        <div class="flex-1" v-if="form.categoryId">
          <label class="block font-semibold mb-2 text-[#184c36]">ประเภทย่อย</label>
          <div class="relative mb-2">
            <input v-model="subCategorySearch" @focus="subCategoryDropdownOpen = true"
              @input="subCategoryDropdownOpen = true" @blur="subCategoryDropdownOpen = false"
              placeholder="ค้นหาหรือเลือกประเภทย่อย"
              class="border border-[#e6e6e6] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
            <!-- เปลี่ยนจาก selectedSubCategoryId เป็น form.subCategoryId สำหรับปุ่ม X -->
            <button v-if="form.subCategoryId" @click="clearSubCategory" type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
              ❌
            </button>
            <ul v-if="subCategoryDropdownOpen"
              class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full max-h-40 overflow-auto mt-1 shadow">
              <li v-for="sub in filteredSubCategories" :key="sub.id"
                class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
                @mousedown.prevent="selectSubCategory(sub)">{{ sub.name }}</li>
              <li v-if="filteredSubCategories.length === 0" class="px-3 py-2 text-gray-400">ไม่พบข้อมูล</li>
            </ul>
          </div>
          <div class="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 mb-2">
            <button class="bg-green-100 text-[#184c36] hover:bg-green-200 px-4 py-2 rounded shadow-sm"
              @click="showSubCategoryModal = true">สร้างใหม่</button>
            <span class="text-xs text-gray-500 mt-1 md:mt-0">💡 คำแนะนำ: ค้นหาก่อนเพื่อหลีกเลี่ยงการสร้างซ้ำ</span>
          </div>
        </div>

        <!-- 3. สินค้า (ชื่อสินค้า) - แสดงเมื่อเลือกประเภทหลักและประเภทย่อยแล้ว -->
        <!-- เปลี่ยน v-if="selectedCategoryId && selectedSubCategoryId" เป็น v-if="form.categoryId && form.subCategoryId" -->
        <div class="flex-1" v-if="form.categoryId && form.subCategoryId">
          <label class="block font-semibold mb-2 text-[#184c36]">สินค้า</label>
          <div class="relative mb-2">
            <input v-model="productSearch" @focus="productDropdownOpen = true" @input="productDropdownOpen = true"
              @blur="productDropdownOpen = false" placeholder="ค้นหาหรือเลือกสินค้า"
              class="border border-[#e6e6e6] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
            <!-- เปลี่ยนจาก selectedProductId เป็น form.productId สำหรับปุ่ม X -->
            <button v-if="form.productId" @click="clearProduct" type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
              ❌
            </button>
            <ul v-if="productDropdownOpen"
              class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full max-h-40 overflow-auto mt-1 shadow">
              <li v-for="prod in filteredProducts" :key="prod.id"
                class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
                @mousedown.prevent="selectProduct(prod)">
                {{ prod.name }}</li>
              <li v-if="filteredProducts.length === 0" class="px-3 py-2 text-gray-400">ไม่พบข้อมูล</li>
            </ul>
          </div>
          <div class="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 mb-2">
            <button class="bg-green-100 text-[#184c36] hover:bg-green-200 px-4 py-2 rounded shadow-sm"
              @click="showProductModal = true">สร้างใหม่</button>
            <span class="text-xs text-gray-500 mt-1 md:mt-0">💡 คำแนะนำ: ค้นหาก่อนเพื่อหลีกเลี่ยงการสร้างซ้ำ</span>
          </div>
        </div>

        <!-- ฟิลด์เดิมที่เหลือ (ส่วนนี้ไม่มีการเปลี่ยนแปลงใน template) -->
        <div>
          <label class="block font-semibold mb-2 text-[#184c36]">สถานะ</label>
          <select v-model="form.status"
            class="w-full border border-[#e6e6e6] rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
            <option value="รับซื้อ">รับซื้อ</option>
            <option value="งดรับ">งดรับ</option>
          </select>
        </div>

        <div>
          <label class="block font-semibold mb-2 text-[#184c36]">Stock</label>
          <input v-model.number="form.stockQuantity" type="number"
            class="w-full border border-[#e6e6e6] rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
            min="0" />
        </div>

        <div>
          <label class="block font-semibold mb-2 text-[#184c36]">หน่วย</label>
          <select v-model="form.unit"
            class="w-full border border-[#e6e6e6] rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
            required>
            <option value="" disabled>เลือกหน่วยสินค้า</option>
            <option value="เมตริกตัน">เมตริกตัน (mt)</option>
            <option value="ตัน">ตัน (t)</option>
            <option value="กิโลกรัม">กิโลกรัม (kg)</option>
            <option value="กรัม">กรัม (g)</option>
          </select>
        </div>

        <div>
          <label class="block font-semibold mb-2 text-[#184c36]">ราคาทุน</label>
          <input v-model.number="form.costPrice" type="number"
            class="w-full border border-[#e6e6e6] rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
            min="0" />
        </div>

        <div>
          <label class="block font-semibold mb-2 text-[#184c36]">ราคาขาย</label>
          <input v-model.number="form.sellingPrice" type="number"
            class="w-full border border-[#e6e6e6] rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
            min="0" />
        </div>

        <div class="md:col-span-2 flex justify-end mt-4">
          <button type="submit"
            class="bg-[#184c36] hover:bg-green-700 text-white px-8 py-2 rounded shadow-sm transition">
            {{ editMode ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า' }}
          </button>
        </div>

      </form>
    </div>

    <!-- ตารางสินค้าในสต็อก -->
    <div class="max-w-full mx-5 md:mx-10 mt-12 bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-4 md:p-8">
      <h2 class="text-xl md:text-2xl font-bold text-[#184c36] mb-4 md:mb-6">รายการสินค้าในสต็อกทั้งหมด</h2>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-1">ค้นหาด้วยชื่อสินค้า</label>
      <input v-model="searchProductName" type="text" placeholder="พิมพ์ชื่อสินค้าเพื่อค้นหา..."
        class="w-full border border-[#e6e6e6] rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
    </div>
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-1">ประเภทหลัก</label>
      <div class="relative">
        <input v-model="filterCategorySearch" @focus="filterCategoryDropdownOpen = true"
          @input="filterCategoryDropdownOpen = true" @blur="closeFilterCategoryDropdown"
          placeholder="ทั้งหมด"
          class="border border-[#e6e6e6] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
        <button v-if="filterCategoryId" @click="clearFilterCategory" type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
          ❌
        </button>
        <ul v-if="filterCategoryDropdownOpen && filteredFilterCategories.length > 0"
          class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full max-h-40 overflow-auto mt-1 shadow">
          <li class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]" @mousedown.prevent="selectFilterCategory({ id: '', name: 'ทั้งหมด' })">
            ทั้งหมด
          </li>
          <li v-for="cat in filteredFilterCategories" :key="cat.id"
            class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
            @mousedown.prevent="selectFilterCategory(cat)">
            {{ cat.name }}
          </li>
        </ul>
        <div v-if="filterCategoryDropdownOpen && filteredFilterCategories.length === 0"
          class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full mt-1 shadow px-3 py-2 text-gray-400">
          ไม่พบข้อมูล
        </div>
      </div>
    </div>
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-1">ประเภทย่อย</label>
      <div class="relative">
        <input v-model="filterSubCategorySearch" @focus="filterSubCategoryDropdownOpen = true"
          @input="filterSubCategoryDropdownOpen = true" @blur="closeFilterSubCategoryDropdown"
          placeholder="ทั้งหมด"
          class="border border-[#e6e6e6] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
          :disabled="!filterCategoryId" />
        <button v-if="filterSubCategoryId" @click="clearFilterSubCategory" type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
          ❌
        </button>
        <ul v-if="filterSubCategoryDropdownOpen && filteredFilterSubCategories.length > 0"
          class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full max-h-40 overflow-auto mt-1 shadow">
          <li class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]" @mousedown.prevent="selectFilterSubCategory({ id: '', name: 'ทั้งหมด' })">
            ทั้งหมด
          </li>
          <li v-for="sub in filteredFilterSubCategories" :key="sub.id"
            class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
            @mousedown.prevent="selectFilterSubCategory(sub)">
            {{ sub.name }}
          </li>
        </ul>
        <div v-if="filterSubCategoryDropdownOpen && filteredFilterSubCategories.length === 0"
          class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full mt-1 shadow px-3 py-2 text-gray-400">
          ไม่พบข้อมูล
        </div>
      </div>
    </div>
  </div>

      <div class="overflow-x-auto rounded-xl border border-[#e6e6e6]">
        <table class="min-w-full text-sm table-fixed">
          <thead class="bg-green-100 text-[#184c36] font-semibold text-left">
            <tr>
              <th class="px-4 py-3 border-r border-[#e6e6e6] whitespace-nowrap">ชื่อสินค้า</th>
              <th class="px-4 py-3 border-r border-[#e6e6e6] text-center whitespace-nowrap min-w-[90px]">สถานะ</th>
              <th class="px-4 py-3 border-r border-[#e6e6e6] text-center whitespace-nowrap">Stock</th>
              <th class="px-4 py-3 border-r border-[#e6e6e6] text-center whitespace-nowrap hidden sm:table-cell">ราคาทุน</th>
              <th class="px-4 py-3 border-r border-[#e6e6e6] text-center whitespace-nowrap">ราคาขาย</th>
              <th class="px-4 py-3 border-r border-[#e6e6e6] text-center whitespace-nowrap hidden md:table-cell">หน่วย</th>
              <th class="px-4 py-3 text-center whitespace-nowrap">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedItems" :key="item._id"
              class="border-b border-[#e6e6e6] last:border-b-0 hover:bg-green-50 transition-colors">
              <td class="px-4 py-3 border-r border-[#e6e6e6] font-medium text-[#184c36] whitespace-nowrap">{{ item.productName }}</td>
              <td class="px-4 py-3 border-r border-[#e6e6e6] text-center min-w-[90px]">
                <span :class="['py-1 px-3 rounded-full text-xs font-semibold', item.status === 'รับซื้อ' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800']">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-3 border-r border-[#e6e6e6] text-center">{{ item.stockQuantity }}</td>
              <td class="px-4 py-3 border-r border-[#e6e6e6] text-center hidden sm:table-cell">{{ item.costPrice }}</td>
              <td class="px-4 py-3 border-r border-[#e6e6e6] text-center">{{ item.sellingPrice }}</td>
              <td class="px-4 py-3 border-r border-[#e6e6e6] text-center hidden md:table-cell">{{ item.unit }}</td>
              <td class="px-4 py-3 text-center space-x-2 flex justify-center items-center">
                <button @click="handleViewProduct(item)" class="text-blue-600 hover:text-blue-800 transition-colors" title="ดูข้อมูลสินค้า">🔍</button>
                <button @click="handleEditProduct(item)" class="text-yellow-600 hover:text-yellow-800 transition-colors" title="แก้ไข">✏️</button>
                <button @click="deleteItem(item._id)" class="text-red-600 hover:text-red-800 transition-colors" title="ลบ">🗑️</button>
              </td>
            </tr>
            <tr v-if="paginatedItems.length === 0">
              <td colspan="7" class="px-4 py-4 text-center text-gray-500">ไม่พบสินค้าในสต็อก</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="totalPages > 1" class="flex flex-col sm:flex-row justify-between items-center mt-6">
        <div class="flex items-center gap-2 mb-4 sm:mb-0">
          <label for="rows-per-page" class="text-gray-700">แสดง</label>
          <select v-model="itemsPerPage" id="rows-per-page" class="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400">
            <option v-for="option in rowsPerPageOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          <span class="text-gray-700">แถวต่อหน้า</span>
        </div>

        <nav class="flex items-center gap-2 text-gray-700">
          <span class="text-sm">หน้า {{ currentPage }} จาก {{ totalPages }}</span>
          <button @click="prevPage" :disabled="currentPage === 1" 
            class="p-2 border rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" 
            :class="['p-2 text-sm font-medium rounded-full w-8 h-8 flex items-center justify-center', 
            page === currentPage ? 'bg-[#184c36] text-white' : 'hover:bg-gray-200 transition-colors']">
            {{ page }}
          </button>

          <button @click="nextPage" :disabled="currentPage === totalPages" 
            class="p-2 border rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </div>


    <!-- Modal: สร้างประเภทหลัก -->
    <div v-if="showCategoryModal" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md space-y-4 mx-3">
        <h3 class="font-bold mb-4 text-[#184c36]">สร้างประเภทหลักใหม่</h3>
        <input v-model="newCategory.name" placeholder="ชื่อประเภทหลัก"
          class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-1 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
        <div v-if="categoryNameExists" class="text-red-500 text-sm mb-2">ชื่อมีอยู่แล้วสามารถเลือกหาเลือกได้
        </div>
        <div class="relative">
          <label for="categoryImageInput"
            class="upload-button block w-full text-center py-2 px-4 rounded-md border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer hover:border-green-500 hover:text-green-700 transition">
            <span class="upload-icon flex justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </span>
            <span class="upload-text text-sm font-medium">เลือกรูปภาพ</span>
            <span class="upload-hint text-xs text-gray-500 block">JPG, PNG, GIF (สูงสุด 2MB)</span>
            <input id="categoryImageInput" type="file" accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="onCategoryImageChange" />
          </label>
          <div v-if="categoryImageFileName" class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center gap-2 text-sm text-green-700">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="truncate">{{ categoryImageFileName }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button class="px-4 py-2 text-[#184c36]" @click="showCategoryModal = false">ยกเลิก</button>
          <button class="bg-[#184c36] hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
            @click="handleCreateCategory" :disabled="categoryNameExists || !newCategory.name || loadingCategory">
            <span v-if="loadingCategory">
              <svg class="animate-spin h-4 w-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 12c0 6.075-4.925 11-11 11S2.5 18.075 2.5 12 7.425 1 13.5 1">
                </path>
              </svg> กำลังบันทึก...</span>
            <span v-else>บันทึก</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal: สร้างประเภทย่อย -->
    <div v-if="showSubCategoryModal" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md space-y-4 mx-3">
        <h3 class="font-bold mb-4 text-[#184c36]">สร้างประเภทย่อยใหม่</h3>
        <input v-model="newSubCategory.name" placeholder="ชื่อประเภทย่อย"
          class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-1 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
        <div v-if="subCategoryNameExists" class="text-red-500 text-sm mb-2">
          ชื่อมีอยู่แล้วสามารถเลือกหาเลือกได้</div>
        <div class="relative">
          <label for="subCategoryImageInput"
            class="upload-button block w-full text-center py-2 px-4 rounded-md border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer hover:border-green-500 hover:text-green-700 transition">
            <span class="upload-icon flex justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </span>
            <span class="upload-text text-sm font-medium">เลือกรูปภาพ</span>
            <span class="upload-hint text-xs text-gray-500 block">JPG, PNG, GIF (สูงสุด 2MB)</span>
            <input id="subCategoryImageInput" type="file" accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="onSubCategoryImageChange" />
          </label>
          <div v-if="subCategoryImageFileName" class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center gap-2 text-sm text-green-700">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="truncate">{{ subCategoryImageFileName }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button class="px-4 py-2 text-[#184c36]" @click="showSubCategoryModal = false">ยกเลิก</button>
          <button class="bg-[#184c36] hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
            @click="handleCreateSubCategory"
            :disabled="subCategoryNameExists || !newSubCategory.name || loadingSubCategory">
            <span v-if="loadingSubCategory">
              <svg class="animate-spin h-4 w-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 12c0 6.075-4.925 11-11 11S2.5 18.075 2.5 12 7.425 1 13.5 1">
                </path>
              </svg> กำลังบันทึก...</span>
            <span v-else>บันทึก</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal: สร้างสินค้าใหม่ -->
    <div v-if="showProductModal" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md space-y-4 mx-3">
        <h3 class="font-bold mb-4 text-[#184c36]">สร้างสินค้าใหม่</h3>
        <input v-model="newProduct.name" placeholder="ชื่อสินค้า"
          class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-1 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
        <div v-if="productNameExists" class="text-red-500 text-sm mb-2">
          ชื่อสินค้านี้มีอยู่แล้ว
        </div>
        <div class="relative">
          <label for="productImageInputModal"
            class="upload-button block w-full text-center py-2 px-4 rounded-md border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer hover:border-green-500 hover:text-green-700 transition">
            <span class="upload-icon flex justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </span>
            <span class="upload-text text-sm font-medium">เลือกรูปภาพ</span>
            <span class="upload-hint text-xs text-gray-500 block">JPG, PNG, GIF (สูงสุด 2MB)</span>
            <input id="productImageInputModal" type="file" accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="onProductImageChange" />
          </label>
          <div v-if="productImageFileName" class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center gap-2 text-sm text-green-700">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="truncate">{{ productImageFileName }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button class="px-4 py-2 text-[#184c36]" @click="showProductModal = false">ยกเลิก</button>
          <button class="bg-[#184c36] hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
            @click="handleCreateProductFromModal" :disabled="productNameExists || !newProduct.name || loadingProduct">
            <span v-if="loadingProduct">กำลังบันทึก...</span>
            <span v-else>บันทึก</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal ดูข้อมูลสินค้า (จากตัวอย่างเดิม) -->
    <div v-if="viewingProduct"
      class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 overflow-auto">
      <div
        class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] w-full max-w-md my-8 md:my-0 space-y-4 transform transition-transform duration-300 scale-95 md:scale-100">

        <div class="flex justify-between items-center p-4 md:p-6 pb-2 border-b border-gray-200">
          <h3 class="font-bold text-[#184c36] text-xl md:text-2xl">ข้อมูลสินค้า</h3>
          <button @click="closeViewProduct" class="text-gray-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-col items-center text-center px-4 md:px-6">
          <img :src="viewingProduct.image || 'https://placehold.co/128x128/f0f0f0/cccccc?text=No+Image'"
            :alt="viewingProduct.productName"
            class="w-28 h-28 md:w-32 md:h-32 object-contain rounded-full border-2 border-green-500 p-1 mb-4 shadow-md" />

          <h4 class="text-xl md:text-2xl font-bold text-[#184c36]">{{ viewingProduct.productName }}</h4>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm px-4 md:px-6">
          <div>
            <p class="text-gray-500 font-medium">ประเภทหลัก:</p>
            <p class="text-gray-800 font-semibold">{{ getCategoryName(viewingProduct.categoryId) }}</p>
          </div>
          <div>
            <p class="text-gray-500 font-medium">ประเภทย่อย:</p>
            <p class="text-gray-800 font-semibold">{{ getSubCategoryName(viewingProduct.subCategoryId) }}</p>
          </div>
          <div>
            <p class="text-gray-500 font-medium">สถานะ:</p>
            <p :class="['font-semibold', viewingProduct.status === 'รับซื้อ' ? 'text-green-600' : 'text-red-600']">
              {{ viewingProduct.status }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 font-medium">หน่วย:</p>
            <p class="text-gray-800 font-semibold">{{ viewingProduct.unit }}</p>
          </div>
          <div>
            <p class="text-gray-500 font-medium">Stock:</p>
            <p class="text-gray-800 font-semibold">{{ viewingProduct.stockQuantity }} {{ viewingProduct.unit }}</p>
          </div>
          <div>
            <p class="text-gray-500 font-medium">ราคาทุน:</p>
            <p class="text-gray-800 font-semibold">{{ viewingProduct.costPrice }} บาท / {{ viewingProduct.unit }}</p>
          </div>
          <div>
            <p class="text-gray-500 font-medium">ราคาขาย:</p>
            <p class="text-gray-800 font-semibold">{{ viewingProduct.sellingPrice }} บาท / {{ viewingProduct.unit }}</p>
          </div>
        </div>

        <div v-if="viewingProduct.status === 'รับซื้อ' && viewingProduct.productPartnerId"
          class="border-t pt-4 mt-4 space-y-2 px-4 md:px-6">
          <h5 class="text-base font-bold text-[#184c36]">รายละเอียดการรับซื้อออนไลน์</h5>
          <p class="text-gray-800">
            <span class="font-medium text-gray-500">จำนวนรับซื้อ:</span> {{ viewingProduct.productPartnerId.maxAmount }}
            {{ viewingProduct.productPartnerId.unit }}
          </p>
          <p class="text-gray-800">
            <span class="font-medium text-gray-500">ราคารับซื้อ:</span> {{ viewingProduct.productPartnerId.price_per_kg
            }} บาท / {{ viewingProduct.productPartnerId.unit }}
          </p>
        </div>

        <div class="flex justify-center p-4 md:p-6 pt-2 border-t border-gray-200">
          <button @click="closeViewProduct"
            class="px-8 py-2 bg-[#184c36] hover:bg-green-700 text-white rounded-lg shadow-md transition-colors">
            ปิด
          </button>
        </div>

      </div>
    </div>

    <!-- Modal แก้ไขสินค้า (จากตัวอย่างเดิม) -->
    <div v-if="editingProduct"
      class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 overflow-auto">
      <div
        class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] w-full max-w-lg my-8 md:my-0 space-y-5 transform transition-transform duration-300 scale-95 md:scale-100">

        <div class="flex justify-between items-center p-4 md:p-6 pb-2 border-b border-gray-200">
          <h3 class="font-bold text-[#184c36] text-xl md:text-2xl">แก้ไขสินค้า</h3>
          <button @click="closeEditProduct" class="text-gray-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="col-span-full">
            <label class="block font-semibold mb-1 text-gray-700">ชื่อสินค้า</label>
            <input v-model="editForm.productName"
              class="border rounded-lg px-4 py-2 w-full bg-gray-100 text-gray-500 cursor-not-allowed" readonly
              disabled />
          </div>

          <div>
            <label class="block font-semibold mb-1 text-gray-700">สถานะ</label>
            <select v-model="editForm.status"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all">
              <option value="รับซื้อ">รับซื้อ</option>
              <option value="งดรับ">งดรับ</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold mb-1 text-gray-700">หน่วย</label>
            <input v-model="editForm.unit" type="text"
              class="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              required />
          </div>

          <div>
            <label class="block font-semibold mb-1 text-gray-700">Stock</label>
            <input v-model.number="editForm.stockQuantity" type="number"
              class="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              min="0" />
          </div>

          <div>
            <label class="block font-semibold mb-1 text-gray-700">ราคาทุน</label>
            <input v-model.number="editForm.costPrice" type="number"
              class="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              min="0" />
          </div>

          <div class="col-span-full">
            <label class="block font-semibold mb-1 text-gray-700">ราคาขาย</label>
            <input v-model.number="editForm.sellingPrice" type="number"
              class="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              min="0" />
          </div>
        </div>
        <!-- <label for="editProductImageInput"
            class="upload-button block w-full text-center py-2 px-4 rounded-md border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer hover:border-green-500 hover:text-green-700 transition">
            <span class="upload-icon flex justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </span>
            <span class="upload-text text-sm font-medium">เลือกรูปภาพใหม่</span>
            <span class="upload-hint text-xs text-gray-500 block">JPG, PNG, GIF (สูงสุด 2MB)</span>
            <input id="editProductImageInput" type="file" accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="onEditProductImageChange" />
          </label> -->

        <div class="flex justify-end gap-3 p-4 md:p-6 pt-0 border-t border-gray-200">
          <button @click="closeEditProduct"
            class="px-6 py-2 text-gray-700 hover:text-gray-900 rounded-lg transition-colors">
            ยกเลิก
          </button>
          <button @click="handleUpdateProduct"
            class="bg-[#184c36] hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-colors">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import BarNoMenu from '../../components/BarNoMenu.vue';
import Swal from 'sweetalert2';

const partner = JSON.parse(localStorage.getItem('partner') || '{}');
const partnerId = ref(partner.id || partner._id);

const categories = ref([]);
const subcategories = ref([]);
const productsAll = ref([]);

const storeProducts = ref([]);
const editMode = ref(false);

// State สำหรับ Pagination
const currentPage = ref(1);
const itemsPerPage = ref(5);
const rowsPerPageOptions = [5, 10, 20, 50, 100];

// ฟอร์มหลักสำหรับเพิ่ม/แก้ไขสินค้าในสต็อก
const form = reactive({
  _id: null, // สำหรับแก้ไข
  storeId: partnerId.value,
  productId: '',
  categoryId: '',
  subCategoryId: '',
  productName: '',
  status: 'รับซื้อ',
  stockQuantity: 0,
  costPrice: 0,
  sellingPrice: 0,
  unit: ''
});

// State สำหรับ Searchable Dropdowns (เลือก Category, Subcategory, Product)
const categorySearch = ref('');
const categoryDropdownOpen = ref(false);
const subCategorySearch = ref('');
const subCategoryDropdownOpen = ref(false);
const productSearch = ref('');
const productDropdownOpen = ref(false);

// State สำหรับ Modals (สร้าง Category, Subcategory, Product ใหม่)
const showCategoryModal = ref(false);
const showSubCategoryModal = ref(false);
const showProductModal = ref(false);

const newCategory = reactive({ name: '', image: null });
const newSubCategory = reactive({ name: '', image: null });
const newProduct = reactive({ name: '', image: null });

// State สำหรับชื่อไฟล์รูปภาพที่เลือกใน Modals
const categoryImageFileName = ref('');
const subCategoryImageFileName = ref('');
const productImageFileName = ref('');

// State สำหรับ Loading Indicator ในฟอร์มสร้างใหม่
const loadingCategory = ref(false);
const loadingSubCategory = ref(false);
const loadingProduct = ref(false);

const filterCategorySearch = ref('');
const filterSubCategorySearch = ref('');
const filterCategoryDropdownOpen = ref(false);
const filterSubCategoryDropdownOpen = ref(false);

// State สำหรับ Modal ดูข้อมูลสินค้า (ในตาราง)
const viewingProduct = ref(null);

const editingProduct = ref(null);
const editForm = reactive({
  _id: null,
  productName: '',
  status: '',
  stockQuantity: 0,
  costPrice: 0,
  sellingPrice: 0,
  unit: '',
  image: null,
});
const editProductImageFileName = ref('');

const searchProductName = ref('');
const filterCategoryId = ref('');
const filterSubCategoryId = ref('');
// const productPartnerId = ref(null);

const totalPages = computed(() => {
  return Math.ceil(filteredTableProducts.value.length / itemsPerPage.value);
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTableProducts.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const startPage = Math.max(1, currentPage.value - 2);
  const endPage = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const filteredCategories = computed(() => {
  if (!categorySearch.value) return categories.value;
  return categories.value.filter(cat => cat.name.toLowerCase().includes(categorySearch.value.toLowerCase()));
});

const filteredSubCategories = computed(() => {
  console.log("form.categoryId:", form.categoryId); // ตรวจสอบค่า form.categoryId
  if (!form.categoryId) return [];
  const subsOfSelectedCategory = subcategories.value.filter(
    sub => sub.categoryId === form.categoryId
  );
  if (!subCategorySearch.value) return subsOfSelectedCategory;
  return subsOfSelectedCategory.filter(sub =>
    sub.name.toLowerCase().includes(subCategorySearch.value.toLowerCase())
  );
});

const filteredProducts = computed(() => {
  if (!form.categoryId || !form.subCategoryId) return []; // ใช้ form.categoryId, form.subCategoryId
  return productsAll.value.filter(prod =>
    prod.categoryId === form.categoryId &&
    prod.subCategoryId === form.subCategoryId &&
    (!productSearch.value || prod.name.toLowerCase().includes(productSearch.value.toLowerCase()))
  );
});

const categoryNameExists = computed(() => {
  return categories.value.some(cat => cat.name.trim().toLowerCase() === newCategory.name.trim().toLowerCase());
});
const subCategoryNameExists = computed(() => {
  return subcategories.value.some(sub =>
    sub.categoryId === form.categoryId && // ต้องอยู่ใน Category ที่เลือกในฟอร์มหลัก
    sub.name.trim().toLowerCase() === newSubCategory.name.trim().toLowerCase()
  );
});
const productNameExists = computed(() => {
  return productsAll.value.some(prod => prod.name.trim().toLowerCase() === newProduct.name.trim().toLowerCase());
});

const filteredTableProducts = computed(() => {
  let filtered = storeProducts.value;
  if (searchProductName.value) {
    filtered = filtered.filter(item =>
      item.productName.toLowerCase().includes(searchProductName.value.toLowerCase())
    );
  }
  if (filterCategoryId.value) {
    filtered = filtered.filter(item => item.productId.category_id === filterCategoryId.value);
  }
  if (filterSubCategoryId.value) {
    filtered = filtered.filter(item => item.productId.subCategoryId === filterSubCategoryId.value);
  }
  return filtered;
});

watch([filterCategoryId, filterSubCategoryId], () => {
  currentPage.value = 1;
});

const filteredFilterCategories = computed(() => {
  if (!filterCategorySearch.value) {
    return categories.value;
  }
  const searchTerm = filterCategorySearch.value.toLowerCase();
  return categories.value.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm)
  );
});

const filteredFilterSubCategories = computed(() => {
  if (!filterSubCategorySearch.value) {
    return subcategories.value.filter(sub => sub.categoryId === filterCategoryId.value);
  }
  const searchTerm = filterSubCategorySearch.value.toLowerCase();
  return subcategories.value.filter(sub =>
    sub.categoryId === filterCategoryId.value && sub.name.toLowerCase().includes(searchTerm)
  );
});

// NEW METHODS for Table Filters
const selectFilterCategory = (cat) => {
  filterCategoryId.value = cat.id;
  filterCategorySearch.value = cat.name === 'ทั้งหมด' ? '' : cat.name;
  filterCategoryDropdownOpen.value = false;
  filterSubCategoryId.value = ''; // Reset sub-category when major category changes
  filterSubCategorySearch.value = ''; // Reset sub-category search text
};

const clearFilterCategory = () => {
  filterCategoryId.value = '';
  filterCategorySearch.value = '';
  filterSubCategoryId.value = '';
  filterSubCategorySearch.value = '';
};

const closeFilterCategoryDropdown = (event) => {
  // Use a timeout to allow a click on the list item to register before the dropdown closes
  setTimeout(() => {
    if (!event.relatedTarget || !event.relatedTarget.closest('.relative')) {
      filterCategoryDropdownOpen.value = false;
    }
  }, 150);
};

const selectFilterSubCategory = (sub) => {
  filterSubCategoryId.value = sub.id;
  filterSubCategorySearch.value = sub.name === 'ทั้งหมด' ? '' : sub.name;
  filterSubCategoryDropdownOpen.value = false;
};

const clearFilterSubCategory = () => {
  filterSubCategoryId.value = '';
  filterSubCategorySearch.value = '';
};

const closeFilterSubCategoryDropdown = (event) => {
  setTimeout(() => {
    if (!event.relatedTarget || !event.relatedTarget.closest('.relative')) {
      filterSubCategoryDropdownOpen.value = false;
    }
  }, 150);
};

onMounted(async () => {
  try {
    // โหลด categories
    const catRes = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    categories.value = (catRes.data || []).map(cat => ({
      id: cat._id,
      name: cat.name,
      image: cat.image || null
    }));

    // โหลด subcategories
    const subRes = await axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/all`);
    subcategories.value = (subRes.data || []).map(sub => ({
      id: sub._id,
      name: sub.name,
      categoryId: sub.categoryId,
      image: sub.image || null
    }));

    // โหลด products (master data)
    const prodRes = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    productsAll.value = (prodRes.data.products || []).map(prod => ({
      id: prod._id,
      name: prod.name,
      categoryId: prod.category_id, // ตรวจสอบชื่อฟิลด์นี้ใน Backend ของคุณ
      subCategoryId: prod.subCategoryId,
      image: prod.image, // เพิ่ม placeholder
    }));

    await fetchStoreProducts(); // โหลดสินค้าในสต็อกของ Partner
  } catch (err) {
    console.error("Error fetching initial data:", err);
    Swal.fire('ข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลเริ่มต้นได้', 'error');
  }
});

// ดึงข้อมูลสินค้าในสต็อก (pos-store) ของ Partner
const fetchStoreProducts = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/pos-store/store/${partnerId.value}`);
    storeProducts.value = res.data.data || [];
  } catch (err) {
    console.error("Error fetching store products:", err);
  }
};

// Handler สำหรับ Input Type File (อัปโหลดรูปภาพ)
function onCategoryImageChange(e) {
  const file = e.target.files[0];
  if (file) {
    newCategory.image = file;
    categoryImageFileName.value = file.name;
  } else {
    newCategory.image = null;
    categoryImageFileName.value = '';
  }
}
function onSubCategoryImageChange(e) {
  const file = e.target.files[0];
  if (file) {
    newSubCategory.image = file;
    subCategoryImageFileName.value = file.name;
  } else {
    newSubCategory.image = null;
    subCategoryImageFileName.value = '';
  }
}
function onProductImageChange(e) {
  const file = e.target.files[0];
  if (file) {
    newProduct.image = file;
    productImageFileName.value = file.name;
  } else {
    newProduct.image = null;
    productImageFileName.value = '';
  }
}
function onEditProductImageChange(e) {
  const file = e.target.files[0];
  if (file) {
    editForm.image = file; // เก็บไฟล์จริง
    editProductImageFileName.value = file.name;
  } else {
    editForm.image = null;
    editProductImageFileName.value = '';
  }
}

function selectCategory(cat) {
  form.categoryId = cat.id;
  categorySearch.value = cat.name;
  categoryDropdownOpen.value = false;
  form.subCategoryId = '';
  subCategorySearch.value = '';
  form.productId = '';
  productSearch.value = '';
}
function selectSubCategory(sub) {
  form.subCategoryId = sub.id;
  subCategorySearch.value = sub.name;
  subCategoryDropdownOpen.value = false;
  form.productId = '';
  productSearch.value = '';
}
function selectProduct(prod) {
  form.productId = prod.id;
  form.productName = prod.name; // ตั้งชื่อสินค้าในฟอร์ม
  productSearch.value = prod.name;
  productDropdownOpen.value = false;
}

// Handler สำหรับปุ่ม "สร้างใหม่" ใน Modals
async function handleCreateCategory() {
  if (categoryNameExists.value) {
    await Swal.fire('ข้อผิดพลาด', 'ชื่อประเภทหลักนี้มีอยู่แล้ว', 'error');
    return;
  }
  if (!newCategory.name.trim()) {
    await Swal.fire('ข้อผิดพลาด', 'กรุณากรอกชื่อประเภทหลัก', 'error');
    return;
  }

  loadingCategory.value = true;
  const formData = new FormData();
  formData.append('name', newCategory.name);
  if (newCategory.image) formData.append('image', newCategory.image);
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/categories`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    showCategoryModal.value = false;
    newCategory.name = '';
    newCategory.image = null;
    categoryImageFileName.value = '';

    // Reload categories และเลือก Category ที่เพิ่งสร้าง
    const catRes = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    categories.value = (catRes.data || []).map(cat => ({
      id: cat._id, name: cat.name, image: cat.image || null
    }));
    // เลือก Category ที่เพิ่งสร้างอัตโนมัติ
    if (res.data && res.data._id) {
      selectCategory({ id: res.data._id, name: res.data.name });
    }
    await Swal.fire('สำเร็จ', 'สร้างประเภทหลักสำเร็จ', 'success');
  } catch (error) {
    console.error("Error creating category:", error);
    await Swal.fire('ข้อผิดพลาด', error?.response?.data?.error || error.message, 'error');
  } finally {
    loadingCategory.value = false;
  }
}

async function handleCreateSubCategory() {
  if (!form.categoryId) {
    await Swal.fire('ข้อผิดพลาด', 'กรุณาเลือกประเภทหลักก่อนสร้างประเภทย่อย', 'error');
    return;
  }
  if (subCategoryNameExists.value) {
    await Swal.fire('ข้อผิดพลาด', 'ชื่อประเภทย่อยนี้มีอยู่แล้วในประเภทหลักที่เลือก', 'error');
    return;
  }
  if (!newSubCategory.name.trim()) {
    await Swal.fire('ข้อผิดพลาด', 'กรุณากรอกชื่อประเภทย่อย', 'error');
    return;
  }

  loadingSubCategory.value = true;
  const formData = new FormData();
  formData.append('name', newSubCategory.name);
  formData.append('categoryId', form.categoryId); // ใช้ form.categoryId
  if (newSubCategory.image) formData.append('image', newSubCategory.image);
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/categories/subcategories`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    showSubCategoryModal.value = false;
    newSubCategory.name = '';
    newSubCategory.image = null;
    subCategoryImageFileName.value = '';

    const subRes = await axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/all`);
    subcategories.value = (subRes.data || []).map(sub => ({
      id: sub._id, name: sub.name, categoryId: sub.categoryId, image: sub.image || null
    }));
    // เลือก SubCategory ที่เพิ่งสร้างอัตโนมัติ
    if (res.data && res.data._id) {
      selectSubCategory({ id: res.data._id, name: res.data.name });
    }
    await Swal.fire('สำเร็จ', 'สร้างประเภทย่อยสำเร็จ', 'success');
  } catch (error) {
    console.error("Error creating subcategory:", error);
    await Swal.fire('ข้อผิดพลาด', error?.response?.data?.error || error.message, 'error');
  } finally {
    loadingSubCategory.value = false;
  }
}

async function handleCreateProductFromModal() {
  if (!form.categoryId || !form.subCategoryId) {
    await Swal.fire('ข้อผิดพลาด', 'กรุณาเลือกประเภทหลักและประเภทย่อยก่อนสร้างสินค้า', 'error');
    return;
  }
  if (productNameExists.value) {
    await Swal.fire('ข้อผิดพลาด', 'ชื่อสินค้านี้มีอยู่แล้ว', 'error');
    return;
  }
  if (!newProduct.name.trim()) {
    await Swal.fire('ข้อผิดพลาด', 'กรุณากรอกชื่อสินค้า', 'error');
    return;
  }

  loadingProduct.value = true; // ใช้ loadingProduct สำหรับการสง Master Product
  try {
    ร้า
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('category_id', form.categoryId); // ใช้ form.categoryId
    formData.append('subCategoryId', form.subCategoryId); // ใช้ form.subCategoryId
    if (newProduct.image) formData.append('image', newProduct.image);

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    showProductModal.value = false;
    newProduct.name = '';
    newProduct.image = null;
    productImageFileName.value = '';

    const prodRes = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    productsAll.value = (prodRes.data.products || []).map(prod => ({
      id: prod._id,
      name: prod.name,
      categoryId: prod.category_id,
      subCategoryId: prod.subCategoryId,
      image: prod.image || 'https://placehold.co/128x128/f0f0f0/cccccc?text=No+Image'
    }));
    // เลือก Product ที่เพิ่งสร้างอัตโนมัติ
    if (res.data && res.data._id) {
      selectProduct({ id: res.data._id, name: res.data.name });
    }
    await Swal.fire('สำเร็จ', 'สร้างสินค้าใหม่สำเร็จ', 'success');
  } catch (error) {
    console.error("Error creating product:", error);
    await Swal.fire('ข้อผิดพลาด', error?.response?.data?.error || error.message, 'error');
  } finally {
    loadingProduct.value = false;
  }
}

// บันทึก/แก้ไขสินค้าในสต็อก (pos-store)
const saveStoreProduct = async () => {
  try {
    if (!form.categoryId || !form.subCategoryId || !form.productId) {
      await Swal.fire('ข้อผิดพลาด', 'กรุณาเลือกประเภทหลัก, ประเภทย่อย และสินค้าให้ครบถ้วน', 'error');
      return;
    }

    // หากกำลังแก้ไข
    if (editMode.value && form._id) {
      await axios.put(`${import.meta.env.VITE_API_URL}/pos-store/${form._id}`, form);
    } else {
      // หากกำลังเพิ่ม
      await axios.post(`${import.meta.env.VITE_API_URL}/pos-store`, form);
    }
    await fetchStoreProducts(); // โหลดข้อมูลล่าสุด
    resetForm(); // รีเซ็ตฟอร์ม
    await Swal.fire('สำเร็จ', 'บันทึกข้อมูลสินค้าในสต็อกสำเร็จ', 'success');
  } catch (err) {
    console.error(err);
    await Swal.fire('เกิดข้อผิดพลาด', err?.response?.data?.error || err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่', 'error');
  }
};

// ลบ Item จากตาราง (pos-store)
const deleteItem = async (id) => {
  const result = await Swal.fire({
    title: 'ยืนยันการลบสินค้า?',
    text: 'คุณต้องการลบสินค้านี้จริงหรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก'
  });
  if (result.isConfirmed) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/pos-store/${id}`);
      await fetchStoreProducts();
      await Swal.fire('ลบสำเร็จ', 'ลบสินค้าเรียบร้อยแล้ว', 'success');
    } catch (err) {
      console.error(err);
      await Swal.fire('เกิดข้อผิดพลาด', err?.response?.data?.error || err.message, 'error');
    }
  }
};

// รีเซ็ตฟอร์มหลัก
const resetForm = () => {
  editMode.value = false;
  form._id = null;
  form.productName = '';
  form.status = 'รับซื้อ';
  form.stockQuantity = 0;
  form.costPrice = 0;
  form.sellingPrice = 0;
  form.unit = '';
  form.productId = '';
  form.categoryId = '';
  form.subCategoryId = '';

  // รีเซ็ต state สำหรับ Dropdown search และ open
  categorySearch.value = '';
  categoryDropdownOpen.value = false;
  subCategorySearch.value = '';
  subCategoryDropdownOpen.value = false;
  productSearch.value = '';
  productDropdownOpen.value = false;
};

function handleViewProduct(item) {
  console.log("Viewing product:", item);
  viewingProduct.value = {
    ...item,
    name: item.productName,
    image: item.productId.image,
    categoryId: item.productId.category_id,
    subCategoryId: item.productId.subCategoryId,
  };
}
function closeViewProduct() {
  viewingProduct.value = null;
}

// เตรียมข้อมูลสำหรับการแก้ไขสินค้าใน Modal
function handleEditProduct(item) {
  editingProduct.value = item;
  Object.assign(editForm, {
    _id: item._id,
    productName: item.productName,
    status: item.status,
    stockQuantity: item.stockQuantity,
    costPrice: item.costPrice,
    sellingPrice: item.sellingPrice,
    unit: item.unit,
    image: item.productId.image,
  });
  // editProductImageFileName.value = item.image ? 'รูปภาพเดิม' : '';
}
function closeEditProduct() {
  editingProduct.value = null;
  editProductImageFileName.value = '';
  editForm.image = null;
}

async function handleUpdateProduct() {
  if (!editingProduct.value || !editForm._id) return;

  if (!editForm.productName.trim() || !editForm.unit.trim() || editForm.stockQuantity < 0 || editForm.costPrice < 0 || editForm.sellingPrice < 0) {
    await Swal.fire('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง', 'error');
    return;
  }

  try {
    const payload = {
      // ข้อมูลสำหรับ StoreProduct
      productName: editForm.productName,
      status: editForm.status,
      stockQuantity: editForm.stockQuantity,
      costPrice: editForm.costPrice,
      sellingPrice: editForm.sellingPrice,
      unit: editForm.unit,

      // ข้อมูลเพิ่มเติมสำหรับ ProductPartner
      maxAmount: editForm.stockQuantity,
      price_per_kg: editForm.costPrice,
      storeId: partnerId.value,
      productId: editingProduct.value.productId,
    };

    const res = await axios.put(`${import.meta.env.VITE_API_URL}/pos-store/${editForm._id}`, payload);

    if (res.data.success) {
      Swal.fire('สำเร็จ', 'แก้ไขสินค้าเรียบร้อย', 'success');
      closeEditProduct();
      await fetchStoreProducts();
    } else {
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถแก้ไขสินค้าได้', 'error');
    }
  } catch (error) {
    console.error("Error updating store product:", error);
    await Swal.fire('ข้อผิดพลาด', error?.response?.data?.error || error.message, 'error');
  }
}

function getCategoryName(id) {
  const cat = categories.value.find(c => c.id === id);
  return cat ? cat.name : '-';
}
function getSubCategoryName(id) {
  const sub = subcategories.value.find(s => s.id === id);
  return sub ? sub.name : '-';
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    setTimeout(() => {
      const table = document.querySelector('table');
      if (table) table.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }
}

watch(() => form.categoryId, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    form.subCategoryId = '';
    subCategorySearch.value = '';
    form.productId = '';
    productSearch.value = '';
  }
});

watch(() => form.subCategoryId, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    form.productId = '';
    productSearch.value = '';
  }
});

watch(() => form.productId, (newVal) => {
  if (newVal) {
    const selectedProd = productsAll.value.find(prod => prod.id === newVal);
    if (selectedProd) {
      form.productName = selectedProd.name;
    }
  } else {
    form.productName = '';
  }
});

watch(itemsPerPage, () => {
  currentPage.value = 1;
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

function clearCategory() {
  form.categoryId = '';
  categorySearch.value = '';
  categoryDropdownOpen.value = false;
  clearSubCategory();
}

function clearSubCategory() {
  form.subCategoryId = '';
  subCategorySearch.value = '';
  subCategoryDropdownOpen.value = false;
  clearProduct();
}

function clearProduct() {
  form.productId = '';
  form.productName = '';
  productSearch.value = '';
  productDropdownOpen.value = false;
}
</script>

<style scoped>
.upload-button {
  @apply relative cursor-pointer bg-white rounded-md font-medium text-[#184c36] hover:text-green-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px dashed #e6e6e6;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
}

.upload-button:hover {
  border-color: #10B981;
  /* Tailwind green-500 */
}

.upload-button .upload-icon {
  color: #184c36;
  /* Icon color matching the theme */
}

.upload-button .upload-text {
  font-weight: 600;
  margin-top: 0.25rem;
}

.upload-button .upload-hint {
  font-size: 0.75rem;
  color: #6B7280;
  /* Tailwind gray-500 */
}
</style>