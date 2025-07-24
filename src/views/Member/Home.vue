<template>
    <Bar />
    <div class="relative w-full min-h-screen bg-[#f7faf7] flex flex-col items-center overflow-x-hidden">
        <!-- BG Layer -->
        <div class="absolute top-0 left-0 w-full lg:w-1/3 h-full lg:h-[730px] bg-lime-300 z-0"></div>

        <div class="absolute top-10 left-0 w-full h-[550px] bg-emerald-950 shadow-lg z-0"></div>

        <!-- Content Area -->
        <div class="relative w-full max-w-[1620px] flex flex-col lg:flex-row gap-8 pt-20 pb-8 px-4 z-10 space-y-10">
            <!-- Left: Info -->
            <div class="flex-1 flex justify-center lg:items-start lg:justify-start text-start">
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
                        class="bg-lime-300 hover:bg-[#e6f7e6] text-[#184c36] rounded-full px-6 py-3 text-base font-semibold shadow transition">
                        ดาวน์โหลดไฟล์ราคา
                    </button>
                </div>
            </div>

            <div class="flex items-center justify-center lg:items-start lg:justify-start">
                <!-- Right: Price Table -->
                <div class="flex-1 min-w-[320px] max-w-lg mr-0 lg:mr-20">
                    <div class="w-full bg-[#f7faf7] rounded-2xl shadow-xl overflow-hidden border border-[#e6f7e6] cursor-pointer" @click="goToBuyBackPrice">
                        <div class="bg-[#e6f7e6] px-6 py-4 border-b border-[#e6f7e6]">
                            <span class="font-bold text-[#184c36] text-lg block">ราคารับ - ซื้อ</span>
                            <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
                        </div>
                        <table class="w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left rounded-tl-2xl">ประเภท
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
                                        <span
                                            class="inline-block bg-white rounded-full px-3 py-1 shadow text-[#184c36] font-bold">
                                            {{ item.price }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4">
                                        <span v-if="item.change > 0"
                                            class="inline-flex items-center gap-1 bg-[#e6f7e6] rounded-full px-2 py-1 text-green-600 font-bold text-sm">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                                                viewBox="0 0 24 24">
                                                <path d="M5 12l5 5l9-9" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                            +{{ item.change }}
                                        </span>
                                        <span v-else-if="item.change < 0"
                                            class="inline-flex items-center gap-1 bg-[#fff0f0] rounded-full px-2 py-1 text-red-500 font-bold text-sm">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                                                viewBox="0 0 24 24">
                                                <path d="M19 12l-7 7l-5-5" stroke-linecap="round"
                                                    stroke-linejoin="round" />
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
    </div>
    <Category />
    <PartnerStores />
    <Footer />
</template>

<script>
import axios from 'axios';
import Bar from '../../components/Bar.vue';
import Footer from '../../components/Footer.vue';
import Category from './Category.vue';
import PartnerStores from './PartnerStores.vue';

export default {
    name: "Home",
    components: { Bar, Footer, Category, PartnerStores },
    data() {
        return {
            priceList: [],
            todayDate: '',
        };
    },
    mounted() {
        this.fetchBuyBackPrices();
        this.setTodayDate();
    },
    methods: {
        setTodayDate() {
            const d = new Date();
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear() + 543;
            this.todayDate = `${day}/${month}/${year}`;
        },
        async fetchBuyBackPrices() {
            try {
                // ดึง current/previous จาก backend
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/scrape`);
                const current = Array.isArray(res.data.current) ? res.data.current : (res.data.current?.table || []);
                const previous = Array.isArray(res.data.previous) ? res.data.previous : (res.data.previous?.table || []);
                // เตรียม prevPriceMap
                const prevMap = new Map();
                if (previous.length > 0) {
                    for (const row of previous[0]) {
                        if (row[0] && row[1]) prevMap.set(row[0], parseFloat((row[1] || '').replace('|', '').trim()));
                        if (row[2] && row[3]) prevMap.set(row[2], parseFloat((row[3] || '').replace('|', '').trim()));
                    }
                }
                let items = [];
                if (current.length > 0) {
                    for (const row of current[0]) {
                        // ฝั่งซ้าย
                        let leftName = row[0];
                        let leftPrice = row[1] || '';
                        if (leftPrice) leftPrice = leftPrice.replace('|', '').trim();
                        let leftChange = '-';
                        if (leftName && leftPrice) {
                            const prev = prevMap.get(leftName);
                            const curr = parseFloat(leftPrice);
                            if (prev !== undefined && !isNaN(curr) && !isNaN(prev)) {
                                const d = +(curr - prev).toFixed(2);
                                leftChange = d === 0 ? '-' : (d > 0 ? '+' + d : d);
                            }
                            items.push({ type: leftName, unit: 'กิโล', price: leftPrice, change: leftChange });
                        }
                        // ฝั่งขวา
                        let rightName = row[2];
                        let rightPrice = row[3] || '';
                        if (rightPrice) rightPrice = rightPrice.replace('|', '').trim();
                        let rightChange = '-';
                        if (rightName && rightPrice) {
                            const prev = prevMap.get(rightName);
                            const curr = parseFloat(rightPrice);
                            if (prev !== undefined && !isNaN(curr) && !isNaN(prev)) {
                                const d = +(curr - prev).toFixed(2);
                                rightChange = d === 0 ? '-' : (d > 0 ? '+' + d : d);
                            }
                            items.push({ type: rightName, unit: 'กิโล', price: rightPrice, change: rightChange });
                        }
                    }
                }
                this.priceList = items.slice(0, 10);
            } catch (err) {
                this.priceList = [];
            }
        },
        goToBuyBackPrice() {
            this.$router.push({ path: '/buybackprice' });
        },
    },
};
</script>
