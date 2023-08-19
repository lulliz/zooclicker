import { defineStore } from 'pinia'
import serializer from '@/helpers/serializer.js'


export const useExtraStore = defineStore('extra', {
    state: () => {
        return {
            extra: [
                {
                    name: 'click',
                    desc: 'More money for each your own click!',
                    count: 1,
                    max: 10,
                    price: 32,
                    income: 0,
                    clean: 0,
                    food: 0,
                    health: 0,
                    unlock: true
                },
                {
                    name: 'photo',
                    desc: 'The best photographers who really likes work with animals',
                    count: 0,
                    max: 8,
                    price: 16384,
                    income: 2048,
                    clean: 0,
                    food: 0,
                    health: 0,
                    unlock: false
                },
                {
                    name: 'candies',
                    desc: 'sweets, cotton candy, lollipop and much more are waiting for you here',
                    count: 0,
                    max: 4,
                    price: 65536,
                    income: 16384,
                    clean: 0,
                    food: 0,
                    health: 0,
                    unlock: false
                },
                {
                    name: 'pet shop',
                    desc: 'here you can take custody of one or more animals',
                    count: 0,
                    max: 1,
                    price: 1048576,
                    income: 32768,
                    clean: 2048,
                    food: 16384,
                    health: 1024,
                    unlock: false
                },
            ]
        }
    },

    persist: {
        key: 'extra',
        storage: localStorage,
        serializer,
    },

    getters: {
        getExtra(state) {
            return (name) => {
                return state.extra.find(extra => extra.name === name)
            }
        }
    },

    actions: {
        resetStore() {
            localStorage.removeItem('extra');
            this.$reset()
        }
    }
})