<script setup lang="ts">
const newCustomer = window.localStorage.getItem("customer")!; 
const newSite = window.localStorage.getItem("site")!; 
const newMeter = window.localStorage.getItem("meter")!; 
const newCircuit = window.localStorage.getItem("circuit")!; 
const newUser = Object.assign(newCustomer, newSite, newMeter, newCircuit); 
console.log(newUser)
</script>

<template>
  <div
    class="font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-[85vh] place-content-center overflow-hidden"
  >
    <div class="fixed left-0 right-0 spotlight z-10"></div>
    <div class="max-w-520px text-center z-20">
      <h1 class="text-5xl sm:text-10xl font-medium mb-8">Congratulations</h1>
      <p
        class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight"
      >
        You finish all the process. Confirm if your data is correct.
      </p>
      <div class="w-full flex items-center justify-center">
        <code>{{  }}</code>
        <NuxtLink
          href="/customer"
          class="bg-black border-2 border-white font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-white hover:bg-white hover:text-black"
          >Confirm</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
