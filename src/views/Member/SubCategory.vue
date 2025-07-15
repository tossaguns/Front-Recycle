<template>
    <div class="min-h-screen w-full flex flex-col bg-white">
        <Bar />
        <main class="flex-1 max-w-[1450px] mx-auto w-full px-8 py-10 relative flex flex-col justify-center">
            <h1 class="text-2xl md:text-3xl font-bold mb-4 text-[#222]">หมวดหมู่ย่อยสินค้ารีไซเคิล</h1>
            <!-- ชื่อหมวดหมู่ -->
            <div class="mb-6 flex flex-wrap items-center gap-2">
                <span v-if="categoryName"
                    class="bg-[#b6e388] text-[#184c36] rounded-full px-5 py-2 text-base font-semibold shadow cursor-pointer hover:underline"
                    @click="goToCategory">
                    {{ categoryName }}
                </span>
            </div>
            <!-- ช่องค้นหา -->
            <form class="flex items-center gap-2 mb-8 max-w-md" @submit.prevent>
                <div class="relative flex-1">
                    <input v-model="search" type="text" placeholder="ค้นหาชื่อประเภทย่อยรีไซเคิล..."
                        class="w-full rounded-full border border-[#e6e6e6] pl-10 pr-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6e388]" />
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b6e388] pointer-events-none"
                        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <button type="submit"
                    class="bg-[#b6e388] hover:bg-[#d6f5a6] text-[#184c36] rounded-full px-6 py-2 text-base font-semibold shadow transition">ค้นหา</button>
            </form>
            <!-- Grid -->
            <div v-if="pagedSubCategories.length === 0" class="text-center text-[#888] text-lg mt-10">
                ไม่พบประเภทย่อยในหมวดหมู่นี้</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div v-for="sub in pagedSubCategories" :key="sub._id"
                    class="bg-white rounded-2xl shadow-card flex flex-col overflow-hidden border border-[#e6e6e6]">
                    <div class="h-48 w-full bg-[#eee] flex items-center justify-center overflow-hidden">
                        <img :src="sub.image || '/src/assets/NoPicture.webp'" :alt="sub.name"
                            class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 flex flex-col justify-between p-5">
                        <div class="text-lg font-bold text-[#184c36] mb-4">{{ sub.name }}</div>
                        <button
                            class="mt-auto bg-[#7bb661] hover:bg-[#b6e388] text-white rounded-full px-6 py-2 text-base font-semibold flex items-center gap-2 self-start transition"
                            @click="goToProductCategory(sub)">
                            เพิ่มเติม
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Pagination -->
            <div v-if="pageCount > 1" class="flex justify-end mt-8">
                <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                        class="px-3 py-1 rounded-l-md border border-[#e6e6e6] bg-white text-[#184c36] font-semibold hover:bg-[#b6e388] disabled:opacity-50 disabled:cursor-not-allowed">&lt;</button>
                    <button v-for="page in pageCount" :key="page" @click="goToPage(page)"
                        :class="['px-3 py-1 border-t border-b border-[#e6e6e6] bg-white text-[#184c36] font-semibold', currentPage === page ? 'bg-[#b6e388] text-[#184c36]' : '']">
                        {{ page }}
                    </button>
                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === pageCount"
                        class="px-3 py-1 rounded-r-md border border-[#e6e6e6] bg-white text-[#184c36] font-semibold hover:bg-[#b6e388] disabled:opacity-50 disabled:cursor-not-allowed">&gt;</button>
                </nav>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Bar from '../../components/Bar.vue'
import Footer from '../../components/Footer.vue'

const router = useRouter()
const allSubCategories = ref([])
const currentPage = ref(1)
const pageSize = 8
const search = ref('')

const categoryId = ref(JSON.parse(localStorage.getItem('category') || '{}')._id || '')
const categoryName = ref(JSON.parse(localStorage.getItem('category') || '{}').name || '')

const filteredSubCategories = computed(() => {
    if (!search.value) return allSubCategories.value
    return allSubCategories.value.filter(sub => sub.name.includes(search.value))
})

const pageCount = computed(() => Math.ceil(filteredSubCategories.value.length / pageSize))
const pagedSubCategories = computed(() => filteredSubCategories.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))

function goToPage(page) {
    if (page >= 1 && page <= pageCount.value) {
        currentPage.value = page
        setTimeout(() => {
            const grid = document.querySelector('.grid');
            if (grid) {
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    }
}

function goToProductCategory(sub) {
    localStorage.setItem('subcategory', JSON.stringify({
        _id: sub._id,
        name: sub.name
    }));
    router.push({ path: '/productcategory' })
}

const goToCategory = () => {
    router.push('/category')
}

onMounted(async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories/subcategories/${categoryId.value}`)
        if (Array.isArray(res.data)) {
            allSubCategories.value = res.data
        } else if (res.data && Array.isArray(res.data.subcategories)) {
            allSubCategories.value = res.data.subcategories
        }
    } catch (e) {
        allSubCategories.value = []
    }
})
</script>

<style scoped>
.shadow-card {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
}
</style>
