<script setup>
  import {storeToRefs} from "pinia";
  import { useBattleStore } from "@/stores/battle.js";

  const battleStore = useBattleStore();
  const { getHeroA, getHeroB, getBattleText } = storeToRefs(battleStore);
</script>

<template>
  <div>
    <h1>{{ getBattleText }}</h1>
    <div class="player1">
      <p>{{ getHeroB.name }}</p>
    </div>
    <div class="player2">
      <p>{{ getHeroA.name}}</p>
    </div>
  </div>
</template>

<script>

</script>