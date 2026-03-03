import { defineStore} from "pinia";

export const useBattleStore = defineStore("battle", {
    state: () => ({
        heroA: null,
        heroB: null,
        heroAStats: null,
        heroBStats: null,
        heroACurrentHP: null,
        heroBCurrentHP: null,
        battleText: null
    }),
    getters: {
        getHeroA(state) {
            return state.heroA
        },
        getHeroB(state) {
            return state.heroB
        },
        getHeroAStats(state) {
            return state.heroAStats
        },
        getHeroBStats(state) {
            return state.heroBStats
        },
        getHeroACurrentHP(state) {
            return state.heroACurrentHP
        },
        getHeroBCurrentHP(state) {
            return state.heroBCurrentHP
        },
        getBattleText(state) {
            return state.battleText
        }
    },

    actions: {
        selectHeroA(hero) {
            this.heroA = hero
        },
        selectHeroB(hero) {
            this.heroB = hero
        },
        initializeBattleStats(hero, isHeroA) {
            const battleStats = {
                maxHp : 50 + hero.powerstats.durability * 2,
                attack: hero.powerstats.strength + Math.floor(hero.powerstats.combat / 2),
                defense: Math.floor((hero.powerstats.durability + hero.powerstats.combat) / 2),
                speed: hero.powerstats.speed,
            }

            if (isHeroA) {
                this.heroAStats = battleStats
                this.heroACurrentHP = battleStats.maxHp
            } else {
                this.heroBStats = battleStats
                this.heroBCurrentHP = battleStats.maxHp
            }

            this.battleText = "Le combat peut commencer !"
        }
    }

})