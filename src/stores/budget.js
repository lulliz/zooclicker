import { defineStore } from 'pinia'
import { useAnimalsStore } from './animals.js'
import { useWorkersStore } from './workers.js'
import { useExtraStore } from './extra.js'
import { useAchiveStore } from './achievements.js'
import serializer from '@/helpers/serializer.js'


export const useBudgetStore = defineStore('budget', {
    state: () => {
        return {
            money: 1,
            foodCollected: 1,
            clean: 100,
            click: 1,
            food: 4,
            autoClick: 0,
            autoFood: 0,
            autoClean: 0,
            animalsPurchased: 0,
            workersPurchased: 0,
            extraPurchased: 0,
            winner: false,
            loser: false
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

            if (this.money >= worker.price && worker.count < worker.max) {
                this.money -= worker.price;
                worker.count++
                worker.price *= 1.1;

                this.autoClick -= worker.income
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
            if (this.money >= 0 && worker.count > 0) {
                this.money += worker.price * 0.7;
                worker.count--
                this.workersPurchased--

                this.autoClick += worker.income
                this.autoFood -= worker.food
                this.autoClean -= worker.clean
            }
            else {
                this.badMove()
            }
        },

        updateWorker(workerName) {
            const workersStore = useWorkersStore()
            const worker = workersStore.getWorker(workerName)
            this.money -= worker.price * 1.2

            const old_list = [worker.income, worker.food, worker.clean]

            worker.price *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            worker.health *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            worker.food *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            worker.clean *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))
            worker.income *= 1 + Number((Math.random() * 0.14 + 0.02).toFixed(2))

            this.autoClick -= (worker.income - old_list[0])
            this.autoFood += (worker.food - old_list[1])
            this.autoClean += (worker.clean - old_list[2])
        },

        buyExtra(extraName) {
            const extraStore = useExtraStore()
            const extra = extraStore.getExtra(extraName)
            if (this.money >= extra.price && extra.count < extra.max) {
                this.money -= extra.price;
                extra.count++
                if (extra.name == 'click') {
                    extra.price *= 4;
                }
                else {
                    extra.price *= 2;
                }

                this.autoClick += extra.income
                this.autoFood += extra.food
                this.autoClean += extra.clean

                this.extraPurchased++
                console.log(extraName);
                if (extraName == 'click') {
                    this.click *= 2
                }
            }
            else {
                this.badMove()
            }
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
                    if (this.money > 100000 && this.foodCollected > 10000 && this.clean > 10000 && this.animalsPurchased >= 95) {
                        this.winner = true
                        clearInterval(gameTimer)
                    }
                    this.isAchive()
                }
                else {
                    this.loser = true
                    clearInterval(gameTimer)
                }
            }, 1000)
        },

        resetStore() {
            const workersStore = useWorkersStore()
            const animalsStore = useAnimalsStore()
            const extraStore = useExtraStore()
            workersStore.resetStore()
            animalsStore.resetStore()
            extraStore.resetStore()
            this.$reset()
        },

        newGamePlus() {
            this.resetStore()
            this.income()
            this.winner = false
            location.reload()
        },

        gameOver() {
            this.resetStore()
            this.income()
            this.loser = false
            location.reload()
        },

        badMove() {
            console.log('U can not do that!');
        },

        animalHasGone(a) {
            const animalsStore = useAnimalsStore()
            const animal = animalsStore.getAnimal(a)

            animal.count--
            this.autoClick -= animal.income
            this.autoFood += animal.food
            this.autoClean += animal.clean
            this.animalsPurchased--
        },

        isAchive() {
            const achiveStore = useAchiveStore()
            const animalsStore = useAnimalsStore()

            if (achiveStore.penguins()) {
                this.foodCollected += 500
            }
            if (achiveStore.monkey()) {
                for (let i = 0; i < 4; i++) {
                    this.animalHasGone('monkey')
                }
            }
            if (achiveStore.superStar()) {
                this.money += 10000000
            }
            if (achiveStore.firstLion()) {
                this.foodCollected += 200000
                this.money += 50000000
            }
            if (achiveStore.bears()) {
                this.foodCollected += 8000000
            }
            if (achiveStore.epidemy()) {
                let alist = ['penguin', 'rabbit', 'fox', 'monkey', 'zebra', 'lion']
                alist.forEach(animal => {
                    const newAnimal = animalsStore.getAnimal(animal)
                    const halfCount = parseInt(newAnimal.count / 2)
                    console.log(halfCount);
                    for (let i = 0; i < halfCount; i++) {
                        this.animalHasGone(animal);
                    }
                });
            }
        }
    }
})