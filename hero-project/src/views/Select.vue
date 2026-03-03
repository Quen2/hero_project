<script setup>
  import {storeToRefs} from "pinia";
  import { useHeroesStore } from "@/stores/heroes.js";
  import { useBattleStore } from "@/stores/battle.js";
  import {onMounted} from "vue";
  import router from "@/router/index.ts";

  const heroesStore = useHeroesStore();
  const battleStore = useBattleStore();
  const { getFoundHeroes } = storeToRefs(heroesStore);
  const { getHeroA, getHeroB } = storeToRefs(battleStore);

  onMounted(() => {
    heroesStore.findHero('a')
  })

  function selectHero(hero) {
    if (getHeroA.value === null) {
      battleStore.selectHeroA(hero);
    } else if (getHeroB.value === null) {
      battleStore.selectHeroB(hero);
    }
    if (getHeroA.value !== null && getHeroB.value !== null) {
      router.push(`/battle`);
    }
  }

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">

    <!-- Title -->
    <h1 class="text-4xl font-bold text-center mb-10 tracking-wide">
      ⚔️ Sélection des combattants ⚔️
    </h1>

    <!-- Instructions -->
    <div class="text-center mb-8 text-lg">
      <span v-if="!getHeroA">Choisissez le premier héros</span>
      <span v-else-if="!getHeroB">Choisissez le second héros</span>
      <span v-else>Combat prêt à démarrer 🔥</span>
    </div>

    <!-- Search -->
    <div class="max-w-xl mx-auto mb-10 flex gap-3">
      <input
          v-model="name"
          type="text"
          placeholder="Rechercher un héros..."
          class="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
          @click="heroesStore.findHero(name)"
          class="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700 transition"
      >
        Rechercher
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-400">
      Chargement...
    </div>

    <!-- Heroes Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      <div
          v-for="hero in getFoundHeroes"
          :key="hero.id"
          @click="selectHero(hero)"
          class="relative bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden border border-gray-700 hover:scale-105 transform"
      >
        <!-- Badge Hero A -->
        <div
            v-if="getHeroA && getHeroA.id === hero.id"
            class="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold"
        >
          HERO A
        </div>

        <!-- Badge Hero B -->
        <div
            v-if="getHeroB && getHeroB.id === hero.id"
            class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
        >
          HERO B
        </div>

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
      </div>

    </div>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        name: '',
      }
    },
  }
</script>