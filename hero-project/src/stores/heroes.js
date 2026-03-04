import { defineStore} from "pinia";
import axios from "axios";

export const useHeroesStore = defineStore("heroes", {
    state: () => ({
        foundHeroes: [],
        errorMsg: null,
    }),
    getters: {
        getFoundHeroes(state) {
            return state.foundHeroes
        },
        getErrorMsg(state) {
            return state.errorMsg
        }
    },

    actions: {
        findHero(name) {
            name = name === '' ? 'a' : name
            name = name.trim().toLowerCase()
            const accessToken = import.meta.env.VITE_ACCESS_TOKEN

            axios.get(`/api/api/${accessToken}/search/${name}`)
                .then(response => {
                    if (response.data.response === "error") {
                        this.foundHeroes = []
                        this.errorMsg = 'Aucun héros ne contient ce nom.'
                        return
                    } else {
                        this.errorMsg = null
                        this.foundHeroes = response.data.results
                    }
                })
                .catch(error => {
                    console.error("Error fetching hero data:", error);
                });
        }
    }

})