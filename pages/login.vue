<script setup lang="ts">

definePageMeta({
  layout: "auth",
  middleware: ["instructor"]
});

const active_tab = ref(0);
</script>

<template>
  <div class="login">
    <section class="wsus__sign_in">
      <div class="row align-items-center">
        <div class="col-xxl-5 col-xl-6 col-lg-6 wow fadeInLeft">
          <div class="wsus__sign_img">
            <img
              src="/admin/images/login_img_1.jpg"
              alt="login"
              class="img-fluid"
            />
            <nuxt-link to="/">
              <img
                src="/admin/images/logo.png"
                alt="EduCore"
                class="img-fluid"
              />
            </nuxt-link>
          </div>
        </div>
        <div
          class="col-xxl-4 col-xl-5 col-lg-6 col-md-9 m-auto wow fadeInRight"
        >
          <div class="wsus__sign_form_area">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li @click="active_tab = 0" class="nav-item" role="presentation">
                <button :class="{ active: active_tab === 0 }" class="nav-link">
                  Student
                </button>
              </li>
              <li @click="active_tab = 1" class="nav-item" role="presentation">
                <button :class="{ active: active_tab === 1 }" class="nav-link">
                  Instructor
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" v-if="active_tab === 0">
                <FormLogin title="Student" role="student" />
              </div>
              <div class="tab-pane fade show active" v-if="active_tab === 1">
                <FormLogin title="Instructor" role="instructor" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <nuxt-link class="back_btn" to="/">Back to Home</nuxt-link>
    </section>
  </div>
</template>
