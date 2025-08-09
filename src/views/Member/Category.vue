<template>
  <Bar v-if="showBarFooter" />
  <div class="flex flex-col bg-white pt-20">
    <main class="flex-1 mx-auto w-full px-10 py-10 relative">
      <h1 class="text-3xl md:text-5xl font-bold mb-7 text-[#222]">หมวดหมู่สินค้ารีไซเคิล</h1>
      <p class="mb-12 text-[#666]">สัมผัสเนื้อหาหมวดหมู่ประเภทของรีไซเคิล คุณสามารถกดดูรายละเอียดเพิ่มเติมได้ที่นี่</p>
      <div class="relative flex items-center justify-center">
        <button @click="scrollLeft" :disabled="isAtStart"
          class="absolute left-0 z-10 bg-white border border-[#e6e6e6] rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow hover:bg-[#b6e388] disabled:opacity-50 disabled:cursor-not-allowed transition -translate-x-1/2">
          <svg class="w-6 h-6 text-[#184c36]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-10 sm:py-16">
          <svg class="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-[#2BAC75]" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span class="mt-2 sm:mt-4 text-[#2BAC75] text-sm sm:text-lg font-semibold">กำลังโหลดข้อมูล...</span>
        </div>
        <div v-else ref="scrollRef"
          class="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#b6e388] scrollbar-track-[#f0f0f0] px-2 md:px-4"
          style="scrollbar-width: thin; scroll-behavior: smooth;">
          <div v-for="(cat, idx) in categories" :key="idx" class="flex-1 min-w-[220px] md:min-w-[300px] flex flex-col"
            style="max-width: 500px;">
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
          <svg class="w-6 h-6 text-[#184c36]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </main>
    <Footer v-if="showBarFooter" />
  </div>
</template>

<script setup>
import Bar from '../../components/Bar.vue'
import Footer from '../../components/Footer.vue'
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { defineProps } from 'vue';
const props = defineProps({ showBarFooter: { type: Boolean, default: false } });
const showBarFooter = props.showBarFooter;

const categories = ref([])

const scrollRef = ref(null)
const CARD_WIDTH = 240 + 24 // max-w + gap (px)
const isAtStart = ref(true)
const isAtEnd = ref(false)
let cardsPerScroll = 5

const router = useRouter()
const route = useRoute();
const isLoading = ref(true);

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
  localStorage.setItem('category', JSON.stringify({
    _id: cat._id,
    name: cat.name
  }));
  router.push({ path: '/subcategory' })
}

// Animation highlight
function highlightCategory(name) {
  nextTick(() => {
    const idx = categories.value.findIndex(cat => cat.name === name);
    if (idx !== -1) {
      const card = scrollRef.value?.children[idx];
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        card.classList.add('highlight-animate');
        setTimeout(() => card.classList.remove('highlight-animate'), 1200);
      }
    }
  });
}

watch(() => route.query.highlight, (val) => {
  if (val) highlightCategory(val);
});

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
    if (Array.isArray(res.data)) {
      categories.value = res.data.map(cat => ({
        _id: cat._id,
        name: cat.name,
        img: cat.image || '/src/assets/NoPicture.webp'
      }))
    }
  } catch (e) {
    categories.value = []
  } finally {
    isLoading.value = false;
  }
  await nextTick()
  updateCardsPerScroll()
  updateScrollButtons()

  if (scrollRef.value) {
    scrollRef.value.addEventListener('scroll', updateScrollButtons)
  }
  window.addEventListener('resize', handleResize)

  if (route.query.highlight) highlightCategory(route.query.highlight);
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

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 #b6e388;
  }

  20% {
    transform: scale(1.10);
    box-shadow: 0 0 0 8px #b6e38844;
  }

  40% {
    transform: scale(1);
    box-shadow: 0 0 0 0 #b6e388;
  }

  60% {
    transform: scale(1.10);
    box-shadow: 0 0 0 8px #b6e38844;
  }

  80% {
    transform: scale(1);
    box-shadow: 0 0 0 0 #b6e388;
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 #b6e388;
  }
}

.highlight-animate {
  animation: pulse 1.2s 2;
  z-index: 2;
}
</style>