<template>
  <div class="handbook bg-base-100 shadow-xl rounded-box mt-4 p-4 md:p-8">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Handbook</h1>
      <button class="btn btn-sm btn-neutral animate-pulse" onclick="rulesModal.showModal()">Rules</button>
    </div>
    <div
      class="tabs tabs-boxed w-11/12 md:w-full xl:w-1/3 m-auto bg-base-100 p-4 border rounded-none rounded-t-xl md:rounded-xl md:mb-4 fixed bottom-0 right-0 left-0 md:relative z-20">
      <a @click="changeTab(0)" class="tab tab-lg cursor-pointer w-1/3"
        :class="currentTab == 0 ? 'tab-active' : ''">Workers</a>
      <a @click="changeTab(1)" class="tab tab-lg cursor-pointer w-1/3"
        :class="currentTab == 1 ? 'tab-active' : ''">Animals</a>
      <a @click="changeTab(2)" class="tab tab-lg cursor-pointer w-1/3"
        :class="currentTab == 2 ? 'tab-active' : ''">Extra</a>
    </div>
    <div class="overflow-x-auto">
      <div class="gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3" :class="currentTab == 1 ? 'grid' : 'hidden'">
        <Tablestore v-for="(animal, animalIndex) in animalsStore.animals" :key="animalIndex" :hType=animal :typeIt="'animal'"></Tablestore>
      </div>
      <div class="gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3" :class="currentTab == 0 ? 'grid' : 'hidden'">
        <Tablestore v-for="(worker, workerIndex) in workersStore.workers" :key="workerIndex" :hType=worker :typeIt="'worker'"></Tablestore>
      </div>
      <div class="gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3" :class="currentTab == 2 ? 'grid' : 'hidden'">
        <Tablestore v-for="(extra, extraIndex) in extraStore.extra" :key="extraIndex" :hType=extra :typeIt="'extra'"></Tablestore>
      </div>
    </div>
    <dialog id="rulesModal" class="modal modal-bottom sm:modal-middle">
      <form method="dialog" class="modal-box w-full md:w-4/5 xl:w-2/3">
        <h3 class="font-bold text-lg">Rules</h3>
        <ol class="m-4 list-decimal">
          <li>Each click by default gives 1 coin, but for each corresponding pumping, you can double this value.</li>
          <li>You can exchange coins for food at the rate of 4 coins = 1 food.</li>
          <li>Each animal has its own value, eats food, pollutes the cage and generates income. There is also a limit on
            the number of animals of each species.</li>
          <li>Each employee has his own cost, feeds the animals, cleans the cages and he needs to pay a salary.</li>
          <li>There is also a system of upgrades. It is based on random - you will have to experiment :)</li>
        </ol>
        <p>The main goal is to collect all kinds of animals so that the zoo is profitable, the animals do not starve and
            live in a clean environment.</p>
        <div class="modal-action">
          <button class="btn">Close</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { useAnimalsStore } from '@/stores/animals.js'
import { useWorkersStore } from '@/stores/workers.js'
import { useExtraStore } from '@/stores/extra.js'
import Tablestore from '@/components/Tablestore.vue'
import { ref } from 'vue'

const animalsStore = useAnimalsStore()
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
</style>
