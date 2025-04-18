<script setup lang="ts">
import { useUserStore } from "~/store/useUserStore";
definePageMeta({
  middleware: ["student"],
  layout: "student",
});
const user_store = useUserStore();
const { cart } = storeToRefs(user_store);

async function deleteCartItem(id: number) {
  const agree = await useSweetAlertConfirm(
    "Are you sure?",
    "You won't be able to revert this!"
  );
  if (!agree) return;
  try {
    await axiosInstance.delete(`/cart/${id}`);
    await useGetCart();
    useSweetAlert("success", "Item removed from cart");
  } catch (error) {
    handleAxiosError(error);
  }
}
</script>
<template>
  <div class="cart">
    <UiBreadcrumb image="/images/breadcrumb_bg.jpg" title="Shopping Cart" />
    <section class="p-6 wsus__cart_view mt_120 xs_mt_100 pb_120 xs_pb_100">
      <div class="container">
        <div class="row">
          <div class="col-12 wow fadeInUp">
            <div class="cart_list">
              <div class="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th class="pro_img">Product</th>
                      <th class="pro_name"></th>
                      <th class="pro_tk">Price</th>
                      <th class="pro_tk">Instructor</th>
                      <th class="pro_icon">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="cart && cart.length">
                      <tr v-for="item in cart" :key="item.id">
                        <td>
                          <img
                            :src="item.course.thumbnail"
                            :width="80"
                            alt="product"
                          />
                        </td>
                        <td class="pro_name">
                          <nuxt-link :to="`/courses/${item.course.slug}`">{{
                            item.course.title
                          }}</nuxt-link>
                        </td>
                        <td class="pro_tk">
                          <h6 class="d-flex gap-1">
                            <span v-if="item.course.price" class="text-decoration-line-through">${{ item.course.price }}</span>
                            <span v-if="item.course.discount" style="color: black; font-weight: bold;">${{ item.course.discount }}</span>
                          </h6>
                        </td>
                        <td>
                          <div class="p-4 d-flex align-items-center gap-4">
                            <div style="flex: 0 0 50px">
                              <img
                                :src="item.course.instructor.image"
                                class="img-fluid rounded-circle"
                                alt="instructor"
                              />
                            </div>
                            <h6>{{ item.course.instructor.name }}</h6>
                          </div>
                        </td>
                        <td class="pro_icon">
                          <a @click.pevent="deleteCartItem(item.id)" href="#"
                            ><i class="fa-solid fa-trash-can text-danger"></i></a>
                        </td>
                      </tr>
                    </template>
                    <tr v-else>
                      <td colspan="6" class="text-center">
                        <h4 class="text-danger p-8">Your cart is empty</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-between" v-if="cart && cart.length">
          <div
            class="col-xxl-7 col-md-5 col-lg-6 wow fadeInUp"
            style="visibility: visible; animation-name: fadeInUp"
          >
            <div class="continue_shopping">
              <nuxt-link to="/courses" class="common_btn">continue shopping</nuxt-link>
            </div>
          </div>
          <div
            class="col-xxl-4 col-md-7 col-lg-6 wow fadeInUp"
            style="visibility: visible; animation-name: fadeInUp"
          >
            <div class="total_price">
              <h4 v-if="cart">
                total<span>${{ useCartTotal(cart) }}.00</span>
              </h4>
              <div class="subtotal_area">
                <h5 v-if="cart">
                  Subtotal<span>${{ useCartTotal(cart) }}.00</span>
                </h5>
                <nuxt-link to="/checkout" class="common_btn"
                  >proceed checkout</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss"></style>
