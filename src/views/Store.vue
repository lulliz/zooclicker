<template>
  <div class="store bg-base-100 shadow-xl rounded-box mt-4 p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-4">Store</h1>
    <div
      class="tabs tabs-boxed w-11/12 md:w-full xl:w-1/3 m-auto bg-base-100 p-4 md:border rounded-none rounded-t-xl md:rounded-xl md:mb-4 fixed bottom-0 right-0 left-0 md:relative z-20">
      <a @click="changeTab(0)" class="tab tab-lg cursor-pointer w-1/3"
        :class="currentTab == 0 ? 'tab-active' : ''">Workers</a>
      <a @click="changeTab(1)" class="tab tab-lg cursor-pointer w-1/3"
        :class="currentTab == 1 ? 'tab-active' : ''">Animals</a>
      <a @click="changeTab(2)" class="tab tab-lg cursor-pointer w-1/3"
        :class="currentTab == 2 ? 'tab-active' : ''">Extra</a>
    </div>
    <div class="gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3" :class="currentTab == 1 ? 'grid' : 'hidden'">
      <Animalcard v-for="(animal, animalIndex) in animalStore.animals" :key="animalIndex" :animal=animal></Animalcard>
    </div>
    <div class="gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4" :class="currentTab == 0 ? 'grid' : 'hidden'">
      <Workercard v-for="(worker, workerIndex) in workersStore.workers" :key="workerIndex" :worker=worker></Workercard>
    </div>
    <div class="gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4" :class="currentTab == 2 ? 'grid' : 'hidden'">
      <Extracard v-for="(extra, extraIndex) in extraStore.extra" :key="extraIndex" :extra=extra></Extracard>
    </div>
  </div>
</template>

<script setup>
import Animalcard from '@/components/Animalcard.vue'
import Workercard from '@/components/Workercard.vue'
import Extracard from '@/components/Extracard.vue'
import { useAnimalsStore } from '@/stores/animals.js'
import { useWorkersStore } from '@/stores/workers.js'
import { useExtraStore } from '@/stores/extra.js'

import { ref } from 'vue'

const animalStore = useAnimalsStore()
const workersStore = useWorkersStore()
const extraStore = useExtraStore()


const currentTab = ref(1)

const changeTab = (index) => {
  currentTab.value = index
}
</script>

<style scoped>
.tab-active {
  background-color: hsl(var(--in))!important;
}

@media screen and (max-width: 640px) {
  .tabs {
    box-shadow: 0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1);
  }
}
</style>
