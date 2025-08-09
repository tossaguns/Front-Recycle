<template>
  <BarAdmin />
  <div class="min-h-screen bg-gradient-to-br from-[#e6f7e6] via-white to-[#b6e388] pt-20">
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-0 md:mt-5">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-[#184c36] mb-2">จัดการประเภทสินค้า</h1>
          <p class="text-[#666] text-lg">ประเภทหลัก ประเภทย่อย และสินค้า</p>
        </div>
        <button @click="fetchAll"
          class="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded shadow flex items-center gap-2">
          <svg :class="loading ? 'animate-spin' : ''" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.4221 8.01389C18.0322 5.61438 15.4343 4 12.4588 4C9.08513 4 6.19686 6.07535 5.00433 9.01736M16.9806 9.01736H21V5.00347M5.57787 16.0417C6.96782 18.4412 9.56573 20.0556 12.5412 20.0556C15.9149 20.0556 18.8031 17.9802 19.9957 15.0382M8.0194 15.0382H4V19.0521"
              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          รีเฟรชข้อมูล
        </button>
      </div>
      <div v-if="loading" class="flex justify-center items-center py-16">
        <svg class="animate-spin h-10 w-10 text-[#184c36]" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span class="ml-4 text-[#184c36] text-xl font-semibold">กำลังโหลดข้อมูล...</span>
      </div>
      <div v-else>
        <div class="mb-4 relative w-full">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none"
            stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="searchCategory" type="text" placeholder="ค้นหาประเภทหลัก..."
            class="w-full rounded-full border border-[#dcdcdc] bg-white px-4 py-[10px] pl-10 text-sm sm:text-sm text-xs focus:outline-none focus:ring-2 focus:ring-[#b6e388] shadow-sm placeholder:text-xs sm:placeholder:text-sm" />
        </div>
        <div
          v-for="cat in categories.filter(c => !searchCategory || c.name.toLowerCase().includes(searchCategory.toLowerCase()))"
          :key="cat._id" class="mb-6">
          <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-2 sm:p-6 flex flex-col gap-2">
            <div class="flex items-center justify-between cursor-pointer" @click="toggleCategory(cat._id)">
              <div class="flex items-center gap-3">
                <svg v-if="!expandedCategories[cat._id]" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#184c36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#184c36" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                <span class="text-sm sm:text-xl font-bold text-[#184c36]">{{ cat.name }}</span>
                <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">ประเภทหลัก</span>
              </div>
              <div class="flex items-center gap-2" @click.stop>
                <button @click="openEditModal('category', cat)" class="p-0 sm:p-2 rounded-full hover:bg-yellow-100"
                  title="แก้ไข">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.4487 3.95143L14.0487 7.55143M1.44873 16.5514L5.81472 15.6717C6.04649 15.625 6.25931 15.5109 6.42645 15.3437L16.2001 5.56461C16.6687 5.09576 16.6684 4.33577 16.1994 3.86731L14.129 1.79923C13.6602 1.33097 12.9006 1.33129 12.4322 1.79995L2.65749 11.58C2.49068 11.7469 2.37678 11.9593 2.33003 12.1906L1.44873 16.5514Z"
                      stroke="#FFCD50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <button @click="confirmDelete('category', cat)" class="p-0 sm:p-2 rounded-full hover:bg-red-100"
                  title="ลบ">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="expandedCategories[cat._id]">
              <div class="ml-6 mt-2">
                <input v-model="searchSubcategory[cat._id]" type="text" placeholder="ค้นหาประเภทย่อย..."
                  class="border rounded px-3 py-1 w-full mb-2 text-sm" />
              </div>
              <div
                v-for="sub in subcategories.filter(s => s.categoryId === cat._id && (!searchSubcategory[cat._id] || s.name.toLowerCase().includes(searchSubcategory[cat._id].toLowerCase())))"
                :key="sub._id" class="ml-6 mt-2 border-l-2 border-green-100 pl-4">
                <div class="flex items-center justify-between cursor-pointer" @click="toggleSubcategory(sub._id)">
                  <div class="flex items-center gap-3">
                    <svg v-if="!expandedSubcategories[sub._id]" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#2BAC75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2BAC75" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                    <span class="text-sm sm:text-lg font-semibold text-[#2BAC75]">{{ sub.name }}</span>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">ประเภทย่อย</span>
                  </div>
                  <div class="flex items-center gap-2" @click.stop>
                    <button @click="openEditModal('subcategory', sub)"
                      class="p-1 sm:p-2 rounded-full hover:bg-yellow-100" title="แก้ไข">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.4487 3.95143L14.0487 7.55143M1.44873 16.5514L5.81472 15.6717C6.04649 15.625 6.25931 15.5109 6.42645 15.3437L16.2001 5.56461C16.6687 5.09576 16.6684 4.33577 16.1994 3.86731L14.129 1.79923C13.6602 1.33097 12.9006 1.33129 12.4322 1.79995L2.65749 11.58C2.49068 11.7469 2.37678 11.9593 2.33003 12.1906L1.44873 16.5514Z"
                          stroke="#FFCD50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
                    <button @click="confirmDelete('subcategory', sub)" class="p-0 sm:p-2 rounded-full hover:bg-red-100"
                      title="ลบ">
                      <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div v-if="expandedSubcategories[sub._id]">
                  <div class="ml-6 mt-2">
                    <input v-model="searchProduct[sub._id]" type="text" placeholder="ค้นหาสินค้า..."
                      class="border rounded px-3 py-1 w-full mb-2 text-sm" />
                  </div>
                  <div v-for="prod in getProductsBySubcategory(cat._id, sub._id, searchProduct[sub._id])"
                    :key="prod._id" class="ml-6 mt-2 flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                    <div class="flex items-center gap-3">
                      <span class="text-sm sm:text-base text-[#184c36]">{{ prod.name }}</span>
                      <span class="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">สินค้า</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <button @click="openEditModal('product', prod)"
                        class="p-1 sm:p-2 rounded-full hover:bg-yellow-100" title="แก้ไข">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.4487 3.95143L14.0487 7.55143M1.44873 16.5514L5.81472 15.6717C6.04649 15.625 6.25931 15.5109 6.42645 15.3437L16.2001 5.56461C16.6687 5.09576 16.6684 4.33577 16.1994 3.86731L14.129 1.79923C13.6602 1.33097 12.9006 1.33129 12.4322 1.79995L2.65749 11.58C2.49068 11.7469 2.37678 11.9593 2.33003 12.1906L1.44873 16.5514Z"
                            stroke="#FFCD50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>
                      <button @click="confirmDelete('product', prod)" class="p-0 sm:p-2 rounded-full hover:bg-red-100"
                        title="ลบ">
                        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow p-8 max-w-md w-full mx-3">
          <h3 class="text-xl font-bold text-[#184c36] mb-4">ยืนยันการลบ</h3>
          <p class="mb-6">คุณต้องการลบ <span class="font-semibold">{{ deleteTargetTypeText }}</span> ที่ชื่อ <br><span
              class="text-[#2BAC75]">{{ deleteTarget?.name }}</span> <br> หรือไม่?</p>
          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 text-[#184c36]" @click="showDeleteModal = false">ยกเลิก</button>
            <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-sm"
              @click="handleDelete">ลบ</button>
          </div>
        </div>
      </div>
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow p-8 max-w-md w-full mx-3">
          <h3 class="text-xl font-bold text-[#184c36] mb-4">แก้ไข {{ editTargetTypeText }}</h3>
          <div v-if="editTargetType === 'product'">
            <label class="block mb-2 font-semibold text-[#184c36]">เปลี่ยนประเภทหลัก</label>
            <select v-model="editForm.categoryId" class="border rounded px-3 py-2 w-full mb-4">
              <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
            </select>
            <label class="block mb-2 font-semibold text-[#184c36]">เปลี่ยนประเภทย่อย</label>
            <select v-model="editForm.subCategoryId" class="border rounded px-3 py-2 w-full mb-4">
              <option v-for="sub in subcategories.filter(s => s.categoryId === editForm.categoryId)" :key="sub._id"
                :value="sub._id">{{ sub.name }}</option>
            </select>
          </div>
          <div v-else-if="editTargetType === 'subcategory'">
            <label class="block mb-2 font-semibold text-[#184c36]">เปลี่ยนประเภทหลัก</label>
            <select v-model="editForm.categoryId" class="border rounded px-3 py-2 w-full mb-4">
              <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
            </select>
          </div>
          <div v-else>
            <label class="block mb-2 font-semibold text-[#184c36]">ชื่อประเภทหลัก</label>
            <input v-model="editForm.name" class="border rounded px-3 py-2 w-full mb-4" />
          </div>
          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 text-[#184c36]" @click="showEditModal = false">ยกเลิก</button>
            <button class="bg-[#184c36] hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
              @click="handleEditSave">บันทึก</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import BarAdmin from '../../components/BarAdmin.vue';

const loading = ref(false);
const categories = ref([]);
const subcategories = ref([]);
const products = ref([]);

// Collapsible state
const expandedCategories = reactive({});
const expandedSubcategories = reactive({});
// Search state
const searchCategory = ref("");
const searchSubcategory = reactive({}); // { [catId]: '' }
const searchProduct = reactive({}); // { [subId]: '' }

function toggleCategory(catId) {
  expandedCategories[catId] = !expandedCategories[catId];
  if (expandedCategories[catId]) {
    if (!searchSubcategory[catId]) searchSubcategory[catId] = '';
  }
}
function toggleSubcategory(subId) {
  expandedSubcategories[subId] = !expandedSubcategories[subId];
  if (expandedSubcategories[subId]) {
    if (!searchProduct[subId]) searchProduct[subId] = '';
  }
}

const showDeleteModal = ref(false);
const deleteTarget = ref(null);
const deleteTargetType = ref('');
const showEditModal = ref(false);
const editTarget = ref(null);
const editTargetType = ref('');
const editForm = reactive({});

const deleteTargetTypeText = computed(() => {
  if (deleteTargetType.value === 'category') return 'ประเภทหลัก';
  if (deleteTargetType.value === 'subcategory') return 'ประเภทย่อย';
  if (deleteTargetType.value === 'product') return 'สินค้า';
  return '';
});
const editTargetTypeText = computed(() => {
  if (editTargetType.value === 'category') return 'ประเภทหลัก';
  if (editTargetType.value === 'subcategory') return 'ประเภทย่อย';
  if (editTargetType.value === 'product') return 'สินค้า';
  return '';
});

async function fetchAll() {
  loading.value = true;
  try {
    const [catRes, subRes, prodRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/categories`),
      axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/all`),
      axios.get(`${import.meta.env.VITE_API_URL}/products`)
    ]);
    categories.value = catRes.data || [];
    subcategories.value = subRes.data || [];
    products.value = (prodRes.data.products || []).map(p => ({ ...p, categoryId: p.category_id, subCategoryId: p.subCategoryId }));
    // Reset expand state on reload
    Object.keys(expandedCategories).forEach(k => delete expandedCategories[k]);
    Object.keys(expandedSubcategories).forEach(k => delete expandedSubcategories[k]);
  } catch (e) {
    Swal.fire('เกิดข้อผิดพลาด', e.message, 'error');
  } finally {
    loading.value = false;
  }
}
onMounted(fetchAll);
// แก้ไขฟังก์ชัน uniqueProducts ให้กรองแค่ตาม category และ subcategory
const getProductsBySubcategory = (categoryId, subCategoryId, search) => {
  return products.value.filter(
    p => p.categoryId === categoryId && p.subCategoryId === subCategoryId && (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  );
};

function confirmDelete(type, item) {
  deleteTargetType.value = type;
  deleteTarget.value = item;
  showDeleteModal.value = true;
}

async function handleDelete() {
  try {
    let url = '';
    if (deleteTargetType.value === 'category') url = `/categories/${deleteTarget.value._id}`;
    if (deleteTargetType.value === 'subcategory') url = `/categories/subcategories/${deleteTarget.value._id}`;
    if (deleteTargetType.value === 'product') url = `/products/${deleteTarget.value._id}`;
    await axios.delete(`${import.meta.env.VITE_API_URL}${url}`);
    showDeleteModal.value = false;
    await fetchAll();
    Swal.fire('สำเร็จ', 'ลบข้อมูลเรียบร้อย', 'success');
  } catch (e) {
    Swal.fire('เกิดข้อผิดพลาด', e.message, 'error');
  }
}

function openEditModal(type, item) {
  editTargetType.value = type;
  editTarget.value = item;
  if (type === 'category') {
    editForm.name = item.name;
  } else if (type === 'subcategory') {
    editForm.categoryId = item.categoryId;
  } else if (type === 'product') {
    editForm.categoryId = item.categoryId;
    editForm.subCategoryId = item.subCategoryId;
  }
  showEditModal.value = true;
}

async function handleEditSave() {
  try {
    if (editTargetType.value === 'category') {
      await axios.put(`${import.meta.env.VITE_API_URL}/categories/${editTarget.value._id}`, { name: editForm.name });
    } else if (editTargetType.value === 'subcategory') {
      const oldCategoryId = editTarget.value.categoryId;
      const newCategoryId = editForm.categoryId;
      // Update subcategory's categoryId
      await axios.put(`${import.meta.env.VITE_API_URL}/categories/subcategories/${editTarget.value._id}`, { categoryId: newCategoryId });

      // If categoryId has changed, update all products in this subcategory
      if (oldCategoryId !== newCategoryId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/products/update-category-by-subcategory`, {
          subCategoryId: editTarget.value._id,
          newCategoryId: newCategoryId
        });
      }
    } else if (editTargetType.value === 'product') {
      await axios.put(`${import.meta.env.VITE_API_URL}/products/${editTarget.value._id}`, { category_id: editForm.categoryId, subCategoryId: editForm.subCategoryId });
    }
    showEditModal.value = false;
    await fetchAll();
    Swal.fire('สำเร็จ', 'บันทึกข้อมูลเรียบร้อย', 'success');
  } catch (e) {
    Swal.fire('เกิดข้อผิดพลาด', e.message, 'error');
  }
}
</script>

<style scoped>
.bg-white {
  transition: box-shadow 0.2s;
}
</style>