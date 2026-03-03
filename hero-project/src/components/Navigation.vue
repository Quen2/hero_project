<script setup>
  import { RouterLink, useRoute } from "vue-router";

  const route = useRoute();
</script>

<template>
  <nav class="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 shadow-lg">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold text-white tracking-wide">
        ⚔️ Hero Arena
      </div>
      <div class="flex gap-6 text-gray-300 font-medium">
        <RouterLink
            to="/"
            class="transition hover:text-purple-400"
            :class="route.path === '/' ? 'text-purple-500' : ''"
        >
          🏠 Home
        </RouterLink>
        <RouterLink
            to="/select"
            class="transition hover:text-purple-400"
            :class="route.path === '/select' ? 'text-purple-500' : ''"
        >
          🧬 Sélection
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navigation',
  }
</script>