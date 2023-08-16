import { defineStore } from 'pinia'
import { useAnimalsStore } from './animals.js'
import { useWorkersStore } from './workers.js'
import serializer from '@/helpers/serializer.js'


export const useBudgetStore = defineStore('budget', {
    state: () => {
        return {
            money: 1000,
            animalsPurchased: 0,
            workersPurchased: 0,
            foodCollected: 0,
            clean: 100,
            click: 1,
            food: 5,
            autoClick: 0,
            autoFood: 0,
            autoClean: 0
        }
    },

    persist: {
        key: 'budget',
        storage: localStorage,
        serializer,
    },

    getters: {},

    actions: {
        // взаимодействие с животными
        buyAnimal(animalName) {
            const animalsStore = useAnimalsStore()
            const animal = animalsStore.getAnimal(animalName)
            if (this.money >= animal.price && animal.count < animal.max) {
                this.money -= animal.price;
                animal.count++
                animal.price *= 1.1;

                this.autoClick += animal.income
                this.autoFood -= animal.food
                this.autoClean -= animal.clean

                this.animalsPurchased++
            }
            else {
                this.badMove()
            }
        },

        sellAnimal(animalName) {
            const animalsStore = useAnimalsStore()
            const animal = animalsStore.getAnimal(animalName)
            if (this.money >= 0 && animal.count > 0) {
                this.money += animal.price * 0.7;
                animal.count--

                this.autoClick -= animal.income
                this.autoFood += animal.food
                this.autoClean += animal.clean

                this.animalsPurchased--
            }
            else {
                this.badMove()
            }
        },

        updateAnimal(animalName) {
            const animalsStore = useAnimalsStore()
            const animal = animalsStore.getAnimal(animalName)
            this.money -= animal.price * 1.2

            function randomizer(type) {
                // Случайно выбираем уменьшение или увеличение
                const randomModifier = Math.random() < 0.5 ? -1 : 1;
                // Создаем случайное изменение в +/- 32% диапазоне
                const randomAmount = Math.random() * 0.32;
                let newType = type * (1 + randomModifier * randomAmount);
                // Проверяем не меньше ли минимума
                if (newType < 0.2) {
                    newType = 0.2;
                }
                return newType;
            }

            animal.price *= 1 + Math.random() * 0.32;
            animal.health = randomizer(animal.health)
            animal.food = randomizer(animal.food)
            animal.clean = randomizer(animal.clean)
            animal.income *= 1 + Math.random() * 0.16;
        },

        // взаимодействие с сотрудниками
        buyWorker(workerName) {
            // покупка
            const workersStore = useWorkersStore()
            const worker = workersStore.getWorker(workerName)

            if (this.money >= worker.price) {
                this.money -= worker.price;
                worker.count++
                worker.price *= 1.1;

                this.autoClick -= worker.salary
                this.autoFood += worker.food
                this.autoClean += worker.clean

                this.workersPurchased++
            }
            else {
                this.badMove()
            }
        },

        sellWorker(workerName) {
            // продажа
            const workersStore = useWorkersStore()
            const worker = workersStore.getWorker(workerName)
            this.money += worker.price * 0.7;
            worker.count--
            this.workersPurchased--

            this.autoClick += worker.salary
            this.autoFood -= worker.food
            this.autoClean -= worker.clean
        },

        updateWorker(workerName) {
            const workersStore = useWorkersStore()
            const worker = workersStore.getWorker(workerName)
            this.money -= worker.price * 1.2

            function randomizer(type) {
                // Случайно выбираем уменьшение или увеличение
                const randomModifier = Math.random() < 0.5 ? -1 : 1;
                // Создаем случайное изменение в +/- 32% диапазоне
                const randomAmount = Math.random() * 0.32;
                let newType = type * (1 + randomModifier * randomAmount);
                // Проверяем не меньше ли минимума
                if (newType < 0.2) {
                    newType = 0.2;
                }
                return newType;
            }

            worker.price *= 1 + Math.random() * 0.32;
            worker.health = randomizer(worker.health)
            worker.food = randomizer(worker.food)
            worker.clean = randomizer(worker.clean)
            worker.income *= 1 + Math.random() * 0.16;
        },

        getCoin() {
            this.money += this.click
        },

        getFood() {
            if (this.money > this.food) {
                this.foodCollected += 1
                this.money -= this.food
            }
        },

        income() {
            setInterval(() => {
                this.money += this.autoClick
                this.foodCollected += this.autoFood
                this.clean += this.autoClean
            }, 1000)
        },

        resetStore() {
            localStorage.removeItem('budget');
        },

        gameOver() {
            console.log('Game Over');
        },

        badMove() {
            console.log('U can not do that!');
        }
    }
})