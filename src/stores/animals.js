import { defineStore } from 'pinia'
import serializer from '@/helpers/serializer.js'


export const useAnimalsStore = defineStore('animals', {
    state: () => {
        return {
            animals: [
                // Список животных 
                {
                    name: 'rabbit',
                    desc: 'big ears, loves to hop on the grass and crunch carrots',
                    count: 0,
                    price: 64,
                    food: 1,
                    clean: 0.5,
                    health: 8,
                    income: 8,
                    max: 32,
                    unlock: false
                },
                {
                    name: 'fox',
                    desc: 'crafty and nimble, always on alert to catch a chicken or rabbit',
                    count: 0,
                    price: 256,
                    food: 4,
                    clean: 2,
                    health: 16,
                    income: 32,
                    max: 16,
                    unlock: false
                },
                {
                    name: 'penguin',
                    desc: 'funny clumsy, swims and dives under water better than a fish',
                    count: 0,
                    price: 1024,
                    food: 16,
                    clean: 8,
                    health: 32,
                    income: 128,
                    max: 16,
                    unlock: false
                },
                {
                    name: 'monkey',
                    desc: 'climbs trees, firmly holds on with hands and feet to branches',
                    count: 0,
                    price: 4096,
                    food: 64,
                    clean: 32,
                    health: 64,
                    income: 512,
                    max: 8,
                    unlock: false
                },
                {
                    name: 'zebra',
                    desc: 'striped like a tiger, but without claims to aggression, prefers grass more',
                    count: 0,
                    price: 16384,
                    food: 256,
                    clean: 128,
                    health: 128,
                    income: 2048,
                    max: 8,
                    unlock: false
                },
                {
                    name: 'lion',
                    desc: 'king of beasts with an impressive mane, and his roar is resonant and loud',
                    count: 0,
                    price: 65536,
                    food: 1024,
                    clean: 512,
                    health: 256,
                    income: 8192,
                    max: 8,
                    unlock: false
                },
                {
                    name: 'bear',
                    desc: 'eats honey in the den in winter, and lounges in the sun in summer',
                    count: 0,
                    price: 262144,
                    food: 4096,
                    clean: 2048,
                    health: 512,
                    income: 32768,
                    max: 4,
                    unlock: false
                },
                {
                    name: 'dumbo',
                    desc: 'bigger than all, with a trunk to the ground, carries the whole zoo on itself',
                    count: 0,
                    price: 1048576,
                    food: 16384,
                    clean: 8192,
                    health: 1024,
                    income: 131072,
                    max: 2,
                    unlock: false
                },
                {
                    name: 'dino',
                    desc: 'a unique inhabitant of our zoo, there are no others like it in nature!',
                    count: 0,
                    price: 4194304,
                    food: 65536,
                    clean: 32768,
                    health: 2048,
                    income: 524288,
                    max: 1,
                    unlock: false
                },
            ]
        }
    },

    persist: {
        key: 'animals',
        storage: localStorage,
        serializer,
    },

    getters: {
        getAnimal(state) {
            return (name) => {
                return state.animals.find(animal => animal.name === name)
            }
        }
    },

    actions: {
        resetStore() {
            localStorage.removeItem('animals');
            this.$reset()
        }
    }
})