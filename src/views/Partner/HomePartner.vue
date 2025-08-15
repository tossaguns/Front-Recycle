<template>
    <Bar />
    <div class="min-h-screen bg-gray-50 pt-24 mt-7">
        <div class="max-w-7xl mx-auto p-2 md:p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <!-- Left Column: Market Price Table -->
                <div class="space-y-6">
                    <!-- Header -->
                    <div class="text-center lg:text-left">
                        <h1 class="text-4xl font-bold text-[#106154] mb-2">ราคา <span class="text-[#EDB82C]">รับ -
                                ซื้อ</span> วันนี้</h1>
                        <p class="text-gray-600">ณ วันที่ {{ currentDate }}</p>
                    </div>

                    <!-- Market Table -->
                    <div class="bg-white rounded-2xl border-2 p-3 shadow-lg">
                        <div class="bg-[#e2f4ec] rounded-2xl p-6">
                            <div class="flex items-center mb-4">
                                <DocumentIcon class="w-6 h-6 text-green-700 mr-2" />
                                <h1 class="text-4xl font-semibold text-[#106154]">ตลาด</h1>
                            </div>

                            <!-- Navigation Arrows -->
                            <div class="flex items-center justify-center mb-4">
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed mr-4">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                <span class="text-sm text-gray-600 mx-4">หน้า {{ currentPage }} จาก {{ totalPages
                                    }}</span>
                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed ml-4">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>

                            <!-- Table -->
                            <div class="overflow-x-auto">
                                <table class="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th
                                                class="text-left py-3 px-4 font-semibold text-green-700 text-xs sm:text-sm md:text-base">
                                                ประเภท</th>
                                            <th
                                                class="text-center py-3 px-4 font-semibold text-green-700 text-xs sm:text-sm md:text-base">
                                                หน่วยรับซื้อ
                                            </th>
                                            <th
                                                class="text-center py-3 px-4 font-semibold text-green-700 text-xs sm:text-sm md:text-base">
                                                ราคารับซื้อ
                                                บาท/หน่วย</th>
                                            <th
                                                class="text-center py-3 px-4 font-semibold text-green-700 text-xs sm:text-sm md:text-base">
                                                การปรับตัว
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in paginatedItems" :key="index"
                                            class="border-b-8 border-[#e2f4ec]">
                                            <td class="py-3 px-4 rounded-l-xl bg-white text-xs sm:text-sm md:text-base">
                                                {{ item.type }}</td>
                                            <td class="text-center py-3 px-4 bg-white text-xs sm:text-sm md:text-base">
                                                {{ item.unit }}</td>
                                            <td
                                                class="text-center py-3 px-4 bg-white font-semibold text-xs sm:text-sm md:text-base">
                                                {{ item.price }}
                                            </td>
                                            <td class="text-center py-3 px-4 rounded-r-xl bg-white">
                                                <div
                                                    :class="`inline-flex items-center ${getChangeStyle(item.change).bgColor} ${getChangeStyle(item.change).textColor} px-1 sm:px-2 md:px-3 py-1 rounded-full`">
                                                    <span class="mr-1 text-xs font-medium">{{ item.change === '-' ? '0'
                                                        : item.change.replace('+', '').replace('-', '') }}</span>
                                                    <svg class="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="none"
                                                        stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" :d="getChangeStyle(item.change).icon">
                                                        </path>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Pagination Dots -->
                            <div class="flex justify-center mt-4">
                                <div class="flex space-x-1 sm:space-x-2">
                                    <div v-for="page in totalPages" :key="page"
                                        :class="`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${page === currentPage ? 'bg-green-500' : 'bg-green-300'}`">
                                    </div>
                                </div>
                            </div>

                            <!-- View Market Link -->
                            <div class="text-right mt-4">
                                <button @click="navigateTo('/buybackprice')"
                                    class="text-green-600 hover:text-green-700 font-medium">ดูตลาด</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Other Menus & News -->
                <div class="space-y-6">
                    <!-- Other Menus -->
                    <div>
                        <h1 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#106154] mb-6 sm:mb-8 md:mb-10">
                            เมนูอื่นๆ</h1>
                        <div class="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                            <button @click="navigateTo('/dashboardpartner')"
                                class="bg-gradient-to-r from-[#106154] via-[#2BAC75] to-[#10615A] text-[11px] sm:text-lg md:text-xl text-white p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl hover:from-[#0A4A3F] hover:via-[#1F8A5F] hover:to-[#0A4A3F] transition font-medium shadow-lg hover:shadow-xl">
                                แดชบอร์ดพาร์ทเนอร์
                            </button>
                            <button @click="navigateTo('/addproduct')"
                                class="bg-gradient-to-r from-[#106154] via-[#2BAC75] to-[#10615A] text-[11px] sm:text-lg md:text-xl text-white p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl hover:from-[#0A4A3F] hover:via-[#1F8A5F] hover:to-[#0A4A3F] transition font-medium shadow-lg hover:shadow-xl">
                                จัดการสินค้า
                            </button>
                            <button @click="navigateTo('/admin/sales')"
                                class="bg-gradient-to-r from-[#106154] via-[#2BAC75] to-[#10615A] text-[11px] sm:text-lg md:text-xl text-white p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl hover:from-[#0A4A3F] hover:via-[#1F8A5F] hover:to-[#0A4A3F] transition font-medium shadow-lg hover:shadow-xl">
                                ขายสินค้า
                            </button>
                            <button @click="navigateTo('/memberofpartner')"
                                class="bg-gradient-to-r from-[#106154] via-[#2BAC75] to-[#10615A] text-[11px] sm:text-lg md:text-xl text-white p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl hover:from-[#0A4A3F] hover:via-[#1F8A5F] hover:to-[#0A4A3F] transition font-medium shadow-lg hover:shadow-xl">
                                สมาชิก
                            </button>
                            <button @click="navigateTo('/manageemployee')"
                                class="bg-gradient-to-r from-[#106154] via-[#2BAC75] to-[#10615A] text-[11px] sm:text-lg md:text-xl text-white p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl hover:from-[#0A4A3F] hover:via-[#1F8A5F] hover:to-[#0A4A3F] transition font-medium shadow-lg hover:shadow-xl">
                                จัดการพนักงาน/ไรเดอร์
                            </button>
                            <button @click="navigateTo('/admin/payment')"
                                class="bg-gradient-to-r from-[#106154] via-[#2BAC75] to-[#10615A] text-[11px] sm:text-lg md:text-xl text-white p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl hover:from-[#0A4A3F] hover:via-[#1F8A5F] hover:to-[#0A4A3F] transition font-medium shadow-lg hover:shadow-xl">
                                ชำระเงิน
                            </button>
                        </div>
                    </div>

                    <div class="border-2 border-[#A6DCC5]"></div>
                    <!-- News and Activities -->
                    <div>
                        <h1 class="text-4xl font-semibold text-[#106154] mb-4">ข่าวสารและกิจกรรม</h1>
                        <div class="bg-white rounded-2xl border-2 border-green-200 p-6 shadow-lg">
                            <!-- Video Player -->
                            <div class="bg-gray-100 rounded-xl p-4 mb-4">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-4">
                                        <div
                                            class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="font-medium text-gray-800">Michael Marx</p>
                                            <p class="text-sm text-gray-600">ข่าวสารล่าสุด</p>
                                        </div>
                                    </div>
                                    <div class="w-16 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Pagination Dots -->
                            <div class="flex justify-center mb-4">
                                <div class="flex space-x-2">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div class="w-2 h-2 bg-green-300 rounded-full"></div>
                                    <div class="w-2 h-2 bg-green-300 rounded-full"></div>
                                    <div class="w-2 h-2 bg-green-300 rounded-full"></div>
                                    <div class="w-2 h-2 bg-green-300 rounded-full"></div>
                                </div>
                            </div>

                            <!-- View Other News Link -->
                            <div class="text-right">
                                <button @click="navigateTo('/activity')"
                                    class="text-green-600 hover:text-green-700 font-medium">ดูข่าวอื่นๆ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { DocumentIcon } from '../../icons'
