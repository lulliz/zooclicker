<template>
    <div v-if="worker.unlock" class="card card-compact bg-base-100 border relative">
        <div class="card-body">
            <div class="flex gap-2 absolute right-4 top-4">
                <div class="btn btn-xs btn-outline btn-neutral border">💰 {{ numberConverter(worker.price) }}</div>
                <div class="btn btn-xs btn-outline btn-neutral border">{{ worker.count }}</div>
            </div>
            <h2 class="card-title capitalize">{{ worker.name }}</h2>
            <img :src="`/src/assets/icons/${worker.name}.png`" alt="Avatar" class="w-1/5 m-auto" />
            <div class="grid grid-cols-5 gap-2 md:gap-4 mt-4">
                <button @click="budget.buyWorker(worker.name)" class="btn btn-success col-span-2"
                    :class="worker.price > budget.money ? 'btn-disabled' : ''">Hire <font-awesome-icon icon="paw" /></button>
                <div v-if="worker.count > 0 && worker.unlock" class="tooltip tooltip-warning tooltip-bottom"
                    :data-tip="`Try Your luck for 💰${numberConverter(worker.price * 1.2)}`">
                    <button @click="budget.updateWorker(worker.name)"
                        class="btn btn-warning">
                        <font-awesome-icon icon="circle-up" /></button>
                </div>
                <button @click="budget.sellWorker(worker.name)" v-if="worker.count > 0"
                    class="btn btn-error col-span-2">Tire
                    <font-awesome-icon icon="paw" /></button>
            </div>
        </div>
    </div>
    <div v-if="!worker.unlock" class="card card-compact bg-base-100 border relative">
        <div class="card-body grayscale">
            <img src="@/assets/icons/profits.png" alt="Avatar" class="w-1/5 mx-auto my-8" />
            <button class="btn btn-error col-span-2">Need {{ numberConverter(worker.price) }}</button>
        </div>
    </div>
</template>
                
<script setup>
import { useBudgetStore } from '@/stores/budget.js'
import { watchEffect } from 'vue'

const budget = useBudgetStore()

const props = defineProps({
    worker: {
        type: Object,
        required: true,
    },
})

watchEffect(() => {
    if (budget.money >= props.worker.price && !props.worker.unlock) {
        props.worker.unlock = true
    }
})

const numberConverter = (value) => {
    if (value > 999 && value < 1000000) {
        return (Math.floor(value) / 1000).toFixed(2) + 'k'
    } else if (value > 999999) {
        return (Math.floor(value) / 1000000).toFixed(2) + 'm'
    } else {
        return Math.floor(value)
    }
}
</script>