<script setup>

</script>

<template>
  <header>
    <nav class="relative w-full flex h-16 items-center justify-between py-4 bg-white shadow-lg">
      <div class="flex px-4 w-full">
        <NuxtLink to="/" class="font-bold text-xl text-black">Entities Manager App</NuxtLink>
        <ul class="flex list-style-none ml-auto">
          <li>
            <NuxtLink to="/manager" class="bg-black border-2 border-black font-bold px-4 py-2 rounded-sm text-white hover:border-2 hover:border-black hover:bg-white hover:text-black">Manager</NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>



