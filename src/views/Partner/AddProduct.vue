<template>
    <BarAdmin />
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-full mx-10 bg-white rounded-xl shadow border border-[#e6e6e6] p-8">
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
                    <!-- ถ้าพิมพ์ชื่อใหม่ (ไม่ซ้ำ) ให้แสดง input อัปโหลดรูป -->
                    <div v-if="!productNameExists && productSearch" class="mt-2">
                        <label for="productImageInput" class="upload-button">
                            <span class="upload-text">เลือกรูปภาพ</span>
                            <span class="upload-hint">JPG, PNG, GIF (สูงสุด 2MB)</span>
                            <input id="productImageInput" type="file" accept="image/*"
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
                    <input type="number" v-model="quantity"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                        min="0" />
                </div>
            </div>

            <!-- 5. ปุ่มบันทึก -->
            <div class="mt-8">
                <button
                    class="bg-[#184c36] hover:bg-green-700 text-white px-8 py-2 rounded shadow-sm disabled:opacity-50 transition"
                    :disabled="!canSave" @click="handleCreateProduct">บันทึก</button>
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
                            :disabled="categoryNameExists || !newCategory.name">บันทึก</button>
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
                            :disabled="subCategoryNameExists || !newSubCategory.name">บันทึก</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ตารางแสดงสินค้า -->
        <div class="mx-10 mt-12 bg-white rounded-xl shadow border border-[#e6e6e6] p-8">
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
                                || '-' }}</td>
                            <td class="px-4 py-3 border-b border-[#e6e6e6] min-w-[140px]">
                                <div class="flex justify-center items-center gap-3">
                                    <button class="text-blue-600 hover:underline" title="ข้อมูล" @click="handleViewProduct(prod)">🛈</button>
                                    <button class="text-yellow-600 hover:underline" title="แก้ไข" @click="handleEditProduct(prod)">✏️</button>
                                    <button class="text-red-600 hover:underline" title="ลบ" @click="handleDeleteProduct(prod.id)">🗑️</button>
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
                    <img v-if="viewingProduct.image || '/src/assets/NoPicture.webp'" :src="viewingProduct.image || '/src/assets/NoPicture.webp'" :alt="viewingProduct.name" class="w-32 h-32 object-contain border rounded mb-2" />
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
                <button class="mt-4 px-6 py-2 bg-[#184c36] hover:bg-green-700 text-white rounded shadow" @click="closeViewProduct">ปิด</button>
            </div>
        </div>

        <!-- Modal แก้ไขสินค้า -->
        <div v-if="editingProduct" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md">
                <h3 class="font-bold mb-4 text-[#184c36] text-xl">แก้ไขสินค้า</h3>
                <div class="mb-3">
                    <label class="block font-semibold mb-1 text-[#184c36]">ชื่อสินค้า</label>
                    <input v-model="editForm.name" class="border rounded px-3 py-2 w-full bg-gray-100 text-gray-500" readonly disabled />
                </div>
                <div class="mb-3">
                    <label class="block font-semibold mb-1 text-[#184c36]">ราคาต่อกิโลกรัม (บาท)</label>
                    <input v-model="editForm.pricePerKg" type="number" class="border rounded px-3 py-2 w-full" />
                </div>
                <div class="mb-3">
                    <label class="block font-semibold mb-1 text-[#184c36]">จำนวนที่รับซื้อ (กิโลกรัม)</label>
                    <input v-model="editForm.quantity" type="number" class="border rounded px-3 py-2 w-full" />
                </div>
                <div class="mb-3">
                    <label class="block font-semibold mb-1 text-[#184c36]">รูปภาพสินค้าเดิม</label>
                    <img v-if="editingProduct && editingProduct.image" :src="editingProduct.image" alt="รูปสินค้าเดิม" class="w-24 h-24 object-contain border rounded mb-2" />
                    <label for="editProductImageInput" class="upload-button">
                        <span class="upload-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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
                    </div>
                    <div v-if="editProductImageFileName" class="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                        <div class="flex items-center gap-2 text-sm text-green-700">
                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="truncate">{{ editProductImageFileName }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-2 mt-4">
                    <button class="px-4 py-2 text-[#184c36]" @click="closeEditProduct">ยกเลิก</button>
                    <button class="bg-[#184c36] hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm" @click="handleUpdateProduct">บันทึก</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import BarAdmin from '../../components/BarAdmin.vue';
import Swal from 'sweetalert2';

// State หลัก
const categories = ref([]);
const subcategories = ref([]);
const productsAll = ref([]); // สินค้าทั้งหมด (สำหรับ dropdown)
const products = ref([]);    // สินค้าของ partner (สำหรับตาราง)

onMounted(async () => {
    // ดึง categories
    const catRes = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    categories.value = (catRes.data || []).map(cat => ({
        id: cat._id,
        name: cat.name,
        image: cat.image || null
    }));

    // ดึง subcategories
    const subRes = await axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/all`);
    subcategories.value = (subRes.data || []).map(sub => ({
        id: sub._id,
        name: sub.name,
        categoryId: sub.categoryId,
        image: sub.image || null
    }));

    // ดึง products
    const prodRes = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    productsAll.value = (prodRes.data.products || []).map(prod => ({
        id: prod._id,
        name: prod.name,
        pricePerKg: prod.price_per_kg,
        quantity: prod.maxAmount,
        categoryId: prod.category_id,
        subCategoryId: prod.subCategoryId,
        image: prod.image || '/src/assets/NoPicture.webp',
        shopId: prod.shopId
    }));
    products.value = productsAll.value.filter(
        prod => (prod.shopId?._id || prod.shopId) === partnerId.value
    );
});

const selectedCategoryId = ref('');
const selectedSubCategoryId = ref('');
const selectedProductId = ref('');

// Searchable select states
const categorySearch = ref('');
const categoryDropdownOpen = ref(false);
const subCategorySearch = ref('');
const subCategoryDropdownOpen = ref(false);
const productSearch = ref('');
const productDropdownOpen = ref(false);

const showCategoryModal = ref(false);
const showSubCategoryModal = ref(false);
const showProductModal = ref(false);

const newCategory = ref({ name: '', image: null });
const newSubCategory = ref({ name: '', image: null });
const newProduct = ref({ name: '', image: null });

const pricePerKg = ref('');
const quantity = ref('');

// ฟิลเตอร์สำหรับ searchable select
const filteredCategories = computed(() => {
    if (!categorySearch.value) return categories.value;
    return categories.value.filter(cat => cat.name.toLowerCase().includes(categorySearch.value.toLowerCase()));
});
const filteredSubCategories = computed(() => {
    if (!subCategorySearch.value) return subcategories.value.filter(sub => sub.categoryId === selectedCategoryId.value);
    return subcategories.value.filter(sub => sub.categoryId === selectedCategoryId.value && sub.name.toLowerCase().includes(subCategorySearch.value.toLowerCase()));
});
// สำหรับ dropdown
const filteredProducts = computed(() => {
  return productsAll.value.filter(prod =>
    prod.categoryId === selectedCategoryId.value &&
    prod.subCategoryId === selectedSubCategoryId.value &&
    (!productSearch.value || prod.name.toLowerCase().includes(productSearch.value.toLowerCase()))
  );
});
// สำหรับตาราง
const filteredProductsTable = computed(() => {
    return products.value.filter(prod => {
        if (searchProductName.value && !prod.name.toLowerCase().includes(searchProductName.value.toLowerCase())) return false;
        if (filterCategoryId.value && prod.categoryId !== filterCategoryId.value) return false;
        if (filterSubCategoryId.value && prod.subCategoryId !== filterSubCategoryId.value) return false;
        return true;
    });
});

// ตรวจสอบชื่อซ้ำ (case-insensitive)
const categoryNameExists = computed(() => {
    return categories.value.some(cat => cat.name.trim().toLowerCase() === newCategory.value.name.trim().toLowerCase());
});
const subCategoryNameExists = computed(() => {
    return subcategories.value.some(sub => sub.categoryId === selectedCategoryId.value && sub.name.trim().toLowerCase() === newSubCategory.value.name.trim().toLowerCase());
});
const productNameExists = computed(() => {
    return productsAll.value.some(prod => prod.name.trim().toLowerCase() === newProduct.value.name.trim().toLowerCase());
});

// File name states
const categoryImageFileName = ref('');
const subCategoryImageFileName = ref('');
const productImageFileName = ref('');

// Handler สำหรับอัปโหลดรูป (mock)
function onCategoryImageChange(e) {
    const file = e.target.files[0];
    if (file) {
        newCategory.value.image = file;
        categoryImageFileName.value = file.name;
    }
}
function onSubCategoryImageChange(e) {
    const file = e.target.files[0];
    if (file) {
        newSubCategory.value.image = file;
        subCategoryImageFileName.value = file.name;
    }
}
function onProductImageChange(e) {
    const file = e.target.files[0];
    if (file) {
        newProduct.value.image = file;
        productImageFileName.value = file.name;
    }
}

// Handler สำหรับ searchable select
function selectCategory(cat) {
    selectedCategoryId.value = cat.id;
    categorySearch.value = cat.name;
    categoryDropdownOpen.value = false;
    selectedSubCategoryId.value = '';
    subCategorySearch.value = '';
    selectedProductId.value = '';
    productSearch.value = '';
}
function selectSubCategory(sub) {
    selectedSubCategoryId.value = sub.id;
    subCategorySearch.value = sub.name;
    subCategoryDropdownOpen.value = false;
    selectedProductId.value = '';
    productSearch.value = '';
}
// ปรับ selectProduct ให้ใช้ productsAll
function selectProduct(prod) {
    // ไม่ set selectedProductId.value เพื่อไม่ให้ logic POST ไปสนใจ id เดิม
    // selectedProductId.value = prod.id; // ลบหรือคอมเมนต์บรรทัดนี้ออก
    productSearch.value = prod.name;
    productDropdownOpen.value = false;
    newProduct.value.image = null;
    productImageFileName.value = '';
    pricePerKg.value = '';
    quantity.value = '';
}

// เงื่อนไขปุ่มบันทึก
const canSave = computed(() => {
    return (
        selectedCategoryId.value &&
        selectedSubCategoryId.value &&
        (
            selectedProductId.value ||
            (!productNameExists.value && productSearch.value)
        ) &&
        pricePerKg.value &&
        quantity.value
    );
});

// Handler สำหรับสร้างใหม่ (mock)
async function handleCreateCategory() {
    if (categoryNameExists.value || !newCategory.value.name) return;
    const formData = new FormData();
    formData.append('name', newCategory.value.name);
    if (newCategory.value.image) formData.append('image', newCategory.value.image);

    await axios.post(`${import.meta.env.VITE_API_URL}/categories`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    showCategoryModal.value = false;
    newCategory.value = { name: '', image: null };
    categoryImageFileName.value = '';
    // reload categories
    const catRes = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    categories.value = (catRes.data || []).map(cat => ({
        id: cat._id, name: cat.name, image: cat.image || null
    }));
}

async function handleCreateSubCategory() {
    if (subCategoryNameExists.value || !newSubCategory.value.name) return;
    const formData = new FormData();
    formData.append('name', newSubCategory.value.name);
    formData.append('categoryId', selectedCategoryId.value);
    if (newSubCategory.value.image) formData.append('image', newSubCategory.value.image);

    await axios.post(`${import.meta.env.VITE_API_URL}/categories/subcategories`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    showSubCategoryModal.value = false;
    newSubCategory.value = { name: '', image: null };
    subCategoryImageFileName.value = '';
    // reload subcategories
    const subRes = await axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/all`);
    subcategories.value = (subRes.data || []).map(sub => ({
        id: sub._id, name: sub.name, categoryId: sub.categoryId, image: sub.image || null
    }));
}

async function handleCreateProduct() {
  if (!productSearch.value) return;
  // ไม่ต้องสนใจ selectedProductId.value หรือ id เดิม
  const formData = new FormData();
  formData.append('name', productSearch.value);
  formData.append('category_id', selectedCategoryId.value);
  formData.append('subCategoryId', selectedSubCategoryId.value);
  formData.append('price_per_kg', pricePerKg.value);
  formData.append('maxAmount', quantity.value);
  formData.append('shopId', partnerId.value);
  if (newProduct.value.image) formData.append('image', newProduct.value.image);
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    await reloadProducts();
    currentPage.value = 1;
    newProduct.value = { name: '', image: null };
    productImageFileName.value = '';
    pricePerKg.value = '';
    quantity.value = '';
    productSearch.value = '';
    selectedProductId.value = '';
    await Swal.fire({
      icon: 'success',
      title: 'สำเร็จ',
      text: 'บันทึกสินค้าสำเร็จ',
      confirmButtonText: 'ตกลง'
    });
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: error?.response?.data?.error || error.message,
      confirmButtonText: 'ตกลง'
    });
  }
}

