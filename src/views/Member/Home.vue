<template>
  <Bar />

  <!-- Landing Page (เมื่อยังไม่ได้ล็อกอิน) -->
  <div v-if="!authStore.isAuthenticated" class="pt-20">
    <!-- Background -->
    <section class="relative w-full bg-[#ffffff] flex flex-col items-center overflow-x-hidden pb-0 mt-0 md:mt-5">
      <!-- BG Layer -->
      <div class="absolute top-0 left-0 lg:left-20 w-full lg:w-1/3 h-full bg-[#106154] z-0"
        :class="heroLeftVisible ? 'slide-in-top' : 'opacity-0'"></div>
      <div class="absolute top-10 left-0 w-full h-[550px] bg-[#2BAC75] shadow-lg z-0"
        :class="heroLeftVisible ? 'slide-in-right' : 'opacity-0'"></div>
      <!-- Content Area -->
      <div class="relative w-full max-w-[1620px] flex flex-col lg:flex-row gap-8 pt-16 pb-0 px-4 z-10">
        <!-- Left: Info -->
        <div ref="heroLeftRef" :class="heroLeftVisible ? 'slide-in-left' : 'opacity-0'"
          class="flex-1 flex justify-center lg:items-start lg:justify-start text-start">
          <div class="min-w-[320px] max-w-x ml-0 lg:ml-20 mb-5 mt-20 lg:mb-0">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow leading-snug">
              รับซื้อ - ขายสินค้า<br>รีไซเคิล
            </h1>
            <div class="mb-6">
              <span class="text-[#e6f7e6] text-base max-w-md drop-shadow leading-relaxed">
                ความมุ่งมั่นของเราคือการซื้อขายสินค้ารีไซเคิล<br>
                กำลังนำบ้านเมืองไปสู่โลกที่สะอาดและสุขภาพที่ดีขึ้น
              </span>
            </div>
            <button @click="goToLogin"
              class="bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-full px-6 py-3 text-base font-semibold shadow transition">
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
        <!-- Right: Image -->
        <div ref="heroRightRef" :class="heroRightVisible ? 'slide-in-right' : 'opacity-0'"
          class="flex items-center justify-center lg:items-center lg:justify-start mb-5">
          <div class="flex-1 min-w-[320px] max-w-lg mr-0 lg:mr-20">
            <div class="relative flex justify-center lg:justify-start">
              <img src="../../assets/Rectangle 8.png" alt="Recycling Symbol"
                class="w-full h-auto max-w-sm lg:max-w-md rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Original Home Page (เมื่อล็อกอินแล้ว) -->
  <div v-else class="pt-20">
    <section class="relative w-full bg-[#f7faf7] flex flex-col items-center overflow-x-hidden pb-0 mt-0 md:mt-5">
      <!-- BG Layer -->
      <div class="absolute top-0 left-0 lg:left-20 w-full lg:w-1/3 h-full lg:h-[730px] bg-[#106154] z-0"
        :class="heroLeftVisible ? 'slide-in-top' : 'opacity-0'"></div>
      <div class="absolute top-10 left-0 w-full h-[550px] bg-[#2BAC75] shadow-lg z-0"
        :class="heroLeftVisible ? 'slide-in-right' : 'opacity-0'"></div>
      <!-- Content Area -->
      <div class="relative w-full max-w-[1620px] flex flex-col lg:flex-row gap-8 pt-16 pb-0 px-4 z-10">
        <!-- Left: Info -->
        <div ref="heroLeftRef" :class="heroLeftVisible ? 'slide-in-left' : 'opacity-0'"
          class="flex-1 flex justify-center lg:items-start lg:justify-start text-start">
          <div class="min-w-[320px] max-w-x ml-0 lg:ml-20 mb-5 mt-20 lg:mb-0">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow leading-snug">
              รับซื้อ - ขายสินค้า<br>รีไซเคิล
            </h1>
            <div class="mb-6">
              <span class="text-[#e6f7e6] text-base max-w-md drop-shadow leading-relaxed">
                ความมุ่งมั่นของเราคือการซื้อขายสินค้ารีไซเคิล<br>
                กำลังนำบ้านเมืองไปสู่โลกที่สะอาดและสุขภาพที่ดีขึ้น
              </span>
            </div>
            <button
              class="bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-full px-6 py-3 text-base font-semibold shadow transition">
              ดาวน์โหลดไฟล์ราคา
            </button>
          </div>
        </div>
        <!-- Right: Price Table -->
        <div ref="heroRightRef" :class="heroRightVisible ? 'slide-in-right' : 'opacity-0'"
          class="flex items-center justify-center lg:items-start lg:justify-start mb-5">
          <div class="flex-1 min-w-[320px] max-w-lg mr-0 lg:mr-20">
            <div
              class="w-full bg-[#f7faf7] rounded-2xl shadow-xl overflow-hidden border border-[#e6f7e6] cursor-pointer"
              @click="goToBuyBackPrice">
              <div class="bg-[#e6f7e6] px-6 py-4 border-b border-[#e6f7e6]">
                <span class="font-bold text-[#184c36] text-lg block">ราคารับ - ซื้อ</span>
                <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
              </div>
              <table class="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left rounded-tl-2xl">รายการ
                    </th>
                    <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left">หน่วยรับซื้อ</th>
                    <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left">ราคารับซื้อ</th>
                    <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left rounded-tr-2xl">
                      การเปลี่ยนแปลง</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in priceList" :key="idx"
                    :class="`text-[#184c36] font-medium transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'}`"
                    style="border-bottom: 16px solid transparent;">
                    <td class="px-4 py-4">{{ item.type }}</td>
                    <td class="px-4 py-4">{{ item.unit }}</td>
                    <td class="px-4 py-4">
                      <span class="inline-block bg-white rounded-full px-3 py-1 shadow text-[#184c36] font-bold">
                        {{ item.price }}
                      </span>
                    </td>
                    <td class="px-4 py-4">
                      <span v-if="item.change !== '-' && item.changeValue > 0"
                        class="inline-flex items-center gap-1 bg-[#e6f7e6] rounded-full px-2 py-1 text-green-600 font-bold text-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        {{ item.change }}
                      </span>
                      <span v-else-if="item.change !== '-' && item.changeValue < 0"
                        class="inline-flex items-center gap-1 bg-[#fff0f0] rounded-full px-2 py-1 text-red-500 font-bold text-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        {{ item.change }}
                      </span>
                      <span v-else
                        class="inline-flex items-center gap-1 bg-[#e6f7e6] rounded-full px-2 py-1 text-gray-500 font-bold text-sm">
                        -
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white w-full py-8">
      <div ref="contentRef" :class="contentVisible ? 'slide-in-right' : 'opacity-0'"
        class="max-w-[1620px] mx-auto px-4">
        <Category />
      </div>
    </section>

    <section class="bg-[#f5faef] w-full py-8">
      <div ref="storeSection" :class="[
        'max-w-[1620px] mx-auto px-4',
        storeVisible ? 'slide-in-left' : 'opacity-0'
      ]">
        <PartnerStores />
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import Bar from '../../components/Bar.vue';
import Footer from '../../components/Footer.vue';
import Category from './Category.vue';
import PartnerStores from './PartnerStores.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Reveal on scroll composable (เล่นซ้ำได้)
function useRevealOnScroll() {
  const isVisible = ref(false);
  const el = ref(null);
  let observer;
  onMounted(() => {
    observer = new window.IntersectionObserver(
      ([entry]) => {
        isVisible.value = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );
    if (el.value) observer.observe(el.value);
  });
  onBeforeUnmount(() => {
    if (observer && el.value) observer.unobserve(el.value);
  });
  return { el, isVisible };
}

const { el: headingRef, isVisible: headingVisible } = useRevealOnScroll();
const { el: contentRef, isVisible: contentVisible } = useRevealOnScroll();
const { el: storeSection, isVisible: storeVisible } = useRevealOnScroll();
const { el: heroLeftRef, isVisible: heroLeftVisible } = useRevealOnScroll();
const { el: heroRightRef, isVisible: heroRightVisible } = useRevealOnScroll();

// --- data ---
const priceList = ref([]);
const todayDate = ref('');
function setTodayDate() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear() + 543;
  todayDate.value = `${day}/${month}/${year}`;
}

