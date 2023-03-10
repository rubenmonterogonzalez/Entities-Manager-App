<script setup lang="ts">
import { ICustomer } from "../../../types/index";
import { useCustomerStore } from "../../../store/customerStore";
import { useSiteStore } from "../../../store/siteStore";
import { useMeterStore } from "../../../store/meterStore";
import { useCircuitStore } from "../../../store/circuitStore";
import { useForm } from "vee-validate";
import Input from "~~/components/Forms/Input/Input.vue";
import { useEntitiesStore } from "../../../store/entitiesStore";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

// get route param id
const route = useRoute();
const customerId = route?.params?.customerId;

const router = useRouter();

/* GET QUERY */
const entitiesStore = useEntitiesStore();
onMounted(async () => {
  await entitiesStore.init();
});

const entitiesTree = computed(() => {
  return entitiesStore.customers
    .filter((customer) => customer.id === Number(customerId))
    .map((customer) => ({
      ...customer,
      sites: entitiesStore.sites
        .filter((site) => site.customerId === Number(customer.id))
        .map((site) => ({
          ...site,
          meters: entitiesStore.meters
            .filter((meter) => meter.siteId === Number(site.id))
            .map((meter) => ({
              ...meter,
              circuits: entitiesStore.circuits
                .filter((circuit) => circuit.meterId === Number(meter.id))
                .map((circuit) => ({
                  ...circuit,
                })),
            })),
        })),
    }));
});

watchEffect(() => {
  console.log(entitiesTree.value);
});

/* CARD */
const customerStore = useCustomerStore();
const customers = await useAsyncData(() => customerStore.getCustomers());
const customerById = await useAsyncData(() =>
  customerStore.getCustomer(customerId)
);

/* MODAL */
const customer = ref<ICustomer | undefined | null>(
  customerById?.data?.value?.data
);

const refetchCustomer = async () => {
  const req = await customerStore.getCustomer(customerId);
  const { data } = req;
  customer.value = data;
};

const { handleSubmit } = useForm({
  initialValues: customer,
});

const submitCustomer = handleSubmit(async (values) => {
  await customerStore.updateCustomer(customerId, { ...values });
  await refetchCustomer();
  closeModal();
});

const open = ref(false);

const openModal = async () => {
  open.value = true;
};

const closeModal = async () => {
  open.value = false;
  await refetchCustomer();
};

/*DELETE*/
const deleteCustomer = async (customer: any) => {
  await customerStore.deleteCustomer(customer.id);
  router.push({ path: "/customers" });
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
        <span><strong>Name: </strong>{{ customer?.name }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>Email: </strong>{{ customer?.email }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>VAT-Number: </strong>{{ customer?.vat_number }}</span>
      </div>
      <div class="flex ml-auto">
        <NuxtLink
          :to="`/customers/${customerId}/sites`"
          class="mx-auto mr-1 bg-white border-2 border-black font-bold px-4 py-2 rounded-sm text-black hover:border-2 hover:border-black hover:bg-black hover:text-white"
          >View SITES</NuxtLink
        >
        <button
          type="button"
          @click="openModal()"
          class="ml-auto bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-black hover:bg-white hover:text-black"
        >
          Edit
          <Icon size="18" name="simple-line-icons:pencil" class="ml-2" />
        </button>
        <button
          class="ml-1 bg-red-600 border-2 border-red-600 font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-black hover:bg-white hover:text-black"
          @click="deleteCustomer(customer)"
        >
          Delete
          <Icon size="18" name="simple-line-icons:trash" />
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
                Edit CUSTOMER {{ customer?.name }}
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
                      :model-value="customer?.name"
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
                      :model-value="customer?.email"
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
                      :model-value="customer?.vat_number"
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
