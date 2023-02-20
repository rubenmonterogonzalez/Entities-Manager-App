import { ref } from 'vue'

export const useToggle = (initValue = false) => {
  const open = ref(initValue);

  const toggle = () => {
    open.value = !open.value;
  };

  return {
    open,
    toggle,
  }
}