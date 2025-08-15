<template>
  <div class="max-w-xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">สร้างใบขาย (Sell Order)</h2>

    <form @submit.prevent="submitSellOrder">
      <div class="mb-3">
        <label class="block mb-1">ร้านค้า (Store ID)</label>
        <input v-model="form.storeId" type="text" class="input" required />
      </div>

      <div class="mb-3">
        <label class="block mb-1">พนักงานขาย (Cashier ID)</label>
        <input v-model="form.cashierId" type="text" class="input" required />
      </div>

      <div class="mb-3">
        <label class="block mb-1">วิธีชำระเงิน</label>
        <select v-model="form.paymentMethod" class="input">
          <option value="cash">เงินสด</option>
          <option value="transfer">โอนเงิน</option>
          <option value="other">อื่น ๆ</option>
        </select>
      </div>

      <div>
        <h3 class="font-semibold mb-2">รายการสินค้า</h3>
        <div v-for="(item, index) in form.items" :key="index" class="mb-4 border p-3 rounded">
          <label>ProductPartner ID:</label>
          <input v-model="item.productPartnerId" type="text" class="input mb-1" required />

          <label>จำนวน (Quantity):</label>
          <input v-model.number="item.quantity" type="number" min="0" step="0.01" class="input mb-1" required />

          <label>ราคาต่อหน่วย (Unit Price):</label>
          <input v-model.number="item.unitPrice" type="number" min="0" step="0.01" class="input mb-1" required />

          <button type="button" class="text-red-500" @click="removeItem(index)">ลบรายการ</button>
        </div>

        <button type="button" @click="addItem" class="mt-2 px-4 py-2 bg-green-500 text-white rounded">เพิ่มสินค้า</button>
      </div>

      <button type="submit" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded">บันทึกใบขาย</button>
    </form>

    <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';

const form = reactive({
  storeId: '',
  cashierId: '',
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

async function submitSellOrder() {
  message.value = '';
  error.value = '';

  try {
    const res = await axios.post('/api/sell-orders', form);
    message.value = 'บันทึกใบขายสำเร็จ #' + res.data.sellOrder._id;
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