// ฟังก์ชันล้างค่าแต่ละช่อง
function clearCategory() {
    selectedCategoryId.value = '';
    categorySearch.value = '';
    selectedSubCategoryId.value = '';
    subCategorySearch.value = '';
    selectedProductId.value = '';
    productSearch.value = '';
}
function clearSubCategory() {
    selectedSubCategoryId.value = '';
    subCategorySearch.value = '';
    selectedProductId.value = '';
    productSearch.value = '';
}
function clearProduct() {
    selectedProductId.value = '';
    productSearch.value = '';
}

// โหลด partnerId จาก localStorage
let partner = {};
if (typeof window !== 'undefined') {
    partner = JSON.parse(localStorage.getItem('partner') || '{}');
}
const partnerId = ref(partner.id || partner._id || 'p1'); // mock fallback

// filter state
const searchProductName = ref('');
const filterCategoryId = ref('');
const filterSubCategoryId = ref('');

// filter subcategory ตาม category ที่เลือก
const subcategoriesFilteredByCategory = computed(() => {
    if (!filterCategoryId.value) return subcategories.value;
    return subcategories.value.filter(sub => sub.categoryId === filterCategoryId.value);
});

// ใน handleCreateProduct, handleDeleteProduct ให้เรียก await reloadProducts() แทนการดึง products.value ตรง ๆ
async function reloadProducts() {
  const prodRes = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
  productsAll.value = (prodRes.data.products || []).map(prod => ({
    id: prod._id,
    name: prod.name,
    pricePerKg: prod.price_per_kg,
    quantity: prod.maxAmount,
    categoryId: prod.category_id,
    subCategoryId: prod.subCategoryId,
    image: prod.image || '/src/assets/NoPicture.webp',
    shopId: prod.shopId
  }));
  products.value = productsAll.value.filter(
    prod => (prod.shopId?._id || prod.shopId) === partnerId.value
  );
}

