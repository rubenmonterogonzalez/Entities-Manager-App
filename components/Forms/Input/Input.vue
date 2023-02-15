<script lang="ts" setup>
import { useField } from "vee-validate";

const props = defineProps({
  label: String,
  name: String,
  rules: String,
  value: String,
  modelValue: [String, Number],
});

const { errorMessage, value } = useField(ref(props.name), props.rules, {
  initialValue: props.modelValue,
  label: props.label || props.name,
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="w-full flex flex-col">
    <label v-if="label" class="label" :for="$attrs.id">{{ label }}</label>
    <input v-model="value" v-bind="$attrs" class="border-[1px] outline-none p-1 text-sm" />
    <div class="mt-1 text-xs text-red-500">
      <span class="text-transparent">.</span>
      <span>
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>
 

 
