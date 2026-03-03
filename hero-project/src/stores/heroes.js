import { defineStore} from "pinia";
import axios from "axios";

export const useHeroesStore = defineStore("heroes", {
    state: () => ({
        foundHeroes: [],
    }),
    getters: {
        getFoundHeroes(state) {
            return state.foundHeroes
        }
    },

    actions: {
        findHero(name) {
            name = name === '' ? 'a' : name
            name = name.trim().toLowerCase()
            const accessToken = import.meta.env.VITE_ACCESS_TOKEN

            axios.get(`/api/api/${accessToken}/search/${name}`)
                .then(response => {
                    this.foundHeroes = response.data.results
                })
                .catch(error => {
                    console.error("Error fetching hero data:", error);
                });
        }
    }

})