import axios from 'axios'
import Bar from '../../components/Bar.vue';

const router = useRouter()
const currentDate = ref('')
const priceList = ref([])
const currentPage = ref(1)
const itemsPerPage = 5

// ฟังก์ชันลบ T ที่อยู่ท้ายข้อความ ยกเว้น "เหล็กบาง+สายรัดเหล็ก+เหล็กถัง200LIT"
function formatItemName(name) {
  if (!name) return '';
  
  // ลบ T ที่อยู่ท้ายข้อความ ยกเว้น "เหล็กบาง+สายรัดเหล็ก+เหล็กถัง200LIT"
  if (name !== 'เหล็กบาง+สายรัดเหล็ก+เหล็กถัง200LIT') {
    name = name.replace(/T$/, '');
  }
  
  return name;
}

onMounted(async () => {
    // Set current date in Thai format
    const today = new Date()
    const day = today.getDate().toString().padStart(2, '0')
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const year = today.getFullYear()
    currentDate.value = `${day}/${month}/${year}`

    // Fetch price data
    await fetchBuyBackPrices()
})

async function fetchBuyBackPrices() {
    try {
        // ดึง current/previous จาก backend
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/scrape`)
        const current = Array.isArray(res.data.current) ? res.data.current : (res.data.current?.table || [])
        const previous = Array.isArray(res.data.previous) ? res.data.previous : (res.data.previous?.table || [])

        // เตรียม prevPriceMap
        const prevMap = new Map()
        if (previous.length > 0) {
            for (const row of previous[0]) {
                if (row[0] && row[1]) prevMap.set(row[0], parseFloat((row[1] || '').replace('|', '').trim()))
                if (row[2] && row[3]) prevMap.set(row[2], parseFloat((row[3] || '').replace('|', '').trim()))
            }
        }

        let items = []
        // วนลูปผ่านข้อมูลทั้งหมดใน current (extracted_tables.json)
        if (current.length > 0) {
            for (const tableIndex in current) {
                const table = current[tableIndex]
                if (Array.isArray(table)) {
                    for (const row of table) {
                        // ฝั่งซ้าย
                        let leftName = formatItemName(row[0])
                        let leftPrice = row[1] || ''
                        if (leftPrice) leftPrice = leftPrice.replace('|', '').trim()
                        if (leftPrice) leftPrice = leftPrice.replace(')', '').trim()
                        
                        // ตรวจสอบและข้ามรายการที่ไม่ต้องการแสดง
                        if (leftName && leftPrice && 
                            leftName !== 'กลุ่มโลหะมีค่า' && 
                            leftName !== 'กลุ่มพลาสติก' && 
                            leftName !== 'ู่มบ็ตต็ด' && 
                            leftName !== 'งดรับ' &&
                            leftPrice !== 'งดรับ' &&
                            leftPrice !== 'ราคา/กก' &&
                            leftPrice !== 'ราคา/กก.') {
                            let leftChange = '-'
                            const prev = prevMap.get(leftName)
                            const curr = parseFloat(leftPrice)
                            if (prev !== undefined && !isNaN(curr) && !isNaN(prev)) {
                                const d = +(curr - prev).toFixed(2)
                                leftChange = d === 0 ? '-' : (d > 0 ? '+' + d : d)
                            }
                            items.push({ type: leftName, unit: 'กิโล', price: leftPrice, change: leftChange })
                        }

                        // ฝั่งขวา (ถ้ามี)
                        if (row[2] && row[3]) {
                            let rightName = formatItemName(row[2])
                            let rightPrice = row[3] || ''
                            if (rightPrice) rightPrice = rightPrice.replace('|', '').trim()
                            if (rightPrice) rightPrice = rightPrice.replace(')', '').trim()
                            
                            // ตรวจสอบและข้ามรายการที่ไม่ต้องการแสดง
                            if (rightName && rightPrice && 
                                rightName !== 'กลุ่มโลหะมีค่า' && 
                                rightName !== 'กลุ่มพลาสติก' && 
                                rightName !== 'ู่มบ็ตต็ด' && 
                                rightName !== 'งดรับ' &&
                                rightPrice !== 'งดรับ' &&
                                rightPrice !== 'ราคา/กก' &&
                                rightPrice !== 'ราคา/กก.') {
                                let rightChange = '-'
                                const prev = prevMap.get(rightName)
                                const curr = parseFloat(rightPrice)
                                if (prev !== undefined && !isNaN(curr) && !isNaN(prev)) {
                                    const d = +(curr - prev).toFixed(2)
                                    rightChange = d === 0 ? '-' : (d > 0 ? '+' + d : d)
                                }
                                items.push({ type: rightName, unit: 'กิโล', price: rightPrice, change: rightChange })
                            }
                        }
                    }
                }
            }
        }
        priceList.value = items
    } catch (err) {
        console.error('Error fetching price data:', err)
        priceList.value = []
    }
}

// Pagination functions
function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

// Computed properties
const totalPages = computed(() => Math.ceil(priceList.value.length / itemsPerPage))
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return priceList.value.slice(start, end)
})

// Helper function to get change icon and color
function getChangeStyle(change) {
    if (change === '-') {
        return {
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-700',
            icon: 'M9 12l2 2 4-4' // checkmark
        }
    } else if (change.startsWith('+')) {
        return {
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
            icon: 'M5 10l7-7m0 0l7 7m-7-7v18' // up arrow
        }
    } else {
        return {
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            icon: 'M19 14l-7 7m0 0l-7-7m7 7V3' // down arrow
        }
    }
}

// Navigation function
function navigateTo(path) {
    router.push(path)
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
