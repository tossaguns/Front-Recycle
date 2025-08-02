<template>
    <BarNoMenu />
    <div class="min-h-screen bg-gray-50">
        <!-- Back Navigation Header -->
        <div class="bg-[#106154] py-4 px-6">
            <div class="flex items-center">
                <button @click="goBackToHomePartner" class="flex items-center text-white hover:text-gray-200 transition-colors">
                    <ChevronLeftIcon class="w-6 h-6 mr-2" />
                    <span class="text-lg font-medium">กิจกรรม</span>
                </button>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-4 py-8 max-w-7xl">
            <!-- Header Section -->
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">ข่าวสารและกิจกรรม วันนี้</h1>
                    <p class="text-gray-600">ณ วันที่ {{ currentDate }}</p>
                </div>
                <button class="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                    ดูเพิ่มเติม →
                </button>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column: Featured Article -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <!-- Featured Image -->
                        <div class="w-full h-64 bg-gradient-to-br from-green-400 to-blue-500 relative">
                            <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex space-x-2 mb-2">
                                    <span class="bg-white bg-opacity-90 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">
                                        ข่าวล่าสุด
                                    </span>
                                    <span class="bg-white bg-opacity-90 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">
                                        วันที่ 25 กรกฎาคม 2568
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Article Content -->
                        <div class="p-6">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">
                                การควบคุมพลังแห่งดวงอาทิตย์ : สำรวจโลกแห่งพลังงานแสงอาทิตย์
                            </h2>
                            <p class="text-gray-600 mb-6 leading-relaxed">
                                เซลล์แสงอาทิตย์ทำงานโดยการแปลงพลังงานแสงอาทิตย์เป็นพลังงานไฟฟ้า โลหะที่ใช้ในแผงโซลาร์เซลล์ช่วยในการจับพลังงานแสงอาทิตย์และแปลงเป็นไฟฟ้าได้อย่างมีประสิทธิภาพ
                            </p>
                            
                            <!-- Author Info -->
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                                <div>
                                    <p class="font-medium text-gray-800">เจมี่ จอห์น</p>
                                    <p class="text-sm text-gray-500">เขียนเมื่อ 25/07/2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Smaller Articles -->
                <div class="space-y-6">
                    <!-- Article 1 -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="flex">
                            <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                            <div class="p-4 flex-1">
                                <h3 class="font-semibold text-gray-800 mb-2 text-sm">
                                    การควบคุมพลังงานลม : สำรวจโลกแห่งพลังงานลม
                                </h3>
                                <div class="flex items-center">
                                    <div class="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                                    <div>
                                        <p class="text-xs font-medium text-gray-800">เจมี่ จอห์น</p>
                                        <p class="text-xs text-gray-500">เขียนเมื่อ 25/07/2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Article 2 -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="flex">
                            <div class="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 flex-shrink-0"></div>
                            <div class="p-4 flex-1">
                                <h3 class="font-semibold text-gray-800 mb-2 text-sm">
                                    พลังงานจากธรรมชาติ : สำรวจโลกแห่งธรรมชาติ
                                </h3>
                                <div class="flex items-center">
                                    <div class="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                                    <div>
                                        <p class="text-xs font-medium text-gray-800">เจมี่ จอหัน</p>
                                        <p class="text-xs text-gray-500">เขียนเมื่อ 25/07/2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Article 3 -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="flex">
                            <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 flex-shrink-0"></div>
                            <div class="p-4 flex-1">
                                <h3 class="font-semibold text-gray-800 mb-2 text-sm">
                                    พลังงานจากธรรมชาติ : สำรวจโลกแห่งธรรมชาติ
                                </h3>
                                <div class="flex items-center">
                                    <div class="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                                    <div>
                                        <p class="text-xs font-medium text-gray-800">เจมี่ จอหิน</p>
                                        <p class="text-xs text-gray-500">เขียนเมื่อ 25/07/2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BarNoMenu from '../../components/BarNoMenu.vue';
import { ChevronLeftIcon } from '../../icons';

const router = useRouter();
const currentDate = ref('');

onMounted(() => {
    // Set current date in Thai format
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    currentDate.value = `${day}/${month}/${year}`;
});

function goBackToHomePartner() {
    router.push('/homepartner');
}
</script>