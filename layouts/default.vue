<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <Header />
  <main class="bg-black min-h-[86vh]">
    <slot />
  </main>
  <Footer />
</template>

