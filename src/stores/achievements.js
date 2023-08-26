import { defineStore } from 'pinia'
import { useAnimalsStore } from './animals.js'
import serializer from '@/helpers/serializer.js'


export const useAchiveStore = defineStore('achievement', {
    state: () => {
        return {
            achives: [
                {
                    name: '4 Penguins',
                    text: 'Skipper, Kowalski, Rico, and Private say hello!',
                    present: 'You got 500 free food.',
                    done: false,
                    viewed: false
                },
                {
                    name: 'Monkey escape',
                    text: 'At night, few monkeys were able to open the cage and escape! I hope this does not happen again.',
                    present: 'You lost 4 monkeys :(',
                    done: false,
                    viewed: false
                },
                {
                    name: 'Super star',
                    text: 'Today, the famous actor Creek Rick decided to hold his photo shoot with zebras at the zoo. This brought the zoo a good income!',
                    present: 'You got 10.000.000 coins! Wow!',
                    done: false,
                    viewed: false
                },
                {
                    name: 'First Lion',
                    text: 'The zoo has its first lion! Many visitors came with gifts and chose the name Alex for him. Curious...',
                    present: 'Lion realy popular here, so.. You got 50.000.000 coins and 200.000 food!',
                    done: false,
                    viewed: false
                },
                {
                    name: 'Bears',
                    text: 'Mr. Shishkin himself came to our zoo to draw a picture with bears and brought gifts!',
                    present: 'You got 8.000.000 food!',
                    done: false,
                    viewed: false
                },
                {
                    name: 'Zoopidemic',
                    text: 'It all started with a little monkey cold. But the virus turned out to be especially aggressive and quickly spread among the inhabitants of the zoo. A few days were critical, but veterinarians managed to develop a vaccine. The epidemic is over and everyone is on the mend. The zoo took a breath.',
                    present: 'Sorry, but You lost almost half of all animals...',
                    done: false,
                    viewed: false
                },
            ]
        }
    },

    persist: {
        key: 'achievement',
        storage: localStorage,
        serializer,
    },

    getters: {
        getAchive(state) {
            return (name) => {
                return state.achives.find(achive => achive.name === name)
            }
        }
    },

    actions: {
        penguins() {
            const animalsStore = useAnimalsStore()
            const penguin = animalsStore.getAnimal('penguin').count
            if (penguin >= 4 && !this.achives[0].done) {
                this.achives[0].done = true
                return true
            }
        },
        monkey() {
            const animalsStore = useAnimalsStore()
            const monkey = animalsStore.getAnimal('monkey').count
            if (monkey > 6 && !this.achives[1].done) {
                this.achives[1].done = true
                return true
            }
        },
        superStar() {
            const animalsStore = useAnimalsStore()
            const zebra = animalsStore.getAnimal('zebra').count
            if (zebra > 2 && !this.achives[2].done) {
                this.achives[2].done = true
                return true
            }
        },
        firstLion() {
            const animalsStore = useAnimalsStore()
            const lion = animalsStore.getAnimal('lion').count
            if (lion > 0 && !this.achives[3].done) {
                this.achives[3].done = true
                return true
            }
        },
        bears() {
            const animalsStore = useAnimalsStore()
            const bear = animalsStore.getAnimal('bear').count
            if (bear >= 4 && !this.achives[4].done) {
                this.achives[4].done = true
                return true
            }
        },
        epidemy() {
            const animalsStore = useAnimalsStore()
            const dumbo = animalsStore.getAnimal('dumbo').count
            if (dumbo >= 1 && !this.achives[5].done) {
                this.achives[5].done = true
                return true
            }
        }
    }
})