<template>
  <div class="min-h-screen w-full flex flex-col bg-white">
    <Bar />
    <main class="flex-1 max-w-[1450px] mx-auto w-full px-8 py-10 relative flex flex-col justify-center">
      <h1 class="text-2xl md:text-3xl font-bold mb-4 text-[#222]">สินค้ารีไซเคิล</h1>
      <!-- หมวดหมู่ -->
      <div class="mb-6 flex flex-wrap items-center gap-2">
        <span v-if="categoryName"
          class="bg-[#b6e388] text-[#184c36] rounded-full px-5 py-2 text-base font-semibold shadow">{{ categoryName
          }}</span>
      </div>
      <!-- ค้นหา -->
      <form class="flex items-center gap-2 mb-8 max-w-md" @submit.prevent>
        <input v-model="search" type="text" placeholder="ค้นหาชื่อสินค้าที่รีไซเคิล..."
          class="flex-1 rounded-full border border-[#e6e6e6] px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388]" />
        <button type="submit"
          class="bg-[#b6e388] hover:bg-[#d6f5a6] text-[#184c36] rounded-full px-6 py-2 text-base font-semibold shadow transition">ค้นหา</button>
      </form>
      <!-- สินค้า -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <template v-if="items.length">
          <div v-for="(item, idx) in items" :key="item._id || idx"
            class="bg-white rounded-xl border border-[#e6f7e6] shadow p-2 flex flex-col">
            <img :src="item.img" :alt="item.name" class="rounded-lg w-full aspect-square object-cover mb-2" />
            <div class="flex p-2">
              <div class="text-[#222] text-sm font-semibold mb-1">{{ item.name }}</div>
            </div>
            <div class="flex justify-end m-2">
              <button
                class="w-2/3 sm:w-3/5 bg-lime-600 hover:bg-[#184c36] text-white rounded-full px-3 py-1 text-xs font-semibold shadow transition flex items-center justify-center gap-1">
                จองคิว
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </template>
        <div v-else class="col-span-full text-center text-gray-400 py-8">
          ไม่พบสินค้าในหมวดหมู่นี้
        </div>
      </div>
      <!-- Pagination -->
      <div class="flex justify-end">
        <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
            class="px-3 py-1 rounded-l-md border border-[#e6e6e6] bg-white text-[#184c36] font-semibold hover:bg-[#b6e388] disabled:opacity-50 disabled:cursor-not-allowed">&lt;</button>
          <button v-for="page in pageCount" :key="page" @click="goToPage(page)"
            :class="['px-3 py-1 border-t border-b border-[#e6e6e6] bg-white text-[#184c36] font-semibold', currentPage === page ? 'bg-[#b6e388] text-[#184c36]' : '']">
            {{ page }}
          </button>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === pageCount"
            class="px-3 py-1 rounded-r-md border border-[#e6e6e6] bg-white text-[#184c36] font-semibold hover:bg-[#b6e388] disabled:opacity-50 disabled:cursor-not-allowed">&gt;</button>
        </nav>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Bar from '../../components/Bar.vue'
import Footer from '../../components/Footer.vue'

const route = useRoute()
const allItems = ref([])
const currentPage = ref(1)
const pageSize = 12
const pageCount = computed(() => Math.ceil(filteredItems.value.length / pageSize))
const search = ref('')

const categoryName = computed(() => route.query.category || '')
const subCategoryId = computed(() => route.query.subCategoryId || '')
const subCategoryName = computed(() => route.query.subCategoryName || '')

const filteredItems = computed(() => {
  let items = allItems.value
  if (subCategoryId.value) {
    items = items.filter(item => item.subCategoryId === subCategoryId.value || (item.subCategoryId && item.subCategoryId._id === subCategoryId.value))
  } else if (categoryName.value) {
    items = items.filter(item => item.category_id && (item.category_id.name === categoryName.value))
  }
  if (search.value) {
    items = items.filter(item => item.name.includes(search.value))
  }
  return items
})

const items = computed(() => filteredItems.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))

function goToPage(page) {
  if (page >= 1 && page <= pageCount.value) {
    currentPage.value = page
    setTimeout(() => {
      const grid = document.querySelector('.grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }
}

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8888/recycle/products')
    if (res.data && res.data.products) {
      allItems.value = res.data.products.map(p => ({
        ...p,
        img: '/src/assets/NoPicture.webp' // หรือ map รูปจริงถ้ามี
      }))
    }
  } catch (e) {
    allItems.value = []
  }
})
</script>

<style scoped></style>