<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center relative overflow-hidden">

    <div class="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[200px] rounded-full"></div>

    <h1 class="text-6xl md:text-7xl font-extrabold tracking-wider text-center z-10">
      ⚔️ HERO ARENA ⚔️
    </h1>

    <p class="mt-6 text-xl text-gray-400 text-center max-w-2xl z-10">
      Sélectionne deux champions.
      Déclenche le combat.
      Découvre qui domine l’arène.
    </p>

    <div class="mt-12 flex gap-6 z-10">
      <button
          @click="$router.push('/select')"
          class="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-bold shadow-xl hover:scale-110 transition transform"
      >
        🧬 Commencer un combat
      </button>
    </div>

    <div class="mt-20 grid md:grid-cols-3 gap-8 px-8 max-w-6xl z-10">

      <div class="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition">
        <h3 class="text-2xl font-bold mb-3">🧬 Sélection stratégique</h3>
        <p class="text-gray-400">
          Choisis parmi des dizaines de héros et compose ton duel parfait.
        </p>
      </div>

      <div class="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition">
        <h3 class="text-2xl font-bold mb-3">⚡ Système de combat dynamique</h3>
        <p class="text-gray-400">
          Attaque, défense, vitesse… chaque statistique influence le résultat.
        </p>
      </div>

      <div class="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition">
        <h3 class="text-2xl font-bold mb-3">🏆 Victoire instantanée</h3>
        <p class="text-gray-400">
          Visualise les dégâts en temps réel et découvre le champion de l’arène.
        </p>
      </div>

    </div>

    <div class="absolute bottom-6 text-gray-600 text-sm">
      © 2026 Hero Arena – Powered by Vue & Pinia
    </div>

  </div>
</template>
