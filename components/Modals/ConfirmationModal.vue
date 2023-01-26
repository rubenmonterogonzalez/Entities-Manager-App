<script lang="ts" setup>
import { ICustomer } from "../../types/index";
import { useCustomerStore } from "../../store/customerStore"
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const customerStore = useCustomerStore();

const deleteCustomer = async (customer: ICustomer) => {
  await customerStore.deleteCustomer(customer._id);
};

const open = ref(false);

const openModal = () => {
  open.value = true;
};
const closeModal = () => {
  open.value = false;
};

defineExpose({
  openModal,
  closeModal,
});

</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Delete "{{ customerStore.$state.customers }}"
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Are you sure you want to delete this customer?
                </p>
              </div>

              <div class="flex justify-end mt-4">
                <button type="button"
                  class="bg-white border-2 border-black font-bold mr-2 px-4 py-2 rounded-sm text-black hover:border-2 hover:border-black hover:bg-black hover:text-white"
                  @click="closeModal">
                  Cancel
                </button>
                <button type="button"
                  class="bg-red-500 border-2 border-red-500 font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-red-600 hover:bg-red-600"
                  @click="deleteCustomer(customer._id)">
                  Delete
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  


