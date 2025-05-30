<script setup lang="ts">
import type { TLanguage } from "~/types/TLanguage";

definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});

const loading = ref<boolean>(false);

const languages = ref<TLanguage[]>([]);

async function getLanguages() {
  loading.value = true;
  try {
    const data = await axiosInstance.get("/admin/courses/languages");
    languages.value = data.data;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } catch (error: any) {
    if (error.response.data.message) {
      console.log(error.response.data.message);
      useSweetAlert("error", "Error", error.response.data.message);
      loading.value = false;
    }
  }
}

async function onDelete(id: number) {
  const agree = await useSweetAlertConfirm(
    "Confirm",
    "Are you sure you want to delete this language?"
  );
  if (agree) {
    loading.value = true;
    try {
      const language_name = languages.value.find((lang) => lang.id === id)?.name;
      await axiosInstance.delete(`/admin/courses/languages/${id}`);
      useSweetAlert("success", "Success", `${language_name} deleted successfully`);
      await getLanguages();
      loading.value = false;
    } catch (error: any) {
      if (error.response.data.message) {
        useSweetAlert("error", "Error", error.response.data.message);
      }
      loading.value = false;
    }
  }
}

onMounted(() => {
  getLanguages();
});
</script>

<template>
  <div class="page-body">
    <div class="container-xl">
      <UiCard
        title="Languages"
        link_url="/admin/courses/languages/create"
        link_text="Create Language"
      >
        <FormTable :headers="['Id', 'Name', 'Slug', 'Action']">
          <UiLoading v-if="loading" />
          <template v-else>
            <tr v-for="lang in languages" :key="lang.id">
              <td>{{ lang.id }}</td>
              <td>{{ lang.name }}</td>
              <td>{{ lang.slug }}</td>
              <td>
                <div class="d-flex gap-2">
                  <nuxt-link
                    :to="`/admin/courses/languages/edit/${lang.id}`"
                    class="fa fa-edit text-primary"
                  >
                  </nuxt-link>
                  <span
                    @click="onDelete(lang.id)"
                    class="fa fa-trash text-danger cursor-pointer"
                  ></span>
                </div>
              </td>
            </tr>
          </template>
        </FormTable>
      </UiCard>
    </div>
  </div>
</template>
