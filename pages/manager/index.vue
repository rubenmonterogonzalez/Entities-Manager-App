<script lang="ts" setup>
import CustomerModal from "../../components/Modals/CustomerModal.vue"
import CustomerTable from "../../components/Tables/CustomerTable.vue"

const customerModal = ref();

</script>

<template>
  <main class="bg-gray-100 min-h-[86vh] px-5 mx-auto pt-12">

    <div
      class="bg-white border-[1px] border-gray-300 flex flex-col items-center justify-between mt-5 px-4 py-2 space-y-3 md:space-y-0 md:flex-row">
      <div class="relative w-full md:mr-10 grow max-w-7xl">
        <span class="absolute -translate-y-1/2 top-4 left-64">
          <Icon name="simple-line-icons:magnifier" size="18" class="text-gray-400" />
        </span>
        <input placeholder="Search..." v-model="search" type="text" name="search" autocomplete="off"
          class="border-[1px] border-gray-300 outline-none px-5 py-2 rounded-sm text-sm w-72 placeholder:text-sm " />
      </div>
      <button @click="CustomerModal.openModal()"
        class="bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white text-sm whitespace-nowrap hover:border-2 hover:border-black hover:bg-white hover:text-black">New
        Customer</button>
    </div>

    <CustomerTable />

  </main>

  <CustomerModal ref="customerModal" />

</template>
