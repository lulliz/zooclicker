import { defineStore } from 'pinia'
import { useAnimalsStore } from './animals.js'
import serializer from '@/helpers/serializer.js'


export const useBudgetStore = defineStore('achievement', {
    state: () => {
        return {
            penguins4: 0
        }
    },

    persist: {
        key: 'achievement',
        storage: localStorage,
        serializer,
    },

    getters: {},

    actions: {
        
        bonus(money, food, text) {
            console.log(money, food, text);
        }
    }
})