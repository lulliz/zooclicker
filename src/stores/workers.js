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
                    price: 200,
                    salary: 3,
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
                    price: 380,
                    salary: 12,
                    clean: 5,
                    food: 2,
                    health: 0,
                    unlock: false
                },
                {
                    name: 'SJ',
                    desc: 'Super cool man who loves animals',
                    count: 0,
                    max: 12,
                    price: 1200,
                    salary: 36,
                    clean: 20,
                    food: 3,
                    health: 0,
                    unlock: false
                },
                {
                    name: 'doctor',
                    desc: 'Super cool man who loves animals',
                    count: 0,
                    max: 9,
                    price: 600,
                    salary: 36,
                    clean: 0,
                    food: 3,
                    health: 5,
                    unlock: false
                },
                {
                    name: 'dolittle',
                    desc: 'Super cool man who loves animals',
                    count: 0,
                    max: 1,
                    price: 2500,
                    salary: 64,
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
        }
    }
})