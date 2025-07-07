<template>
  <div class="min-h-screen bg-white flex flex-col">
    <Bar />

    <div class="bg-[#f7faf0] h-screen">
      <main class="flex-1 max-w-7xl mx-auto w-full px-8 py-8 relative flex flex-col justify-center ">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222] text-center my-6 sm:my-8 md:my-10">
          ร้านรับ - ซื้อสินค้ารีไซเคิล
        </h1>

        <!-- ค้นหาร้าน -->
        <div class="flex flex-col items-center mb-6 sm:mb-8 md:mb-10">
          <div class="flex flex-col gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md md:max-w-xl">
            <span class="text-sm sm:text-base">เลือกจังหวัดที่ต้องการค้นหาร้าน</span>
            <select v-model="selectedProvince"
              class="rounded-full border border-[#b6e388] px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white w-full">
              <option value="">เลือกจังหวัด</option>
              <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>
            </select>
            <form @submit.prevent class="flex flex-1 gap-1 sm:gap-2">
              <div class="relative w-full">
                <svg class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input v-model="search" type="text" placeholder="ค้นหาชื่อร้าน..."
                  class="rounded-full border border-[#b6e388] px-4 sm:px-5 py-2 sm:py-3 pl-8 sm:pl-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white w-full" />
              </div>
              <button type="submit"
                class="bg-[#b6e388] hover:bg-[#184c36] text-[#184c36] hover:text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow transition">
                ค้นหา
              </button>
            </form>
          </div>
        </div>

        <!-- ดูเพิ่มเติม -->
        <!-- <div class="flex justify-center mb-6 sm:mb-8">
          <button @click="showAll = !showAll"
            class="bg-[#184c36] hover:bg-[#b6e388] text-white hover:text-[#184c36] rounded-full px-6 sm:px-8 py-2 sm:py-3 font-semibold flex items-center gap-1 sm:gap-2 transition text-sm sm:text-base">
            ดูเพิ่มเติม
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div> -->

        <!-- ร้านค้า -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          <div v-for="(store, idx) in pagedStores" :key="store._id || idx"
            class="flex flex-col items-center">
            <img :src="store.img || defaultImg" alt="store"
              class="rounded-xl w-full aspect-square object-cover mb-4" />
            <div class="text-lg font-semibold text-black mb-1">{{ store.name || 'ชื่อร้าน' }}</div>
            <div class="text-gray-600 text-sm mb-2">{{ store.province || 'แสดงชื่อจังหวัด' }}</div>
            <!-- <button
              class="bg-[#184c36] hover:bg-[#b6e388] text-white rounded-full px-3 py-1 text-sm shadow transition flex items-center gap-1 mb-2"
              @click="selectPartner(store)"
            >
              เลือกร้านนี้
            </button> -->
            <router-link
              :to="`/partnerdetail/${store._id || idx}`"
              class="bg-emerald-900 hover:bg-green-500 text-white rounded-full px-3 py-1 text-sm shadow transition flex items-center gap-1"
            >
              เพิ่มเติม
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Bar from '../../components/Bar.vue';
import Footer from '../../components/Footer.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const stores = ref([]);
const provinces = ref([]);
const selectedProvince = ref('');
const search = ref('');
const showAll = ref(false);
const defaultImg = '/src/assets/NoPicture.webp';
const scrollRef = ref(null)
const isAtStart = ref(true)
const isAtEnd = ref(false)
const currentPage = ref(1)
const pageSize = 10

const displayedStores = computed(() => {
  let filtered = stores.value;
  if (selectedProvince.value) {
    filtered = filtered.filter(s => s.province === selectedProvince.value);
  }
  if (search.value) {
    filtered = filtered.filter(s => s.name && s.name.includes(search.value));
  }
  return showAll.value ? filtered : filtered.slice(0, 5);
})

const filteredStores = computed(() => {
  let filtered = stores.value;
  if (selectedProvince.value) {
    filtered = filtered.filter(s => s.province === selectedProvince.value);
  }
  if (search.value) {
    filtered = filtered.filter(s => s.name && s.name.includes(search.value));
  }
  return filtered;
})
const pageCount = computed(() => Math.ceil(filteredStores.value.length / pageSize))
const pagedStores = computed(() => filteredStores.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))

const updateScrollState = () => {
  const el = scrollRef.value
  if (!el) return
  isAtStart.value = el.scrollLeft <= 0
  isAtEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
}

const getScrollStep = () => {
  const el = scrollRef.value
  if (!el) return 0
  // คำนวณขนาด card (min-w + gap)
  const card = el.querySelector('div')
  if (!card) return el.clientWidth
  const cardStyle = window.getComputedStyle(card)
  const cardWidth = card.offsetWidth
  const gap = parseInt(cardStyle.marginRight || '0') + parseInt(cardStyle.marginLeft || '0')
  // ดูว่าตอนนี้เห็นกี่อัน
  const visible = Math.floor(el.clientWidth / cardWidth)
  if (visible >= 2) return (cardWidth + gap) * 2
  return cardWidth + gap
}

const scrollLeft = () => {
  const el = scrollRef.value
  if (!el) return
  const step = getScrollStep()
  el.scrollBy({ left: -step, behavior: 'smooth' })
  setTimeout(updateScrollState, 400)
}

const scrollRight = () => {
  const el = scrollRef.value
  if (!el) return
  const step = getScrollStep()
  el.scrollBy({ left: step, behavior: 'smooth' })
  setTimeout(updateScrollState, 400)
}

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

function selectPartner(store) {
  localStorage.setItem('partner', JSON.stringify(store));
  router.push('/recycleorder');
}

onMounted(async () => {
  if (scrollRef.value) {
    scrollRef.value.addEventListener('scroll', updateScrollState)
    updateScrollState()
  }

  try {
    const res = await axios.get('http://localhost:8888/recycle/partners');
    // backend ส่งข้อมูลใน data.data (array)
    const arr = Array.isArray(res.data.data) ? res.data.data : [];
    stores.value = arr.map(s => ({
      ...s,
      name: s.companyName,
      province: s.companyProvince,
      img: s.shopImages || defaultImg
    }));
    // สร้าง list จังหวัดจากข้อมูลร้าน
    const provinceSet = new Set(stores.value.map(s => s.province).filter(Boolean));
    provinces.value = Array.from(provinceSet);
    // รอ DOM render เสร็จแล้วค่อย updateScrollState
    setTimeout(() => {
      if (scrollRef.value) {
        updateScrollState();
      }
    }, 100);
  } catch (e) {
    stores.value = [];
    provinces.value = [];
  }
});
</script>

<style scoped>
.bg-partner-bg {
  background: #f7faf0;
}
</style>
