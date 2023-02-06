<script setup lang="ts">
import Input from "~~/components/Forms/Input/Input.vue";
import { useCustomerStore } from "../../store/customerStore";
import { useForm } from "vee-validate";
import { ICustomer } from "../../types/index";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

/* CARD */
const customerStore = useCustomerStore();
const customers = await useAsyncData(() => customerStore.getCustomers());
let lastCustomer = JSON.parse(
  JSON.stringify({ ...customers.data.value?.slice(-1).pop() })
);

/* MODAL */
const customer = ref({});

const { handleSubmit } = useForm({
  initialValues: lastCustomer,
});

const submitCustomer = handleSubmit(async (values) => {
  await customerStore.updateCustomer(lastCustomer.id, { ...values });
  /* Updates Card with New State */
  lastCustomer = customerStore.customer[customerStore.customer.length -1];
  closeModal();
});

const open = ref(false);

const openModal = (customer: ICustomer) => {
  if (customer) {
    JSON.parse(JSON.stringify({ ...customer }));
  }
  open.value = true;
};

const closeModal = () => {
  customer.value = {};
  open.value = false;
};
</script>

<template>
  <section class="bg-black flex justify-center py-6">
    <div
      class="block m-auto px-6 py-3 rounded-sm shadow-lg bg-white max-w-md min-w-[350px]"
    >
      <div class="my-4 text-center">
        <h2 class="font-bold text-xl max-w-[240px] m-auto leading-6 mb-2">
          CUSTOMER Entity
        </h2>
      </div>
      <div class="flex mb-3">
        <span><strong>Name: </strong>{{ lastCustomer.name }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>Email: </strong>{{ lastCustomer.email }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>VAT-Number: </strong>{{ lastCustomer.vat_number }}</span>
      </div>
      <div class="flex ml-auto">
        <button
          type="button"
          @click="openModal(lastCustomer)"
          class="ml-auto bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-black hover:bg-white hover:text-black"
        >
          Edit
          <Icon size="18" name="simple-line-icons:pencil" class="ml-2" />
        </button>
      </div>
    </div>
  </section>

  <TransitionRoot :show="open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-sm transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Edit CUSTOMER Entity
              </DialogTitle>

              <form @submit.prevent="submitCustomer" class="mt-5">
                <div class="">
                  <div class="col-span-1">
                    <Input
                      label="Name"
                      type="text"
                      name="name"
                      id="name"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      label="Email"
                      type="text"
                      name="email"
                      id="email"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      label="Vat Number"
                      type="text"
                      name="vat_number"
                      id="vat_number"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div class="flex items-center justify-end space-x-3 mt-7">
                  <button
                    @click="closeModal()"
                    type="button"
                    class="bg-white border-2 border-black font-bold px-4 py-2 rounded-sm text-black hover:border-2 hover:border-black hover:bg-black hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-black hover:bg-white hover:text-black"
                  >
                    Update
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
