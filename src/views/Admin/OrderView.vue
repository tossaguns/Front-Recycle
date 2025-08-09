<template>
    <BarAdmin />
    <div class="min-h-screen bg-gradient-to-br from-[#e6f7e6] via-white to-[#b6e388] pt-20">

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-0 md:mt-5">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-[#184c36] mb-2">จัดการออเดอร์</h1>
                <p class="text-[#666] text-lg">ดูและจัดการออเดอร์ทั้งหมดในระบบ</p>
            </div>

            <!-- Filter Section -->
            <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6 mb-6">
                <div class="flex flex-col sm:flex-row gap-4 items-center">
                    <div class="flex-1">
                        <input v-model="searchQuery" type="text"
                            placeholder="ค้นหาด้วย Order ID, ชื่อสมาชิก, หรือชื่อร้าน..."
                            class="w-full px-4 py-2 border-2 border-[#e6f7e6] rounded-lg focus:ring-2 focus:ring-[#b6e388] focus:border-[#b6e388] bg-white text-[#184c36]" />
                    </div>
                    <div class="flex gap-2">
                        <select v-model="statusFilter"
                            class="px-4 py-2 border-2 border-[#e6f7e6] rounded-lg focus:ring-2 focus:ring-[#b6e388] focus:border-[#b6e388] bg-white text-[#184c36]">
                            <option value="">สถานะทั้งหมด</option>
                            <option value="รอยืนยัน">รอยืนยัน</option>
                            <option value="ยืนยันแล้ว">ยืนยันแล้ว</option>
                            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                            <option value="ยกเลิก">ยกเลิก</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Orders Table -->
            <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] overflow-hidden">
                <div v-if="loading" class="flex flex-col items-center justify-center py-16">
                    <svg class="animate-spin h-10 w-10 text-[#2BAC75]" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span class="mt-4 text-[#2BAC75] text-lg font-semibold">กำลังโหลดข้อมูล...</span>
                </div>
                <div v-else>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gradient-to-r from-[#2BAC75] to-[#184c36] text-white">
                                <tr>
                                    <th class="px-6 py-4 text-left text-xs lg:text-sm font-semibold">Order ID</th>
                                    <th class="px-6 py-4 text-left text-xs lg:text-sm font-semibold">สถานะ</th>
                                    <th class="px-6 py-4 text-left text-xs lg:text-sm font-semibold">ผู้จอง</th>
                                    <th
                                        class="px-6 py-4 text-left text-xs lg:text-sm font-semibold hidden md:table-cell">
                                        ร้านค้า</th>
                                    <th
                                        class="px-6 py-4 text-left text-xs lg:text-sm font-semibold hidden lg:table-cell">
                                        จำนวนสินค้า</th>
                                    <th
                                        class="px-6 py-4 text-left text-xs lg:text-sm font-semibold hidden lg:table-cell">
                                        ยอดรวม</th>
                                    <th
                                        class="px-6 py-4 text-left text-xs lg:text-sm font-semibold hidden lg:table-cell">
                                        วันที่จองคิว</th>
                                    <th class="px-6 py-4 text-center text-xs lg:text-sm font-semibold">การดำเนินการ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#f0f0f0]">
                                <tr v-for="order in paginatedOrders" :key="order._id"
                                    class="hover:bg-gray-50 transition-colors">
                                    <td class="px-6 py-4 text-xs lg:text-sm">
                                        <div class="font-mono font-semibold text-[#184c36]">{{ order.orderId ||
                                            order._id.slice(-8) }}</div>
                                    </td>
                                    <td class="px-0 md:px-6 py-4 text-xs lg:text-sm">
                                        <span :class="[
                                            'px-3 py-1 rounded-full text-xs font-medium',
                                            getStatusClass(order.status)
                                        ]">
                                            {{ getStatusText(order.status) }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-xs lg:text-sm">
                                        <div class="flex items-center gap-3">
                                            <!-- รูปโปรไฟล์เล็ก -->
                                            <div
                                                class="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-[#e6f7e6] flex-shrink-0 relative">
                                                <img v-if="order.member_id.profile_img"
                                                    :src="order.member_id.profile_img" :alt="order.member_id.fullName"
                                                    class="w-full h-full object-cover" @error="handleTableImageError" />
                                                <div v-else
                                                    class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2BAC75] to-[#184c36] text-white text-xs font-bold">
                                                    {{ order.customer?.fullName ?
                                                        order.customer.fullName.charAt(0).toUpperCase() : '?' }}
                                                </div>
                                            </div>
                                            <!-- ข้อมูลชื่อ -->
                                            <div>
                                                <p class="font-semibold text-[#184c36]">{{ order.member_id.fullName ||
                                                    'ไม่ระบุ' }}</p>
                                                <p class="text-xs text-gray-500">{{ order.member_id.personalPhone ||
                                                    'ไม่ระบุ' }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-xs lg:text-sm hidden md:table-cell">
                                        <div class="flex items-center gap-3">
                                            <!-- รูปร้านค้าเล็ก -->
                                            <div
                                                class="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-[#e6f7e6] flex-shrink-0 relative">
                                                <img v-if="order.store_id.companyLogo" :src="order.store_id.companyLogo"
                                                    :alt="order.store_id.companyName" class="w-full h-full object-cover"
                                                    @error="handleTableImageError" />
                                                <div v-else
                                                    class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2BAC75] to-[#184c36] text-white text-xs font-bold">
                                                    {{ order.store_id.companyName ?
                                                        order.store_id.companyName.charAt(0).toUpperCase() : '?' }}
                                                </div>
                                            </div>
                                            <!-- ข้อมูลร้านค้า -->
                                            <div>
                                                <p class="font-semibold text-[#184c36]">{{ order.store_id.companyName ||
                                                    'ไม่ระบุ' }}</p>
                                                <p class="text-xs text-gray-500">{{ order.store_id.companyPhone ||
                                                    'ไม่ระบุ'
                                                    }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-xs lg:text-sm hidden lg:table-cell">
                                        <span class="font-semibold text-[#184c36]">{{ order.order_items?.length || 0 }}
                                            รายการ</span>
                                    </td>
                                    <td class="px-6 py-4 text-xs lg:text-sm hidden lg:table-cell">
                                        <span class="font-semibold text-[#184c36]">฿{{ formatNumber(order.total_price ||
                                            0)
                                            }}</span>
                                    </td>
                                    <td class="px-6 py-4 hidden lg:table-cell text-xs lg:text-sm">
                                        <p class="text-xs lg:text-sm text-[#666]">{{ formatDate(order.booking_datetime) }}</p>
                                    </td>
                                    <td class="px-6 py-4 text-xs lg:text-sm">
                                        <button @click="viewOrderDetails(order)"
                                            :class="isSmallScreen ? 'p-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors flex items-center justify-center' : 'px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors'"
                                            aria-label="ดูรายละเอียด" title="ดูรายละเอียด">
                                            <template v-if="!isSmallScreen">
                                                ดูรายละเอียด
                                            </template>
                                            <template v-else>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </template>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- Pagination -->
                <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 my-4">
                    <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">ก่อนหน้า</button>
                    <span>หน้า {{ currentPage }} / {{ totalPages }}</span>
                    <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">ถัดไป</button>
                </div>
                <div v-if="filteredOrders.length === 0 && !loading" class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">ไม่พบออเดอร์</h3>
                    <p class="mt-1 text-sm text-gray-500">ไม่มีออเดอร์ที่ตรงกับเงื่อนไข</p>
                </div>
            </div>

            <!-- Order Details Modal -->
            <div v-if="showDetailsModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-bold text-[#184c36] flex items-center gap-2">
                                <svg class="w-7 h-7 text-[#2BAC75]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                รายละเอียดออเดอร์
                            </h3>
                            <button @click="showDetailsModal = false" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div v-if="selectedOrder">
                            <!-- Order Header -->
                            <div class="bg-gradient-to-r from-[#e6f7e6] to-[#b6e388] rounded-lg p-4 mb-6">
                                <div
                                    class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h2 class="text-2xl font-bold text-[#184c36] mb-1">
                                            Order ID: {{ selectedOrder.orderId || selectedOrder._id.slice(-8) }}
                                        </h2>
                                        <p class="text-[#666]">วันที่จองคิว: {{ formatDate(selectedOrder.booking_datetime) }}
                                        </p>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <span :class="[
                                            'px-3 py-1 rounded-full text-sm font-medium',
                                            getStatusClass(selectedOrder.status)
                                        ]">
                                            {{ getStatusText(selectedOrder.status) }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Customer and Partner Info -->
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                <!-- Customer Info -->
                                <div class="bg-white border border-[#e6e6e6] rounded-lg p-4">
                                    <h4 class="font-semibold text-[#2BAC75] mb-3 flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        ข้อมูลผู้สั่งซื้อ
                                    </h4>
                                    <div class="flex items-center gap-3 mb-3">
                                        <div
                                            class="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-[#e6f7e6] relative">
                                            <img v-if="selectedOrder.member_id?.profile_img"
                                                :src="selectedOrder.member_id.profile_img"
                                                :alt="selectedOrder.member_id?.fullName"
                                                class="w-full h-full object-cover" @error="handleImageError" />
                                            <div v-else
                                                class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2BAC75] to-[#184c36] text-white text-xl font-bold">
                                                {{ selectedOrder.member_id?.fullName ?
                                                    selectedOrder.member_id.fullName.charAt(0).toUpperCase() : '?' }}
                                            </div>
                                        </div>
                                        <div>
                                            <h5 class="font-semibold text-[#184c36]">{{
                                                selectedOrder.member_id?.fullName ||
                                                'ไม่ระบุ' }}</h5>
                                            <p class="text-sm text-gray-600">{{ selectedOrder.member_id?.email ||
                                                'ไม่ระบุ' }}</p>
                                        </div>
                                    </div>
                                    <div class="space-y-2 text-sm">
                                        <div><span class="font-medium text-[#184c36]">เบอร์โทร:</span> {{
                                            selectedOrder.member_id?.personalPhone || 'ไม่ระบุ' }}</div>
                                        <div><span class="font-medium text-[#184c36]">ที่อยู่:</span> {{
                                            selectedOrder.address ||
                                            'ไม่ระบุ' }}</div>
                                    </div>
                                </div>

                                <!-- Partner Info -->
                                <div class="bg-white border border-[#e6e6e6] rounded-lg p-4">
                                    <h4 class="font-semibold text-[#2BAC75] mb-3 flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        ข้อมูลร้านค้า
                                    </h4>
                                    <div class="flex items-center gap-3 mb-3">
                                        <div
                                            class="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-[#e6f7e6] relative">
                                            <img v-if="selectedOrder.store_id?.companyLogo"
                                                :src="selectedOrder.store_id.companyLogo"
                                                :alt="selectedOrder.store_id?.companyName"
                                                class="w-full h-full object-cover" @error="handleImageError" />
                                            <div v-else
                                                class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2BAC75] to-[#184c36] text-white text-xl font-bold">
                                                {{ selectedOrder.store_id?.companyName ?
                                                    selectedOrder.store_id.companyName.charAt(0).toUpperCase() : '?' }}
                                            </div>
                                        </div>
                                        <div>
                                            <h5 class="font-semibold text-[#184c36]">{{
                                                selectedOrder.store_id?.companyName ||
                                                'ไม่ระบุ' }}</h5>
                                            <p class="text-sm text-gray-600">{{ selectedOrder.store_id?.fullName ||
                                                'ไม่ระบุ' }}</p>
                                        </div>
                                    </div>
                                    <div class="space-y-2 text-sm">
                                        <div><span class="font-medium text-[#184c36]">ที่อยู่ร้าน:</span> {{
                                            getFullAddress(selectedOrder.store_id) }}</div>
                                        <div><span class="font-medium text-[#184c36]">เบอร์โทร:</span> {{
                                            selectedOrder.store_id?.companyPhone || 'ไม่ระบุ' }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Order Items -->
                            <div class="mb-6">
                                <h4 class="font-semibold text-[#2BAC75] mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    รายการสินค้า
                                </h4>
                                <div class="bg-white border border-[#e6e6e6] rounded-lg overflow-hidden">
                                    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
                                        <svg class="animate-spin h-10 w-10 text-[#2BAC75]" fill="none"
                                            viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4" />
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        <span
                                            class="mt-4 text-[#2BAC75] text-lg font-semibold">กำลังโหลดข้อมูล...</span>
                                    </div>
                                    <div v-else>
                                        <!-- Table view for md and up -->
                                        <div class="hidden sm:block">
                                            <table class="w-full">
                                                <thead class="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            class="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                            สินค้า
                                                        </th>
                                                        <th
                                                            class="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                            ราคา</th>
                                                        <th
                                                            class="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                            จำนวน</th>
                                                        <th
                                                            class="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                            รวม</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="divide-y divide-gray-200">
                                                    <tr v-for="item in selectedOrder.order_items" :key="item._id"
                                                        class="hover:bg-gray-50">
                                                        <td class="px-4 py-3">
                                                            <div class="flex items-center gap-3">
                                                                <div
                                                                    class="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                                                    <img v-if="item.product_id?.productId?.image"
                                                                        :src="item.product_id.productId.image"
                                                                        :alt="item.product_id.productId.name"
                                                                        class="w-full h-full object-cover"
                                                                        @error="handleImageError" />
                                                                    <div v-else
                                                                        class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">
                                                                        ไม่มีรูป
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p class="font-medium text-[#184c36]">
                                                                        {{ item.product_id?.productId?.name || 'ไม่ระบุ'
                                                                        }}
                                                                    </p>
                                                                    <p class="text-sm text-gray-500">
                                                                        {{ item.product_id?.productId?.description ||
                                                                            'ไม่มีคำอธิบาย' }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-4 py-3 text-sm text-[#184c36]">
                                                            ฿{{ formatNumber(item.unit_price || 0) }}
                                                        </td>
                                                        <td class="px-4 py-3 text-sm text-[#184c36]">
                                                            {{ item.amount || 0 }}
                                                        </td>
                                                        <td class="px-4 py-3 text-sm font-semibold text-[#184c36]">
                                                            ฿{{ formatNumber((item.unit_price || 0) * (item.amount ||
                                                                0)) }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!-- Card view for mobile -->
                                        <div class="sm:hidden space-y-4">
                                            <div v-for="item in selectedOrder.order_items" :key="item._id"
                                                class="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                                <div class="flex items-start gap-4">
                                                    <!-- รูปภาพสินค้า -->
                                                    <div
                                                        class="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                                        <img v-if="item.product_id?.productId?.image"
                                                            :src="item.product_id.productId.image"
                                                            :alt="item.product_id.productId.name"
                                                            class="w-full h-full object-cover"
                                                            @error="handleImageError" />
                                                        <div v-else
                                                            class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">
                                                            ไม่มีรูป
                                                        </div>
                                                    </div>

                                                    <!-- รายละเอียดสินค้า -->
                                                    <div class="flex-1">
                                                        <p class="font-medium text-[#184c36]">
                                                            {{ item.product_id?.productId?.name || 'ไม่ระบุ' }}
                                                        </p>
                                                        <p class="text-sm text-gray-500 mb-2">
                                                            {{ item.product_id?.productId?.description ||
                                                            'ไม่มีคำอธิบาย' }}
                                                        </p>

                                                        <!-- ตารางราคา จำนวน รวม -->
                                                        <div class="overflow-x-auto">
                                                            <table class="w-full text-sm mt-2 border border-gray-200">
                                                                <thead class="bg-gray-100 text-gray-600">
                                                                    <tr>
                                                                        <th
                                                                            class="px-2 py-1 border border-gray-200 text-left">
                                                                            ราคา
                                                                        </th>
                                                                        <th
                                                                            class="px-2 py-1 border border-gray-200 text-left">
                                                                            จำนวน
                                                                        </th>
                                                                        <th
                                                                            class="px-2 py-1 border border-gray-200 text-left">
                                                                            รวม
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td
                                                                            class="px-2 py-1 border border-gray-200 text-[#184c36]">
                                                                            ฿{{ formatNumber(item.unit_price || 0) }}
                                                                        </td>
                                                                        <td
                                                                            class="px-2 py-1 border border-gray-200 text-[#184c36]">
                                                                            {{ item.amount || 0 }}
                                                                        </td>
                                                                        <td
                                                                            class="px-2 py-1 border border-gray-200 text-[#184c36] font-semibold">
                                                                            ฿{{ formatNumber((item.unit_price || 0) *
                                                                            (item.amount
                                                                            || 0)) }}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Order Images Section -->
                            <div v-if="selectedOrder.order_images && selectedOrder.order_images.length" class="mt-4">
                                <h4 class="font-semibold text-[#2BAC75] mb-2 flex items-center gap-2">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 3h-1a2 2 0 00-2 2v1a2 2 0 002 2h1a2 2 0 002-2V5a2 2 0 00-2-2z" />
                                    </svg>
                                    รูปภาพประกอบออเดอร์
                                </h4>
                                <div class="flex flex-wrap gap-4">
                                    <div v-for="img in selectedOrder.order_images" :key="img._id"
                                        class="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                                        <img :src="img.url" :alt="img.type" class="object-cover w-full h-full"
                                            @error="(e) => { e.target.src = '/src/assets/NoPicture.webp'; }" />
                                    </div>
                                </div>
                            </div>

                            <!-- Order Summary -->
                            <div class="bg-gray-50 rounded-lg p-4">
                                <div class="flex justify-between items-center">
                                    <h4 class="flex-1 font-semibold text-[#184c36]">สรุปออเดอร์</h4>
                                    <div class="h-10 border-l-2 border-gray-300 mx-4"></div>
                                    <div class="text-right space-y-1">
                                        <p class="text-sm text-gray-600">ค่ารับของ: ฿{{
                                            formatNumber(selectedOrder.pickup_fee || 0)
                                            }}</p>
                                        <p class="text-sm text-gray-600">ยอดรวม: ฿{{
                                            formatNumber(selectedOrder.total_price || 0) }}
                                        </p>
                                        <hr class="my-0 sm:my-2 border-gray-300">
                                        <p class="text-xl sm:text-2xl font-bold text-[#184c36]">
                                            ยอดสุทธิ: ฿{{ formatNumber((selectedOrder.total_price || 0) -
                                                (selectedOrder.pickup_fee
                                                    || 0)) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BarAdmin from '../../components/BarAdmin.vue';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import Swal from 'sweetalert2';

const orders = ref([]);
const isSmallScreen = ref(window.innerWidth <= 1193);
const authStore = useAuthStore();
const loading = ref(false);

// Filter states
const searchQuery = ref('');
const statusFilter = ref('');

// Modal states
const showDetailsModal = ref(false);
const selectedOrder = ref(null);

// Pagination states
const currentPage = ref(1);
const pageSize = 5;

const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredOrders.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize));

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

const handleResize = () => {
    isSmallScreen.value = window.innerWidth <= 1193;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const thShortMonths = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const day = date.getDate();
    const month = thShortMonths[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
};

const formatNumber = (num) => {
    return num.toLocaleString('th-TH');
};

const getStatusClass = (status) => {
    const statusClasses = {
        'รอยืนยัน': 'bg-yellow-100 text-yellow-800 border border-yellow-300',
        'ยืนยันแล้ว': 'bg-blue-100 text-blue-800 border border-blue-300',
        'กำลังดำเนินการ': 'bg-orange-100 text-orange-800 border border-orange-300',
        'เสร็จสิ้น': 'bg-green-100 text-green-800 border border-green-300',
        'ยกเลิก': 'bg-red-100 text-red-800 border border-red-300'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800 border border-gray-300';
};

const getStatusText = (status) => {
    const statusTexts = {
        'รอยืนยัน': 'รอยืนยัน',
        'ยืนยันแล้ว': 'ยืนยันแล้ว',
        'กำลังดำเนินการ': 'กำลังดำเนินการ',
        'เสร็จสิ้น': 'เสร็จสิ้น',
        'ยกเลิก': 'ยกเลิก'
    };
    return statusTexts[status] || 'ไม่ระบุ';
};

const getFullAddress = (store) => {
    if (!store) return 'ไม่ระบุ';

    const addressParts = [
        store.companyAddress,
        store.companySubdistrict ? `ต.${store.companySubdistrict}` : '',
        store.companyDistrict ? `อ.${store.companyDistrict}` : '',
        store.companyProvince ? `จ.${store.companyProvince}` : '',
        store.companyPostalCode
    ].filter(part => part && part.trim() !== '');

    return addressParts.length > 0 ? addressParts.join(' ') : 'ไม่ระบุ';
};

const handleImageError = (event) => {
    const img = event.target;
    const fallback = img.parentElement.querySelector('.absolute');
    if (img) img.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
};

const handleTableImageError = (event) => {
    const img = event.target;
    const fallback = img.parentElement.querySelector('.absolute');
    if (img) img.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
};

const viewOrderDetails = async (order) => {
    loading.value = true;
    try {
        const token = authStore.token;
        if (!token) throw new Error('ไม่พบ Token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // ดึงข้อมูลออเดอร์แบบละเอียด
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${order._id}`);
        console.log('Order Details:', response.data);
        selectedOrder.value = response.data.data;
        showDetailsModal.value = true;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถโหลดรายละเอียดออเดอร์ได้',
            confirmButtonText: 'ตกลง'
        });
    } finally {
        loading.value = false; // โหลดเสร็จ
    }
};

const loadOrders = async () => {
    loading.value = true;
    try {
        const token = authStore.token;
        if (!token) throw new Error('ไม่พบ Token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // ดึงข้อมูลออเดอร์ทั้งหมด
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`);
        if (Array.isArray(response.data)) {
            orders.value = response.data;
        } else if (Array.isArray(response.data.data)) {
            orders.value = response.data.data;
        } else {
            orders.value = [];
        }
    } catch (error) {
        orders.value = [];
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถโหลดข้อมูลออเดอร์ได้',
            confirmButtonText: 'ตกลง'
        });
    } finally {
        loading.value = false; // โหลดเสร็จ
    }
};

// Computed properties for filtering
const filteredOrders = computed(() => {
    let filtered = orders.value;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(order =>
            (order.order_id && order.order_id.toLowerCase().includes(query)) ||
            (order._id && order._id.slice(-8).toLowerCase().includes(query)) ||
            (order.member_id?.fullName && order.member_id.fullName.toLowerCase().includes(query)) ||
            (order.member_id?.personalPhone && order.member_id.personalPhone.toLowerCase().includes(query)) ||
            (order.store_id?.companyPhone && order.store_id.companyPhone.toLowerCase().includes(query)) ||
            (order.store_id?.companyName && order.store_id.companyName.toLowerCase().includes(query))
        );
    }

    // Filter by status
    if (statusFilter.value) {
        filtered = filtered.filter(order => order.status === statusFilter.value);
    }

    return filtered;
});

onMounted(() => {
    window.addEventListener('resize', handleResize);
    loadOrders();
});
</script>

<style scoped>
.border-6 {
    border-width: 6px;
}
</style>
