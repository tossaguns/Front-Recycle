<template>
  <BarNoMenu :showBackNavigation="true" pageTitle="รับซื้อสินค้า" backRoute="/homepartner" />
  <div class="min-h-screen flex flex-col bg-white relative pt-20 m-10">
    <main class="flex-1 flex flex-col items-center justify-start z-10 relative py-6">
      <!-- หัวข้อ -->
      <h1
        class="font-bold text-xl sm:text-2xl md:text-3xl text-[#184c36] mb-6 bg-gradient-to-r from-[#184c36] to-[#b6e388] bg-clip-text text-transparent"
      >
        สร้างใบรับซื้อ (Buy Order)
      </h1>

      <form
        @submit.prevent="submitBuyOrder"
        class="w-full max-w-7xl bg-white rounded-2xl shadow-xl border-l-4 border-[#b6e388] p-6 space-y-6"
      >
        <!-- ข้อมูลทั่วไป -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label class="block text-sm font-semibold text-[#184c36] mb-1">
              รหัสพนักงาน (Staff ID) <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.staffId"
              type="text"
              class="w-full px-4 py-2 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-[#184c36] mb-1">
              ชื่อพนักงาน (Staff Name)
            </label>
            <input
              v-model="form.staffId"
              type="text"
              class="w-full px-4 py-2 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-[#184c36] mb-1">
              เบอร์โทรศัพท์ลูกค้า (Phone Number)
            </label>
            <input
              v-model="form.customerName"
              type="text"
              class="w-full px-4 py-2 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-[#184c36] mb-1">
              ชื่อลูกค้า
            </label>
            <input
              v-model="form.customerName"
              type="text"
              class="w-full px-4 py-2 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-[#184c36] mb-1">
              วิธีชำระเงิน
            </label>
            <select
              v-model="form.paymentMethod"
              class="w-full px-4 py-2 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none"
            >
              <option value="cash">เงินสด</option>
              <option value="transfer">โอนเงิน</option>
              <option value="other">อื่น ๆ</option>
            </select>
          </div>
        </div>

        <!-- รายการสินค้า -->
        <div class="bg-[#f7faf0] rounded-xl p-4 border border-[#e6f7e6]">
          <h3 class="font-semibold text-[#184c36] mb-3">รายการสินค้า</h3>
          <div
            v-for="(item, index) in form.items"
            :key="index"
            class="mb-4 bg-white p-4 rounded-lg border border-[#e6f7e6] shadow-sm"
          >
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-sm font-semibold text-[#184c36] mb-1">
                  ProductPartner ID <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="item.productPartnerId"
                  type="text"
                  class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[#184c36] mb-1">
                  จำนวน (Quantity) <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="item.quantity"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[#184c36] mb-1">
                  ราคาต่อหน่วย (Unit Price) <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="item.unitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border-2 border-[#e6f7e6] rounded-lg bg-[#f7faf0] focus:border-[#b6e388] focus:ring-2 focus:ring-[#b6e388]/20 outline-none"
                  required
                />
              </div>
            </div>

            <div class="mt-3 text-right">
              <button
                type="button"
                @click="removeItem(index)"
                class="text-red-500 hover:underline text-sm"
              >
                ลบรายการ
              </button>
            </div>
          </div>

          <button
            type="button"
            @click="addItem"
            class="mt-2 px-4 py-2 bg-[#b6e388] text-[#184c36] rounded-lg hover:bg-[#184c36] hover:text-white transition font-semibold"
          >
            + เพิ่มสินค้า
          </button>
        </div>

        <!-- ปุ่มบันทึก -->
        <div class="flex justify-center gap-4">
          <button
            type="submit"
            class="bg-[#b6e388] hover:bg-[#184c36] text-[#184c36] hover:text-white rounded-full px-8 py-2 font-semibold transition"
          >
            บันทึกใบรับซื้อ
          </button>
        </div>

        <!-- ข้อความแจ้งเตือน -->
        <p v-if="message" class="mt-4 text-green-600 text-center">
          {{ message }}
        </p>
        <p v-if="error" class="mt-4 text-red-600 text-center">
          {{ error }}
        </p>
      </form>
    </main>
  </div>
</template>


<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import BarNoMenu from '../../components/BarNoMenu.vue';

const partner = JSON.parse(localStorage.getItem('partner') || '{}');
const partnerId = ref(partner.id || partner._id);

const form = reactive({
  storeId: partnerId.value,
  staffId: '',
  customerName: '',
  paymentMethod: 'cash',
  items: [
    { productPartnerId: '', quantity: 0, unitPrice: 0 }
  ]
});

const message = ref('');
const error = ref('');

function addItem() {
  form.items.push({ productPartnerId: '', quantity: 0, unitPrice: 0 });
}

function removeItem(index) {
  form.items.splice(index, 1);
}

async function submitBuyOrder() {
  message.value = '';
  error.value = '';

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/pos-buyorder/buy-orders`, form);
    message.value = 'บันทึกใบรับซื้อสำเร็จ #' + res.data.buyOrder._id;
    // ล้างฟอร์มถ้าต้องการ
  } catch (err) {
    error.value = err.response?.data?.error || 'เกิดข้อผิดพลาด';
  }
}
</script>

<style>
.input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.4rem 0.6rem;
  border-radius: 0.25rem;
}
</style>
