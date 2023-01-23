<script lang="ts" setup>
import Input from "~~/components/Forms/Input/Input.vue";
import { useCustomerStore } from "../../store/index"
import { useForm } from "vee-validate";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

const customerStore = useCustomerStore();
const customer = ref({});

const { handleSubmit } = useForm({
  initialValues: customer,
});

const submitCustomer = handleSubmit(async (values) => {
  if (!customer.value._id) {
    await customerStore.addCustomer({ ...values });
    closeModal();
  } else {
    customerStore.updateCustomer(customer.value._id, { ...values });
    closeModal();
  }
});

const open = ref(false);
const openModal = (item: any) => {
  if (item) {
    customer.value = JSON.parse(JSON.stringify({ ...item }));
  }
  open.value = true;
};
const closeModal = () => {
  customer.value = {};
  open.value = false;
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <TransitionRoot :show="open" as="template">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Edit CUSTOMER Entity
              </DialogTitle>
              
              <form @submit="submitCustomer" class="mt-5">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="col-span-1">
                    <Input
                      placeholder="Full Name"
                      rules="required"
                      label="Full name"
                      type="text"
                      name="name"
                      id="name"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              </form>

              <div class="mt-4">
                <button type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal">
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  

  

