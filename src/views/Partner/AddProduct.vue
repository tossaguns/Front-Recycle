<template>
    <BarNoMenu :showBackNavigation="true" pageTitle="จัดการสินค้า" backRoute="/homepartner" />
    <div class="min-h-screen bg-gradient-to-br from-[#e6f7e6] via-white to-[#b6e388] pb-5 pt-24">

        <div class="max-w-full mx-5 md:mx-10 bg-white rounded-xl shadow border border-[#e6e6e6] p-3 md:p-8 mt-10">
            <h2 class="text-2xl font-bold text-[#184c36] mb-8">เพิ่มสินค้าใหม่</h2>
            <!-- 1+2. เลือก/สร้างประเภทหลัก + ประเภทย่อย (แนวนอน) -->
            <div class="flex flex-col md:flex-row gap-8 mb-8">
                <!-- ประเภทหลัก -->
                <div class="flex-1">
                    <label class="block font-semibold mb-2 text-[#184c36]">ประเภทหลัก</label>
                    <div class="relative mb-2">
                        <input v-model="categorySearch" @focus="categoryDropdownOpen = true"
                            @input="categoryDropdownOpen = true" @blur="categoryDropdownOpen = false"
                            placeholder="ค้นหาหรือเลือกประเภทหลัก"
                            class="border border-[#e6e6e6] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                        <button v-if="selectedCategoryId" @click="clearCategory" type="button"
                            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
                            ❌
                        </button>
                        <ul v-if="categoryDropdownOpen"
                            class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full max-h-40 overflow-auto mt-1 shadow">
                            <li v-for="cat in filteredCategories" :key="cat.id"
                                class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
                                @mousedown.prevent="selectCategory(cat)">{{ cat.name }}</li>
                            <li v-if="filteredCategories.length === 0" class="px-3 py-2 text-gray-400">ไม่พบข้อมูล</li>
                        </ul>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 mb-2">
                        <button class="bg-green-100 text-[#184c36] hover:bg-green-200 px-4 py-2 rounded shadow-sm"
                            @click="showCategoryModal = true">สร้างใหม่</button>
                        <span class="text-xs text-gray-500 mt-1 md:mt-0">💡 คำแนะนำ:
                            ค้นหาก่อนเพื่อหลีกเลี่ยงการสร้างซ้ำ</span>
                    </div>
                </div>

                <!-- ประเภทย่อย (แสดงเมื่อเลือกประเภทหลัก) -->
                <div class="flex-1" v-if="selectedCategoryId">
                    <label class="block font-semibold mb-2 text-[#184c36]">ประเภทย่อย</label>
                    <div class="relative mb-2">
                        <input v-model="subCategorySearch" @focus="subCategoryDropdownOpen = true"
                            @input="subCategoryDropdownOpen = true" @blur="subCategoryDropdownOpen = false"
                            placeholder="ค้นหาหรือเลือกประเภทย่อย"
                            class="border border-[#e6e6e6] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                        <button v-if="selectedSubCategoryId" @click="clearSubCategory" type="button"
                            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
                            ❌
                        </button>
                        <ul v-if="subCategoryDropdownOpen"
                            class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full max-h-40 overflow-auto mt-1 shadow">
                            <li v-for="sub in filteredSubCategories" :key="sub.id"
                                class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
                                @mousedown.prevent="selectSubCategory(sub)">{{ sub.name }}</li>
                            <li v-if="filteredSubCategories.length === 0" class="px-3 py-2 text-gray-400">ไม่พบข้อมูล
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 mb-2">
                        <button class="bg-green-100 text-[#184c36] hover:bg-green-200 px-4 py-2 rounded shadow-sm"
                            @click="showSubCategoryModal = true">สร้างใหม่</button>
                        <span class="text-xs text-gray-500 mt-1 md:mt-0">💡 คำแนะนำ:
                            ค้นหาก่อนเพื่อหลีกเลี่ยงการสร้างซ้ำ</span>
                    </div>
                </div>
            </div>

            <!-- 3+4. เลือก/สร้างสินค้า + กรอกราคา/ปริมาณ (แนวนอน) -->
            <div class="flex flex-col md:flex-row gap-8 mb-8" v-if="selectedCategoryId && selectedSubCategoryId">
                <!-- สินค้า -->
                <div class="flex-1">
                    <label class="block font-semibold mb-2 text-[#184c36]">สินค้า</label>
                    <div class="relative mb-2">
                        <input v-model="productSearch" @focus="productDropdownOpen = true"
                            @input="productDropdownOpen = true" @blur="productDropdownOpen = false"
                            placeholder="ค้นหาหรือเลือกสินค้า"
                            class="border border-[#e6e6e6] rounded px-3 py-2 w-full pr-8 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                        <button v-if="selectedProductId" @click="clearProduct" type="button"
                            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none">
                            ❌
                        </button>
                        <ul v-if="productDropdownOpen"
                            class="absolute z-10 bg-white border border-[#e6e6e6] rounded w-full max-h-40 overflow-auto mt-1 shadow">
                            <li v-for="prod in filteredProducts" :key="prod.id"
                                class="px-3 py-2 hover:bg-green-100 cursor-pointer text-[#184c36]"
                                @mousedown.prevent="selectProduct(prod)">{{ prod.name }}</li>
                            <li v-if="filteredProducts.length === 0" class="px-3 py-2 text-gray-400">ไม่พบข้อมูล</li>
                        </ul>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 mb-2">
                        <button class="bg-green-100 text-[#184c36] hover:bg-green-200 px-4 py-2 rounded shadow-sm"
                            @click="showProductModal = true">สร้างใหม่</button>
                        <span class="text-xs text-gray-500 mt-1 md:mt-0">💡 คำแนะนำ:
                            ค้นหาก่อนเพื่อหลีกเลี่ยงการสร้างซ้ำ</span>
                    </div>
                </div>
                <!-- ราคาต่อกิโลกรัม -->
                <div class="flex-1" v-if="selectedProductId || (!productNameExists && productSearch)">
                    <label class="block font-semibold mb-2 text-[#184c36]">ราคาต่อกิโลกรัม (บาท)</label>
                    <input type="number" v-model="pricePerKg"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-4 md:mb-0 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                        min="0" />
                </div>
                <!-- จำนวนที่รับซื้อ -->
                <div class="flex-1" v-if="selectedProductId || (!productNameExists && productSearch)">
                    <label class="block font-semibold mb-2 text-[#184c36]">จำนวนที่รับซื้อ (กิโลกรัม)</label>

                    <input v-if="!unlimitedQuantity" type="number" v-model="quantity"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                        min="0" />

                    <div v-else class="border border-[#e6e6e6] rounded px-3 py-2 w-full bg-gray-100 text-gray-500">
                        ไม่จำกัด
                    </div>
                    <div class="flex items-center my-2">
                        <input type="checkbox" id="unlimitedCheckbox" v-model="unlimitedQuantity" class="mr-2 h-4 w-4">
                        <label for="unlimitedCheckbox" class="text-sm text-gray-700">ไม่จำกัด</label>
                    </div>
                </div>
            </div>

            <!-- 5. ปุ่มบันทึก -->
            <div class="mt-8">
                <button
                    class="bg-[#184c36] hover:bg-green-700 text-white px-8 py-2 rounded shadow-sm disabled:opacity-50 transition"
                    :disabled="!canSave || loadingProduct" @click="handleCreateProductPartner">
                    <span v-if="loadingProduct"><svg class="animate-spin h-4 w-4 inline-block mr-1"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 12c0 6.075-4.925 11-11 11S2.5 18.075 2.5 12 7.425 1 13.5 1"></path>
                        </svg> กำลังบันทึก...</span>
                    <span v-else>บันทึก</span>
                </button>
            </div>

            <!-- Modal: สร้างประเภทหลัก -->
            <div v-if="showCategoryModal"
                class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md space-y-4">
                    <h3 class="font-bold mb-4 text-[#184c36]">สร้างประเภทหลักใหม่</h3>
                    <input v-model="newCategory.name" placeholder="ชื่อประเภทหลัก"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-1 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                    <div v-if="categoryNameExists" class="text-red-500 text-sm mb-2">ชื่อมีอยู่แล้วสามารถเลือกหาเลือกได้
                    </div>
                    <div class="relative">
                        <label for="categoryImageInput" class="upload-button">
                            <span class="upload-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </span>
                            <span class="upload-text">เลือกรูปภาพ</span>
                            <span class="upload-hint">JPG, PNG, GIF (สูงสุด 2MB)</span>
                            <input id="categoryImageInput" type="file" accept="image/*"
                                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                @change="onCategoryImageChange" />
                        </label>
                        <div v-if="categoryImageFileName"
                            class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                            <div class="flex items-center gap-2 text-sm text-green-700">
                                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
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
                            @click="handleCreateCategory"
                            :disabled="categoryNameExists || !newCategory.name || loadingCategory">
                            <span v-if="loadingCategory"><svg class="animate-spin h-4 w-4 inline-block mr-1"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 12c0 6.075-4.925 11-11 11S2.5 18.075 2.5 12 7.425 1 13.5 1"></path>
                                </svg> กำลังบันทึก...</span>
                            <span v-else>บันทึก</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal: สร้างประเภทย่อย -->
            <div v-if="showSubCategoryModal"
                class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md space-y-4">
                    <h3 class="font-bold mb-4 text-[#184c36]">สร้างประเภทย่อยใหม่</h3>
                    <input v-model="newSubCategory.name" placeholder="ชื่อประเภทย่อย"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-1 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                    <div v-if="subCategoryNameExists" class="text-red-500 text-sm mb-2">
                        ชื่อมีอยู่แล้วสามารถเลือกหาเลือกได้</div>
                    <div class="relative">
                        <label for="subCategoryImageInput" class="upload-button">
                            <span class="upload-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </span>
                            <span class="upload-text">เลือกรูปภาพ</span>
                            <span class="upload-hint">JPG, PNG, GIF (สูงสุด 2MB)</span>
                            <input id="subCategoryImageInput" type="file" accept="image/*"
                                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                @change="onSubCategoryImageChange" />
                        </label>
                        <div v-if="subCategoryImageFileName"
                            class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                            <div class="flex items-center gap-2 text-sm text-green-700">
                                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
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
                            <span v-if="loadingSubCategory"><svg class="animate-spin h-4 w-4 inline-block mr-1"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 12c0 6.075-4.925 11-11 11S2.5 18.075 2.5 12 7.425 1 13.5 1"></path>
                                </svg> กำลังบันทึก...</span>
                            <span v-else>บันทึก</span>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="showProductModal"
                class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md space-y-4">
                    <h3 class="font-bold mb-4 text-[#184c36]">สร้างสินค้าใหม่</h3>
                    <input v-model="newProduct.name" placeholder="ชื่อสินค้า"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-1 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                    <div v-if="productNameExists" class="text-red-500 text-sm mb-2">
                        ชื่อสินค้านี้มีอยู่แล้ว
                    </div>
                    <div class="relative">
                        <label for="productImageInputModal" class="upload-button">
                            <span class="upload-text">เลือกรูปภาพ</span>
                            <span class="upload-hint">JPG, PNG, GIF (สูงสุด 2MB)</span>
                            <input id="productImageInputModal" type="file" accept="image/*"
                                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                @change="onProductImageChange" />
                        </label>
                        <div v-if="productImageFileName"
                            class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                            <div class="flex items-center gap-2 text-sm text-green-700">
                                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
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
                            @click="handleCreateProductFromModal"
                            :disabled="productNameExists || !newProduct.name || loadingProduct">
                            <span v-if="loadingProduct">กำลังบันทึก...</span>
                            <span v-else>บันทึก</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ตารางแสดงสินค้า -->
        <div class="mx-5 md:mx-10 mt-12 bg-white rounded-xl shadow border border-[#e6e6e6] p-3 md:p-8">
            <h2 class="text-xl font-bold text-[#184c36] mb-4">สินค้าของคุณ</h2>
            <div class="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <div class="flex-1">
                    <label class="block text-sm font-medium mb-1 text-[#184c36]">ค้นหาชื่อสินค้า</label>
                    <input v-model="searchProductName" placeholder="ค้นหาชื่อสินค้า..."
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium mb-1 text-[#184c36]">กรองประเภทหลัก</label>
                    <select v-model="filterCategoryId"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
                        <option value="">ทั้งหมด</option>
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium mb-1 text-[#184c36]">กรองประเภทย่อย</label>
                    <select v-model="filterSubCategoryId"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
                        <option value="">ทั้งหมด</option>
                        <option v-for="sub in subcategoriesFilteredByCategory" :key="sub.id" :value="sub.id">{{ sub.name
                        }}</option>
                    </select>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full border text-sm rounded-xl overflow-hidden">
                    <thead class="bg-green-100 text-[#184c36] border-b border-[#e6e6e6]">
                        <tr>
                            <th class="px-4 py-2 border-[#e6e6e6]">ชื่อสินค้า</th>
                            <th class="px-4 py-2 border-[#e6e6e6]">ราคาต่อกก.</th>
                            <th class="px-4 py-2 border-[#e6e6e6]">จำนวนที่รับซื้อ</th>
                            <th class="px-4 py-2 border-[#e6e6e6]">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prod in paginatedProducts" :key="prod.id" class="hover:bg-green-50">
                            <td class="px-4 py-3 border-b border-[#e6e6e6] min-w-[120px] text-center">{{ prod.name ||
                                '-' }}</td>
                            <td class="px-4 py-3 border-b border-[#e6e6e6] min-w-[100px] text-center">{{ prod.pricePerKg
                                || '-' }}</td>
                            <td class="px-4 py-3 border-b border-[#e6e6e6] min-w-[100px] text-center">{{ prod.quantity
                                || 'ไม่จำกัด' }}</td>
                            <td class="px-4 py-3 border-b border-[#e6e6e6] min-w-[140px]">
                                <div class="flex justify-center items-center gap-3">
                                    <button class="text-blue-600 hover:underline" title="ข้อมูล"
                                        @click="handleViewProduct(prod)">🛈</button>
                                    <button class="text-yellow-600 hover:underline" title="แก้ไข"
                                        @click="handleEditProduct(prod)">✏️</button>
                                    <button class="text-red-600 hover:underline" title="ลบ"
                                        @click="handleDeleteProduct(prod.id)">🗑️</button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="paginatedProducts.length === 0">
                            <td colspan="4" class="text-center text-gray-400 py-4">ไม่พบสินค้า</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-center gap-2 mt-4" v-if="pageCount > 1">
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                    class="px-3 py-1 rounded-l-md border border-[#e6e6e6] bg-white text-[#184c36] font-semibold hover:bg-[#b6e388] disabled:opacity-50 disabled:cursor-not-allowed">&lt;</button>
                <button v-for="page in pageCount" :key="page" @click="goToPage(page)"
                    :class="['px-3 py-1 border-t border-b border-[#e6e6e6] font-semibold', currentPage === page ? 'bg-[#b6e388] text-[#184c36]' : 'bg-white text-[#184c36]']">
                    {{ page }}
                </button>
                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === pageCount"
                    class="px-3 py-1 rounded-r-md border border-[#e6e6e6] bg-white text-[#184c36] font-semibold hover:bg-[#b6e388] disabled:opacity-50 disabled:cursor-not-allowed">&gt;</button>
            </div>
        </div>

        <!-- Modal ดูข้อมูลสินค้า -->
        <div v-if="viewingProduct" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md">
                <h3 class="font-bold mb-4 text-[#184c36] text-xl">ข้อมูลสินค้า</h3>
                <div class="mb-2 flex flex-col items-center">
                    <img v-if="viewingProduct.image || '/src/assets/NoPicture.webp'"
                        :src="viewingProduct.image || '/src/assets/NoPicture.webp'" :alt="viewingProduct.name"
                        class="w-32 h-32 object-contain border rounded mb-2" />
                    <div class="text-lg font-semibold text-[#184c36] mb-1">{{ viewingProduct.name }}</div>
                    <div class="text-sm text-gray-600 mb-1">
                        ประเภทหลัก: {{ getCategoryName(viewingProduct.categoryId) }}
                    </div>
                    <div class="text-sm text-gray-600 mb-1">
                        ประเภทย่อย: {{ getSubCategoryName(viewingProduct.subCategoryId) }}
                    </div>
                    <div class="text-sm text-gray-600 mb-1">ราคา: {{ viewingProduct.pricePerKg }} บาท/กก.</div>
                    <div class="text-sm text-gray-600 mb-1">จำนวน: {{ viewingProduct.quantity }} กก.</div>
                </div>
                <button class="mt-4 px-6 py-2 bg-[#184c36] hover:bg-green-700 text-white rounded shadow"
                    @click="closeViewProduct">ปิด</button>
            </div>
        </div>

        <!-- Modal แก้ไขสินค้า -->
        <div v-if="editingProduct" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md">
                <h3 class="font-bold mb-4 text-[#184c36] text-xl">แก้ไขสินค้า</h3>
                <div class="mb-3">
                    <label class="block font-semibold mb-1 text-[#184c36]">ชื่อสินค้า</label>
                    <input v-model="editForm.name" class="border rounded px-3 py-2 w-full bg-gray-100 text-gray-500"
                        readonly disabled />
                </div>
                <div class="mb-3">
                    <label class="block font-semibold mb-1 text-[#184c36]">ราคาต่อกิโลกรัม (บาท)</label>
                    <input v-model="editForm.pricePerKg" type="number" class="border rounded px-3 py-2 w-full" />
                </div>
                <div class="mb-3">
                    <label class="block font-semibold mb-1 text-[#184c36]">จำนวนที่รับซื้อ (กิโลกรัม)</label>

                    <input v-if="!editForm.isUnlimited" v-model="editForm.quantity" type="number"
                        class="border rounded px-3 py-2 w-full" :min="0" />

                    <div v-else class="border rounded px-3 py-2 w-full bg-gray-100 text-gray-500">
                        ไม่จำกัด
                    </div>

                    <div class="flex items-center mt-2">
                        <input type="checkbox" id="unlimitedCheckbox" v-model="editForm.isUnlimited"
                            class="mr-2 h-4 w-4">
                        <label for="unlimitedCheckbox" class="text-sm text-gray-700">ไม่จำกัด</label>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="block font-semibold mb-1 text-[#184c36]">รูปภาพสินค้า</label>
                    <img v-if="editingProduct && editingProduct.image" :src="editingProduct.image" alt="รูปสินค้าเดิม"
                        class="w-24 h-24 object-contain border rounded mb-2" />
                    <!-- <label for="editProductImageInput" class="upload-button">
                        <span class="upload-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </span>
                        <span class="upload-text">เลือกรูปภาพใหม่</span>
                        <span class="upload-hint">JPG, PNG, GIF (สูงสุด 2MB)</span>
                        <input id="editProductImageInput" type="file" accept="image/*"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            @change="onEditProductImageChange" />
                    </label>
                    <div class="text-xs text-gray-500 mt-1">
                        ถ้าไม่เลือกรูปใหม่ ระบบจะใช้รูปเดิม
                    </div> -->
                    <div v-if="editProductImageFileName"
                        class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                        <div class="flex items-center gap-2 text-sm text-green-700">
                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="truncate">{{ editProductImageFileName }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-2 mt-4">
                    <button class="px-4 py-2 text-[#184c36]" @click="closeEditProduct">ยกเลิก</button>
                    <button class="bg-[#184c36] hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
                        @click="handleUpdateProduct">บันทึก</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import BarNoMenu from '../../components/BarNoMenu.vue';

const partner = JSON.parse(localStorage.getItem('partner') || '{}');
const partnerId = ref(partner.id || partner._id);

// State หลัก
const categories = ref([]);
const subcategories = ref([]);
const productsAll = ref([]);
const partnerProducts = ref([]);
const loadingProduct = ref(false);

// ฟอร์มสำหรับเพิ่มสินค้าใหม่
const selectedCategoryId = ref(null);
const selectedSubCategoryId = ref(null);
const selectedProductId = ref(null);
const categorySearch = ref('');
const subCategorySearch = ref('');
const productSearch = ref('');
const pricePerKg = ref(null);
const quantity = ref(null);
const unlimitedQuantity = ref(false);

// สถานะ dropdown
const categoryDropdownOpen = ref(false);
const subCategoryDropdownOpen = ref(false);
const productDropdownOpen = ref(false);

// Modal สร้างประเภทหลัก
const showCategoryModal = ref(false);
const newCategory = ref({ name: '', image: null });
const categoryNameExists = computed(() => categories.value.some(cat => cat.name === newCategory.value.name));
const categoryImageFileName = ref('');

// Modal สร้างประเภทย่อย
const showSubCategoryModal = ref(false);
const newSubCategory = ref({ name: '', image: null });
const subCategoryNameExists = computed(() => subcategories.value.some(sub => sub.name === newSubCategory.value.name));
const subCategoryImageFileName = ref('');

// Modal สร้างสินค้า
const showProductModal = ref(false);
const newProduct = ref({ name: '', image: null });
const productNameExists = computed(() => productsAll.value.some(prod => prod.name === productSearch.value));
const productImageFileName = ref('');

// Modal ดู/แก้ไขสินค้า
const viewingProduct = ref(null);
const editingProduct = ref(null);
const editForm = ref({ name: '', pricePerKg: null, quantity: null, isUnlimited: false, image: null, oldImage: null });
const editProductImageFileName = ref('');

// กรองและ pagination สำหรับตาราง
const searchProductName = ref('');
const filterCategoryId = ref('');
const filterSubCategoryId = ref('');
const itemsPerPage = 5;
const currentPage = ref(1);

// Computed Properties
const filteredCategories = computed(() => {
    return categories.value.filter(cat => cat.name.toLowerCase().includes(categorySearch.value.toLowerCase()));
});

const filteredSubCategories = computed(() => {
    if (!selectedCategoryId.value) return [];
    return subcategories.value
        .filter(sub => sub.categoryId === selectedCategoryId.value)
        .filter(sub => sub.name.toLowerCase().includes(subCategorySearch.value.toLowerCase()));
});

const filteredProducts = computed(() => {
    if (!selectedSubCategoryId.value) return [];
    return productsAll.value
        .filter(prod => prod.subCategoryId === selectedSubCategoryId.value)
        .filter(prod => prod.name.toLowerCase().includes(productSearch.value.toLowerCase()));
});

const canSave = computed(() => {
    const hasProductAndPrice = selectedProductId.value && pricePerKg.value > 0;
    const hasQuantity = quantity.value > 0 || unlimitedQuantity.value;
    return hasProductAndPrice && hasQuantity;
});

const filteredPartnerProducts = computed(() => {
    let filtered = partnerProducts.value;
    if (searchProductName.value) {
        filtered = filtered.filter(prod => prod.name.toLowerCase().includes(searchProductName.value.toLowerCase()));
    }
    if (filterCategoryId.value) {
        filtered = filtered.filter(prod => prod.categoryId === filterCategoryId.value);
    }
    if (filterSubCategoryId.value) {
        filtered = filtered.filter(prod => prod.subCategoryId === filterSubCategoryId.value);
    }
    return filtered;
});

const pageCount = computed(() => {
    return Math.ceil(filteredPartnerProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredPartnerProducts.value.slice(start, end);
});

watch(unlimitedQuantity, (newValue) => {
    if (newValue) {
        quantity.value = null; // Set to null when unlimited is checked
    } else {
        quantity.value = 0; // Reset to a valid number when unchecked
    }
});

// Hooks
onMounted(async () => {
    await fetchAllData();
});

// Methods: Data Fetching
async function fetchAllData() {
    try {
        const [catRes, subRes, prodRes] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/categories`),
            axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/all`),
            axios.get(`${import.meta.env.VITE_API_URL}/products`)
        ]);

        categories.value = (catRes.data || []).map(cat => ({ id: cat._id, name: cat.name, image: cat.image || null }));
        subcategories.value = (subRes.data || []).map(sub => ({ id: sub._id, name: sub.name, categoryId: sub.categoryId, image: sub.image || null }));
        productsAll.value = (prodRes.data.products || []).map(prod => ({
            id: prod._id,
            name: prod.name,
            categoryId: prod.category_id,
            subCategoryId: prod.subCategoryId,
            image: prod.image || '/src/assets/NoPicture.webp',
        }));

        await reloadPartnerProducts();
    } catch (error) {
        console.error("Error fetching initial data:", error);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลเริ่มต้นได้', 'error');
    }
}

async function reloadPartnerProducts() {
    try {
        const partnerRes = await axios.get(`${import.meta.env.VITE_API_URL}/product-partners`);
        console.log("Reloading partner products:", partnerRes.data);
        partnerProducts.value = partnerRes.data.map(item => ({
            id: item._id,
            productId: item.productId,
            name: item.productId.name,
            pricePerKg: item.price_per_kg,
            quantity: item.maxAmount,
            categoryId: item.productId.category_id,
            subCategoryId: item.productId.subCategoryId,
            image: item.productId.image || '/src/assets/NoPicture.webp'
        }));
        console.log(partnerProducts.value);
    } catch (error) {
        console.error("Error reloading partner products:", error);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดรายการสินค้าของคุณได้', 'error');
    }
}

// Methods: Form & Dropdown
function selectCategory(cat) {
    selectedCategoryId.value = cat.id;
    categorySearch.value = cat.name;
    categoryDropdownOpen.value = false;
    selectedSubCategoryId.value = null;
    subCategorySearch.value = '';
    selectedProductId.value = null;
    productSearch.value = '';
}

function clearCategory() {
    selectedCategoryId.value = null;
    categorySearch.value = '';
    selectedSubCategoryId.value = null;
    subCategorySearch.value = '';
    selectedProductId.value = null;
    productSearch.value = '';
}

function selectSubCategory(sub) {
    selectedSubCategoryId.value = sub.id;
    subCategorySearch.value = sub.name;
    subCategoryDropdownOpen.value = false;
    selectedProductId.value = null;
    productSearch.value = '';
}

function clearSubCategory() {
    selectedSubCategoryId.value = null;
    subCategorySearch.value = '';
    selectedProductId.value = null;
    productSearch.value = '';
}

function selectProduct(prod) {
    selectedProductId.value = prod.id;
    productSearch.value = prod.name;
    productDropdownOpen.value = false;
}

function clearProduct() {
    selectedProductId.value = null;
    productSearch.value = '';
}

// Methods: Modals
function onCategoryImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        newCategory.value.image = file;
        categoryImageFileName.value = file.name;
    }
}

function onSubCategoryImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        newSubCategory.value.image = file;
        subCategoryImageFileName.value = file.name;
    }
}

function onProductImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        newProduct.value.image = file;
        productImageFileName.value = file.name;
    }
}

function onEditProductImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        editForm.value.image = file;
        editProductImageFileName.value = file.name;
    }
}

function closeViewProduct() {
    viewingProduct.value = null;
}

function closeEditProduct() {
    editingProduct.value = null;
    editForm.value = { name: '', pricePerKg: null, quantity: null, image: null, oldImage: null };
    editProductImageFileName.value = '';
}

// Methods: CRUD
async function handleCreateCategory() {
    if (categoryNameExists.value) {
        Swal.fire('สร้างไม่สำเร็จ', 'ชื่อประเภทหลักนี้มีอยู่แล้ว', 'warning');
        return;
    }
    if (!newCategory.value.name) {
        Swal.fire('สร้างไม่สำเร็จ', 'กรุณากรอกชื่อประเภทหลัก', 'warning');
        return;
    }
    loadingProduct.value = true;
    try {
        const formData = new FormData();
        formData.append('name', newCategory.value.name);
        if (newCategory.value.image) {
            formData.append('image', newCategory.value.image);
        }

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/categories`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        categories.value.push({
            id: res.data._id,
            name: res.data.name,
            image: res.data.image
        });
        showCategoryModal.value = false;
        newCategory.value = { name: '', image: null };
        categoryImageFileName.value = '';
        Swal.fire('สำเร็จ', 'สร้างประเภทหลักเรียบร้อย', 'success');
    } catch (error) {
        console.error("Error creating category:", error);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถสร้างประเภทหลักได้', 'error');
    } finally {
        loadingProduct.value = false;
    }
}

async function handleCreateSubCategory() {
    if (subCategoryNameExists.value) {
        Swal.fire('สร้างไม่สำเร็จ', 'ชื่อประเภทย่อยนี้มีอยู่แล้ว', 'warning');
        return;
    }
    if (!newSubCategory.value.name) {
        Swal.fire('สร้างไม่สำเร็จ', 'กรุณากรอกชื่อประเภทย่อย', 'warning');
        return;
    }
    loadingProduct.value = true;
    try {
        const formData = new FormData();
        formData.append('name', newSubCategory.value.name);
        formData.append('categoryId', selectedCategoryId.value);
        if (newSubCategory.value.image) {
            formData.append('image', newSubCategory.value.image);
        }

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/categories/subcategories`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        subcategories.value.push({
            id: res.data._id,
            name: res.data.name,
            categoryId: res.data.categoryId,
            image: res.data.image
        });
        showSubCategoryModal.value = false;
        newSubCategory.value = { name: '', image: null };
        subCategoryImageFileName.value = '';
        Swal.fire('สำเร็จ', 'สร้างประเภทย่อยเรียบร้อย', 'success');
    } catch (error) {
        console.error("Error creating subcategory:", error);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถสร้างประเภทย่อยได้', 'error');
    } finally {
        loadingProduct.value = false;
    }
}

