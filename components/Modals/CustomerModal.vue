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

const submitCustomer = handleSubmit(async (values, ctx) => {
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
              class="w-full min-w-[360px] p-5 bg-white shadow-lg rounded-2xl"
            >
              <div class="flex items-center justify-between">
                <!-- Conditional rendering for text -->
                <DialogTitle class="text-xl font-medium text-gray-700"
                  >{{ customer._id ? "Update" : "Create" }} Customer
                </DialogTitle>
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {{
                  customer._id
                    ? "Update this author"
                    : "Create a new author here"
                }}
              </p>

              <form @submit="submitCustomer" class="mt-5">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="col-span-full">
                    <Input
                      rules="required"
                      label="Title"
                      type="text"
                      name="title"
                      id="title"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      placeholder="Select a date"
                      rules="required"
                      label="Published date"
                      type="date"
                      name="published"
                      id="pub_date"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input label="ISBN" type="text" name="isbn" id="isbn" />
                  </div>
                  <div class="col-span-1">
                    <Input
                      min="0"
                      rules="required|min_value:0"
                      label="Page count"
                      type="number"
                      name="pageCount"
                      id="count"
                    />
                  </div>
                </div>
                <!-- Form buttons -->
                <div class="flex items-center justify-end space-x-3 mt-7">
                  <button
                    @click="closeModal()"
                    type="button"
                    class="px-4 text-sm bg-gray-100 py-2.5 rounded-md"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="btn">
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
