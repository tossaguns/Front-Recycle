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
                            @input="categoryDropdownOpen = true"
                            @blur="() => setTimeout(() => categoryDropdownOpen = false, 150)"
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
                        <span class="text-xs text-gray-500 mt-1 md:mt-0">💡 คำแนะนำ: ค้นหาก่อนเพื่อหลีกเลี่ยงการสร้างซ้ำ</span>
                    </div>
                </div>

                <!-- ประเภทย่อย (แสดงเมื่อเลือกประเภทหลัก) -->
                <div class="flex-1" v-if="selectedCategoryId">
                    <label class="block font-semibold mb-2 text-[#184c36]">ประเภทย่อย</label>
                    <div class="relative mb-2">
                        <input v-model="subCategorySearch" @focus="subCategoryDropdownOpen = true"
                            @input="subCategoryDropdownOpen = true"
                            @blur="() => setTimeout(() => subCategoryDropdownOpen = false, 150)"
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
                        <span class="text-xs text-gray-500 mt-1 md:mt-0">💡 คำแนะนำ: ค้นหาก่อนเพื่อหลีกเลี่ยงการสร้างซ้ำ</span>
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
                            @input="productDropdownOpen = true"
                            @blur="() => setTimeout(() => productDropdownOpen = false, 150)"
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
                        <span class="text-xs text-gray-500 mt-1 md:mt-0">💡 คำแนะนำ: ค้นหาก่อนเพื่อหลีกเลี่ยงการสร้างซ้ำ</span>
                    </div>
                </div>
                <!-- ราคาต่อกิโลกรัม -->
                <div class="flex-1" v-if="selectedProductId || newProduct.name">
                    <label class="block font-semibold mb-2 text-[#184c36]">ราคาต่อกิโลกรัม (บาท)</label>
                    <input type="number" v-model="pricePerKg"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-4 md:mb-0 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                        min="0" />
                </div>
                <!-- จำนวนที่รับซื้อ -->
                <div class="flex-1" v-if="selectedProductId || newProduct.name">
                    <label class="block font-semibold mb-2 text-[#184c36]">จำนวนที่รับซื้อ (กิโลกรัม)</label>
                    <input type="number" v-model="quantity"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
                        min="0" />
                </div>
            </div>

            <!-- 5. ปุ่มบันทึก -->
            <div class="mt-8">
                <button class="bg-[#184c36] hover:bg-green-700 text-white px-8 py-2 rounded shadow-sm disabled:opacity-50 transition"
                    :disabled="!canSave" @click="handleSave">บันทึก</button>
            </div>

            <!-- Modal: สร้างประเภทหลัก -->
            <div v-if="showCategoryModal"
                class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md">
                    <h3 class="font-bold mb-4 text-[#184c36]">สร้างประเภทหลักใหม่</h3>
                    <input v-model="newCategory.name" placeholder="ชื่อประเภทหลัก"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-1 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                    <div v-if="categoryNameExists" class="text-red-500 text-sm mb-2">ชื่อมีอยู่แล้วสามารถเลือกหาเลือกได้
                    </div>
                    <input type="file" @change="onCategoryImageChange" class="mb-3" />
                    <div class="flex justify-end gap-2">
                        <button class="px-4 py-2 text-[#184c36]" @click="showCategoryModal = false">ยกเลิก</button>
                        <button class="bg-[#184c36] hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
                            @click="handleCreateCategory" :disabled="categoryNameExists || !newCategory.name">บันทึก</button>
                    </div>
                </div>
            </div>

            <!-- Modal: สร้างประเภทย่อย -->
            <div v-if="showSubCategoryModal"
                class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md">
                    <h3 class="font-bold mb-4 text-[#184c36]">สร้างประเภทย่อยใหม่</h3>
                    <input v-model="newSubCategory.name" placeholder="ชื่อประเภทย่อย"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-1 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                    <div v-if="subCategoryNameExists" class="text-red-500 text-sm mb-2">
                        ชื่อมีอยู่แล้วสามารถเลือกหาเลือกได้</div>
                    <input type="file" @change="onSubCategoryImageChange" class="mb-3" />
                    <div class="flex justify-end gap-2">
                        <button class="px-4 py-2 text-[#184c36]" @click="showSubCategoryModal = false">ยกเลิก</button>
                        <button class="bg-[#184c36] hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
                            @click="handleCreateSubCategory" :disabled="subCategoryNameExists || !newSubCategory.name">บันทึก</button>
                    </div>
                </div>
            </div>

            <!-- Modal: สร้างสินค้าใหม่ -->
            <div v-if="showProductModal"
                class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow border border-[#e6e6e6] p-6 w-full max-w-md">
                    <h3 class="font-bold mb-4 text-[#184c36]">สร้างสินค้าใหม่</h3>
                    <input v-model="newProduct.name" placeholder="ชื่อสินค้า"
                        class="border border-[#e6e6e6] rounded px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" />
                    <input type="file" @change="onProductImageChange" class="mb-3" />
                    <div class="flex justify-end gap-2">
                        <button class="px-4 py-2 text-[#184c36]" @click="showProductModal = false">ยกเลิก</button>
                        <button class="bg-[#184c36] hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
                            @click="handleCreateProduct">บันทึก</button>
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
                        <tr v-for="prod in filteredProductsTable" :key="prod.id" class="hover:bg-green-50">
                            <td class="px-4 py-3 border-b border-[#e6e6e6] min-w-[120px] text-center">{{ prod.name || '-' }}</td>
                            <td class="px-4 py-3 border-b border-[#e6e6e6] min-w-[100px] text-center">{{ prod.pricePerKg || '-' }}</td>
                            <td class="px-4 py-3 border-b border-[#e6e6e6] min-w-[100px] text-center">{{ prod.quantity || '-' }}</td>
                            <td class="px-4 py-3 border-b border-[#e6e6e6] min-w-[140px]">
                                <div class="flex justify-center items-center gap-3">
                                    <button class="text-blue-600 hover:underline" title="ข้อมูล">🛈</button>
                                    <button class="text-yellow-600 hover:underline" title="แก้ไข">✏️</button>
                                    <button class="text-red-600 hover:underline" title="ลบ">🗑️</button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="filteredProductsTable.length === 0">
                            <td colspan="4" class="text-center text-gray-400 py-4">ไม่พบสินค้า</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BarAdmin from '../../components/BarAdmin.vue';

// State หลัก
const categories = ref([
    { id: '1', name: 'กระดาษ' },
    { id: '2', name: 'พลาสติก' },
    { id: '3', name: 'โลหะ' },
]);
const subcategories = ref([
    { id: '1', name: 'ลัง', categoryId: '1' },
    { id: '2', name: 'กล่อง', categoryId: '1' },
    { id: '3', name: 'ขวดน้ำ', categoryId: '2' },
]);
const products = ref([
    { id: '1', name: 'ลังเบียร์', subCategoryId: '1', categoryId: '1' },
    { id: '2', name: 'กล่องนม', subCategoryId: '2', categoryId: '1' },
    { id: '3', name: 'ขวดน้ำดื่ม', subCategoryId: '3', categoryId: '2' },
]);

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
const filteredProducts = computed(() => {
    if (!productSearch.value) return products.value.filter(prod => prod.categoryId === selectedCategoryId.value && prod.subCategoryId === selectedSubCategoryId.value);
    return products.value.filter(prod => prod.categoryId === selectedCategoryId.value && prod.subCategoryId === selectedSubCategoryId.value && prod.name.toLowerCase().includes(productSearch.value.toLowerCase()));
});

// ตรวจสอบชื่อซ้ำ (case-insensitive)
const categoryNameExists = computed(() => {
    return categories.value.some(cat => cat.name.trim().toLowerCase() === newCategory.value.name.trim().toLowerCase());
});
const subCategoryNameExists = computed(() => {
    return subcategories.value.some(sub => sub.categoryId === selectedCategoryId.value && sub.name.trim().toLowerCase() === newSubCategory.value.name.trim().toLowerCase());
});

// Handler สำหรับอัปโหลดรูป (mock)
function onCategoryImageChange(e) {
    newCategory.value.image = e.target.files[0];
}
function onSubCategoryImageChange(e) {
    newSubCategory.value.image = e.target.files[0];
}
function onProductImageChange(e) {
    newProduct.value.image = e.target.files[0];
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
function selectProduct(prod) {
    selectedProductId.value = prod.id;
    productSearch.value = prod.name;
    productDropdownOpen.value = false;
}

// เงื่อนไขปุ่มบันทึก
const canSave = computed(() => {
    return (
        selectedCategoryId.value &&
        selectedSubCategoryId.value &&
        ((selectedProductId.value) || newProduct.value.name) &&
        pricePerKg.value &&
        quantity.value
    );
});

// Handler สำหรับสร้างใหม่ (mock)
function handleCreateCategory() {
    if (categoryNameExists.value || !newCategory.value.name) return;
    // TODO: เชื่อม API
    categories.value.push({
        id: (categories.value.length + 1).toString(),
        name: newCategory.value.name.trim(),
    });
    showCategoryModal.value = false;
    newCategory.value = { name: '', image: null };
}
function handleCreateSubCategory() {
    if (subCategoryNameExists.value || !newSubCategory.value.name) return;
    // TODO: เชื่อม API
    subcategories.value.push({
        id: (subcategories.value.length + 1).toString(),
        name: newSubCategory.value.name.trim(),
        categoryId: selectedCategoryId.value,
    });
    showSubCategoryModal.value = false;
    newSubCategory.value = { name: '', image: null };
}
function handleCreateProduct() {
    // TODO: เชื่อม API
    showProductModal.value = false;
    newProduct.value = { name: '', image: null };
}

function handleSave() {
    // TODO: เชื่อม API สำหรับบันทึกสินค้าใหม่
    alert('บันทึกสินค้า (mock)');
}

// mock สินค้าทั้งหมด (ควรดึงจาก API จริงในอนาคต)
const productsAll = ref([
    { id: '1', name: 'ลังเบียร์', pricePerKg: 10, quantity: 100, partnerId: 'p1', categoryId: '1', subCategoryId: '1' },
    { id: '2', name: 'กล่องนม', pricePerKg: 12, quantity: 50, partnerId: 'p1', categoryId: '1', subCategoryId: '2' },
    { id: '3', name: 'ขวดน้ำดื่ม', pricePerKg: 8, quantity: 200, partnerId: 'p2', categoryId: '2', subCategoryId: '3' },
    { id: '4', name: 'กล่องกระดาษ', pricePerKg: 11, quantity: 80, partnerId: 'p1', categoryId: '1', subCategoryId: '2' },
]);

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

// filter สินค้าตาม partnerId, ชื่อ, category, subcategory
const filteredProductsTable = computed(() => {
    return productsAll.value.filter(prod => {
        if (prod.partnerId !== partnerId.value) return false;
        if (searchProductName.value && !prod.name.toLowerCase().includes(searchProductName.value.toLowerCase())) return false;
        if (filterCategoryId.value && prod.categoryId !== filterCategoryId.value) return false;
        if (filterSubCategoryId.value && prod.subCategoryId !== filterSubCategoryId.value) return false;
        return true;
    });
});

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
</script>

<style scoped>
/* เพิ่มเติมถ้าต้องการ */
</style>