async function handleCreateProductFromModal() {
    if (productNameExists.value) {
        Swal.fire('สร้างไม่สำเร็จ', 'ชื่อสินค้านี้มีอยู่แล้ว', 'warning');
        return;
    }
    if (!newProduct.value.name) {
        Swal.fire('สร้างไม่สำเร็จ', 'กรุณากรอกชื่อสินค้า', 'warning');
        return;
    }
    loadingProduct.value = true;
    try {
        const formData = new FormData();
        formData.append('name', newProduct.value.name);
        formData.append('category_id', selectedCategoryId.value);
        formData.append('subCategoryId', selectedSubCategoryId.value);
        if (newProduct.value.image) {
            formData.append('image', newProduct.value.image);
        }

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        productsAll.value.push({
            id: res.data._id,
            name: res.data.name,
            categoryId: res.data.category_id,
            subCategoryId: res.data.subCategoryId,
            image: res.data.image
        });
        selectedProductId.value = res.data._id;
        productSearch.value = res.data.name;
        showProductModal.value = false;
        newProduct.value = { name: '', image: null };
        productImageFileName.value = '';
        Swal.fire('สำเร็จ', 'สร้างสินค้าเรียบร้อย', 'success');
    } catch (error) {
        console.error("Error creating product:", error);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถสร้างสินค้าได้', 'error');
    } finally {
        loadingProduct.value = false;
    }
}

