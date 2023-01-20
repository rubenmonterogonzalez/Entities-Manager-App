<script lang="ts" setup>
import { useCustomerStore } from "../../store/customerStore";
import type { Header} from "vue3-easy-data-table";
import dayjs from "dayjs";

import CustomerModal from "../../components/Modals/CustomerModal.vue";
import ConfirmationModal from "../../components/Modals/ConfirmationModal.vue"


const headers: Header[] = [
  { text: "ID", value: "id", sortable: true, width: 100 },
  { text: "NAME", value: "fullname", sortable: true, width: 150 },
  { text: "EMAIL", value: "email", width: 100 },
  { text: "VAT NUMBER", value: "vat_number", width: 100 },
  { text: "LATITUDE", value: "coordinates.latitude", width: 100 },
  { text: "LONGITUDE", value: "coordinates.longitude", width: 100 },
  { text: "ADDRESS", value: "address", width: 150 },
  { text: "POST CODE", value: "post_code", width: 100 },
  { text: "SERIAL NUMBER", value: "serial_number", width: 100 },
  { text: "INSTALLATION DATE", value: "installation_date", sortable: true, width: 100 },
  { text: "MAIN", value: "is_main", sortable: true, width: 100 },
  { text: "Actions", value: "actions", width: 100 },
];

const customerStore = useCustomerStore();

await useAsyncData(() => customerStore.getCustomers());

const confirmationModal = ref()
const customerModal = ref();
const search = ref("");

</script>

<template>
  <main class="bg-gray-100 min-h-[86vh] px-5 mx-auto pt-12">
    <div class="bg-white border-[1px] border-gray-300 flex flex-col items-center justify-between mt-5 px-4 py-2 space-y-2 xs:space-y-0 xs:flex-row">
      <div class="relative w-full md:mr-10 grow max-w-7xl flex justify-center xs:justify-start">
        <span class="absolute -translate-y-1/2 top-4 left-64">
          <Icon name="simple-line-icons:magnifier" size="18" class="text-gray-400" />
        </span>
        <input placeholder="Search..." v-model="search" type="text" name="search" autocomplete="off"
          class="border-[1px] border-gray-300 outline-none px-5 py-2 rounded-sm text-sm w-72 placeholder:text-sm" />
      </div>
      <div>
        <button @click="customerModal.openModal()"
          class="bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white text-sm whitespace-nowrap hover:border-2 hover:border-black hover:bg-white hover:text-black">
          New Customer
        </button>
      </div>
    </div>

    <div class="relative">
      <ClientOnly>
        <EasyDataTable :search-value="search" empty-message="No Customer Found" theme-color="#f97316"
          table-class-name="eztble" :headers="headers" :items="customerStore.customers" alternating>
          <template #item-id="{ _id }">
            <span class="font-semibold">{{ _id }}</span>
          </template>
          <template #item-fullname="{ name }">
            <span>{{ name }}</span>
          </template>
          <template #item-email="{ email }">
            <span>{{ email }}</span>
          </template>
          <template #item-vat_number="{ vat_number }">
            <span>{{ vat_number }}</span>
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
          <template #item-serial_number="{ serial_number }">
            <span>{{ serial_number }}</span>
          </template>
          <template #item-installation_date="{ installation_date }">
            <span>{{ dayjs(installation_date).format("DD-MM-YYYY") }}</span>
          </template>
          <template #item-is_main="{ is_main }">
            <span>{{ is_main? "Yes": "No" }}</span>
          </template>

          <template #item-actions="customer">
            <div class="flex space-x-4 text-gray-500">
              <button @click="customerModal.openModal(customer)">
                <Icon size="18" name="simple-line-icons:pencil" />
              </button>
              <button @click="confirmationModal.openModal()">
                <Icon size="18" name="simple-line-icons:trash" />
              </button>
              <!-- <button @click="deleteCustomer(customer)">
                <Icon size="18" name="simple-line-icons:trash" />
              </button> -->
            </div>
          </template>
        </EasyDataTable>
      </ClientOnly>
    </div>
  </main>

  <CustomerModal ref="customerModal" />
  <ConfirmationModal ref="confirmationModal" />
</template>
