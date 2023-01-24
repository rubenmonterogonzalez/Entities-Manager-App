<script setup lang="ts">
import CustomerEntityModal from "~~/components/Modals/CustomerEntityModal.vue"
import { useCustomerStore } from "~~/store";

const customerStore = useCustomerStore();
const nuxtApp = useNuxtApp();

const customerEntityModal = ref();

const lastCustomer = customerStore.getCustomer.slice(-1).pop()!

</script>

<template>
  <section class="bg-black flex justify-center py-6">
    <div class="block m-auto px-6 py-3 rounded-sm shadow-lg bg-white max-w-md">
      <form class="min-w-[300px]">
        <div class="my-4 text-center">
          <h2 class="font-bold text-xl max-w-[240px] m-auto leading-6 mb-2">
            CUSTOMER Entity
          </h2>
        </div>
        <div class="flex mb-3">
          <span><strong>Name: </strong>{{ lastCustomer.name }}</span>
        </div>
        <div class="flex mb-3">
          <span><strong>Email: </strong>{{ lastCustomer.email }}</span>
        </div>
        <div class="flex mb-3">
          <span><strong>VAT-Number: </strong>{{ lastCustomer.vat_number }}</span>
        </div>
        <div class="flex ml-auto">
          <button
            class="ml-auto bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-black hover:bg-white hover:text-black"
          >
            Edit
            <Icon size="18" name="simple-line-icons:pencil" class="ml-2" />
          </button>
        </div>
      </form>
    </div>
  </section>

  <CustomerEntityModal ref="customerEntityModal" />
</template>
