<template>
    <Bar />
    <div class="flex flex-col items-center min-h-screen bg-[#f7faf7] pt-20">
        <h1 class="text-3xl md:text-4xl font-bold text-[#184c36] mb-6 text-center mt-0 md:mt-10">
            ตารางราคาสินค้ารีไซเคิล (BuyBack Price Table)
        </h1>
        <div class="flex justify-center items-center w-full flex-1 mb-10">
            <div class="w-full max-w-[1450px]">
                <!-- หมวดหมู่เหล็ก -->
                <div class="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-300 mb-6">
                    <div class="bg-[#e6f7e6] px-6 py-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between">
                        <span class="font-bold text-[#184c36] text-lg block">หมวดหมู่เหล็ก</span>
                        <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
                    </div>
                    <div class="overflow-x-auto w-full">
                        <table class="w-full min-w-[700px] border-collapse text-xs md:text-sm">
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
                                <tr v-for="(pair, idx) in pairedItems.iron" :key="`iron-${idx}`"
                                    :class="`text-[#184c36] text-[10px] md:text-xs font-medium transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'}`">
                                    <td class="px-2 md:px-4 py-2 md:py-4 break-words">{{ formatName(pair[0]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[0]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[0]?.price }}
                                        </span>
                                        <span v-else-if="pair[0] && pair[0].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[0].change === 'up' ? 'bg-green-100 text-green-700' : pair[0].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[0].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[0].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[0].diff }}</span>
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 border-l border-gray-300 break-words">{{ formatName(pair[1]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[1]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[1]?.price }}
                                        </span>
                                        <span v-else-if="pair[1] && pair[1].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[1].change === 'up' ? 'bg-green-100 text-green-700' : pair[1].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[1].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[1].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[1].diff }}</span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- หมวดหมู่กระดาษ -->
                <div class="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-300 mb-6">
                    <div class="bg-[#e6f7e6] px-6 py-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between">
                        <span class="font-bold text-[#184c36] text-lg block">หมวดหมู่กระดาษ</span>
                        <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
                    </div>
                    <div class="overflow-x-auto w-full">
                        <table class="w-full min-w-[700px] border-collapse text-xs md:text-sm">
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
                                <tr v-for="(pair, idx) in pairedItems.paper" :key="`paper-${idx}`"
                                    :class="`text-[#184c36] text-[10px] md:text-xs font-medium transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'}`">
                                    <td class="px-2 md:px-4 py-2 md:py-4 break-words">{{ formatName(pair[0]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[0]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[0]?.price }}
                                        </span>
                                        <span v-else-if="pair[0] && pair[0].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[0].change === 'up' ? 'bg-green-100 text-green-700' : pair[0].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[0].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[0].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[0].diff }}</span>
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 border-l border-gray-300 break-words">{{ formatName(pair[1]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[1]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[1]?.price }}
                                        </span>
                                        <span v-else-if="pair[1] && pair[1].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[1].change === 'up' ? 'bg-green-100 text-green-700' : pair[1].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[1].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[1].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[1].diff }}</span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- กลุ่มเบ็ดเตล็ด -->
                <div class="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-300 mb-6">
                    <div class="bg-[#e6f7e6] px-6 py-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between">
                        <span class="font-bold text-[#184c36] text-lg block">กลุ่มเบ็ดเตล็ด</span>
                        <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
                    </div>
                    <div class="overflow-x-auto w-full">
                        <table class="w-full min-w-[700px] border-collapse text-xs md:text-sm">
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
                                <tr v-for="(pair, idx) in pairedItems.milkBox" :key="`milkBox-${idx}`"
                                    :class="`text-[#184c36] text-[10px] md:text-xs font-medium transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'}`">
                                    <td class="px-2 md:px-4 py-2 md:py-4 break-words">{{ formatName(pair[0]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[0]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[0]?.price }}
                                        </span>
                                        <span v-else-if="pair[0] && pair[0].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[0].change === 'up' ? 'bg-green-100 text-green-700' : pair[0].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[0].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[0].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[0].diff }}</span>
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 border-l border-gray-300 break-words">{{ formatName(pair[1]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[1]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[1]?.price }}
                                        </span>
                                        <span v-else-if="pair[1] && pair[1].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[1].change === 'up' ? 'bg-green-100 text-green-700' : pair[1].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[1].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[1].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[1].diff }}</span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- หมวดหมู่อลูมิเนียม แบตเตอรี่ และแก้ว -->
                <div class="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-300 mb-6">
                    <div class="bg-[#e6f7e6] px-6 py-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between">
                        <span class="font-bold text-[#184c36] text-lg block">หมวดหมู่อลูมิเนียม แบตเตอรี่ และแก้ว</span>
                        <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
                    </div>
                    <div class="overflow-x-auto w-full">
                        <table class="w-full min-w-[700px] border-collapse text-xs md:text-sm">
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
                                <tr v-for="(pair, idx) in pairedItems.aluminum" :key="`aluminum-${idx}`"
                                    :class="`text-[#184c36] text-[10px] md:text-xs font-medium transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'}`">
                                    <td class="px-2 md:px-4 py-2 md:py-4 break-words">{{ formatName(pair[0]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[0]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[0]?.price }}
                                        </span>
                                        <span v-else-if="pair[0] && pair[0].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[0].change === 'up' ? 'bg-green-100 text-green-700' : pair[0].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[0].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[0].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[0].diff }}</span>
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 border-l border-gray-300 break-words">{{ formatName(pair[1]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[1]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[1]?.price }}
                                        </span>
                                        <span v-else-if="pair[1] && pair[1].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[1].change === 'up' ? 'bg-green-100 text-green-700' : pair[1].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[1].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[1].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[1].diff }}</span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- หมวดหมู่ทองแดงและอลูมิเนียม -->
                <div class="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-300 mb-6">
                    <div class="bg-[#e6f7e6] px-6 py-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between">
                        <span class="font-bold text-[#184c36] text-lg block">หมวดหมู่ทองแดงและอลูมิเนียม</span>
                        <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
                    </div>
                    <div class="overflow-x-auto w-full">
                        <table class="w-full min-w-[700px] border-collapse text-xs md:text-sm">
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
                                <tr v-for="(pair, idx) in pairedItems.copper" :key="`copper-${idx}`"
                                    :class="`text-[#184c36] text-[10px] md:text-xs font-medium transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'}`">
                                    <td class="px-2 md:px-4 py-2 md:py-4 break-words">{{ formatName(pair[0]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[0]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[0]?.price }}
                                        </span>
                                        <span v-else-if="pair[0] && pair[0].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[0].change === 'up' ? 'bg-green-100 text-green-700' : pair[0].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[0].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[0].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[0].diff }}</span>
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 border-l border-gray-300 break-words">{{ formatName(pair[1]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[1]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[1]?.price }}
                                        </span>
                                        <span v-else-if="pair[1] && pair[1].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[1].change === 'up' ? 'bg-green-100 text-green-700' : pair[1].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[1].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[1].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[1].diff }}</span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- หมวดหมู่พลาสติก -->
                <div class="bg-gray-200 rounded-2xl shadow-xl overflow-hidden border border-gray-300 mb-6">
                    <div class="bg-[#e6f7e6] px-6 py-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between">
                        <span class="font-bold text-[#184c36] text-lg block">หมวดหมู่พลาสติก</span>
                        <span class="text-xs text-[#7a7a7a]">ณ วันที่ {{ todayDate }}</span>
                    </div>
                    <div class="overflow-x-auto w-full">
                        <table class="w-full min-w-[700px] border-collapse text-xs md:text-sm">
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
                                <tr v-for="(pair, idx) in pairedItems.plastic" :key="`plastic-${idx}`"
                                    :class="`text-[#184c36] text-[10px] md:text-xs font-medium transition ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'}`">
                                    <td class="px-2 md:px-4 py-2 md:py-4 break-words">{{ formatName(pair[0]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[0]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[0]?.price }}
                                        </span>
                                        <span v-else-if="pair[0] && pair[0].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[0] && pair[0].price !== 'งดรับ' && pair[0].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[0].change === 'up' ? 'bg-green-100 text-green-700' : pair[0].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[0].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[0].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[0].diff }}</span>
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 border-l border-gray-300 break-words">{{ formatName(pair[1]?.name) || '' }}</td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-center"><span v-if="pair[1]">กิโล</span></td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-end">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            class="inline-block py-1 text-[#184c36] font-bold">
                                            {{ pair[1]?.price }}
                                        </span>
                                        <span v-else-if="pair[1] && pair[1].price === 'งดรับ'"
                                            class="inline-block bg-red-100 rounded-full px-2 md:px-3 py-1 shadow text-red-600 font-bold">
                                            งดรับ
                                        </span>
                                    </td>
                                    <td class="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                                        <span v-if="pair[1] && pair[1].price !== 'งดรับ' && pair[1].price !== null"
                                            :class="[
                                                'inline-flex items-center rounded-full px-2 md:px-3 py-1 shadow font-bold',
                                                pair[1].change === 'up' ? 'bg-green-100 text-green-700' : pair[1].change === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                                            ]">
                                            <svg v-if="pair[1].change === 'up'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                                            <svg v-else-if="pair[1].change === 'down'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                                            <span>{{ pair[1].diff }}</span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="text-xs text-gray-500 mt-4 px-4 pb-6">
                    หมายเหตุ: ราคาที่แจ้งอาจมีการเปลี่ยนแปลงอยู่ตลอด กรุณาตรวจสอบกับร้านค้าก่อนทำรายการทุกครั้ง
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
            tableData: [],
            prevPriceMap: new Map(),
            todayDate: '',
        };
    },
    mounted() {
        this.fetchPrices();
        this.setTodayDate();
    },
    computed: {
        pairedItems() {
            const result = {
                iron: [],
                paper: [],
                milkBox: [],
                aluminum: [],
                copper: [],
                plastic: []
            };

            // หมวดหมู่เหล็ก (index 0)
            if (this.tableData[0]) {
                result.iron = this.createPairs(this.tableData[0], this.prevPriceMap);
            }
            // หมวดหมู่กระดาษ (index 1)
            if (this.tableData[1]) {
                result.paper = this.createPairs(this.tableData[1], this.prevPriceMap);
            }
            // หมวดหมู่กลุ่มเบ็ดเตล็ด (index 2)
            if (this.tableData[2]) {
                result.milkBox = this.createPairs(this.tableData[2], this.prevPriceMap);
            }
            // หมวดหมู่อลูมิเนียม แบตเตอรี่ และแก้ว (index 3)
            if (this.tableData[3]) {
                result.aluminum = this.createPairs(this.tableData[3], this.prevPriceMap);
            }
            // หมวดหมู่ทองแดงและอลูมิเนียม (index 4)
            if (this.tableData[4]) {
                result.copper = this.createPairs(this.tableData[4], this.prevPriceMap);
            }
            // หมวดหมู่พลาสติก (index 5)
            if (this.tableData[5]) {
                result.plastic = this.createPairs(this.tableData[5], this.prevPriceMap);
            }
            return result;
        }
    },
    methods: {
        normalizeName(name) {
            if (!name) return '';
            // เว้นวรรคหน้า +, %, หรือ ( ... )
            name = name.replace(/([^\s+])\+/g, '$1 + ');
            name = name.replace(/([^\s])%/g, '$1 %');
            name = name.replace(/([^\s])\(/g, '$1 (');
            name = name.replace(/\)([\p{L}0-9])/gu, ') $1');
            name = name.replace(/([\p{L}])([0-9])/gu, '$1 $2');
            name = name.replace(/([0-9])([\p{L}])/gu, '$1 $2');
            
            // ลบ T ที่อยู่ท้ายข้อความ ยกเว้น "เหล็กบาง+สายรัดเหล็ก+เหล็กถัง200LIT"
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
        },
        formatName(name) {
            return this.normalizeName(name);
        },
        async fetchPrices() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/scrape`);
                this.tableData = res.data.current || [];
                // สร้าง prevPriceMap จาก previous (ใช้ normalizeName)
                const prev = res.data.previous || [];
                const prevMap = new Map();
                if (Array.isArray(prev)) {
                    for (const table of prev) {
                        if (Array.isArray(table)) {
                            for (const row of table) {
                                if (row[0] && row[1] && row[1] !== 'งดรับ' && row[1] !== 'ราคา/กก.' && row[1] !== 'ราคา/กก') {
                                    prevMap.set(this.normalizeName(row[0]), parseFloat(row[1]));
                                }
                                if (row[2] && row[3] && row[3] !== 'งดรับ' && row[3] !== 'ราคา/กก.' && row[3] !== 'ราคา/กก') {
                                    prevMap.set(this.normalizeName(row[2]), parseFloat(row[3]));
                                }
                            }
                        }
                    }
                }
                this.prevPriceMap = prevMap;
                // ย้าย "ของแกะ/คอมแอร์มอเตอร์T" ไปยังกลุ่มเบ็ดเตล็ด
                this.moveMotorToMisc();
            } catch (err) {
                console.error('Error fetching prices:', err);
                this.tableData = [];
            }
        },
        createPairs(categoryData, prevPriceMap) {
            const pairs = [];
            const items = categoryData.filter(item => 
                item[0] && 
                item[1] !== null && 
                item[1] !== 'งดรับ' && 
                item[1] !== 'ราคา/กก' && 
                item[1] !== 'ราคา/กก.'
            ).map(item => {
                let change = 'none';
                let diff = '-';
                const normName = this.normalizeName(item[0]);
                let prev = prevPriceMap.get(normName);
                let curr = parseFloat(item[1]);
                if (prev !== undefined && !isNaN(curr) && !isNaN(prev)) {
                    const d = +(curr - prev).toFixed(2);
                    if (curr > prev) change = 'up';
                    else if (curr < prev) change = 'down';
                    diff = d === 0 ? '-' : (d > 0 ? '+' + d : d.toString());
                }
                return {
                    name: normName,
                    price: item[1],
                    change,
                    diff
                };
            });
            for (let i = 0; i < items.length; i += 2) {
                const pair = [items[i] || null, items[i + 1] || null];
                pairs.push(pair);
            }
            return pairs;
        },
        // ย้าย "ของแกะ/คอมแอร์มอเตอร์T" ไปยังกลุ่มเบ็ดเตล็ด
        moveMotorToMisc() {
            if (this.tableData[4] && this.tableData[2]) {
                // หา "ของแกะ/คอมแอร์มอเตอร์T" ใน index 4
                const motorIndex = this.tableData[4].findIndex(item => 
                    item[0] && (item[0].includes('ของแกะ/คอมแอร์มอเตอร์T') || 
                               item[0].includes('/คอมแอร์มอเตอร์Tของแกะ'))
                );
                
                if (motorIndex !== -1) {
                    // ย้ายข้อมูลไปยัง index 2 (กลุ่มเบ็ดเตล็ด)
                    const motorItem = this.tableData[4][motorIndex];
                    this.tableData[2].push(motorItem);
                    // ลบออกจาก index 4
                    this.tableData[4].splice(motorIndex, 1);
                }
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
