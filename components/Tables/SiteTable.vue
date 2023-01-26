<script lang="ts" setup>
import { useSiteStore } from "../../store/siteStore"
import type { Header } from "vue3-easy-data-table";
import Input from "~~/components/Forms/Input/Input.vue";
import { useForm } from "vee-validate";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

/* TABLE */
const headers: Header[] = [
  { text: "ID", value: "siteId", width: 25 },
  { text: "LATITUDE", value: "coordinates.latitude", width: 25 },
  { text: "LONGITUDE", value: "coordinates.longitude", width: 25 },
  { text: "ADDRESS", value: "address", width: 150 },
  { text: "POST CODE", value: "post_code", width: 100 },
];

const siteStore = useSiteStore();

await useAsyncData(() => siteStore.getSites());

const search = ref("");

/* FORM */
const router = useRouter();

const coordinates = ref({
  latitude: 0,
  longitude: 0,
});
const address = ref("");
const post_code = ref("");

const site = ref({
  siteId: siteStore.getSite.length + 1,
  coordinates,
  address,
  post_code
})

/* MODAL */
const { handleSubmit } = useForm({
  initialValues: site,
});

const submitSite = handleSubmit(async (values) => {
  await siteStore.addSite(site.value, { ...values });
  closeModal();
  router.push({ path: "/meter" });
});

const open = ref(false);

const openModal = () => {
  open.value = true;
};
const closeModal = () => {
  // site.value = {};
  open.value = false;
};

</script>

<template>
  <main class="bg-black min-h-[86vh] px-5 mx-auto pt-12">
    <div
      class="bg-white border-[1px] border-gray-300 flex flex-col items-center justify-between mt-5 px-4 py-2 space-y-2 xs:space-y-0 xs:flex-row">
      <div class="relative w-full md:mr-10 grow max-w-7xl flex justify-center xs:justify-start">
        <span class="absolute -translate-y-1/2 top-4 left-64">
          <Icon name="simple-line-icons:magnifier" size="18" class="text-gray-400" />
        </span>
        <input placeholder="Search..." v-model="search" type="text" name="search" autocomplete="off"
          class="border-[1px] border-gray-300 outline-none px-5 py-2 rounded-sm text-sm w-72 placeholder:text-sm" />
      </div>
      <div>
        <button @click="openModal"
          class="bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white text-sm whitespace-nowrap hover:border-2 hover:border-black hover:bg-white hover:text-black">
          New SITE Entity
        </button>
      </div>
    </div>

    <div class="relative">
      <ClientOnly>
        <EasyDataTable :search-value="search" empty-message="No Site Found. Create new Site" theme-color="#f97316"
          table-class-name="eztble" :headers="headers" :items="siteStore.site" alternating>
          <template #item-id="{ siteId }">
            <span>{{ siteId }}</span>
          </template>
          <template #item-latitude="{ coordinates }">
            <span>{{ coordinates.latitude }}</span>
          </template>
          <template #item-longitude="{ coordinates }">
            <span>{{ coordinates.longitude }}</span>
          </template>
          <template #item-address="{ address }">
            <span>{{ address }}</span>
          </template>
          <template #item-post_code="{ post_code }">
            <span>{{ post_code }}</span>
          </template>

          <!-- <template #item-actions="site">
            <div class="flex space-x-4 text-gray-500">
              <button @click="openModal()">
                <Icon size="18" name="simple-line-icons:pencil" />
              </button>
              <button @click="openModal()">
                <Icon size="18" name="simple-line-icons:trash" />
              </button>
            </div>
          </template> -->
        </EasyDataTable>
      </ClientOnly>
    </div>
  </main>

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
              class="w-full max-w-sm transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="mb-6 text-lg font-medium leading-6 text-gray-900">
                Create a SITE Entity
              </DialogTitle>

              <form @submit.prevent="submitSite" class="min-w-[300px]">
                <div class="">
                  <div class="col-span-1">
                    <Input label="Latitude" type="number" name="latitude" id="latitude"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" />
                  </div>
                  <div class="col-span-1">
                    <Input label="Longitude" type="number" name="longitude" id="longitude"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" />
                  </div>
                  <div class="col-span-1">
                    <Input label="Address" type="text" name="address" id="address"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" />
                  </div>
                  <div class="col-span-1">
                    <Input label="Post Code" type="text" name="post_code"
                      id="post_code" autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" />
                  </div>
                </div>

                <div class="flex items-center justify-end space-x-3 mt-7">
                  <button @click="closeModal()" type="button"
                    class="bg-white border-2 border-black font-bold px-4 py-2 rounded-sm text-black hover:border-2 hover:border-black hover:bg-black hover:text-white">
                    Cancel
                  </button>
                  <button type="submit"
                    class="bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-black hover:bg-white hover:text-black">
                    Submit
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
