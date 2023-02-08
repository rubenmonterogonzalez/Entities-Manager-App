<script setup lang="ts">
import { useSiteStore } from '../../store/siteStore';

const siteStore = useSiteStore()

const sites = await useAsyncData(() => siteStore.getSites());

const selected = ref("")
const options = JSON.parse(JSON.stringify(sites.data.value))

const onSelectChange = (event: any) => {
  selected.value = event.target.value
}

</script>

<template>
  <section class="bg-black flex justify-center py-6">
    <div class="block m-auto px-6 py-3 rounded-sm shadow-lg bg-white max-w-md min-w-[350px]">
      <div class="my-4 text-center">
        <h2 class="font-bold text-xl max-w-[240px] m-auto leading-6 mb-2">SITE Entity</h2>

        <select name="site" @change="onSelectChange($event)" v-model="selected"
          class="block w-full px-1 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none">
          <option disabled value="">Please select one</option>
          <option v-for="option in options" :value="JSON.stringify(option.id)">
            {{ option.id }} - {{ option.name }}
          </option>
        </select>
      </div>
    </div>
  </section>
</template>


