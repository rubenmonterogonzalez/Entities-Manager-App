<script setup>
const handleSubmit = async () => {
  const customer = {
    fullname: fullname.value,
    email: email.value,
    vat_number: vat_number.value,
  };
  await fetch("http://localhost:3000/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  router.push("/");
};

</script>

<template>
  <section class="bg-gray-100 flex justify-center min-h-[86vh]">
    <div class="block m-auto px-6 pb-6 pt-3 rounded-sm shadow-lg bg-white max-w-md">
      <form @submit.prevent="handleSubmit" class="min-w-[300px]">
        <div class=" my-4 text-center">
          <h2 class="font-bold text-xl max-w-[240px] m-auto leading-6 mb-2">Welcome to the Entities Manager App</h2>
          <p class="text-gray-500 text-sm">Start filling these fields up</p>
        </div>
        <div class="mb-6">
          <input v-model="fullname" type="text"
            class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
            placeholder="Full Name" autocomplete="Off" required>
        </div>
        <div class="mb-6">
          <input v-model="email" type="email"
            class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
            placeholder="Example@example.com" autocomplete="Off" required>
        </div>
        <div class="mb-6">
          <input v-model="vat_number" type="text"
            class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
            placeholder="VAT-Number" autocomplete="Off" required>
        </div>
        <button type="submit"
          class="w-full px-6 py-2 bg-black border-2 border-black font-semibold text-white leading-tight rounded-sm shadow-md hover:border-2 hover:border-black hover:bg-white hover:shadow-lg hover:text-black transition duration-150 ease-in-out">Sign
          up</button>
      </form>
    </div>
  </section>
</template>


