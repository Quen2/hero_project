<script setup>
  import {storeToRefs} from "pinia";
  import { useBattleStore } from "@/stores/battle.js";
  import {computed, onMounted} from "vue";
  import router from "@/router";

  const battleStore = useBattleStore();
  const {
    getHeroA,
    getHeroB,
    getBattleText,
    getHeroACurrentHP,
    getHeroBCurrentHP,
    getHeroAStats,
    getHeroBStats,
    getHeroAMaxHP,
    getHeroBMaxHP,
    getIsBattleDone
  } = storeToRefs(battleStore);
  if (getHeroA.value === null || getHeroB.value === null) {
    router.push('/select');
  }
  onMounted(() => {
    battleStore.initializeBattleStats(getHeroA.value, true)
    battleStore.initializeBattleStats(getHeroB.value, false)
  })
  const heroAPercent = computed(() =>
      getHeroAStats.value
          ? (getHeroACurrentHP.value / getHeroAMaxHP.value) * 100
          : 0
  );

  const heroBPercent = computed(() =>
      getHeroBStats.value
          ? (getHeroBCurrentHP.value / getHeroBMaxHP.value) * 100
          : 0
  );

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">

    <h1 class="text-4xl font-bold text-center mb-10 tracking-wide">
      ⚔️ Hero Battle ⚔️
    </h1>

    <div class="grid md:grid-cols-2 gap-10 items-center">

      <div class="bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
        <img
            :src="getHeroA.image.url"
            class="w-full h-72 object-cover rounded-xl mb-4"
        />
        <h2 class="text-2xl font-bold">{{ getHeroA.name }}</h2>

        <div class="mt-4">
          <div class="w-full bg-gray-700 rounded-full h-6 overflow-hidden">
            <div
                class="bg-green-500 h-6 transition-all duration-500"
                :style="{ width: heroAPercent + '%' }"
            ></div>
          </div>
          <p class="mt-2 text-sm">
            ❤️ {{ getHeroACurrentHP }} / {{ getHeroAMaxHP }}
          </p>
        </div>
      </div>

      <div class="bg-gray-800 rounded-2xl shadow-xl p-6 text-center">
        <img
            :src="getHeroB.image.url"
            class="w-full h-72 object-cover rounded-xl mb-4"
        />
        <h2 class="text-2xl font-bold">{{ getHeroB.name }}</h2>

        <div class="mt-4">
          <div class="w-full bg-gray-700 rounded-full h-6 overflow-hidden">
            <div
                class="bg-red-500 h-6 transition-all duration-500"
                :style="{ width: heroBPercent + '%' }"
            ></div>
          </div>
          <p class="mt-2 text-sm">
            ❤️ {{ getHeroBCurrentHP }} / {{ getHeroBMaxHP }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-10 text-center">
      <p class="text-lg italic text-gray-300">
        {{ getBattleText }}
      </p>
    </div>

    <div class="text-center mt-8">
      <button
          v-if="!getIsBattleDone"
          @click="battleStore.startBattle()"
          class="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition transform"
      >
        ⚡ Lancer l'attaque
      </button>
      <button
          v-else
          @click="battleStore.resetBattle()"
          class="bg-gradient-to-r from-gray-600 to-gray-800 px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition transform">
        🔄 Recommencer
      </button>
    </div>

  </div>
</template>

<script>

</script>