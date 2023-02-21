<script setup lang="ts">
import { IMeter } from "../../../../../../../types/index.ts";
import { useMeterStore } from "../../../../../../../store/meterStore.ts";
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
const route = useRoute();
const meterId = route?.params?.id || "0";

const router = useRouter();
const currentRoute = router.currentRoute.value.href;

/* CARD */
const meterStore = useMeterStore();
const meters = await useAsyncData(() => meterStore.getMeters());
const meterById = await useAsyncData(() => meterStore.getMeter(meterId));

/* MODAL */
const meter = ref<IMeter | undefined | null>(meterById?.data?.value?.data);

const refetchMeter = async () => {
  const req = await meterStore.getMeter(meterId);
  const { data } = req;
  meter.value = data;
};

const { handleSubmit } = useForm({
  initialValues: meter,
});

const submitMeter = handleSubmit(async (values) => {
  await meterStore.updateMeter(meterId, { ...values });
  await refetchMeter();
  closeModal();
});

const open = ref(false);

const openModal = async () => {
  open.value = true;
};

const closeModal = async () => {
  open.value = false;
  await refetchMeter();
};

/*DELETE*/
const deleteMeter = async (meter: any) => {
  await meterStore.deleteMeter(meter.id);
  router.back();
};
</script>

<template>
  <section class="bg-black flex justify-center py-6">
    <div
      class="block m-auto px-6 py-3 rounded-sm shadow-lg bg-white max-w-md min-w-[350px]"
    >
      <div class="my-4 text-center">
        <h2 class="font-bold text-xl max-w-[240px] m-auto leading-6 mb-2">
          METER Entity
        </h2>
      </div>
      <div class="flex mb-3">
        <span><strong>Name: </strong>{{ meter?.name }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>Serial Number: </strong>{{ meter?.serial_number }}</span>
      </div>
      <div class="flex mb-3">
        <span><strong>Installation Date: </strong>{{ meter?.installation_date }}</span>
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
          @click="deleteMeter(meter)"
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
                Edit METER {{ meter?.name }}
              </DialogTitle>

              <form @submit.prevent="submitMeter" class="mt-5">
                <div class="">
                  <div class="col-span-1">
                    <Input
                    :model-value="meter?.name"
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
                    :model-value="meter?.serial_number"
                      label="Serial Number"
                      type="text"
                      name="serial_number"
                      id="serial_number"
                      autocomplete="off"
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      label="Installation Date"
                      type="text"
                      name="installation_date"
                      id="installation_date"
                      autocomplete="off"
                      :model-value="meter?.installation_date"
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

  <div class="flex">
    <NuxtLink
      :to="`${currentRoute}/circuit`"
      class="mx-auto bg-white border-2 border-white font-bold px-4 py-2 rounded-sm text-black hover:border-2 hover:border-white hover:bg-black hover:text-white"
      >Create CIRCUIT</NuxtLink
    >
  </div>
</template>
