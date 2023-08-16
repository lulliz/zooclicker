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
            food: 5
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
            if (this.money >= animalsStore.getAnimal(animalName).price) {
                this.money -= animalsStore.getAnimal(animalName).price;
                animalsStore.getAnimal(animalName).count++
                animalsStore.getAnimal(animalName).price *= 1.1;
                this.animalsPurchased++
            }
            else {
                this.badMove()
            }
        },

        sellAnimal(animalName) {
            const animalsStore = useAnimalsStore()
            this.money += animalsStore.getAnimal(animalName).price * 0.7;
            animalsStore.getAnimal(animalName).count--
            this.animalsPurchased--
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
            if (this.money >= workersStore.getWorker(workerName).price) {
                this.money -= workersStore.getWorker(workerName).price;
                workersStore.getWorker(workerName).count++
                workersStore.getWorker(workerName).price *= 1.1;
                this.workersPurchased++
            }
            else {
                this.badMove()
            }
        },

        sellWorker(workerName) {
            // продажа
            const workersStore = useWorkersStore()
            this.money += workersStore.getWorker(workerName).price * 0.7;
            workersStore.getWorker(workerName).count--
            this.workersPurchased--
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