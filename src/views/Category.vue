<template>
  <div class="min-h-screen flex flex-col bg-white">
    <Bar />
    <main class="flex-1 max-w-[1550px] mx-auto w-full px-10 py-10 relative">
      <h1 class="text-3xl md:text-5xl font-bold mb-7 text-[#222]">หมวดหมู่สินค้ารีไซเคิล</h1>
      <p class="mb-12 text-[#666]">สัมผัสเนื้อหาหมวดหมู่ประเภทของรีไซเคิล คุณสามารถกดดูรายละเอียดเพิ่มเติมได้ที่นี่</p>
      <div class="relative flex items-center">
        <button @click="scrollLeft" :disabled="isAtStart"
          class="absolute left-0 z-10 bg-white border border-[#e6e6e6] rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow hover:bg-[#b6e388] disabled:opacity-50 disabled:cursor-not-allowed transition -translate-x-1/2">
          <svg class="w-6 h-6 text-[#184c36]" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div ref="scrollRef"
          class="flex gap-4 md:gap-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#b6e388] scrollbar-track-[#f0f0f0] mx-4 md:mx-20"
          style="scrollbar-width: thin; scroll-behavior: smooth;">
          <div v-for="(cat, idx) in categories" :key="idx"
            class="min-w-[180px] max-w-[200px] md:min-w-[300px] md:max-w-[340px] flex-shrink-0 flex flex-col">
            <div class="rounded-2xl overflow-hidden aspect-[3/4] bg-[#eee]">
              <img :src="cat.img" :alt="cat.name" class="w-full h-full object-cover" />
            </div>
            <div
              class="bg-white rounded-2xl shadow-card mt-[-60px] md:mt-[-120px] m-2 md:m-4 px-3 md:px-6 py-3 md:py-5 flex flex-col">
              <div class="text-[#222] text-base md:text-xl font-bold mb-1 md:mb-2">{{ cat.name }}</div>
              <button @click="goToCategory(cat)"
                class="text-[#7bb661] text-sm md:text-base font-semibold text-left hover:underline w-fit px-0 py-0 bg-transparent shadow-none border-none cursor-pointer">ดูเพิ่มเติม</button>
            </div>
          </div>
        </div>
        <button @click="scrollRight" :disabled="isAtEnd"
          class="absolute right-0 z-10 bg-white border border-[#e6e6e6] rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow hover:bg-[#b6e388] disabled:opacity-50 disabled:cursor-not-allowed transition translate-x-1/2">
          <svg class="w-6 h-6 text-[#184c36]" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Bar from '../components/Bar.vue'
import Footer from '../components/Footer.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const categories = ref([])

const scrollRef = ref(null)
const CARD_WIDTH = 240 + 24 // max-w + gap (px)
const isAtStart = ref(true)
const isAtEnd = ref(false)
let cardsPerScroll = 5

const router = useRouter()

function updateCardsPerScroll() {
  const el = scrollRef.value
  if (!el) return
  const visible = Math.floor(el.clientWidth / CARD_WIDTH)
  cardsPerScroll = Math.max(1, visible)
}

function updateScrollButtons() {
  const el = scrollRef.value
  if (!el) return
  isAtStart.value = el.scrollLeft <= 0
  isAtEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
}

function scrollLeft() {
  const el = scrollRef.value
  if (!el) return
  updateCardsPerScroll()
  el.scrollBy({ left: -CARD_WIDTH * cardsPerScroll, behavior: 'smooth' })
  setTimeout(updateScrollButtons, 400)
}

function scrollRight() {
  const el = scrollRef.value
  if (!el) return
  updateCardsPerScroll()
  el.scrollBy({ left: CARD_WIDTH * cardsPerScroll, behavior: 'smooth' })
  setTimeout(updateScrollButtons, 400)
}

function handleResize() {
  updateCardsPerScroll()
  updateScrollButtons()
}

function goToCategory(cat) {
  router.push({ name: 'productcategory', query: { category: cat.name } })
}

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8888/recycle/categories')
    if (res.data && res.data.categories) {
      categories.value = res.data.categories.map(cat => ({
        name: cat.name,
        img: '/src/assets/NoPicture.webp' // หรือจะ map รูปจริงถ้ามี field ใน backend
      }))
    }
  } catch (e) {
    categories.value = []
  }
  updateCardsPerScroll()
  updateScrollButtons()
  if (scrollRef.value) {
    scrollRef.value.addEventListener('scroll', updateScrollButtons)
  }
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (scrollRef.value) {
    scrollRef.value.removeEventListener('scroll', updateScrollButtons)
  }
})
</script>

<style scoped>
.shadow-card {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
}

.scrollbar-thin::-webkit-scrollbar {
  height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #b6e388;
  border-radius: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 8px;
}
</style>