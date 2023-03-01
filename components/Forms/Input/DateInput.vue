<script lang="ts" setup>
import { useField } from "vee-validate";
import dayjs from 'dayjs';

const props = defineProps({
  label: String,
  name: String,
  rules: String,
  placeholder: String,
  modelValue: [String, Number, Boolean],
});

const emit = defineEmits(['update:modelValue'])

const { errorMessage, value } = useField(ref(props.name), props.rules, {
  initialValue: props.modelValue,
  label: props.label || props.name,
});

const model = computed(() => dayjs(props.modelValue).format('YYYY-MM-DD'))

const onInput = (e) => {
  emit('update:modelValue', dayjs(e.target.value, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss'))
}
</script>

<template>
  <div class="w-full flex flex-col">
    <label v-if="label" class="label" :for="$attrs.id">{{ label }}</label>
    <input
      :value="model"
      @input="onInput"
      type="date"
      class="border-[1px] outline-none p-1 text-sm"
      autocomplete="Off"
      required
      :placeholder="placeholder"
    />
    <div class="mt-1 text-xs text-red-500">
      <span class="text-transparent">.</span>
      <span>
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>
 

 