const currentPage = ref(1);
const pageSize = 10;
const pageCount = computed(() => Math.ceil(filteredProductsTable.value.length / pageSize));
const paginatedProducts = computed(() =>
  filteredProductsTable.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
);
function goToPage(page) {
  if (page >= 1 && page <= pageCount.value) {
    currentPage.value = page;
    setTimeout(() => {
      const table = document.querySelector('table');
      if (table) table.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }
}

const viewingProduct = ref(null); // สำหรับ modal ดูข้อมูล
const editingProduct = ref(null); // สำหรับ modal แก้ไข
const editForm = ref({ name: '', pricePerKg: '', quantity: '', image: null });
const editProductImageFileName = ref('');
function onEditProductImageChange(e) {
  const file = e.target.files[0];
  if (file) {
    editForm.value.image = file;
    editProductImageFileName.value = file.name;
  }
}

function handleViewProduct(prod) {
  // ค้นหาสินค้าจาก productsAll ด้วย id เพื่อให้ได้ object ที่ map image แล้ว
  const found = productsAll.value.find(p => p.id === prod.id);
  viewingProduct.value = found || prod;
  console.log(viewingProduct.value);
}
function closeViewProduct() {
  viewingProduct.value = null;
}
function handleEditProduct(prod) {
  editingProduct.value = prod;
  editForm.value = {
    name: prod.name,
    pricePerKg: prod.pricePerKg,
    quantity: prod.quantity,
    image: null // ไม่โชว์รูปเดิม ให้เลือกใหม่เท่านั้น
  };
}
function closeEditProduct() {
  editingProduct.value = null;
}
async function handleUpdateProduct() {
  if (!editingProduct.value) return;
  const formData = new FormData();
  formData.append('name', editForm.value.name);
  formData.append('price_per_kg', editForm.value.pricePerKg);
  formData.append('maxAmount', editForm.value.quantity);
  if (editForm.value.image) formData.append('image', editForm.value.image);
  // ส่ง category_id, subCategoryId, shopId เดิมกลับไปด้วย
  formData.append('category_id', editingProduct.value.categoryId);
  formData.append('subCategoryId', editingProduct.value.subCategoryId);
  formData.append('shopId', editingProduct.value.shopId);
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/products/${editingProduct.value.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    await reloadProducts();
    currentPage.value = 1;
    editingProduct.value = null;
    Swal.fire('สำเร็จ', 'แก้ไขสินค้าเรียบร้อยแล้ว', 'success');
  } catch (error) {
    Swal.fire('เกิดข้อผิดพลาด', error?.response?.data?.error || error.message, 'error');
  }
}
async function handleDeleteProduct(prodId) {
  const result = await Swal.fire({
    title: 'ยืนยันการลบสินค้า?',
    text: 'คุณต้องการลบสินค้านี้หรือไม่',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก'
  });
  if (result.isConfirmed) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/products/${prodId}`);
    await reloadProducts();
    currentPage.value = 1;
    Swal.fire('ลบสำเร็จ', 'ลบสินค้าเรียบร้อยแล้ว', 'success');
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