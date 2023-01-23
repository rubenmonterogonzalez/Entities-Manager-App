<script lang="ts" setup>
import type { Header, Item } from "vue3-easy-data-table";
import dayjs from "dayjs";

const headers: Header[] = [
  { text: "ID", value: "id", sortable: true },
  { text: "NAME", value: "fullname", sortable: true },
  { text: "VAT NUMBER", value: "vat_number"},
  { text: "LATITUDE", value: "coordinates.lat"},
  { text: "LONGITUDE", value: "coordinates.long"},
  { text: "ADDRESS", value: "address"},
  { text: "POST CODE", value: "post_code"},
  { text: "SERIAL NUMBER", value: "serial_number"},
  { text: "INSTALLATION DATE", value: "installation_date", sortable: true },
  { text: "MAIN", value: "is_main", sortable: true },
];

const items: Item[] = [
  { id: "1", fullname: "Ruben Montero", vat_number: "ES-746928374", coordinates: { "lat": 40, "long": 35 }, address: "Triq L-Ahdar, Marsaskala", post_code: "MSK3652", serial_number: 63478641203946, installation_date: "22-02-2023", is_main: "Yes" },
  { id: "2", fullname: "Ana Rubio", vat_number: "ES-4789374545", coordinates: { "lat": 40, "long": 35 }, address: "Triq L-Ahdar, Marsaskala", post_code: "ZTJ2502", serial_number: 879047287548157, installation_date: "25-02-2023", is_main: "No" },

];


</script>

<template>
  <div class="relative">
    <ClientOnly>
      <!-- <EasyDataTable :headers="headers" :items="items" /> -->
      <EasyDataTable :search-value="search" empty-message="No Customer Found" theme-color="#f97316"
        table-class-name="eztble" :headers="headers" :items="items">

        <template #item-id="{ id }">
          <span class="font-semibold">{{ id }}</span>
        </template>
        <template #item-fullname="{ fullname }">
          <span>{{ fullname }}</span>
        </template>
        <template #item-vat_number="{ vat_number }">
          <span>{{ vat_number }}</span>
        </template>
        <template #item-latitude="{ coordinates }">
          <span>{{ coordinates.lat }}</span>
        </template>
        <template #item-longitude="{ coordinates }">
          <span>{{ coordinates.long }}</span>
        </template>
        <template #item-address="{ address }">
          <span>{{ address }}</span>
        </template>
        <template #item-post_code="{ post_code }">
          <span>{{ post_code }}</span>
        </template>
        <template #item-serial_number="{ serial_number }">
          <span>{{ serial_number }}</span>
        </template><template #item-installation_date="{ installation_date }">
          <span>{{ dayjs(installation_date).format("DD-MM-YYYY") }}</span>
          <span>{{ installation_date }}</span>
        </template><template #item-is_main="{ is_main }">
          <span>{{ is_main }}</span>
        </template>

        <template #item-actions="customer">
          <div class="flex space-x-4 text-gray-500">
            <button @click="customerModal.openModal(customer)">
              <Icon size="18" name="fluent:pen-24-regular" />
            </button>
            <button @click="deleteCustomer(customer)">
              <Icon size="18" name="fluent:delete-24-regular" />
            </button>
          </div>
        </template>
      </EasyDataTable>
    </ClientOnly>
  </div>
</template>



