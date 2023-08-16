<template>
  <div class="bg-base-100 w-11/12 xl:w-3/4 m-auto">
    <header class="">
      <div class="grid grid-cols-1 md:grid-cols-3 md:justify-items-center navbar bg-base-100 shadow-xl rounded-box mt-4">
        <div class="col-span-1">
          <a class="btn btn-ghost normal-case text-xl">Zoo Clicker</a>
        </div>
        <div v-if="route.path != '/'" class="col-span-2 md:col-span-1 order-3 md:order-2">
          <a class="btn btn-ghost normal-case text-xl">💰 {{ numberConverter(budget.money) }}</a>
          <!-- <a class="btn btn-ghost normal-case text-xl">🦊 {{ numberConverter(budget.animalsPurchased) }}</a> -->
          <a class="btn btn-ghost normal-case text-xl">🥕 {{ numberConverter(budget.foodCollected) }}</a>
          <a class="btn btn-ghost normal-case text-xl">🧹 {{ numberConverter(budget.clean) }}</a>
        </div>
        <div v-if="route.path == '/'"></div>
        <div class="col-span-1 order-2 md:order-3">
          <RouterLink to="/store" class="btn btn-square btn-ghost text-xl">
            <font-awesome-icon icon="store" />
          </RouterLink>
          <RouterLink to="/handbook" class="btn btn-square btn-ghost text-xl">
            <font-awesome-icon icon="book" />
          </RouterLink>
          <RouterLink to="/" class="btn btn-square btn-ghost text-xl">
            <font-awesome-icon icon="paw" />
          </RouterLink>
        </div>
      </div>
    </header>
    <div class="wrapper mt-4">
      <RouterView />
    </div>
    <footer class="flex justify-center navbar bg-base-100 shadow-xl rounded-box my-4">
      <p class="text-center">Made with <font-awesome-icon icon="heart" class="ml-2 hover:text-accent" /></p>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useBudgetStore } from '@/stores/budget.js'
import { onMounted } from 'vue';

const budget = useBudgetStore()
const route = useRoute()

const numberConverter = (value) => {
  if (value > 999 && value < 1000000) {
    return (Math.floor(value) / 1000).toFixed(1) + 'k' 
  } else if (value > 999999) {
    return (Math.floor(value) / 1000000).toFixed(1) + 'm'
  } else {
    return Math.floor(value)
  }
}

onMounted(() => {
  budget.income()
})
</script>

<style scoped></style>
