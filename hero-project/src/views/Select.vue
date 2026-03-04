<script setup>
  import {storeToRefs} from "pinia";
  import { useHeroesStore } from "@/stores/heroes.js";
  import { useBattleStore } from "@/stores/battle.js";
  import {onMounted} from "vue";
  import router from "@/router/index.ts";

  const heroesStore = useHeroesStore();
  const battleStore = useBattleStore();
  const { getFoundHeroes, getErrorMsg } = storeToRefs(heroesStore);
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
    <h1 class="text-4xl font-bold text-center mb-10 tracking-wide">
      ⚔️ Sélection des combattants ⚔️
    </h1>
    <div class="text-center mb-8 text-lg">
      <span v-if="!getHeroA">Choisissez le premier héros</span>
      <span v-else-if="!getHeroB">Choisissez le second héros</span>
      <span v-else>Combat prêt à démarrer 🔥</span>
    </div>
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
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        v-if="!getErrorMsg"
    >
      <div
          v-for="hero in getFoundHeroes"
          :key="hero.id"
          @click="selectHero(hero)"
          class="relative bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden border border-gray-700 hover:scale-105 transform"
      >
        <div
            v-if="getHeroA && getHeroA.id === hero.id"
            class="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold"
        >
          HERO A
        </div>
        <div
            v-if="getHeroB && getHeroB.id === hero.id"
            class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
        >
          HERO B
        </div>
        <HeroCard :hero="hero" />
      </div>
    </div>
    <div v-else>
      <p class="text-center">{{ getErrorMsg }}</p>
    </div>
  </div>
</template>

<script>
  import HeroCard from "@/components/HeroCard.vue";

  export default {
    components: {
      HeroCard,
    },
    data() {
      return {
        name: '',
      }
    },
  }
</script>