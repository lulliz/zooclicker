import { defineStore } from 'pinia'
import serializer from '@/helpers/serializer.js'


export const useWorkersStore = defineStore('workers', {
    state: () => {
        return {
            workers: [
                // Список животных 
                {
                    name: 'helper',
                    desc: 'Young man who loves animals',
                    count: 0,
                    max: 30,
                    price: 330,
                    salary: 20,
                    clean: 2,
                    food: 2,
                    health: 2,
                    unlock: false
                },
                {
                    name: 'janitor',
                    desc: 'Cool man who loves animals',
                    count: 0,
                    max: 20,
                    price: 900,
                    salary: 36,
                    clean: 5,
                    food: 6,
                    health: 0,
                    unlock: false
                },
                {
                    name: 'SJ',
                    desc: 'Super cool man who loves animals',
                    count: 0,
                    max: 12,
                    price: 3000,
                    salary: 70,
                    clean: 20,
                    food: 12,
                    health: 0,
                    unlock: false
                },
                {
                    name: 'doctor',
                    desc: 'Super cool man who loves animals',
                    count: 0,
                    max: 9,
                    price: 8000,
                    salary: 50,
                    clean: 0,
                    food: 5,
                    health: 10,
                    unlock: false
                },
                {
                    name: 'dolittle',
                    desc: 'Super cool man who loves animals',
                    count: 0,
                    max: 1,
                    price: 25000,
                    salary: 120,
                    clean: 10,
                    food: 10,
                    health: 55,
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