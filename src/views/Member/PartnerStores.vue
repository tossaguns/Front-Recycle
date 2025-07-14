<template>
  <div class="min-h-screen bg-white flex flex-col">
    <Bar />

    <div class="bg-[#f7faf0] min-h-screen">
      <main class="flex-1 max-w-7xl mx-auto w-full px-8 py-8 relative flex flex-col justify-center ">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222] text-center my-6 sm:my-8 md:my-10">
          ร้านรับ - ซื้อสินค้ารีไซเคิล
        </h1>

        <!-- ค้นหาร้าน -->
        <div class="flex flex-col items-center mb-6 sm:mb-8 md:mb-10">
          <div class="flex flex-col gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md md:max-w-xl">
            <span class="text-sm sm:text-base">เลือกพื้นที่ที่ต้องการค้นหาร้าน</span>
            
            <!-- จังหวัด -->
            <select v-model="selectedProvince" @change="onProvinceChange"
              class="rounded-full border border-[#b6e388] px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white w-full">
              <option value="">เลือกจังหวัด</option>
              <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>
            </select>
            
            <!-- อำเภอ -->
            <select v-model="selectedDistrict" @change="onDistrictChange"
              :disabled="!selectedProvince"
              class="rounded-full border border-[#b6e388] px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white w-full disabled:opacity-50 disabled:cursor-not-allowed">
              <option value="">เลือกอำเภอ</option>
              <option v-for="district in districts" :key="district" :value="district">{{ district }}</option>
            </select>
            
            <!-- ตำบล -->
            <select v-model="selectedSubdistrict"
              :disabled="!selectedDistrict"
              class="rounded-full border border-[#b6e388] px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#b6e388] bg-white w-full disabled:opacity-50 disabled:cursor-not-allowed">
              <option value="">เลือกตำบล</option>
              <option v-for="subdistrict in subdistricts" :key="subdistrict" :value="subdistrict">{{ subdistrict }}</option>
            </select>
            
            <!-- ค้นหาชื่อร้าน -->
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
            
            <!-- ปุ่มล้างการค้นหา -->
            <button @click="clearFilters"
              class="bg-gray-500 hover:bg-gray-600 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow transition">
              ล้างการค้นหา
            </button>
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

        <!-- แสดงจำนวนร้านที่พบ -->
        <div class="text-center mb-6">
          <p class="text-lg text-gray-600">
            พบร้านค้า <span class="font-bold text-[#184c36]">{{ filteredStores.length }}</span> ร้าน
            <span v-if="selectedProvince || selectedDistrict || selectedSubdistrict || search">
              จากทั้งหมด <span class="font-bold text-[#184c36]">{{ stores.length }}</span> ร้าน
            </span>
          </p>
        </div>

        <!-- ร้านค้า -->
        <div v-if="pagedStores.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          <div v-for="(store, idx) in pagedStores" :key="store._id || idx"
            class="flex flex-col items-center">
            <img :src="store.img || defaultImg" alt="store"
              class="rounded-xl w-full aspect-square object-cover mb-4" />
            <div class="text-lg font-semibold text-black mb-1">{{ store.name || 'ชื่อร้าน' }}</div>
            <div class="text-gray-600 text-sm mb-2 text-center">
              <div>{{ store.province || 'แสดงชื่อจังหวัด' }}</div>
              <div v-if="store.district" class="text-xs">{{ store.district }}</div>
              <div v-if="store.subdistrict" class="text-xs">{{ store.subdistrict }}</div>
            </div>
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
        
        <!-- แสดงข้อความเมื่อไม่พบร้านค้า -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบร้านค้า</h3>
          <p class="text-gray-600 mb-4">ลองเปลี่ยนเงื่อนไขการค้นหาหรือเลือกพื้นที่อื่น</p>
          <button @click="clearFilters" 
            class="bg-[#b6e388] hover:bg-[#184c36] text-[#184c36] hover:text-white rounded-full px-6 py-2 font-semibold transition">
            ล้างการค้นหา
          </button>
        </div>
        <!-- Pagination -->
        <div v-if="pagedStores.length > 0 && pageCount > 1" class="flex justify-end">
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
const districts = ref([]);
const subdistricts = ref([]);
const selectedProvince = ref('');
const selectedDistrict = ref('');
const selectedSubdistrict = ref('');
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
  
  // กรองตามจังหวัด
  if (selectedProvince.value) {
    filtered = filtered.filter(s => s.province === selectedProvince.value);
  }
  
  // กรองตามอำเภอ
  if (selectedDistrict.value) {
    filtered = filtered.filter(s => s.district === selectedDistrict.value);
  }
  
  // กรองตามตำบล
  if (selectedSubdistrict.value) {
    filtered = filtered.filter(s => s.subdistrict === selectedSubdistrict.value);
  }
  
  // กรองตามชื่อร้าน
  if (search.value) {
    filtered = filtered.filter(s => s.name && s.name.toLowerCase().includes(search.value.toLowerCase()));
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

// ฟังก์ชันเมื่อเลือกจังหวัด
const onProvinceChange = () => {
  selectedDistrict.value = '';
  selectedSubdistrict.value = '';
  districts.value = [];
  subdistricts.value = [];
  
  if (selectedProvince.value) {
    // ดึงข้อมูลอำเภอจากร้านในจังหวัดที่เลือก
    const storesInProvince = stores.value.filter(s => s.province === selectedProvince.value);
    const districtSet = new Set(storesInProvince.map(s => s.district).filter(Boolean));
    districts.value = Array.from(districtSet).sort();
  }
  
  currentPage.value = 1; // รีเซ็ตหน้า
};

// ฟังก์ชันเมื่อเลือกอำเภอ
const onDistrictChange = () => {
  selectedSubdistrict.value = '';
  subdistricts.value = [];
  
  if (selectedDistrict.value) {
    // ดึงข้อมูลตำบลจากร้านในอำเภอที่เลือก
    const storesInDistrict = stores.value.filter(s => 
      s.province === selectedProvince.value && 
      s.district === selectedDistrict.value
    );
    const subdistrictSet = new Set(storesInDistrict.map(s => s.subdistrict).filter(Boolean));
    subdistricts.value = Array.from(subdistrictSet).sort();
  }
  
  currentPage.value = 1; // รีเซ็ตหน้า
};

// ฟังก์ชันล้างการค้นหา
const clearFilters = () => {
  selectedProvince.value = '';
  selectedDistrict.value = '';
  selectedSubdistrict.value = '';
  search.value = '';
  districts.value = [];
  subdistricts.value = [];
  currentPage.value = 1;
};

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
      district: s.companyDistrict,
      subdistrict: s.companySubdistrict,
      img: s.shopImages || defaultImg
    }));
    // สร้าง list จังหวัดจากข้อมูลร้าน
    const provinceSet = new Set(stores.value.map(s => s.province).filter(Boolean));
    provinces.value = Array.from(provinceSet).sort();
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
