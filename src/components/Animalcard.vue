<template>
    <div v-if="animal.unlock" class="card card-compact bg-base-100 border relative">
        <div class="card-body">
            <div class="flex gap-2 absolute right-4 top-4">
                <div class="btn btn-xs btn-outline btn-neutral border">💰 {{ numberConverter(animal.price) }}</div>
                <div class="btn btn-xs btn-outline btn-neutral border">{{ animal.count }}</div>
            </div>
            <h2 class="card-title capitalize">{{ animal.name }}</h2>
            <img :src="getImage(animal.name)" alt="Avatar" class="w-1/5 m-auto" />
            <div class="grid grid-cols-5 gap-2 md:gap-4 mt-4">
                <button @click="budget.buyAnimal(animal.name)" class="btn btn-success col-span-2 touch-manipulation"
                    :class="animal.price > budget.money ? 'btn-disabled' : ''">Buy <font-awesome-icon icon="paw" /></button>
                <div v-if="animal.count > 0 && animal.unlock" class="tooltip tooltip-warning tooltip-bottom" :data-tip="`Try Your luck for 💰${numberConverter(animal.price * 1.2)}`">
                    <button @click="budget.updateAnimal(animal.name)"
                        class="btn btn-warning touch-manipulation">
                        <font-awesome-icon icon="circle-up" /></button>
                </div>
                <button @click="budget.sellAnimal(animal.name)" v-if="animal.count > 0"
                    class="btn btn-error col-span-2 touch-manipulation">Sell
                    <font-awesome-icon icon="paw" /></button>
            </div>
        </div>
    </div>
    <div v-if="!animal.unlock" class="card card-compact bg-base-100 border relative">
        <div class="card-body grayscale">
            <img src="@/assets/icons/profits.png" alt="Avatar" class="w-1/5 mx-auto my-8" />
            <button class="btn btn-error col-span-2 touch-manipulation">Need {{ numberConverter(animal.price) }}</button>
        </div>
    </div>
</template>

<script setup>
import { useBudgetStore } from '@/stores/budget.js'
import { watchEffect } from 'vue'
import { numberConverter } from '../helpers/converter';

const budget = useBudgetStore()

const props = defineProps({
    animal: {
        type: Object,
        required: true,
    },
})

watchEffect(() => {
    if (budget.money >= props.animal.price && !props.animal.unlock) {
        props.animal.unlock = true
    }
})

const getImage = (name) => new URL(`../assets/icons/${name}.png`, import.meta.url).href
</script>