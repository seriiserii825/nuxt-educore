<script setup lang="ts">
import type { TOrder, TOrderResponse } from "~/types/TOrder";

definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
const loading = ref(false);

const orders = ref<TOrderResponse[]>([]);

async function getOrders() {
  loading.value = true;
  try {
    const data = await axiosInstance.get("/admin/orders");
    orders.value = data.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching orders:", error);
    handleAxiosError(error);
    loading.value = false;
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  getOrders();
});
</script>

<template>
  <div class="page-body">
    <div class="container-xl">
      <i class="fa fa-lg fa-cart-plus"></i>
      <UiCard title="Orders">
        <FormTable
          :headers="[
            'Id',
            'Name',
            'Paid Amount',
            'Total Amount',
            'Status',
            'Action',
          ]"
        >
          <UiLoading v-if="loading" />
          <template v-else>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>
                <span>{{ order.customer.name }}</span> |
                <span>{{ order.customer.email }}</span>
              </td>
              <td>{{ order.paid_amount }}</td>
              <td>{{ order.total_amount }}</td>
              <td>
                <UiBadge
                  v-if="order.status == 'pending'"
                  :text="order.status"
                  type="warning"
                />
                <UiBadge
                  v-if="order.status == 'approved'"
                  :text="order.status"
                  type="success"
                />
              </td>
              <td>
                <nuxt-link :to="`/admin/orders/${order.id}`">
                  <i class="fa-solid fa-eye"></i>
                </nuxt-link>
              </td>
            </tr>
          </template>
        </FormTable>
      </UiCard>
    </div>
  </div>
</template>
