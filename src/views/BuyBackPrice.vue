<template>
    <Bar />
    <div class="flex flex-col items-center min-h-screen bg-[#f7faf7]">
        <h1 class="text-3xl md:text-4xl font-bold text-[#184c36] mt-10 mb-6 text-center">
            ตารางราคาสินค้ารีไซเคิล (BuyBack Price Table)
        </h1>
        <div class="flex justify-center items-center w-full flex-1 mb-10">
            <div class="w-full max-w-[1450px]">
                <div class="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-300">
                    <div
                        class="bg-[#e6f7e6] px-6 py-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between">
                        <span class="font-bold text-[#184c36] text-lg block">ราคารับ - ซื้อ</span>
                        <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
                    </div>
                    <div class="overflow-x-auto w-full"> <!-- เพิ่ม div นี้ -->
                        <table class="w-full min-w-[700px] border-collapse text-xs md:text-sm"> <!-- ปรับ min-w และ text-xs -->
                            <thead>
                                <tr>
                                    <th class="bg-[#e6f7e6] text-[#1a3d1a] text-[10px] md:text-xs px-2 md:px-4 py-2 text-left w-[30%]">รายการ</th>
                                    <th class="bg-[#e6f7e6] text-[#1a3d1a] text-[10px] md:text-xs px-2 md:px-4 py-2 text-left whitespace-nowrap w-[5%]">หน่วยรับซื้อ</th>
                                    <th class="bg-[#e6f7e6] text-[#1a3d1a] text-[10px] md:text-xs px-2 md:px-4 py-2 text-left whitespace-nowrap w-[5%]">ราคารับซื้อ</th>
                                    <th class="bg-[#e6f7e6] text-[#1a3d1a] text-[10px] md:text-xs px-2 md:px-4 py-2 text-left whitespace-nowrap w-[5%]">การเปลี่ยนแปลง</th>
                                    <th class="bg-[#e6f7e6] text-[#1a3d1a] text-[10px] md:text-xs px-2 md:px-4 py-2 text-left border-l border-gray-300 w-[30%]">รายการ</th>
                                    <th class="bg-[#e6f7e6] text-[#1a3d1a] text-[10px] md:text-xs px-2 md:px-4 py-2 text-left whitespace-nowrap w-[5%]">หน่วยรับซื้อ</th>
                                    <th class="bg-[#e6f7e6] text-[#1a3d1a] text-[10px] md:text-xs px-2 md:px-4 py-2 text-left whitespace-nowrap w-[5%]">ราคารับซื้อ</th>
                                    <th class="bg-[#e6f7e6] text-[#1a3d1a] text-[10px] md:text-xs px-2 md:px-4 py-2 text-left whitespace-nowrap w-[5%]">การเปลี่ยนแปลง</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pair, idx) in pairedItems" :key="idx"
                                    :class="`text-[#184c36] text-[10px] md:text-xs font-medium transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'}`">
                                    <!-- ฝั่งซ้าย -->
                                    <td class="px-2 md:px-4 py-2 md:py-4 break-words">{{ formatName(pair[0]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap"><span v-if="pair[0]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[0]"
                                            class="inline-block bg-white rounded-full px-2 md:px-3 py-1 shadow text-[#184c36] font-bold">
                                            {{ pair[0]?.price }}
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[0]"
                                            class="inline-flex items-center gap-1 bg-[#e6f7e6] rounded-full px-2 py-1 text-gray-500 font-bold text-xs md:text-sm">
                                            {{ pair[0].diff }}
                                        </span>
                                    </td>
                                    <!-- ฝั่งขวา -->
                                    <td class="px-2 md:px-4 py-2 md:py-4 border-l border-gray-300 break-words">{{ formatName(pair[1]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap"><span v-if="pair[1]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[1]"
                                            class="inline-block bg-white rounded-full px-2 md:px-3 py-1 shadow text-[#184c36] font-bold">
                                            {{ pair[1]?.price }}
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[1]"
                                            class="inline-flex items-center gap-1 bg-[#e6f7e6] rounded-full px-2 py-1 text-gray-500 font-bold text-xs md:text-sm">
                                            {{ pair[1].diff }}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="pairedItems.length === 0">
                                    <td colspan="8" class="text-center py-6 text-gray-400">ไม่มีข้อมูลราคา</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> <!-- ปิด div overflow-x-auto -->
                    <div class="text-xs text-gray-500 mt-4 px-4 pb-6">
                        หมายเหตุ: ราคาที่แจ้งอาจมีการเปลี่ยนแปลงอยู่ตลอด กรุณาตรวจสอบกับร้านค้าก่อนทำรายการทุกครั้ง
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script>
import axios from 'axios';
import Bar from '../components/Bar.vue';
import Footer from '../components/Footer.vue';

export default {
    name: "BuyBackPrice",
    components: { Bar, Footer },
    data() {
        return {
            tableRows: [],
            todayDate: '',
            prevPriceMap: new Map(),
        };
    },
    mounted() {
        this.fetchPrices();
        this.setTodayDate();
    },
    computed: {
        flatItems() {
            // flatten เฉพาะ cell ที่มีข้อมูลจริง
            const items = [];
            for (const row of this.tableRows.slice(0, -1)) {
                if (row[0] && row[1]) {
                    items.push({ name: row[0], price: row[1] });
                }
                if (row[2] && row[3]) {
                    items.push({ name: row[2], price: row[3] });
                }
            }
            return items;
        },
        pairedItems() {
            // จับคู่ข้อมูลทีละ 2 รายการ พร้อม diff
            const pairs = [];
            const arr = this.flatItems;
            for (let i = 0; i < arr.length; i += 2) {
                // เพิ่ม diff (การเปลี่ยนแปลง) ให้แต่ละฝั่ง
                let left = arr[i] ? { ...arr[i] } : null;
                let right = arr[i + 1] ? { ...arr[i + 1] } : null;
                if (left) {
                    const prev = this.prevPriceMap.get(left.name);
                    const curr = parseFloat(left.price);
                    if (prev !== undefined && !isNaN(curr) && !isNaN(prev)) {
                        const d = +(curr - prev).toFixed(2);
                        left.diff = d === 0 ? '-' : (d > 0 ? '+' + d : d);
                    } else {
                        left.diff = '-';
                    }
                }
                if (right) {
                    const prev = this.prevPriceMap.get(right.name);
                    const curr = parseFloat(right.price);
                    if (prev !== undefined && !isNaN(curr) && !isNaN(prev)) {
                        const d = +(curr - prev).toFixed(2);
                        right.diff = d === 0 ? '-' : (d > 0 ? '+' + d : d);
                    } else {
                        right.diff = '-';
                    }
                }
                pairs.push([left, right]);
            }
            return pairs;
        }
    },
    methods: {
        async fetchPrices() {
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
                this.prevPriceMap = prevMap;
                // เตรียม tableRows จาก current
                let tableRows = [];
                if (current.length > 0) {
                    for (const row of current[0]) {
                        let r = [];
                        for (let i = 0; i < 4; i++) {
                            let val = row[i] || '';
                            if (i === 1 || i === 3) val = val.replace(')', '').trim();
                            if (i === 1 || i === 3) val = val.replace('|', '').trim();
                            if ((i === 0 || i === 2) && (val === 'กลุ่มพลาสติก' || val === 'ู่มบ็ตต็ด' || val === 'งดรับ' || val === 'กลุ่มโลหะมีค่า')) val = null;
                            r.push(val);
                        }
                        if (row[0] === 'งดรับ' || row[1] === 'งดรับ') {
                            r[0] = null;
                            r[1] = null;
                        }
                        if (row[2] === 'งดรับ' || row[3] === 'งดรับ') {
                            r[2] = null;
                            r[3] = null;
                        }
                        tableRows.push(r);
                    }
                }
                this.tableRows = tableRows;
            } catch (err) {
                this.tableRows = [];
            }
        },
        setTodayDate() {
            const d = new Date();
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear() + 543;
            this.todayDate = `${day}/${month}/${year}`;
        },
        formatName(name) {
            if (!name) return '';
            // เว้นวรรคหน้า +, %, หรือ ( ... )
            name = name.replace(/([^\s+])\+/g, '$1 + ');
            name = name.replace(/([^\s])%/g, '$1 %');
            name = name.replace(/([^\s])\(/g, '$1 (');
            name = name.replace(/\)([\p{L}0-9])/gu, ') $1');
            name = name.replace(/([\p{L}])([0-9])/gu, '$1 $2');
            name = name.replace(/([0-9])([\p{L}])/gu, '$1 $2');
            return name.replace(/\s{2,}/g, ' ').trim();
        },
    },
};
</script>
