<script lang="ts" setup>
import { useMeterStore } from "../../store/meterStore";
import { useSiteStore } from "../../store/siteStore";
import type { Header } from "vue3-easy-data-table";
import Input from "~~/components/Forms/Input/Input.vue";
import { useForm } from "vee-validate";
import dayjs from "dayjs";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

/* TABLE */
const headers: Header[] = [
  { text: "ID", value: "id", width: 25 },
  { text: "NAME", value: "name", width: 100 },
  { text: "SERIAL NUMBER", value: "serial_number", width: 150 },
  { text: "INSTALLATION DATE", value: "installation_date", width: 100 },
  { text: "ACTIONS", value: "actions", width: 25 },
];

const meterStore = useMeterStore();
const siteStore = useSiteStore();

const meters = await useAsyncData(() => meterStore.getMeters());
const sites = await useAsyncData(() => siteStore.getSites());
const search = ref("");

/* FORM */
const router = useRouter();
const route = useRoute();
const siteId = route?.params?.siteId || "0";
const meterBySiteId = await useAsyncData(() =>
  meterStore.getMetersBySiteId(siteId)
);

const metersArray = ref([meterBySiteId.data.value.data][0]);

const name = ref("");
const serial_number = ref("");
const installation_date = ref("");

const meter = ref({
  name,
  serial_number,
  installation_date,
  siteId,
});

const handleSubmit = async () => {
  try {
    await meterStore.addMeter(meter.value);
    location.reload()
    toggleModal();
  } catch (error) {
    console.log(error);
  }
};

const handleUpdate = async (meter: IMeter) => {
  try {
    await meterStore.updateMeter(meter.id, meter);
    closeUpdateModal();
  } catch (error) {
    console.log(error);
  }
};

/* MODAL NEW METER */
const open = ref(false);
const openModal = () => {
  open.value = true;
};
const closeModal = async () => {
  open.value = false;
};

/* MODAL UPDATE SITMETER */

const update = ref(false);

const openUpdateModal = (meter: IMeter) => {
  if (meter) {
    JSON.parse(JSON.stringify({ ...meter }));
  }
  update.value = true;
};

const closeUpdateModal = async () => {
  update.value = false;
};
</script>

<template>
  <section class="bg-black min-h-[50vh] px-5 mx-auto pt-2">
    <div
    
      class="bg-white border-[1px] border-gray-300 flex flex-col items-center justify-between mt-5 px-4 py-2 space-y-2 xs:space-y-0 xs:flex-row"
    >
      <div
        class="relative w-full md:mr-10 grow max-w-7xl flex justify-center xs:justify-start"
      >
        <span class="absolute -translate-y-1/2 top-4 left-64">
          <Icon
            name="simple-line-icons:magnifier"
            size="18"
            class="text-gray-400"
          />
        </span>
        <input
          placeholder="Search..."
          v-model="search"
          type="text"
          name="search"
          autocomplete="off"
          class="border-[1px] border-gray-300 outline-none px-5 py-2 rounded-sm text-sm w-72 placeholder:text-sm"
        />
      </div>
      <div>
        <button
          @click="openModal"
          class="bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white text-sm whitespace-nowrap hover:border-2 hover:border-black hover:bg-white hover:text-black"
        >
          New METER Entity
        </button>
      </div>
    </div>

    <div class="relative">
      <ClientOnly>
        <EasyDataTable
          :search-value="search"
          empty-message="No Meter Found. Create new Meter"
          theme-color="#f97316"
          table-class-name="eztble"
          :headers="headers"
          :items="metersArray"
          alternating
        >
          <template #item-id="{ id }">
            <span>{{ id }}</span>
          </template>
          <template #item-name="{ name }">
            <span>{{ name }}</span>
          </template>
          <template #item-serial_number="{ serial_number }">
            <span>{{ serial_number }}</span>
          </template>
          <template #item-installation_date="{ installation_date }">
            <span>{{ dayjs(installation_date).format("DD-MM-YYYY") }}</span>
          </template>

           <template #item-actions="meter">
            <div class="flex space-x-4 text-gray-500">
              <button @click="openUpdateModal(meter)">
                <Icon size="18" name="simple-line-icons:pencil" />
              </button>
              <button @click="meterStore.deleteMeter(meter.id)">
                <Icon size="18" name="simple-line-icons:trash" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </ClientOnly>
    </div>
  </section>

  <!-- /* MODAL NEW METER  */ -->
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
                class="mb-6 text-lg font-medium leading-6 text-gray-900"
              >
                Create a new METER Entity
              </DialogTitle>

              <form @submit.prevent="handleSubmit" class="min-w-[300px]">
                <div class="my-4 text-center"></div>

                <div class="mb-6">
                  <input
                    v-model="name"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Name"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <input
                    v-model="serial_number"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Serial Number"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <input
                    v-model="installation_date"
                    type="date"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Installation Date"
                    autocomplete="Off"
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="w-full px-6 py-2 mt-6 bg-black border-2 border-black font-semibold text-white leading-tight rounded-sm shadow-md hover:border-2 hover:border-black hover:bg-white hover:shadow-lg hover:text-black transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

    <!-- /* MODAL UPDATE METER  */ -->
  <TransitionRoot :show="update" as="template">
    <Dialog as="div" @close="closeUpdateModal" class="relative z-10">
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
                class="mb-6 text-lg font-medium leading-6 text-gray-900"
              >
                Update METER Entity
              </DialogTitle>

              <form @submit.prevent="handleUpdateSubmit" class="min-w-[300px]">
                <div class="my-4 text-center"></div>

                <div class="mb-6">
                  <Input
                  :model-value="meter?.name"
                    v-model="name"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Name"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <Input
                  :model-value="meter?.serial_number"
                    v-model="serial_number"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Serial Number"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <Input
                  :model-value="meter?.installation_date"
                    v-model="installation_date"
                    type="date"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Installation Date"
                    autocomplete="Off"
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="w-full px-6 py-2 mt-6 bg-black border-2 border-black font-semibold text-white leading-tight rounded-sm shadow-md hover:border-2 hover:border-black hover:bg-white hover:shadow-lg hover:text-black transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
