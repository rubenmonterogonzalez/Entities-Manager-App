<script setup lang="ts">
import Input from "~~/components/Forms/Input/Input.vue";
import { useCircuitStore } from "~~/store/circuitStore.ts";
import { useForm } from "vee-validate";
import { ICircuit } from "~~/types/index.ts";
import dayjs from "dayjs";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

// get route param id
const route = useRoute();
const circuitId = route?.params?.circuitId || "0";

const router = useRouter();
const currentRoute = router.currentRoute.value.href;

/* CARD */
const circuitStore = useCircuitStore();
const circuits = await useAsyncData(() => circuitStore.getCircuits());
const circuitById = await useAsyncData(() =>
  circuitStore.getCircuit(circuitId)
);

/* MODAL */
const circuit = ref<ICircuit | undefined | null>(
  circuitById?.data?.value?.data
);

const refetchCircuit = async () => {
  const req = await circuitStore.getCircuit(circuitId);
  const { data } = req;
  circuit.value = data;
};

const { handleSubmit } = useForm({
  initialValues: circuit,
});

const submitCircuit = handleSubmit(async (values) => {
  await circuitStore.updateCircuit(circuitId, { ...values });
  await refetchCircuit();
  closeModal();
});

const open = ref(false);

const openModal = async () => {
  open.value = true;
};

const closeModal = async () => {
  open.value = false;
  await refetchCircuit();
};

/*DELETE*/
const deleteCircuit = async (site: any) => {
  await siteCircuit.deleteCircuit(circuit.id);
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
          CIRCUIT Entity
        </h2>
      </div>
      <div class="flex mb-3">
        <span><strong>Name: </strong>{{ circuit?.name }}</span>
      </div>
      <div class="flex mb-3">
        <span
          ><strong>Installation date: </strong
          >{{ dayjs(circuit.installation_date).format("DD-MM-YYYY") }}</span
        >
      </div>
      <div class="flex mb-3">
        <span><strong>Main: </strong>{{ circuit.is_main ? "Yes" : "No" }}</span>
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
          @click="deleteCircuit(circuit)"
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
                Edit CIRCUIT {{ circuit?.name }}
              </DialogTitle>

              <form @submit.prevent="submitCircuit" class="mt-5">
                <div class="">
                  <div class="col-span-1">
                    <Input
                      label="Name"
                      type="text"
                      name="name"
                      id="name"
                      autocomplete="off"
                      :model-value="circuit?.name"
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
                      :model-value="
                        dayjs(circuit.installation_date).format('DD-MM-YYYY')
                      "
                      class="focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                  <div class="col-span-1">
                    <Input
                      label="Main"
                      type="text"
                      name="is_main"
                      id="is_main"
                      autocomplete="off"
                      :model-value="circuit?.is_main"
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
      :to="`/manager`"
      class="mx-auto bg-white border-2 border-white font-bold px-4 py-2 rounded-sm text-black hover:border-2 hover:border-white hover:bg-black hover:text-white"
      >Go to MANAGER</NuxtLink
    >
  </div>
</template>
