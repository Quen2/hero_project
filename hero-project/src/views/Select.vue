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
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-xl mx-auto mb-8 flex gap-3">
      <input
          v-model="name"
          type="text"
          placeholder="Rechercher un héros..."
          class="flex-1 p-3 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
          @click="heroesStore.findHero(name)"
          class="bg-blue-500 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-600 transition"
      >
        Rechercher
      </button>
    </div>

    <div v-if="loading" class="text-center text-gray-500">
      Chargement...
    </div>

    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      <div
          v-for="hero in getFoundHeroes"
          :key="hero.id"
          @click="selectHero(hero)"
          class="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
      >
        <img
            :src="hero.image.url"
            :alt="hero.name"
            class="w-full h-64 object-cover"
        />

        <div class="p-4">
          <h2 class="text-xl font-bold">{{ hero.name }}</h2>
          <p class="text-sm text-gray-500">
            {{ hero.biography['full-name'] }}
          </p>
          <p class="text-sm text-gray-500">
            {{ hero.biography['publisher'] }}
          </p>

          <div class="mt-3 space-y-1 text-sm">
            <div>🧠 Intelligence: {{ hero.powerstats.intelligence }}</div>
            <div>💪 Strength: {{ hero.powerstats.strength }}</div>
            <div>⚡ Speed: {{ hero.powerstats.speed }}</div>
            <div>🥊 Combat: {{ hero.powerstats.combat }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
        v-if="getSelectedHero"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-2xl p-6 w-96 shadow-2xl relative">
        <button
            class="absolute top-3 right-3 text-gray-500 hover:text-black"
            @click="heroesStore.selectHero(null)"
        >
          ✖
        </button>

        <img
            :src="getSelectedHero.image.url"
            class="w-full h-64 object-cover rounded-xl"
        />

        <h2 class="text-2xl font-bold mt-4">
          {{ getSelectedHero.name }}
        </h2>

        <p class="text-gray-600">
          {{ getSelectedHero.biography.publisher }}
        </p>

        <div class="mt-4 text-sm space-y-1">
          <div>📍 Base: {{ getSelectedHero.work.base }}</div>
          <div>🧬 Race: {{ getSelectedHero.appearance.race }}</div>
          <div>⚖ Alignment: {{ getSelectedHero.biography.alignment }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from "@/router/index.ts";

  export default {
    data() {
      return {
        name: '',
      }
    },
  }
</script>