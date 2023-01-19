<script lang="ts" setup>
import Input from "../Forms/Input/Input.vue";
import { useCustomerStore } from "../../store/customerStore";
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
  <TransitionRoot :show="open">
    <Dialog as="div" class="relative z-20" @close="closeModal">
      <TransitionChild
        enter="duration-200"
        leave="duration-200"
        enter-from="opacity-0"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30 backdrop-blur" />
      </TransitionChild>

      <!-- Full-screen scrollable container -->
      <div class="fixed inset-0 overflow-y-auto">
        <!-- Container to center the panel -->
        <div class="flex items-center justify-center min-h-full p-4">
          <!-- The actual dialog panel -->
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full min-w-[350px] p-5 bg-white shadow-lg rounded-sm"
            >
              <div class="flex items-center justify-between">
                <!-- Conditional rendering for text -->
                <DialogTitle class="text-xl font-medium text-gray-700"
                  >{{ customer._id ? "Update" : "New" }} Customer
                </DialogTitle>
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {{
                  customer._id
                    ? "Update this customer"
                    : "Create a new customer here"
                }}
              </p>

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
                  <div class="col-span-1">
                    <Input
                      placeholder="Vat Number"
                      rules="required"
                      label="Vat Number"
                      type="text"
                      name="vat_number"
                      id="vat_number"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      min="0"
                      placeholder="Latitude"
                      rules="required|min_value:0"
                      label="Latitude"
                      type="number"
                      name="coordinates.latitude"
                      id="latitude"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      min="0"
                      placeholder="Longitude"
                      rules="required|min_value:0"
                      label="Longitude"
                      type="number"
                      name="coordinates.longitude"
                      id="longitude"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-full">
                    <Input
                      placeholder="Address"
                      rules="required"
                      label="Address"
                      type="text"
                      name="address"
                      id="address"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      placeholder="Post Code"
                      rules="required"
                      label="Post Code"
                      type="text"
                      name="post_code"
                      id="post_code"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      placeholder="Serial Number"
                      rules="required"
                      label="Serial Number"
                      type="number"
                      name="serial_number"
                      id="serial_number"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      placeholder="Installation Date"
                      rules="required"
                      label="Installation date"
                      type="date"
                      name="installation_date"
                      id="installation_date"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      placeholder="Main"
                      rules="required"
                      label="Main"
                      type="text"
                      name="is_main"
                      id="is_main"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
                <!-- Form buttons -->
                <div class="flex items-center justify-end space-x-3 mt-7">
                  <button
                    @click="closeModal()"
                    type="button"
                    class="bg-white border-2 border-black font-bold px-4 py-2 rounded-sm text-black hover:border-2 hover:border-black hover:bg-black hover:text-white"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-black hover:bg-white hover:text-black">
                    {{ customer._id ? "Update" : "Create" }}
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
