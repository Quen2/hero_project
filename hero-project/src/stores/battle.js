import { defineStore} from "pinia";
import router from "@/router/index.ts";

export const useBattleStore = defineStore("battle", {
    state: () => ({
        heroA: null,
        heroB: null,
        heroAStats: null,
        heroBStats: null,
        heroACurrentHP: null,
        heroBCurrentHP: null,
        battleText: null,
        isBattleDone: false
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
        getHeroAMaxHP(state) {
            return state.heroAStats ? state.heroAStats.maxHp : null
        },
        getHeroBMaxHP(state) {
            return state.heroBStats ? state.heroBStats.maxHp : null
        },
        getHeroBCurrentHP(state) {
            return state.heroBCurrentHP
        },
        getBattleText(state) {
            return state.battleText
        },
        getIsBattleDone(state) {
            return state.isBattleDone
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
            const strength = Number(hero.powerstats.strength) || 0;
            const durability = Number(hero.powerstats.durability) || 0;
            const combat = Number(hero.powerstats.combat) || 0;
            const speed = Number(hero.powerstats.speed) || 0;
            const power = Number(hero.powerstats.power) || 0;

            const battleStats = {
                maxHp: 50 + durability * 2,
                attack: strength + Math.floor(power / 2),
                defense: Math.floor((durability + combat) / 2),
                speed: speed,
            };

            if (isHeroA) {
                this.heroAStats = battleStats;
                this.heroACurrentHP = battleStats.maxHp;
            } else {
                this.heroBStats = battleStats;
                this.heroBCurrentHP = battleStats.maxHp;
            }

            this.battleText = "Le combat peut commencer !";
        },
        startBattle() {
            if (this.isBattleDone) return

            const heroASpeed = this.heroAStats.speed
            const heroBSpeed = this.heroBStats.speed
            const heroAAttacksFirst = heroASpeed >= heroBSpeed
            const attack = (attacker, defender, attackerStats, defenderStats, isHeroA) => {
                const dmg = Math.max(1, attackerStats.attack - (defenderStats.defense / 2))
                if (isHeroA) {
                    this.heroBCurrentHP = Math.max(0, this.heroBCurrentHP - dmg)
                } else {
                    this.heroACurrentHP = Math.max(0, this.heroACurrentHP - dmg)
                }
                this.battleText = `${attacker.name} inflige ${dmg} dégâts à ${defender.name}.`
            }

            if (heroAAttacksFirst) {
                attack(this.heroA, this.heroB, this.heroAStats, this.heroBStats, true)
                if (this.checkBattleOutcome()) return
                attack(this.heroB, this.heroA, this.heroBStats, this.heroAStats, false)
                this.checkBattleOutcome()

            } else {
                attack(this.heroB, this.heroA, this.heroBStats, this.heroAStats, false)
                if (this.checkBattleOutcome()) return
                attack(this.heroA, this.heroB, this.heroAStats, this.heroBStats, true)

                this.checkBattleOutcome()
            }
        },
        resetBattle() {
            this.heroA = null
            this.heroB = null
            this.heroAStats = null
            this.heroBStats = null
            this.heroACurrentHP = null
            this.heroBCurrentHP = null
            this.battleText = null
            this.isBattleDone = false
            router.push('/select')
        },
        checkBattleOutcome() {
            if (this.heroACurrentHP <= 0) {
                this.battleText = `${this.heroA.name} n'a plus de points de vie, ${this.heroB.name} gagne !`
                this.isBattleDone = true
                return true
            }
            if (this.heroBCurrentHP <= 0) {
                this.battleText = `${this.heroB.name} n'a plus de points de vie, ${this.heroA.name} gagne !`
                this.isBattleDone = true
                return true
            }
            return false
        }
    }

})