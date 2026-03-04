<template>
  <img
      :src="hero.image.url"
      :alt="hero.name"
      class="w-full h-64 object-cover"
  />
  <div class="p-4">
    <h2 class="text-xl font-bold">{{ hero.name }}</h2>
    <p class="text-sm text-gray-400">
      {{ hero.biography['publisher'] }}
    </p>
    <div class="mt-3 text-sm space-y-1">
      <div>🧠 {{ hero.powerstats.intelligence }}</div>
      <div>💪 {{ hero.powerstats.strength }}</div>
      <div>⚡ {{ hero.powerstats.speed }}</div>
      <div>🥊 {{ hero.powerstats.combat }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HeroCard",
    props: {
      hero: {
        type: Object,
        required: true,
      },
    }
  }
</script>