async function handleCreateProductPartner() {
    loadingProduct.value = true;
    try {
        const payload = {
            productId: selectedProductId.value,
            price_per_kg: pricePerKg.value,
            maxAmount: unlimitedQuantity.value ? null : quantity.value,
            shopId: partnerId.value
        };
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/product-partners`, payload);
        Swal.fire('สำเร็จ', 'เพิ่มสินค้าเรียบร้อย', 'success');
        await reloadPartnerProducts();

        // Clear form
        clearCategory();
        pricePerKg.value = null;
        quantity.value = null;
    } catch (error) {
        console.error("Error creating partner product:", error);
        Swal.fire('เกิดข้อผิดพลาด', error.response?.data?.message || 'ไม่สามารถเพิ่มสินค้าได้', 'error');
    } finally {
        loadingProduct.value = false;
    }
}

function handleViewProduct(prod) {
    viewingProduct.value = prod;
}

function handleEditProduct(prod) {
    editingProduct.value = prod;
    editForm.value.name = prod.name;
    editForm.value.pricePerKg = prod.pricePerKg;
    editForm.value.isUnlimited = prod.quantity === null; // แก้ไขที่นี่
    editForm.value.quantity = prod.quantity !== null ? prod.quantity : 0;
    editForm.value.oldImage = prod.image;
    editForm.value.image = null;
    editProductImageFileName.value = '';
}

// async function handleUpdateProduct() {
//     if (!editingProduct.value.id) return;
//     try {
//         const formData = new FormData();
//         formData.append('shopId', partnerId.value);
//         formData.append('productId', editingProduct.value.productId);
//         formData.append('price_per_kg', editForm.value.pricePerKg);
//         if (editForm.value.isUnlimited) {
//             formData.append('maxAmount', 8888888);
//         } else {
//             // ถ้าไม่ได้เลือก 'ไม่จำกัด' ให้ส่งค่า quantity
//             // ตรวจสอบให้แน่ใจว่า quantity มีค่ามากกว่า 0
//             formData.append('maxAmount', editForm.value.quantity > 0 ? editForm.value.quantity : 0);
//         }

//         const res = await axios.put(`${import.meta.env.VITE_API_URL}/product-partners/${editingProduct.value.id}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });

