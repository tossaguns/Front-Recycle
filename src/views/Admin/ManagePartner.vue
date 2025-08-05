<template>
    <div class="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]">
        <!-- Admin Navigation Bar -->
        <BarAdmin />

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Header Section -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-[#184c36] mb-2">จัดการร้านค้า</h1>
                <p class="text-[#666] text-lg">อนุมัติหรือปฏิเสธการสมัครของร้านค้า</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-[#666]">ร้านค้าทั้งหมด</p>
                            <p class="text-2xl font-bold text-[#184c36]">{{ stats.total || 0 }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-[#666]">รออนุมัติ</p>
                            <p class="text-2xl font-bold text-[#184c36]">{{ stats.pending || 0 }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-[#666]">อนุมัติแล้ว</p>
                            <p class="text-2xl font-bold text-[#184c36]">{{ stats.approved || 0 }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-[#666]">ปฏิเสธแล้ว</p>
                            <p class="text-2xl font-bold text-[#184c36]">{{ stats.rejected || 0 }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Search and Filter Section -->
            <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] p-6 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <!-- Search -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-[#184c36] mb-2">ค้นหาร้านค้า</label>
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="ค้นหาตามชื่อร้าน, ชื่อผู้ติดต่อ, เบอร์โทร..."
                                class="w-full px-4 py-2 border border-[#dcdcdc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6e388] focus:border-transparent"
                            />
                            <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <!-- Status Filter -->
                    <div>
                        <label class="block text-sm font-medium text-[#184c36] mb-2">สถานะ</label>
                        <select
                            v-model="statusFilter"
                            class="w-full px-4 py-2 border border-[#dcdcdc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6e388] focus:border-transparent"
                        >
                            <option value="">ทั้งหมด</option>
                            <option value="รอยืนยัน">รออนุมัติ</option>
                            <option value="ยืนยันแล้ว">อนุมัติแล้ว</option>
                            <option value="ยกเลิก">ปฏิเสธแล้ว</option>
                        </select>
                    </div>

                    <!-- Sort -->
                    <div>
                        <label class="block text-sm font-medium text-[#184c36] mb-2">เรียงตาม</label>
                        <select
                            v-model="sortBy"
                            class="w-full px-4 py-2 border border-[#dcdcdc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6e388] focus:border-transparent"
                        >
                            <option value="createdAt">วันที่สมัคร (ใหม่สุด)</option>
                            <option value="companyName">ชื่อร้านค้า (A-Z)</option>
                            <option value="status">สถานะ</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Partners Table -->
            <div class="bg-white rounded-xl shadow-lg border border-[#e6e6e6] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gradient-to-r from-[#2BAC75] to-[#184c36] text-white">
                            <tr>
                                <th class="px-6 py-4 text-left text-sm font-semibold">ร้านค้า</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">ผู้ติดต่อ</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">เบอร์โทร</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">สถานะ</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">วันที่สมัคร</th>
                                <th class="px-6 py-4 text-center text-sm font-semibold">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#f0f0f0]">
                            <tr v-for="partner in filteredPartners" :key="partner._id" class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4">
                                    <div>
                                        <p class="font-semibold text-[#184c36]">{{ partner.companyName }}</p>
                                        <p class="text-sm text-[#666]">{{ partner.companyEmail }}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div>
                                        <p class="font-medium text-[#184c36]">{{ partner.fullName }}</p>
                                        <p class="text-sm text-[#666]">{{ partner.personalEmail }}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-[#184c36]">{{ partner.personalPhone }}</p>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        :class="[
                                            'px-3 py-1 rounded-full text-xs font-medium',
                                            partner.status === 'ยืนยันแล้ว' ? 'bg-green-100 text-green-800' :
                                            partner.status === 'รอยืนยัน' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        ]"
                                    >
                                        {{ partner.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-sm text-[#666]">{{ formatDate(partner.createdAt) }}</p>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center justify-center space-x-2">
                                        <!-- View Details Button -->
                                        <button
                                            @click="viewPartnerDetails(partner)"
                                            class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"
                                        >
                                            ดูรายละเอียด
                                        </button>

                                        <!-- Approve Button (only for pending) -->
                                        <button
                                            v-if="partner.status === 'รอยืนยัน'"
                                            @click="approvePartner(partner._id)"
                                            class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors"
                                        >
                                            อนุมัติ
                                        </button>

                                        <!-- Reject Button (only for pending) -->
                                        <button
                                            v-if="partner.status === 'รอยืนยัน'"
                                            @click="rejectPartner(partner._id)"
                                            class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors"
                                        >
                                            ปฏิเสธ
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Empty State -->
                <div v-if="filteredPartners.length === 0" class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">ไม่พบร้านค้า</h3>
                    <p class="mt-1 text-sm text-gray-500">ไม่มีร้านค้าที่ตรงกับเงื่อนไขการค้นหา</p>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-8 flex items-center justify-between">
                <div class="text-sm text-[#666]">
                    แสดง {{ (currentPage - 1) * itemsPerPage + 1 }} ถึง {{ Math.min(currentPage * itemsPerPage, totalItems) }} จาก {{ totalItems }} รายการ
                </div>
                <div class="flex space-x-2">
                    <button
                        @click="changePage(currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="px-3 py-2 border border-[#dcdcdc] rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        ก่อนหน้า
                    </button>
                    <span class="px-3 py-2 text-sm text-[#184c36]">
                        หน้า {{ currentPage }} จาก {{ totalPages }}
                    </span>
                    <button
                        @click="changePage(currentPage + 1)"
                        :disabled="currentPage === totalPages"
                        class="px-3 py-2 border border-[#dcdcdc] rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        ถัดไป
                    </button>
                </div>
            </div>
        </main>

        <!-- Partner Details Modal -->
        <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-[#184c36]">รายละเอียดร้านค้า</h3>
                        <button @click="showDetailsModal = false" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div v-if="selectedPartner" class="space-y-6">
                        <!-- Company Information -->
                        <div>
                            <h4 class="text-lg font-semibold text-[#184c36] mb-3">ข้อมูลบริษัท</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-[#666]">ชื่อบริษัท</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.companyName }}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-[#666]">เลขประจำตัวผู้เสียภาษี</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.companyTaxId }}</p>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-[#666]">ที่อยู่บริษัท</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.companyAddress }}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-[#666]">เบอร์โทรบริษัท</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.companyPhone }}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-[#666]">อีเมลบริษัท</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.companyEmail }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Personal Information -->
                        <div>
                            <h4 class="text-lg font-semibold text-[#184c36] mb-3">ข้อมูลผู้ติดต่อ</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-[#666]">ชื่อ-นามสกุล</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.fullName }}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-[#666]">เลขบัตรประชาชน</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.personalId }}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-[#666]">เบอร์โทรส่วนตัว</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.personalPhone }}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-[#666]">อีเมลส่วนตัว</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.personalEmail }}</p>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-[#666]">ที่อยู่ส่วนตัว</label>
                                    <p class="text-[#184c36] font-medium">{{ selectedPartner.personalAddress }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Images Section -->
                        <div v-if="hasImages">
                            <h4 class="text-lg font-semibold text-[#184c36] mb-3">รูปภาพประกอบ</h4>
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <!-- ID Card Image -->
                                <div 
                                    v-if="selectedPartner.idCardImage"
                                    class="relative group cursor-pointer"
                                    @click="openImageModal({ url: selectedPartner.idCardImage, type: 'personal_id', name: 'บัตรประชาชน' })"
                                >
                                    <img 
                                        :src="selectedPartner.idCardImage" 
                                        alt="บัตรประชาชน"
                                        class="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-[#b6e388] transition-all duration-300 group-hover:scale-105"
                                    />
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                                        <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                    <div class="mt-2 text-center">
                                        <p class="text-xs text-[#666] font-medium">บัตรประชาชน</p>
                                    </div>
                                </div>

                                <!-- Company Logo -->
                                <div 
                                    v-if="selectedPartner.companyLogo"
                                    class="relative group cursor-pointer"
                                    @click="openImageModal({ url: selectedPartner.companyLogo, type: 'company_logo', name: 'โลโก้บริษัท' })"
                                >
                                    <img 
                                        :src="selectedPartner.companyLogo" 
                                        alt="โลโก้บริษัท"
                                        class="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-[#b6e388] transition-all duration-300 group-hover:scale-105"
                                    />
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                                        <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                    <div class="mt-2 text-center">
                                        <p class="text-xs text-[#666] font-medium">โลโก้บริษัท</p>
                                    </div>
                                </div>

                                <!-- Company Stamp -->
                                <div 
                                    v-if="selectedPartner.companyStampImage"
                                    class="relative group cursor-pointer"
                                    @click="openImageModal({ url: selectedPartner.companyStampImage, type: 'company_stamp', name: 'ตราประทับบริษัท' })"
                                >
                                    <img 
                                        :src="selectedPartner.companyStampImage" 
                                        alt="ตราประทับบริษัท"
                                        class="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-[#b6e388] transition-all duration-300 group-hover:scale-105"
                                    />
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                                        <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                    <div class="mt-2 text-center">
                                        <p class="text-xs text-[#666] font-medium">ตราประทับบริษัท</p>
                                    </div>
                                </div>

                                <!-- Company Documents -->
                                <div 
                                    v-for="(doc, index) in selectedPartner.companyDocuments" 
                                    :key="`doc-${index}`"
                                    class="relative group cursor-pointer"
                                    @click="openImageModal({ url: doc.url, type: 'company_document', name: doc.name || `เอกสาร ${index + 1}` })"
                                >
                                    <img 
                                        :src="doc.url" 
                                        :alt="doc.name || `เอกสาร ${index + 1}`"
                                        class="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-[#b6e388] transition-all duration-300 group-hover:scale-105"
                                    />
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                                        <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                    <div class="mt-2 text-center">
                                        <p class="text-xs text-[#666] font-medium">{{ doc.name || `เอกสาร ${index + 1}` }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Status Information -->
                        <div>
                            <h4 class="text-lg font-semibold text-[#184c36] mb-3">สถานะการสมัคร</h4>
                            <div class="flex items-center space-x-4">
                                <span
                                    :class="[
                                        'px-4 py-2 rounded-lg text-sm font-medium',
                                        selectedPartner.status === 'ยืนยันแล้ว' ? 'bg-green-100 text-green-800' :
                                        selectedPartner.status === 'รอยืนยัน' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    ]"
                                >
                                    {{ selectedPartner.status }}
                                </span>
                                <span class="text-sm text-[#666]">
                                    สมัครเมื่อ: {{ formatDate(selectedPartner.createdAt) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image Full Screen Modal -->
        <div v-if="showImageModal" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60]">
            <div class="relative max-w-4xl max-h-[90vh] mx-4">
                <!-- Close Button -->
                <button 
                    @click="closeImageModal" 
                    class="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
                >
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Image -->
                <img 
                    v-if="selectedImage"
                    :src="selectedImage.url" 
                    :alt="selectedImage.type || 'รูปภาพ'"
                    class="max-w-full max-h-full object-contain rounded-lg"
                />

                <!-- Navigation Buttons -->
                <div v-if="getAllImages().length > 1" class="absolute inset-0 flex items-center justify-between px-4">
                    <button 
                        @click="previousImage"
                        class="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
                        :disabled="getAllImages().findIndex(img => img.url === selectedImage?.url) === 0"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        @click="nextImage"
                        class="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
                        :disabled="getAllImages().findIndex(img => img.url === selectedImage?.url) === getAllImages().length - 1"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <!-- Image Counter -->
                <div v-if="getAllImages().length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                    {{ getAllImages().findIndex(img => img.url === selectedImage?.url) + 1 }} / {{ getAllImages().length }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import BarAdmin from '../../components/BarAdmin.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const router = useRouter();
const authStore = useAuthStore();

// Reactive data
const partners = ref([]);
const stats = ref({});
const searchQuery = ref('');
const statusFilter = ref('');
const sortBy = ref('createdAt');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const showDetailsModal = ref(false);
const selectedPartner = ref(null);
const showImageModal = ref(false);
const selectedImage = ref(null);

// Computed properties
const filteredPartners = computed(() => {
    let filtered = partners.value;

    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(partner => 
            partner.companyName.toLowerCase().includes(query) ||
            partner.fullName.toLowerCase().includes(query) ||
            partner.personalPhone.includes(query) ||
            partner.companyEmail.toLowerCase().includes(query)
        );
    }

    // Status filter
    if (statusFilter.value) {
        filtered = filtered.filter(partner => partner.status === statusFilter.value);
    }

    // Sort
    filtered.sort((a, b) => {
        switch (sortBy.value) {
            case 'createdAt':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'companyName':
                return a.companyName.localeCompare(b.companyName);
            case 'status':
                return a.status.localeCompare(b.status);
            default:
                return 0;
        }
    });

    return filtered;
});

const totalPages = computed(() => {
    return Math.ceil(totalItems.value / itemsPerPage.value);
});

const hasImages = computed(() => {
    if (!selectedPartner.value) return false;
    return selectedPartner.value.idCardImage || 
           selectedPartner.value.companyLogo || 
           selectedPartner.value.companyStampImage || 
           (selectedPartner.value.companyDocuments && selectedPartner.value.companyDocuments.length > 0);
});

// Methods
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const loadPartners = async () => {
    try {
        const token = authStore.token;
        if (!token) {
            throw new Error('ไม่พบ Token');
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/partners`);
        
        if (response.data.success) {
            partners.value = response.data.data;
            totalItems.value = partners.value.length;
            
            // Calculate stats
            stats.value = {
                total: partners.value.length,
                pending: partners.value.filter(p => p.status === 'รอยืนยัน').length,
                approved: partners.value.filter(p => p.status === 'ยืนยันแล้ว').length,
                rejected: partners.value.filter(p => p.status === 'ยกเลิก').length
            };
        }
    } catch (error) {
        console.error('Load partners error:', error);
        
        if (error.response?.status === 401) {
            authStore.logout();
            router.push('/login');
            return;
        }

        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถโหลดข้อมูลร้านค้าได้',
            confirmButtonText: 'ตกลง'
        });
    }
};

const approvePartner = async (partnerId) => {
    try {
        const result = await Swal.fire({
            title: 'ยืนยันการอนุมัติ',
            text: 'คุณต้องการอนุมัติร้านค้านี้หรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'อนุมัติ',
            cancelButtonText: 'ยกเลิก'
        });

        if (result.isConfirmed) {
            const token = authStore.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/partners/${partnerId}/approve`);
            
            if (response.data.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'อนุมัติสำเร็จ',
                    text: 'ร้านค้าถูกอนุมัติเรียบร้อยแล้ว',
                    timer: 1500,
                    showConfirmButton: false
                });
                
                await loadPartners(); // Reload data
            }
        }
    } catch (error) {
        console.error('Approve partner error:', error);
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถอนุมัติร้านค้าได้',
            confirmButtonText: 'ตกลง'
        });
    }
};

const rejectPartner = async (partnerId) => {
    try {
        const result = await Swal.fire({
            title: 'ยืนยันการปฏิเสธ',
            text: 'คุณต้องการปฏิเสธร้านค้านี้หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'ปฏิเสธ',
            cancelButtonText: 'ยกเลิก'
        });

        if (result.isConfirmed) {
            const token = authStore.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/partners/${partnerId}/reject`);
            
            if (response.data.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'ปฏิเสธสำเร็จ',
                    text: 'ร้านค้าถูกปฏิเสธเรียบร้อยแล้ว',
                    timer: 1500,
                    showConfirmButton: false
                });
                
                await loadPartners(); // Reload data
            }
        }
    } catch (error) {
        console.error('Reject partner error:', error);
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถปฏิเสธร้านค้าได้',
            confirmButtonText: 'ตกลง'
        });
    }
};

const viewPartnerDetails = (partner) => {
    selectedPartner.value = partner;
    showDetailsModal.value = true;
};

const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

// Image Modal Functions
const openImageModal = (image) => {
    selectedImage.value = image;
    showImageModal.value = true;
};

const closeImageModal = () => {
    showImageModal.value = false;
    selectedImage.value = null;
};

const getAllImages = () => {
    if (!selectedPartner.value) return [];
    
    const images = [];
    
    if (selectedPartner.value.idCardImage) {
        images.push({ url: selectedPartner.value.idCardImage, type: 'personal_id', name: 'บัตรประชาชน' });
    }
    
    if (selectedPartner.value.companyLogo) {
        images.push({ url: selectedPartner.value.companyLogo, type: 'company_logo', name: 'โลโก้บริษัท' });
    }
    
    if (selectedPartner.value.companyStampImage) {
        images.push({ url: selectedPartner.value.companyStampImage, type: 'company_stamp', name: 'ตราประทับบริษัท' });
    }
    
    if (selectedPartner.value.companyDocuments) {
        selectedPartner.value.companyDocuments.forEach((doc, index) => {
            images.push({ 
                url: doc.url, 
                type: 'company_document', 
                name: doc.name || `เอกสาร ${index + 1}` 
            });
        });
    }
    
    return images;
};

const nextImage = () => {
    const images = getAllImages();
    if (images.length > 1 && selectedImage.value) {
        const currentIndex = images.findIndex(img => img.url === selectedImage.value.url);
        const nextIndex = Math.min(currentIndex + 1, images.length - 1);
        selectedImage.value = images[nextIndex];
    }
};

const previousImage = () => {
    const images = getAllImages();
    if (images.length > 1 && selectedImage.value) {
        const currentIndex = images.findIndex(img => img.url === selectedImage.value.url);
        const prevIndex = Math.max(currentIndex - 1, 0);
        selectedImage.value = images[prevIndex];
    }
};

// Lifecycle
onMounted(() => {
    loadPartners();
    
    // Add keyboard navigation for image modal
    const handleKeydown = (event) => {
        if (showImageModal.value) {
            if (event.key === 'Escape') {
                closeImageModal();
            } else if (event.key === 'ArrowRight') {
                nextImage();
            } else if (event.key === 'ArrowLeft') {
                previousImage();
            }
        }
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    // Cleanup
    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeydown);
    });
});
</script> 