// --- methods ---
function normalizeName(name) {
  if (!name) return '';
  // เว้นวรรคหน้า +, %, หรือ ( ... )
  name = name.replace(/([^\s+])\+/g, '$1 + ');
  name = name.replace(/([^\s])%/g, '$1 %');
  name = name.replace(/([^\s])\(/g, '$1 (');
  name = name.replace(/\)([\p{L}0-9])/gu, ') $1');
  name = name.replace(/([\p{L}])([0-9])/gu, '$1 $2');
  name = name.replace(/([0-9])([\p{L}])/gu, '$1 $2');
  // ลบ T ที่อยู่ท้ายข้อความ ยกเว้น "เหล็กบาง + สายรัดเหล็ก + เหล็กถัง 200 LIT"
  if (name !== 'เหล็กบาง + สายรัดเหล็ก + เหล็กถัง 200 LIT') {
    name = name.replace(/T$/, '');
  }
  if (name !== 'อลูมิเนียมติดเหล็กไม่มาก 30 %') {
    name = name.replace(/%$/, '');
  }
  if (name !== 'ทองแดงเบอร์4') {
    name = name.replace(/4$/, '');
  }
  return name.replace(/\s{2,}/g, ' ').trim();
}
function formatName(name) {
  return normalizeName(name);
}

