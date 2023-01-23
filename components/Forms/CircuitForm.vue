<script lang="ts" setup>
const router = useRouter();

const installation_date = ref("");
const is_main = ref("");

const circuit = ref({
  installation_date,
  is_main
})

const handleSubmit = async () => {
  try {
    window.localStorage.setItem("circuit", JSON.stringify(circuit.value));
    router.push({ path: "/final" });
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <section class="bg-black flex justify-center min-h-[86vh]">
    <div class="block m-auto px-6 pb-6 pt-3 rounded-sm shadow-lg bg-white max-w-md">
      <form @submit.prevent="handleSubmit" class="min-w-[300px]">
        <div class="my-4 text-center">
          <h2 class="font-bold text-xl max-w-[240px] m-auto leading-6 mb-2">
            Let's continue adding some fields
          </h2>
          <p class="text-gray-500 text-sm">
            This is the FINAL Step into the process
          </p>
        </div>
        <div class="grid grid-cols-2 mb-6">
          <input v-model="installation_date" type="date"
            class="block col-span-2 w-full mb-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
            placeholder="Installation Date" autocomplete="Off" required />
          <input v-model="is_main" type="boolean"
            class="block col-span-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
            placeholder="Main" autocomplete="Off" required />
        </div>
        <button type="submit"
          class="w-full px-6 py-2 bg-black border-2 border-black font-semibold text-white leading-tight rounded-sm shadow-md hover:border-2 hover:border-black hover:bg-white hover:shadow-lg hover:text-black transition duration-150 ease-in-out">
          Submit
        </button>
      </form>
    </div>
  </section>
</template>