//         Swal.fire('สำเร็จ', 'แก้ไขสินค้าเรียบร้อย', 'success');
//         closeEditProduct();
//         await reloadPartnerProducts();
//     } catch (error) {
//         console.error("Error updating partner product:", error);
//         Swal.fire('เกิดข้อผิดพลาด', error.response?.data?.message || 'ไม่สามารถแก้ไขสินค้าได้', 'error');
//     }
// }

// ในส่วนของ <script setup> ในไฟล์ Vue.js ของคุณ

async function handleUpdateProduct() {
    if (!editingProduct.value.id) return;
    try {
        const payload = {
            shopId: partnerId.value,
            productId: editingProduct.value.productId,
            price_per_kg: editForm.value.pricePerKg
        };
        
        // กำหนดค่า maxAmount ตามเงื่อนไข
        if (editForm.value.isUnlimited) {
            payload.maxAmount = null;
        } else {
            payload.maxAmount = editForm.value.quantity > 0 ? editForm.value.quantity : 0;
        }
        
        // ✅ เปลี่ยน axios.put ให้ส่ง payload ในรูปแบบ JSON
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/product-partners/${editingProduct.value.id}`, payload);

        Swal.fire('สำเร็จ', 'แก้ไขสินค้าเรียบร้อย', 'success');
        closeEditProduct();
        await reloadPartnerProducts();
    } catch (error) {
        console.error("Error updating partner product:", error);
        Swal.fire('เกิดข้อผิดพลาด', error.response?.data?.message || 'ไม่สามารถแก้ไขสินค้าได้', 'error');
    }
}

async function handleDeleteProduct(id) {
    const result = await Swal.fire({
        title: 'คุณแน่ใจหรือไม่?',
        text: 'คุณต้องการลบสินค้าชิ้นนี้ใช่ไหม?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#184c36',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ลบเลย!',
        cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/product-partners/${id}`);
            Swal.fire('ลบแล้ว!', 'สินค้าถูกลบเรียบร้อย', 'success');
            await reloadPartnerProducts();
        } catch (error) {
            console.error("Error deleting partner product:", error);
            Swal.fire('เกิดข้อผิดพลาด', error.response?.data?.message || 'ไม่สามารถลบสินค้าได้', 'error');
        }
    }
}

