<template>
    <Bar />
    <div class="flex flex-col items-center min-h-screen bg-[#f7faf7]">
        <h1 class="text-3xl md:text-4xl font-bold text-[#184c36] mt-10 mb-6 text-center">
            ตารางราคาสินค้ารีไซเคิล (BuyBack Price Table)
        </h1>
        <div class="flex justify-center items-center w-full flex-1 mb-10">
            <div class="w-full max-w-[1550px]">
                <div class="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-300">
                    <div
                        class="bg-[#e6f7e6] px-6 py-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between">
                        <span class="font-bold text-[#184c36] text-lg block">ราคารับ - ซื้อ</span>
                        <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
                    </div>
                    <table class="w-full border-collapse text-sm">
                        <thead>
                            <tr>
                                <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left">รายการ</th>
                                <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left">หน่วยรับซื้อ</th>
                                <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left">ราคารับซื้อ</th>
                                <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left">การเปลี่ยนแปลง</th>
                                <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left border-l border-gray-300">
                                    รายการ</th>
                                <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left">หน่วยรับซื้อ</th>
                                <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left">ราคารับซื้อ</th>
                                <th class="bg-[#e6f7e6] text-[#1a3d1a] px-4 py-2 text-left">การเปลี่ยนแปลง</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(pair, idx) in pairedItems" :key="idx"
                                :class="`text-[#184c36] font-medium transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'}`">
                                <!-- ฝั่งซ้าย -->
                                <td class="px-4 py-4">{{ pair[0]?.name || '' }}</td>
                                <td class="px-4 py-4"><span v-if="pair[0]">กิโล</span></td>
                                <td class="px-4 py-4">
                                    <span v-if="pair[0]"
                                        class="inline-block bg-white rounded-full px-3 py-1 shadow text-[#184c36] font-bold">
                                        {{ pair[0]?.price }}
                                    </span>
                                </td>
                                <td class="px-4 py-4">
                                    <span v-if="pair[0]"
                                        class="inline-flex items-center gap-1 bg-[#e6f7e6] rounded-full px-2 py-1 text-gray-500 font-bold text-sm">
                                        -
                                    </span>
                                </td>
                                <!-- ฝั่งขวา -->
                                <td class="px-4 py-4 border-l border-gray-300">{{ pair[1]?.name || '' }}</td>
                                <td class="px-4 py-4"><span v-if="pair[1]">กิโล</span></td>
                                <td class="px-4 py-4">
                                    <span v-if="pair[1]"
                                        class="inline-block bg-white rounded-full px-3 py-1 shadow text-[#184c36] font-bold">
                                        {{ pair[1]?.price }}
                                    </span>
                                </td>
                                <td class="px-4 py-4">
                                    <span v-if="pair[1]"
                                        class="inline-flex items-center gap-1 bg-[#e6f7e6] rounded-full px-2 py-1 text-gray-500 font-bold text-sm">
                                        -
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="pairedItems.length === 0">
                                <td colspan="8" class="text-center py-6 text-gray-400">ไม่มีข้อมูลราคา</td>
                            </tr>
                        </tbody>
                    </table>
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
            // จับคู่ข้อมูลทีละ 2 รายการ
            const pairs = [];
            const arr = this.flatItems;
            for (let i = 0; i < arr.length; i += 2) {
                pairs.push([arr[i], arr[i + 1] || null]);
            }
            return pairs;
        }
    },
    methods: {
        async fetchPrices() {
            try {
                const res = await axios.get('http://localhost:8888/recycle/scrape');
                const raw = Array.isArray(res.data) ? res.data : (res.data.table || []);
                let tableRows = [];
                if (raw.length > 0) {
                    for (const row of raw[0]) {
                        let r = [];
                        for (let i = 0; i < 4; i++) {
                            let val = row[i] || '';
                            if (i === 1 || i === 3) val = val.replace('|', '').trim();
                            // ถ้าเป็นคอลัมน์ชื่อ (0 หรือ 2) และเป็น 'กลุ่มพลาสติก', 'ู่มบ็ตต็ด', หรือ 'งดรับ' ให้เปลี่ยนเป็น null
                            if ((i === 0 || i === 2) && (val === 'กลุ่มพลาสติก' || val === 'ู่มบ็ตต็ด' || val === 'งดรับ')) val = null;
                            r.push(val);
                        }
                        // ถ้า row[0] หรือ row[1] เป็น 'งดรับ' ให้ r[0]=null, r[1]=null
                        if (row[0] === 'งดรับ' || row[1] === 'งดรับ') {
                            r[0] = null;
                            r[1] = null;
                        }
                        // ถ้า row[2] หรือ row[3] เป็น 'งดรับ' ให้ r[2]=null, r[3]=null
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
    },
};
</script>