async function fetchBuyBackPrices() {
  try {
    // ดึง current/previous จาก backend
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/scrape`);
    const current = Array.isArray(res.data.current) ? res.data.current : (res.data.current?.table || []);
    const previous = Array.isArray(res.data.previous) ? res.data.previous : (res.data.previous?.table || []);
    // เตรียม prevPriceMap
    const prevMap = new Map();
    if (previous.length > 0) {
      for (const table of previous) {
        if (Array.isArray(table)) {
          for (const row of table) {
            if (row[0] && row[1]) prevMap.set(normalizeName(row[0]), parseFloat((row[1] || '').replace('|', '').trim()));
            if (row[2] && row[3]) prevMap.set(normalizeName(row[2]), parseFloat((row[3] || '').replace('|', '').trim()));
          }
        }
      }
    }
    let items = [];
    if (current.length > 0) {
      for (const table of current) {
        if (Array.isArray(table)) {
          for (const row of table) {
            // ฝั่งซ้าย
            let leftName = formatName(row[0]);
            let leftPrice = row[1] || '';
            if (leftPrice) leftPrice = leftPrice.replace('|', '').trim();
            if (leftPrice) leftPrice = leftPrice.replace(')', '').trim();
            // ตรวจสอบและข้ามรายการที่ไม่ต้องการแสดง
            if (!leftName || !leftPrice ||
              leftName === 'กลุ่มโลหะมีค่า' ||
              leftName === 'กลุ่มพลาสติก' ||
              leftName === 'ู่มบ็ตต็ด' ||
              leftName === 'งดรับ' ||
              leftPrice === 'งดรับ') {
              // ข้ามรายการนี้
            } else {
              let leftChange = '-';
              let leftChangeValue = 0;
              const prev = prevMap.get(leftName);
              const curr = parseFloat(leftPrice);
              if (prev !== undefined && !isNaN(curr) && !isNaN(prev)) {
                const d = +(curr - prev).toFixed(2);
                leftChangeValue = d;
                leftChange = d === 0 ? '-' : (d > 0 ? '+' + d : d.toString());
              }
              items.push({
                type: leftName,
                unit: 'กิโล',
                price: leftPrice,
                change: leftChange,
                changeValue: leftChangeValue,
                hasChange: leftChange !== '-'
              });
            }
            // ฝั่งขวา
            let rightName = formatName(row[2]);
            let rightPrice = row[3] || '';
            if (rightPrice) rightPrice = rightPrice.replace('|', '').trim();
            if (rightPrice) rightPrice = rightPrice.replace(')', '').trim();
            if (!rightName || !rightPrice ||
              rightName === 'กลุ่มโลหะมีค่า' ||
              rightName === 'กลุ่มพลาสติก' ||
              rightName === 'ู่มบ็ตต็ด' ||
              rightName === 'งดรับ' ||
              rightPrice === 'งดรับ') {
              // ข้ามรายการนี้
            } else {
              let rightChange = '-';
              let rightChangeValue = 0;
              const prev = prevMap.get(rightName);
              const curr = parseFloat(rightPrice);
              if (prev !== undefined && !isNaN(curr) && !isNaN(prev)) {
                const d = +(curr - prev).toFixed(2);
                rightChangeValue = d;
                rightChange = d === 0 ? '-' : (d > 0 ? '+' + d : d.toString());
              }
              items.push({
                type: rightName,
                unit: 'กิโล',
                price: rightPrice,
                change: rightChange,
                changeValue: rightChangeValue,
                hasChange: rightChange !== '-'
              });
            }
          }
        }
      }
    }
    // เรียงลำดับ: รายการที่มีการเปลี่ยนแปลงขึ้นมาก่อน (เรียงตามค่าการเปลี่ยนแปลงจากมากไปน้อย)
    // แล้วตามด้วยรายการที่ไม่มีเปลี่ยนแปลง
    const changedItems = items.filter(item => item.hasChange).sort((a, b) => Math.abs(b.changeValue) - Math.abs(a.changeValue));
    const unchangedItems = items.filter(item => !item.hasChange);
    // รวมรายการ: รายการที่มีการเปลี่ยนแปลง + รายการที่ไม่มีเปลี่ยนแปลง (ให้ครบ 7 อัน)
    const finalItems = [...changedItems, ...unchangedItems].slice(0, 7);
    priceList.value = finalItems;
  } catch (err) {
    priceList.value = [];
  }
}

function goToBuyBackPrice() {
  router.push({ path: '/buybackprice' });
}

function goToLogin() {
  router.push('/login');
}

onMounted(() => {
  fetchBuyBackPrices();
  setTodayDate();
});
</script>

<style scoped>
@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-80px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(80px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInTop {
  0% {
    opacity: 0;
    transform: translateY(-500px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-left {
  animation: slideInLeft 0.9s cubic-bezier(.4, 0, .2, 1) both;
}

.slide-in-right {
  animation: slideInRight 0.9s cubic-bezier(.4, 0, .2, 1) both;
}

.slide-in-top {
  animation: slideInTop 0.9s cubic-bezier(.4, 0, .2, 1) both;
}

@keyframes bigSlideInUp {
  0% {
    opacity: 0;
    transform: translateY(80px) scale(0.9);
    box-shadow: 0 0 0 0 #b6e388;
  }

  30% {
    opacity: 1;
    transform: translateY(-10px) scale(1.12);
    box-shadow: 0 0 0 16px #b6e38844;
  }

  60% {
    opacity: 1;
    transform: translateY(0) scale(1.04);
    box-shadow: 0 0 0 8px #b6e38844;
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    box-shadow: 0 0 0 0 #b6e38800;
  }
}

.reveal-animate {
  animation: bigSlideInUp 1.1s cubic-bezier(.4, 0, .2, 1);
  will-change: transform, opacity, box-shadow;
}

/* Landing Page Styles */
/* .landing-page {
  min-height: 100vh;
} */
</style>
