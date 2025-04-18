<script setup lang="ts">
import { StyleguideCodeProps } from "#components";
import type { TCodeProps } from "~/types/TCodeProps";

const code_props: TCodeProps[] = [
  { key: "type", value: "string", default: "text", values: ["text", "email", "password"] },
  { key: "label", value: "string" },
  { key: "placeholder", value: "string" },
  { key: "errors", value: "string[]" },
  { key: "value", value: "string | number", required: true },
  { key: "name", value: "string", required: true },
  { key: "fontawesome", value: "boolean", default: false },
];

const code = `
const title = ref("");
const errors = ref();

<InputComponent
  label="Name"
  v-model:value="title"
  type="text"
  name="title"
  :errors="errors ? errors.title : []"
/>

<InputComponent
  label="Password"
  v-model:value="title"
  type="password"
  name="title"
  :errors="errors ? errors.title : []"
/>
`;

const input_copy = `
<InputComponent
  label="Name"
  v-model:value="title"
  type="text"
  name="title"
  :errors="errors ? errors.title : []"
/>
`;

const title = ref("title");
const errors = ref();

const source = `
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  errors: {
    type: Array,
    required: false,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  fontawesome: {
    type: Boolean,
    required: false,
  },
});

const propsValue = computed(() => {
  return props.value;
});

const emits = defineEmits(["update:value"]);
const input_type = ref(props.type);

function changeHandler(e) {
  let value = e.target.value;
  emits("update:value", value);
}

function togglePassword() {
  if (props.type === "password") {
    input_type.value = input_type.value === "password" ? "text" : "password";
  }
}


  <div class="input" :class="[{ 'input--password': type === 'password' }]">
    <label v-if="label">{{ label }}</label>
    <input
      :type="input_type"
      :placeholder="placeholder !== undefined ? placeholder : null"
      :value="propsValue"
      :name="name"
      @input="changeHandler"
      :class="{ 'input--error': errors && errors.length }"
    />
    <i
      v-if="type === 'password'"
      class="fa fa-eye"
      :class="[{ disabled: input_type === 'password' }]"
      @click="togglePassword"
    ></i>
    <div
      v-if="errors && errors.length"
      class="input__message input__message--error"
    >
      <p class="text-danger" v-for="(error, index) in errors" :key="index">
        {{ error }}
      </p>
    </div>
    <a
      href="https://fontawesome.com/search?q=home&o=r&ic=free"
      target="_blank"
      v-if="fontawesome"
      class="mt-2 text-sm fs-6 gap-2 d-flex align-items-center"
    >
      <i class="fa fa-home"></i>
      <span class="fs-6 text-primary fst-italic"
        >https://fontawesome.com/search?q=home&o=r&ic=free</span
      >
    </a>
  </div>

.input {
  margin-bottom: 1.6rem;
}
.input--error {
  border-color: red !important;
}
.input {
  position: relative;
}
/* .input label { */
/*   margin-bottom: 0.8rem; */
/* } */
.input .fa-eye {
  position: absolute;
  right: 10px;
  top: 2.5rem;
  cursor: pointer;
}
.input .fa-eye.disabled {
  opacity: 0.5;
}
`;
</script>

<template>
  <div class="buttons">
    <StyleguidePreviewCode
      @emit_click="useCopyToClipboard(input_copy)"
      :show_copy_btn="true"
      :show_props="true"
    >
      <template #default>
        <InputComponent
          label="Name"
          v-model:value="title"
          type="text"
          name="title"
          :errors="errors ? errors.title : []"
        />
        <InputComponent
          label="Password"
          v-model:value="title"
          type="password"
          name="title"
          :errors="errors ? errors.title : []"
        />
      </template>
      <template #code_props>
        <StyleguideCodeProps :code_props="code_props" />
      </template>
      <template #code>
        {{ code }}
      </template>
      <template #source>
        {{ source }}
      </template>
    </StyleguidePreviewCode>
  </div>
</template>
