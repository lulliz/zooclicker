<template>
    <div v-if="worker.unlock" class="card card-compact bg-base-100 border relative">
        <div class="card-body">
            <div class="flex gap-2 absolute right-4 top-4">
                <div class="btn btn-xs btn-outline btn-neutral border">💰 {{ numberConverter(worker.price) }}</div>
                <div class="btn btn-xs btn-outline btn-neutral border">{{ worker.count }}</div>
            </div>
            <h2 class="card-title capitalize">{{ worker.name }}</h2>
            <img :src="getImage(worker.name)" alt="Avatar" class="w-1/5 m-auto" />
            <div class="grid grid-cols-5 gap-2 md:gap-4 mt-4">
                <button @click="budget.buyWorker(worker.name)" class="btn btn-md xl:btn-sm btn-success col-span-2 touch-manipulation"
                    :class="worker.price > budget.money || worker.count == worker.max ? 'btn-disabled' : ''">Hire <font-awesome-icon icon="paw" /></button>
                <div v-if="worker.count > 0 && worker.unlock" class="tooltip tooltip-warning tooltip-bottom"
                    :data-tip="`Try Your luck for 💰${numberConverter(worker.price * 1.2)}`">
                    <button @click="budget.updateWorker(worker.name)"
                        class="btn btn-md xl:btn-sm btn-warning touch-manipulation">
                        <font-awesome-icon icon="circle-up" /></button>
                </div>
                <button @click="budget.sellWorker(worker.name)" v-if="worker.count > 0"
                    class="btn btn-md xl:btn-sm btn-error col-span-2 touch-manipulation">Tire
                    <font-awesome-icon icon="paw" /></button>
            </div>
        </div>
    </div>
    <div v-if="!worker.unlock" class="card card-compact bg-base-100 border relative">
        <div class="card-body grayscale">
            <img src="@/assets/icons/profits.png" alt="Avatar" class="w-1/5 mx-auto my-8" />
            <button class="btn btn-error col-span-2 touch-manipulation">Need {{ numberConverter(worker.price) }}</button>
        </div>
    </div>
</template>
                
<script setup>
import { useBudgetStore } from '@/stores/budget.js'
import { watchEffect } from 'vue'
import { numberConverter } from '../helpers/converter';

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

const getImage = (name) => new URL(`../assets/icons/${name}.png`, import.meta.url).href
</script>