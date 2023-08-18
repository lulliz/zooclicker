import { defineStore } from 'pinia'
import serializer from '@/helpers/serializer.js'


export const useWorkersStore = defineStore('workers', {
    state: () => {
        return {
            workers: [
                // Список животных 
                {
                    name: 'janitor',
                    desc: 'takes care of cleanliness, sweeping away everything from trunks to tails',
                    count: 0,
                    max: 32,
                    price: 512,
                    salary: 128,
                    clean: 8,
                    food: 32,
                    health: 4,
                    unlock: false
                },
                {
                    name: 'keeper',
                    desc: 'observes both animals and visitors to make sure no one eats anyone',
                    count: 0,
                    max: 16,
                    price: 16384,
                    salary: 4096,
                    clean: 256,
                    food: 1024,
                    health: 16,
                    unlock: false
                },
                {
                    name: 'HK',
                    desc: 'oversees the entire zoo to ensure all residents feel at home',
                    count: 0,
                    max: 4,
                    price: 524288,
                    salary: 131072,
                    clean: 8192,
                    food: 32768,
                    health: 64,
                    unlock: false
                },
                {
                    name: 'dolittle',
                    desc: 'consults for everyone - from hamsters to predators.',
                    count: 0,
                    max: 1,
                    price: 4194304,
                    salary: 262144,
                    clean: 32768,
                    food: 65536,
                    health: 1024,
                    unlock: false
                },
                
            ]
        }
    },

    persist: {
        key: 'workers',
        storage: localStorage,
        serializer,
    },

    getters: {
        getWorker(state) {
            return (name) => {
                return state.workers.find(worker => worker.name === name)
            }
        }
    },

    actions: {
        resetStore() {
            localStorage.removeItem('workers');
            this.$reset()
        }
    }
})