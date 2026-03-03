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
            const heroASpeed = this.heroAStats.speed
            const heroBSpeed = this.heroBStats.speed

            if (heroASpeed > heroBSpeed) {
                this.battleText = `${this.heroA.name} attaque en premier !`
                const dmg = Math.max(1, this.heroAStats.attack - (this.heroBStats.defense / 2))
                this.heroBCurrentHP = Math.max(0, this.heroBCurrentHP - dmg)
                this.battleText += ` ${this.heroA.name} inflige ${dmg} points de dégâts à ${this.heroB.name}.`
            } else if (heroBSpeed > heroASpeed) {
                this.battleText = `${this.heroB.name} attaque en premier !`
                const dmg = Math.max(1, this.heroBStats.attack - (this.heroAStats.defense / 2))
                this.heroACurrentHP = Math.max(0, this.heroACurrentHP - dmg)
                this.battleText += ` ${this.heroB.name} inflige ${dmg} points de dégâts à ${this.heroA.name}.`
            } else {
                this.battleText = `Les deux héros ont la même vitesse, mais ${this.heroA.name} prend l'avantage !`
                const dmg = Math.max(1, this.heroAStats.attack - (this.heroBStats.defense / 2))
                this.heroBCurrentHP = Math.max(0, this.heroBCurrentHP - dmg)
                this.battleText += ` ${this.heroA.name} inflige ${dmg} points de dégâts à ${this.heroB.name}.`
            }
        }
    }

})