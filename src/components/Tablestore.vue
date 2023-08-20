<template>
  <div v-if="hType.unlock" class="card card-compact bg-base-100 border relative">
    <div class="card-body">
      <div class="flex gap-2 absolute right-4 top-4">
        <div class="btn btn-xs btn-outline btn-neutral border">💰 {{ numberConverter(hType.price) }}</div>
        <div class="btn btn-xs btn-outline btn-neutral border">{{ hType.count }} / {{ hType.max }}</div>
      </div>
      <h2 class="card-title capitalize">{{ hType.name }}</h2>
      <div class="flex gap-4 my-4">
        <img :src="getImage(hType.name)" alt="Avatar" class="w-1/6 m-auto" />
        <p class="first-letter:uppercase">{{ hType.desc }}</p>
      </div>
      <div class="flex gap-4">
        <div class="btn btn-xs lg:btn-sm btn-outline border" 
        :class="(typeIt == 'worker' || typeIt == 'extra') ? 'btn-success' : 'btn-error'">🥕 {{ numberConverter(hType.food) }}</div>
        <div class="btn btn-xs lg:btn-sm btn-outline border" 
        :class="(typeIt == 'worker' || typeIt == 'extra') ? 'btn-success' : 'btn-error'">🧹 {{ numberConverter(hType.clean) }}</div>
        <div class="btn btn-xs lg:btn-sm btn-outline border" 
        :class="(typeIt == 'animal' || typeIt == 'extra') ? 'btn-success' : 'btn-error'">💰 {{ numberConverter(hType.income) }}</div>
      </div>
    </div>
  </div>
  <div v-if="!hType.unlock" class="card card-compact bg-base-100 border relative">
        <div class="card-body grayscale">
            <img src="@/assets/icons/profits.png" alt="Avatar" class="w-1/5 mx-auto my-8" />
            <button class="btn btn-error col-span-2 touch-manipulation">Need {{ numberConverter(hType.price) }}</button>
        </div>
    </div>
</template>

<script setup>
import { useBudgetStore } from '@/stores/budget.js'
import { watchEffect } from 'vue'
import { numberConverter } from '../helpers/converter';

const budget = useBudgetStore()

const props = defineProps({
  hType: {
    type: Object,
    required: true,
  },
  typeIt: {
    type: String,
    required: true,
  }
})

watchEffect(() => {
    if (budget.money >= props.hType.price && !props.hType.unlock) {
        props.hType.unlock = true
    }
})


const getImage = (name) => new URL(`../assets/icons/${name}.png`, import.meta.url).href
</script>