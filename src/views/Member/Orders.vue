<template>
    <BarNoMenu :showBackNavigation="true" pageTitle="รายการจองคิวของฉัน" backRoute="/profilemember" />

    <div class="min-h-screen flex flex-col bg-white pt-20">
        <div class="min-h-screen bg-gray-50 mt-5 md:mt-7">

            <!-- Header Section -->
            <div class="bg-white shadow-sm border-b border-[#e6e6e6]">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 class="text-3xl font-bold text-[#184c36]">รายการจองคิวของฉัน</h1>
                            <p class="text-gray-600 mt-1">จัดการและติดตามการจองคิวของคุณ</p>
                        </div>
                        <div class="text-center sm:text-right">
                            <p class="text-sm text-gray-500">จำนวนออเดอร์</p>
                            <p class="text-lg font-semibold text-[#184c36]">{{ filteredOrders.length }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
                <!-- ฟิลเตอร์สถานะ -->
                <div class="flex flex-wrap gap-2">
                    <button @click="filterByStatus('')" :class="[
                        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                        currentFilter === ''
                            ? 'bg-[#184c36] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]">
                        ทั้งหมด
                    </button>
                    <button @click="filterByStatus('pending')" :class="[
                        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                        currentFilter === 'pending'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                    ]">
                        รอการยืนยัน
                    </button>
                    <button @click="filterByStatus('confirmed')" :class="[
                        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                        currentFilter === 'confirmed'
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    ]">
                        ยืนยันแล้ว
                    </button>
                    <button @click="filterByStatus('processing')" :class="[
                        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                        currentFilter === 'processing'
                            ? 'bg-purple-500 text-white'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                    ]">
                        กำลังดำเนินการ
                    </button>
                    <button @click="filterByStatus('completed')" :class="[
                        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                        currentFilter === 'completed'
                            ? 'bg-green-500 text-white'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                    ]">
                        สรุปผล
                    </button>
                </div>

                <!-- Loading -->
                <div v-if="loading" class="flex justify-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#184c36]"></div>
                </div>

                <!-- ไม่มีข้อมูล -->
                <div v-else-if="filteredOrders.length === 0" class="text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                    </svg>
                    <p class="text-gray-500 text-lg">ไม่มีรายการจองคิว</p>
                </div>

                <!-- รายการออเดอร์ -->
                <div v-else class="space-y-6">
                    <div v-for="order in filteredOrders" :key="order._id"
                        class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

                        <!-- Header -->
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 bg-[#b6e388] rounded-full flex items-center justify-center">
                                        <svg class="w-6 h-6 text-[#184c36]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-lg text-[#184c36]">ออเดอร์ #{{ order._id.slice(-8)
                                            }}
                                        </h3>
                                        <p class="text-sm text-gray-600">{{ formatDate(order.booking_datetime) }}</p>
                                    </div>
                                </div>
                                <div class="text-center sm:text-right">
                                    <span :class="getStatusClass(order.status)"
                                        class="px-3 py-1 rounded-full text-sm font-medium">
                                        {{ order.status }}
                                    </span>
                                    <p class="text-lg font-bold text-[#184c36] mt-1">฿{{
                                        order.total_price?.toLocaleString()
                                        }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-6">
                            <!-- ข้อมูลร้านค้า -->
                            <div class="mb-4">
                                <h4 class="font-semibold text-[#184c36] mb-2">ร้านค้า</h4>
                                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div class="w-10 h-10 bg-[#b6e388] rounded-full flex items-center justify-center">
                                        <svg class="w-5 h-5 text-[#184c36]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="font-medium text-[#184c36]">{{ order.store_id?.companyName ||
                                            'ร้านค้า' }}
                                        </p>
                                        <p class="text-sm text-gray-600">{{ order.store_id?.companyAddress + ' ' + 'ต.'
                                            +
                                            order.store_id?.companySubdistrict + ' ' + 'อ.' +
                                            order.store_id?.companyDistrict + ' ' + 'จ.' +
                                            order.store_id?.companyProvince +
                                            ' ' + order.store_id?.companyPostalCode || 'ที่อยู่ร้านค้า' }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- รายการสินค้า -->
                            <div class="mb-4">
                                <h4 class="font-semibold text-[#184c36] mb-2">รายการสินค้า</h4>
                                <div v-if="order.order_items && order.order_items.length > 0" class="space-y-2">
                                    <div v-for="item in order.order_items" :key="item._id"
                                        class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p class="font-medium text-[#184c36]">{{ item.product_id?.productId?.name ||
                                                'สินค้า' }}
                                            </p>
                                            <p class="text-sm text-gray-600">{{ item.amount }} กิโลกรัม × ฿{{
                                                item.unit_price }}/กก.</p>
                                        </div>
                                        <p class="font-semibold text-[#184c36]">฿{{ item.subtotal?.toLocaleString() }}
                                        </p>
                                    </div>
                                </div>
                                <div v-else class="text-center py-4 text-gray-500">
                                    ไม่มีรายการสินค้า
                                </div>
                            </div>

                            <!-- รูปภาพ -->
                            <div v-if="order.order_images && order.order_images.length > 0" class="mb-4">
                                <h4 class="font-semibold text-[#184c36] mb-2">รูปภาพ</h4>
                                <div class="flex gap-2 overflow-x-auto">
                                    <div v-for="image in order.order_images" :key="image._id"
                                        class="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                        <img :src="image.url" :alt="image.type" class="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <!-- ข้อมูลเพิ่มเติม -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 class="font-semibold text-[#184c36] mb-2">ข้อมูลการจัดส่ง</h4>
                                    <p class="text-sm text-gray-600">ประเภท: {{ order.delivery_type }}</p>
                                    <p v-if="order.address" class="text-sm text-gray-600">ที่อยู่: {{ order.address }}
                                    </p>
                                    <p v-if="order.pickup_fee" class="text-sm text-gray-600">ค่าจัดส่ง: ฿{{
                                        order.pickup_fee
                                        }}</p>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-[#184c36] mb-2">ข้อมูลการจอง</h4>
                                    <p class="text-sm text-gray-600">วันที่: {{ formatDate(order.booking_datetime) }}
                                    </p>
                                    <p class="text-sm text-gray-600">เวลา: {{ formatTime(order.booking_datetime) }}</p>
                                    <p v-if="order.notes" class="text-sm text-gray-600">หมายเหตุ: {{ order.notes }}</p>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                                <button @click="viewOrderDetail(order._id)"
                                    class="bg-[#184c36] hover:bg-[#145029] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    ดูรายละเอียด
                                </button>

                                <button v-if="order.status === 'รอยืนยัน'" @click="cancelOrder(order._id)"
                                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    ยกเลิกออเดอร์
                                </button>

                                <button @click="contactStore(order.store_id)"
                                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    ติดต่อร้านค้า
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                                Order ID: {{ selectedOrder.orderId || selectedOrder._id.slice(-8) ||
                                                selectedOrder?._id?.slice(-8) }}
                                            </h2>
                                            <p class="text-[#666]">วันที่จองคิว: {{
                                                formatThaiDate(selectedOrder.booking_datetime) }}
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
                                        <div v-if="loadingOrderDetail"
                                            class="flex flex-col items-center justify-center py-16">
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
                                                                            {{ item.product_id?.productId?.name ||
                                                                                'ไม่ระบุ'
                                                                            }}
                                                                        </p>
                                                                        <p class="text-sm text-gray-500">
                                                                            {{ item.product_id?.productId?.description
                                                                                ||
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
                                                                ฿{{ formatNumber((item.unit_price || 0) * (item.amount
                                                                    ||
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
                                                                <table
                                                                    class="w-full text-sm mt-2 border border-gray-200">
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
                                                                                ฿{{ formatNumber(item.unit_price || 0)
                                                                                }}
                                                                            </td>
                                                                            <td
                                                                                class="px-2 py-1 border border-gray-200 text-[#184c36]">
                                                                                {{ item.amount || 0 }}
                                                                            </td>
                                                                            <td
                                                                                class="px-2 py-1 border border-gray-200 text-[#184c36] font-semibold">
                                                                                ฿{{ formatNumber((item.unit_price || 0)
                                                                                    *
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
                                <div v-if="selectedOrder.order_images && selectedOrder.order_images.length"
                                    class="mt-4">
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
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import BarNoMenu from '../../components/BarNoMenu.vue';
import Footer from '../../components/Footer.vue';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const orders = ref([]);
const loading = ref(true);
const currentFilter = ref('');

const showDetailsModal = ref(false)
const selectedOrder = ref(null)
const loadingOrderDetail = ref(false)

const user = JSON.parse(localStorage.getItem('user') || '{}');
const userId = ref(user.id || user._id);

// กรองออเดอร์ตามสถานะ
const filteredOrders = computed(() => {
    if (!currentFilter.value) return orders.value;

    return orders.value.filter(order => {
        switch (currentFilter.value) {
            case 'pending':
                return order.status === 'รอยืนยัน';
            case 'confirmed':
                return order.status === 'ยืนยันแล้ว';
            case 'processing':
                return order.status === 'กำลังดำเนินการ';
            case 'completed':
                return order.status === 'เสร็จสิ้น' || order.status === 'ยกเลิก';
            default:
                return true;
        }
    });
});

// โหลดข้อมูลออเดอร์
const loadOrders = async () => {
    try {
        loading.value = true;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/member/${userId.value}`);
        if (response.data.success) {
            orders.value = response.data.orders || [];
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        await Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถโหลดข้อมูลออเดอร์ได้',
            confirmButtonText: 'ตกลง'
        });
    } finally {
        loading.value = false;
    }
};

// กรองตามสถานะ
const filterByStatus = (status) => {
    currentFilter.value = status;
};

// ยกเลิกออเดอร์
const cancelOrder = async (orderId) => {
    try {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'ยืนยันการยกเลิก',
            input: 'text',
            inputLabel: 'ระบุเหตุผลการยกเลิก (ถ้ามี)',
            inputPlaceholder: 'เหตุผลการยกเลิก...',
            showCancelButton: true,
            confirmButtonText: 'ยกเลิกออเดอร์',
            cancelButtonText: 'ไม่',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        });

        if (result.isConfirmed) {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/orders/${orderId}/cancel`,
                {
                    cancel_reason: result.value || '' // ส่งไปให้ backend
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.data.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'ยกเลิกออเดอร์สำเร็จ',
                    confirmButtonText: 'ตกลง'
                });
                await loadOrders(); // โหลดข้อมูลใหม่
            }
        }
    } catch (error) {
        console.error('Error canceling order:', error);
        await Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถยกเลิกออเดอร์ได้',
            confirmButtonText: 'ตกลง'
        });
    }
};

// ติดต่อร้านค้า
const contactStore = (store) => {
    if (store?.companyPhone) {
        window.open(`tel:${store.companyPhone}`, '_blank');
    } else {
        Swal.fire({
            icon: 'info',
            title: 'ไม่มีข้อมูลติดต่อ',
            text: 'ร้านค้านี้ยังไม่มีข้อมูลติดต่อ',
            confirmButtonText: 'ตกลง'
        });
    }
};

// จัดรูปแบบวันที่
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// จัดรูปแบบเวลา
const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

// สีของสถานะ
const getStatusClass = (status) => {
    switch (status) {
        case 'รอยืนยัน':
            return 'bg-yellow-100 text-yellow-800';
        case 'ยืนยันแล้ว':
            return 'bg-blue-100 text-blue-800';
        case 'กำลังดำเนินการ':
            return 'bg-purple-100 text-purple-800';
        case 'เสร็จสิ้น':
            return 'bg-green-100 text-green-800';
        case 'ยกเลิก':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

onMounted(async () => {
    // ตั้งค่าฟิลเตอร์จาก URL parameter
    const statusParam = route.query.status;
    if (statusParam) {
        currentFilter.value = statusParam;
    }

    await loadOrders();
});

function formatThaiDate(dateStr) {
    return new Date(dateStr).toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ฟอร์แมตราคา
function formatNumber(num) {
    return Number(num).toLocaleString()
}

function getStatusText(status) {
    switch (status) {
        case 'รอยืนยัน':
            return 'รอยืนยัน';
        case 'ยืนยันแล้ว':
            return 'ยืนยันแล้ว';
        case 'กำลังดำเนินการ':
            return 'กำลังดำเนินการ';
        case 'ยกเลิก':
            return 'ยกเลิก';
        case 'เสร็จสิ้น':
            return 'เสร็จสิ้น';
        default:
            return 'สถานะไม่ทราบ';
    }
}

const getFullAddress = (store) => {
    if (!store) {
        return 'ไม่ระบุ';
    }
    const { companyAddress, companySubdistrict, companyDistrict, companyProvince, companyPostalCode } = store;
    return `${companyAddress || ''} ต. ${companySubdistrict || ''} อ. ${companyDistrict || ''} จ. ${companyProvince || ''} ${companyPostalCode || ''}`.trim();
};

async function viewOrderDetail(orderId) {
    try {
        showDetailsModal.value = true
        loadingOrderDetail.value = true

        const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`)
        const data = await res.json()
        // console.log('Order Detail:', data)

        selectedOrder.value = data.data || null
        console.log('Selected Order:', selectedOrder.value)
    } catch (error) {
        console.error('ไม่สามารถโหลดข้อมูลออเดอร์:', error)
    } finally {
        loadingOrderDetail.value = false
    }
}
</script>