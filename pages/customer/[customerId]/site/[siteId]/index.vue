<script setup lang="ts">
import { ISite } from "../../../../../types/index.ts";
import { useSiteStore } from "../../../../../store/siteStore";
import { useForm } from "vee-validate";
import Input from "~~/components/Forms/Input/Input.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

// get route param id
const route = useRoute()
const siteId = route?.params?.siteId || '0';

const router = useRouter();
const currentRoute = router.currentRoute.value.href

/* CARD */
const siteStore = useSiteStore();
const sites = await useAsyncData(() => siteStore.getSites());
const siteById = await useAsyncData(() => siteStore.getSite(siteId))

/* MODAL */
const site = ref<ISite | undefined | null>(siteById?.data?.value?.data);

const refetchSite = async () => {
  const req = await siteStore.getSite(siteId)
  const { data } = req;
  site.value = data
}

const { handleSubmit } = useForm({
  initialValues: site,
});

const submitSite = handleSubmit(async (values) => {
  await siteStore.updateSite(siteId, { ...values });
  await refetchSite();
  closeModal();
});

const open = ref(false);

const openModal = async () => {
  open.value = true;
};

const closeModal = async () => {
  open.value = false;
  await refetchSite();
};

/*DELETE*/
const deleteSite = async (site: any) => {
  await siteStore.deleteSite(site.id);
  router.back()
};
</script>

<template>
  <section class="bg-black flex justify-center py-6">
    <div
      class="block m-auto px-6 py-3 rounded-sm shadow-lg bg-white max-w-md min-w-[350px]"
    >
      <div class="my-4 text-center">
        <h2 class="font-bold text-xl max-w-[240px] m-auto leading-6 mb-2">
          SITE Entity
        </h2>
      </div>
      <div class="flex mb-3">
        <span><strong>Name: </strong>{{ site?.name }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>Address: </strong>{{ site?.address }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>Post Code: </strong>{{ site?.post_code }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>Latitude: </strong>{{ site?.coordinates.latitude }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>Longitude: </strong>{{ site?.coordinates.longitude }}</span>
      </div>
      <div class="flex ml-auto">
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
          @click="deleteSite(site)"
        >
          Delete
          <Icon size="18" name="simple-line-icons:trash" />
        </button>
      </div>
    </div>
  </section>

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
                Edit SITE {{ site?.name }}
              </DialogTitle>

              <form @submit.prevent="submitSite" class="mt-5">
                <div class="">
                  <div class="col-span-1">
                    <Input label="Name" type="text" name="name" id="name" autocomplete="off"
                      :model-value="site?.name"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" />
                  </div>
                  <div class="col-span-1">
                    <Input label="Address" type="text" name="address" id="address" autocomplete="off"
                      :model-value="site?.address"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" />
                  </div>
                  <div class="col-span-1">
                    <Input label="Post Code" type="text" name="post_code" id="post_code" autocomplete="off"
                      :model-value="site?.post_code"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" />
                  </div>
                  <div class="col-span-1">
                    <Input label="Latitude" type="number" name="latitude" id="latitude" autocomplete="off"
                      :model-value="site?.coordinates.latitude"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" />
                  </div>
                  <div class="col-span-1">
                    <Input label="Longitude" type="number" name="longitude" id="longitude" autocomplete="off"
                      :model-value="site?.coordinates.longitude"
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

  <div class="flex">
    <NuxtLink :to="`${currentRoute}/meter`"
    class="mx-auto bg-white border-2 border-white font-bold px-4 py-2 rounded-sm text-black hover:border-2 hover:border-white hover:bg-black hover:text-white">Create METER</NuxtLink>
  </div>
</template>
