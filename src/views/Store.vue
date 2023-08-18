<template>
  <div class="store bg-base-100 shadow-xl rounded-box mt-4 p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-4">Store</h1>
    <div class="collapse collapse-arrow bg-base-100 mb-4 border">
      <input type="radio" name="my-accordion-1" checked="checked" />
      <div class="collapse-title text-xl font-medium">
        Animals
      </div>
      <div class="collapse-content">
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <Animalcard v-for="(animal, animalIndex) in animalStore.animals" :key="animalIndex" :animal=animal></Animalcard>
        </div>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-100 mb-4 border">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">
        Workers
      </div>
      <div class="collapse-content">
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <Workercard v-for="(worker, workerIndex) in workersStore.workers" :key="workerIndex" :worker=worker></Workercard>
        </div>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-100 mb-4 border">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">
        Extra
      </div>
      <div class="collapse-content">
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <Extracard v-for="(extra, extraIndex) in extraStore.extra" :key="extraIndex" :extra=extra></Extracard>
        </div>
      </div>
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

const animalStore = useAnimalsStore()
const workersStore = useWorkersStore()
const extraStore = useExtraStore()

</script>

<style scoped></style>