// Methods: Pagination
function goToPage(page) {
    if (page >= 1 && page <= pageCount.value) {
        currentPage.value = page;
    }
}

// Helper methods
function getCategoryName(id) {
    const cat = categories.value.find(c => c.id === id);
    return cat ? cat.name : 'ไม่ระบุ';
}

function getSubCategoryName(id) {
    const sub = subcategories.value.find(s => s.id === id);
    return sub ? sub.name : 'ไม่ระบุ';
}

const subcategoriesFilteredByCategory = computed(() => {
    if (!filterCategoryId.value) {
        return subcategories.value;
    }
    return subcategories.value.filter(sub => sub.categoryId === filterCategoryId.value);
});
</script>

<style scoped>
.upload-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border: 2px dashed #e5e7eb;
    border-radius: 0.75rem;
    background-color: #f9fafb;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    min-height: 120px;
    cursor: pointer;
}

.upload-button:hover {
    border-color: #84f857;
    background-color: #eefae8;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(179, 239, 68, 0.1), 0 2px 4px -1px rgba(179, 239, 68, 0.06);
}

.upload-button:active {
    transform: translateY(0);
}

.upload-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.5rem;
    color: #2e5200;
    background-color: #f1fee2;
    border-radius: 50%;
    padding: 0.5rem;
}

.upload-text {
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
}

.upload-hint {
    font-size: 0.75rem;
    color: #6b7280;
}

.upload-button:hover .upload-icon {
    background-color: #b6ffa0;
    color: #276901;
}

.upload-button:hover .upload-text {
    color: #276901;
}
</style>