<script setup>
// Import Lucide icons directly for better control and bundling
import { Facebook, Twitter, Github, Linkedin, Mail } from 'lucide-vue-next';

</script>

<template>
  <footer class="bg-[#184c36] relative text-white pt-12 pb-6 px-4 overflow-hidden">
    <!-- Wave background -->
    <div class="absolute left-0 bottom-0 w-full h-32 pointer-events-none select-none z-0">
      <svg viewBox="0 0 1440 320" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0e2d1e" fill-opacity="1"
          d="M0,224L60,202.7C120,181,240,139,360,133.3C480,128,600,160,720,186.7C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
        </path>
      </svg>
    </div>
    <div class="max-w-full mx-5 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-2 sm:gap-2 xs:gap-1">
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8 md:mb-0">
          <div class="bg-[#b6e388] rounded-xl w-12 h-12 flex items-center justify-center mb-4">
            <img src="/vite.svg" alt="logo" class="w-7 h-7" />
          </div>
        </div>
        <!-- เมนู -->
        <div class="flex flex-col mb-8 md:mb-0 items-center md:items-start">
          <span class="font-bold mb-2">เมนู</span>
          <ul class="space-y-1 text-sm">
            <li>หน้าหลัก</li>
            <li>ราคา - ซื้อขาย</li>
            <li>หมวดหมู่สินค้า</li>
            <li>ร้านค้า</li>
            <li>การตั้งค่าบัญชี</li>
          </ul>
        </div>
        <!-- เกี่ยวกับเว็บไซต์ -->
        <div class="flex flex-col mb-8 md:mb-0 items-center md:items-start">
          <span class="font-bold mb-2">เกี่ยวกับเว็บไซต์</span>
          <ul class="space-y-1 text-sm">
            <li>จองคิว</li>
            <li>ข่าวสารและกิจกรรม</li>
          </ul>
        </div>
        <!-- ติดต่อ -->
        <div class="flex flex-col items-center md:items-start">
          <span class="font-bold mb-2">ติดต่อ</span>
          <ul class="space-y-1 text-sm mb-4">
            <li>063-1427649</li>
            <li>cstonlineweb@gmail.com</li>
          </ul>
        </div>

        <!-- Social -->
        <div class="flex flex-col gap-3 sm:gap-2 xs:gap-1 w-full max-w-xs mx-auto items-start custom-center-925-768">
          <a href="#"
            class="flex items-center gap-3 sm:gap-2 xs:gap-1 bg-[#184c36] rounded-full px-4 py-2 sm:px-3 sm:py-1.5 xs:px-2 xs:py-1 shadow hover:bg-[#0e2d1e] transition w-fit">
            <span class="bg-white rounded-full p-1 sm:p-0.5 xs:p-0.5">
              <Facebook class="w-5 h-5 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5 text-[#184c36]" />
            </span>
            <span class="text-white font-medium text-base sm:text-sm xs:text-xs hide-on-925-768-custom">Follow us on
              Facebook</span>
          </a>
          <a href="#"
            class="flex items-center gap-3 sm:gap-2 xs:gap-1 bg-[#184c36] rounded-full px-4 py-2 sm:px-3 sm:py-1.5 xs:px-2 xs:py-1 shadow hover:bg-[#0e2d1e] transition w-fit">
            <span class="bg-white rounded-full p-1 sm:p-0.5 xs:p-0.5">
              <svg class="w-5 h-5 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5 text-[#184c36]" fill="none" stroke="currentColor"
                stroke-width="2" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </span>
            <span class="text-white font-medium text-base sm:text-sm xs:text-xs hide-on-925-768-custom">Follow us on
              Instagram</span>
          </a>
          <a href="#"
            class="flex items-center gap-3 sm:gap-2 xs:gap-1 bg-[#184c36] rounded-full px-4 py-2 sm:px-3 sm:py-1.5 xs:px-2 xs:py-1 shadow hover:bg-[#0e2d1e] transition w-fit">
            <span class="bg-white rounded-full p-1 sm:p-0.5 xs:p-0.5">
              <!-- Black & white Line icon SVG -->
              <svg class="w-5 h-5 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5" viewBox="0 0 48 48" fill="none">
                <rect x="4" y="4" width="40" height="40" rx="12" fill="white" stroke="black" stroke-width="2" />
                <path
                  d="M24 14c-7.18 0-13 4.03-13 9 0 3.13 2.68 5.86 6.75 7.44l-1.06 3.88a1 1 0 0 0 1.44 1.13l4.6-2.3c.41.03.83.05 1.27.05 7.18 0 13-4.03 13-9s-5.82-9-13-9z"
                  fill="none" stroke="black" stroke-width="2" />
                <path d="M17 24h2m2 0h2m2 0h2" stroke="black" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <span class="text-white font-medium text-base sm:text-sm xs:text-xs hide-on-925-768-custom">Follow us on
              Line</span>
          </a>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row justify-end items-center mt-10 mr-5 pt-6 border-t border-[#2e5c47] text-xs text-[#b6e388]">
        <span>&copy; 2024 Toriew. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.hide-on-925-768-custom {
  display: inline;
}

@media (max-width: 925px) and (min-width: 768px) {
  .hide-on-925-768-custom {
    display: none !important;
  }

  .custom-center-925-768 {
    display: flex;
    align-items: center;
  }
}
</style>