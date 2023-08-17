import { defineStore } from 'pinia'
import { useAnimalsStore } from './animals.js'
import { useWorkersStore } from './workers.js'
import serializer from '@/helpers/serializer.js'


export const useBudgetStore = defineStore('budget', {
    state: () => {
        return {
            money: 100,
            animalsPurchased: 0,
            workersPurchased: 0,
            foodCollected: 10,
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

            const old_list = [animal.income, animal.food, animal.clean]

            animal.price *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            animal.health *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            animal.food *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            animal.clean *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            animal.income *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            
            this.autoClick += (animal.income - old_list[0])
            this.autoFood -= (animal.food - old_list[1])
            this.autoClean -= (animal.clean - old_list[2])
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

            const old_list = [worker.salary, worker.food, worker.clean]

            worker.price *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            worker.health *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            worker.food *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            worker.clean *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            worker.salary *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))

            this.autoClick -= (worker.salary - old_list[0])
            this.autoFood += (worker.food - old_list[1])
            this.autoClean += (worker.clean - old_list[2])
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
            let gameTimer = setInterval(() => {
                if (this.money > 0 && this.foodCollected > 0 && this.clean > 0) {
                    this.money += this.autoClick
                    this.foodCollected += this.autoFood
                    this.clean += this.autoClean
                }
                else {
                    this.gameOver()
                    this.resetStore()
                    clearInterval(gameTimer)
                    this.income()
                }
            }, 1000)
        },

        resetStore() {
            const workersStore = useWorkersStore()
            const animalsStore = useAnimalsStore()
            workersStore.resetStore()
            animalsStore.resetStore()
            localStorage.removeItem('budget');
            this.$reset()
        },

        gameOver() {
            console.log('Game Over');
        },

        badMove() {
            console.log('U can not do that!');
        }
    }
})