<script lang="ts" setup>
import { useSiteStore } from "../../store/siteStore";
import type { Header } from "vue3-easy-data-table";
import Input from "~~/components/Forms/Input/Input.vue";
import { useCustomerStore } from "../../store/customerStore";
import { ISite } from "../../types/index";
import { useForm } from "vee-validate";
import { onMounted } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { useEntitiesStore } from '../../store/entitiesStore';

/* TABLE */
const headers: Header[] = [
  { text: "ID", value: "id", width: 25 },
  { text: "NAME", value: "name", width: 100 },
  { text: "ADDRESS", value: "address", width: 150 },
  { text: "POST CODE", value: "post_code", width: 100 },
  { text: "LATITUDE", value: "coordinates.latitude", width: 25 },
  { text: "LONGITUDE", value: "coordinates.longitude", width: 25 },
  { text: "ACTIONS", value: "actions", width: 25 },
];

//TEST
const entitiesStore = useEntitiesStore();
const siteStore = useSiteStore();

onMounted(async () => {
   entitiesStore.init()
})

const search = ref("");

/* FORM */
const router = useRouter();
const route = useRoute();

const customerId = route?.params?.customerId || 0;

const sitesArray = computed(() => {
  return entitiesStore.sites.filter((s) => s.customerId === Number(customerId));
});

// Default Site
const emptySite = () => ({
  name: "",
  coordinates: {
    latitude: null,
    longitude: null,
  },
  address: "",
  post_code: "",
  customerId,
});

// New or Updating Site
const site = ref(emptySite());

const handleSubmitSite = async () => {
  try {
    await siteStore.addSite(site.value);
    closeModal();
  } catch (error) {
    console.log(error);
  }
};

/* MODAL NEW SITE */
const open = ref(false);

const openModal = () => {
  site.value = emptySite();
  open.value = true;
};
const closeModal = async () => {
  open.value = false;
};

/* MODAL UPDATE SITE */

const update = ref(false);

const handleUpdate = async () => {
  await siteStore.updateSite(site.value);
  closeUpdateModal();
};

const openUpdateModal = (siteToUpdate: ISite) => {
  if (siteToUpdate) {
    site.value = JSON.parse(JSON.stringify({ ...siteToUpdate }));
  }
  update.value = true;
};

const closeUpdateModal = async () => {
  update.value = false;
};
</script>

<template>
  <section class="bg-black px-5 mx-auto pt-2">
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
          class="bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white text-xl whitespace-nowrap hover:border-2 hover:border-black hover:bg-white hover:text-black"
        >
          +
        </button>
      </div>
    </div>

    <div class="relative">
      <ClientOnly>
        <EasyDataTable
          :search-value="search"
          empty-message="No Site Found. Create new Site"
          theme-color="#f97316"
          table-class-name="eztble"
          :headers="headers"
          :items="sitesArray"
          alternating
        >
          <template #item-id="{ id }">
            <span>{{ id }}</span>
          </template>
          <template #item-name="{ name }">
            <span>{{ name }}</span>
          </template>
          <template #item-address="{ address }">
            <span>{{ address }}</span>
          </template>
          <template #item-post_code="{ post_code }">
            <span>{{ post_code }}</span>
          </template>
          <template #item-latitude="{ coordinates }">
            <span>{{ coordinates }}</span>
          </template>
          <template #item-longitude="{ coordinates }">
            <span>{{ coordinates }}</span>
          </template>

          <template #item-actions="site">
            <div class="flex space-x-4 text-gray-500">
              <NuxtLink
                :to="`/customers/${customerId}/sites/${site.id}`"
                class=""
              >
                <Icon size="18" name="simple-line-icons:eye" />
              </NuxtLink>
              <button @click="openUpdateModal(site)">
                <Icon size="18" name="simple-line-icons:pencil" />
              </button>
              <button @click="siteStore.deleteSite(site.id)">
                <Icon size="18" name="simple-line-icons:trash" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </ClientOnly>
    </div>
  </section>

  <!-- MODAL NEW SITE -->
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
                Add a new SITE Entity
              </DialogTitle>

              <form @submit.prevent="handleSubmitSite" class="min-w-[300px]">
                <div class="my-4 text-center"></div>

                <div class="mb-6">
                  <input
                    v-model="site.name"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Name"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <input
                    v-model="site.address"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Address"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <input
                    v-model="site.post_code"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Post Code"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label>Latitude</label>
                  <input
                    v-model="site.coordinates.latitude"
                    type="number"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Latitude"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label>Longitude</label>
                  <input
                    v-model="site.coordinates.longitude"
                    type="number"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Longitude"
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

  <!-- MODAL UPDATE SITE -->
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
                Update SITE Entity
              </DialogTitle>

              <form
                @submit.prevent="handleUpdate"
                ref="form"
                class="min-w-[300px]"
              >
                <div class="my-4 text-center"></div>

                <div class="mb-6">
                  <Input
                    v-model="site.name"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Name"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <Input
                    v-model="site.address"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Address"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <Input
                    v-model="site.post_code"
                    type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Post Code"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label>Latitude</label>
                  <Input
                    v-model="site.coordinates.latitude"
                    type="number"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Latitude"
                    autocomplete="Off"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label>Longitude</label>
                  <Input
                    v-model="site.coordinates.longitude"
                    type="number"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Longitude"
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
