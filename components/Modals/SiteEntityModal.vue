<script lang="ts" setup>
import Input from "~~/components/Forms/Input/Input.vue";
import { useSiteStore } from "../../store/siteStore"
import { useForm } from "vee-validate";
import { ISite } from '../../types/index';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

const siteStore = useSiteStore();

await useAsyncData(() => siteStore.getSites());

const site = ref({});

const { handleSubmit } = useForm({
  initialValues: site,
});

const submitSite = handleSubmit(async (values) => {
  siteStore.updateSite(site.value._id, { ...values });
  closeModal();
});

const open = ref(false);

const openModal = (site: ISite) => {
  if (site) {
    JSON.parse(JSON.stringify({ ...site }));
  }
  open.value = true;
};
const closeModal = () => {
  site.value = {};
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
              class="w-full max-w-sm transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Edit CUSTOMER Entity
              </DialogTitle>

              <form @submit.prevent="submitSite" class="min-w-[300px]">
                <div class=" my-4 text-center">
                  <h2 class="font-bold text-xl max-w-[240px] m-auto leading-6 mb-2">SITE Entity
                  </h2>
                  <p>Create a SITE Entity</p>
                </div>
                <div class="grid grid-cols-2 mb-6">
                  <input v-model="coordinates.latitude" type="number"
                    class="block col-span-2 w-full mb-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Latitude" autocomplete="Off" required>
                  <input v-model="coordinates.longitude" type="number"
                    class="block col-span-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Longitude" autocomplete="Off" required>
                </div>
                <div class="mb-6">
                  <input v-model="address" type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Address" autocomplete="Off" required>
                </div>
                <div class="mb-6">
                  <input v-model="post_code" type="text"
                    class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Post Code" autocomplete="Off" required>
                </div>
                <button type="submit"
                  class="w-full px-6 py-2 bg-black border-2 border-black font-semibold text-white leading-tight rounded-sm shadow-md hover:border-2 hover:border-black hover:bg-white hover:shadow-lg hover:text-black transition duration-150 ease-in-out">Submit</button>
              </form>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  

  

