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
                    price: 80,
                    food: 2,
                    clean: 0.5,
                    health: 10,
                    income: 12,
                    max: 25,
                    unlock: false
                },
                {
                    name: 'fox',
                    desc: 'crafty and nimble, always on alert to catch a chicken or rabbit',
                    count: 0,
                    price: 240,
                    food: 4.5,
                    clean: 1,
                    health: 14,
                    income: 32,
                    max: 20,
                    unlock: false
                },
                {
                    name: 'penguin',
                    desc: 'funny clumsy, swims and dives under water better than a fish',
                    count: 0,
                    price: 570,
                    food: 3,
                    clean: 1,
                    health: 8,
                    income: 63.5,
                    max: 18,
                    unlock: false
                },
                {
                    name: 'monkey',
                    desc: 'climbs trees, firmly holds on with hands and feet to branches',
                    count: 0,
                    price: 790,
                    food: 5.5,
                    clean: 1.5,
                    health: 15,
                    income: 90,
                    max: 15,
                    unlock: false
                },
                {
                    name: 'zebra',
                    desc: 'striped like a tiger, but without claims to aggression, prefers grass more',
                    count: 0,
                    price: 980,
                    food: 8,
                    clean: 3.5,
                    health: 21,
                    income: 117,
                    max: 12,
                    unlock: false
                },
                {
                    name: 'lion',
                    desc: 'king of beasts with an impressive mane, and his roar is resonant and loud',
                    count: 0,
                    price: 2200,
                    food: 14,
                    clean: 8,
                    health: 28,
                    income: 256,
                    max: 10,
                    unlock: false
                },
                {
                    name: 'bear',
                    desc: 'eats honey in the den in winter, and lounges in the sun in summer',
                    count: 0,
                    price: 3500,
                    food: 20,
                    clean: 10,
                    health: 30,
                    income: 400,
                    max: 8,
                    unlock: false
                },
                {
                    name: 'dumbo',
                    desc: 'bigger than all, with a trunk to the ground, carries the whole zoo on itself',
                    count: 0,
                    price: 4500,
                    food: 16,
                    clean: 18,
                    health: 55,
                    income: 510,
                    max: 5,
                    unlock: false
                },
                {
                    name: 'dino',
                    desc: 'a unique inhabitant of our zoo, there are no others like it in nature!',
                    count: 0,
                    price: 32768,
                    food: 64,
                    clean: 32,
                    health: 128,
                    income: 4096,
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
        }
    }
})