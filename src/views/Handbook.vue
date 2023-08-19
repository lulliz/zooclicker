<template>
  <div class="handbook bg-base-100 shadow-xl rounded-box mt-4 p-4 md:p-8">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Handbook</h1>
      <button class="btn btn-sm btn-neutral" onclick="rulesModal.showModal()">Rules</button>
    </div>
    <div class="overflow-x-auto">
      <div class="divider sticky left-0 right-0">Animals</div>
      <Tablestore :typeStore="animalStore.animals" :typeIt="'animal'"></Tablestore>
      <div class="divider sticky left-0 right-0">Workers</div>
      <Tablestore :typeStore="workersStore.workers" :typeIt="'worker'"></Tablestore>
      <div class="divider sticky left-0 right-0">Extra</div>
      <Tablestore :typeStore="extraStore.extra" :typeIt="'extra'"></Tablestore>
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

const animalStore = useAnimalsStore()
const workersStore = useWorkersStore()
const extraStore = useExtraStore()
</script>

<style scoped></style>
