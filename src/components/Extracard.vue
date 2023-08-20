<template>
    <div v-if="extra.unlock" class="card card-compact bg-base-100 border relative">
        <div class="card-body">
            <div class="flex gap-2 absolute right-4 top-4">
                <div class="btn btn-xs btn-outline btn-neutral border">💰 {{ numberConverter(extra.price) }}</div>
                <div class="btn btn-xs btn-outline btn-neutral border">{{ extra.count }}</div>
            </div>
            <h2 class="card-title capitalize">{{ extra.name }}</h2>
            <img :src="getImage(extra.name)" alt="Avatar" class="w-1/5 m-auto" />
            <div class="grid grid-cols-5 gap-2 md:gap-4 mt-4">
                <button @click="budget.buyExtra(extra.name)" class="btn btn-md xl:btn-sm btn-success col-span-2 touch-manipulation"
                    :class="extra.price > budget.money ? 'btn-disabled' : ''">Buy <font-awesome-icon icon="paw" /></button>
                
            </div>
        </div>
    </div>
    <div v-if="!extra.unlock" class="card card-compact bg-base-100 border relative">
        <div class="card-body grayscale">
            <img src="@/assets/icons/profits.png" alt="Avatar" class="w-1/5 mx-auto my-8" />
            <button class="btn btn-error col-span-2 touch-manipulation">Need {{ numberConverter(extra.price) }}</button>
        </div>
    </div>
</template>

<script setup>
import { useBudgetStore } from '@/stores/budget.js'
import { watchEffect } from 'vue'
import { numberConverter } from '../helpers/converter';

const budget = useBudgetStore()

const props = defineProps({
    extra: {
        type: Object,
        required: true,
    },
})

watchEffect(() => {
    if (budget.money >= props.extra.price && !props.extra.unlock) {
        props.extra.unlock = true
    }
})

const getImage = (name) => new URL(`../assets/icons/${name}.png`, import.meta.url).href
</script>