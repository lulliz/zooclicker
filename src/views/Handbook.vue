<template>
  <div class="handbook bg-base-100 shadow-xl rounded-box mt-4 p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-4">Handbook</h1>
    <div class="overflow-x-auto">
      <table class="table table-pin-cols table-pin-rows">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <td>Description</td>
            <td class="text-center">Max</td>
            <td class="text-center">Price</td>
            <!-- <td class="text-center">Health</td> -->
            <td class="text-center">Food</td>
            <td class="text-center">Clean</td>
            <td class="text-center">Income</td>
          </tr>
        </thead>
        <tbody>
          <!-- rows animals -->
          <tr v-for="(animal, animalIndex) in animalStore.animals" :key="animalIndex">
            <th v-if="animal.count > 0 || animal.unlock" class="">
              <div class="flex items-center space-x-3">
                <div class="avat">
                  <div class="w-12 h-12 flex">
                    <img :src="`/src/assets/icons/${animal.name}.png`" alt="Avatar" class="w-4/5 m-auto" />
                  </div>
                </div>
                <div>
                  <div class="font-bold capitalize">{{ animal.name }}</div>
                  <!-- <div class="text-sm opacity-50">animal</div> -->
                </div>
              </div>
            </th>
            <td v-if="animal.count > 0 || animal.unlock" class="min-w-[12rem] md:w-80">{{ animal.desc }}</td>
            <td v-if="animal.count > 0 || animal.unlock" class="text-center">{{ animal.count }} / {{ animal.max }}</td>
            <td v-if="animal.count > 0 || animal.unlock" class="text-center">{{ numberConverter(animal.price) }}</td>
            <!-- <td v-if="animal.count > 0 || animal.unlock" class="text-success text-center">{{ numberConverter(animal.health) }}</td> -->
            <td v-if="animal.count > 0 || animal.unlock" class="text-error text-center">- {{ numberConverter(animal.food) }}</td>
            <td v-if="animal.count > 0 || animal.unlock" class="text-error text-center">- {{ numberConverter(animal.clean) }}</td>
            <td v-if="animal.count > 0 || animal.unlock" class="text-success text-center">+ {{ numberConverter(animal.income) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="divider sticky left-0 right-0">Workers</div>
      <table class="table table-pin-cols table-pin-rows">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <td>Description</td>
            <td class="text-center">Max</td>
            <td class="text-center">Price</td>
            <!-- <td class="text-center">Health</td> -->
            <td class="text-center">Food</td>
            <td class="text-center">Clean</td>
            <td class="text-center">Salary</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(worker, workerIndex) in workersStore.workers" :key="workerIndex">
            <th v-if="worker.count > 0 || worker.unlock">
              <div class="flex items-center space-x-3">
                <div class="avat">
                  <div class="w-12 h-12 flex">
                    <img :src="`/src/assets/icons/${worker.name}.png`" alt="Avatar" class="w-4/5 m-auto" />
                  </div>
                </div>
                <div>
                  <div class="font-bold capitalize">{{ worker.name }}</div>
                  <!-- <div class="text-sm opacity-50">worker</div> -->
                </div>
              </div>
            </th>
            <td v-if="worker.count > 0 || worker.unlock" class="min-w-[12rem] md:w-80">{{ worker.desc }}</td>
            <td v-if="worker.count > 0 || worker.unlock" class="text-center">{{ worker.count }} / {{ worker.max }}</td>
            <td v-if="worker.count > 0 || worker.unlock" class="text-center">{{ numberConverter(worker.price) }}</td>
            <!-- <td v-if="worker.count > 0 || worker.unlock" class="text-success text-center">+ {{ numberConverter(worker.health) }}</td> -->
            <td v-if="worker.count > 0 || worker.unlock" class="text-success text-center">+ {{ numberConverter(worker.food) }}</td>
            <td v-if="worker.count > 0 || worker.unlock" class="text-success text-center">+ {{ numberConverter(worker.clean) }}</td>
            <td v-if="worker.count > 0 || worker.unlock" class="text-error text-center">- {{ numberConverter(worker.salary) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useAnimalsStore } from '@/stores/animals.js'
import { useWorkersStore } from '@/stores/workers.js'

const animalStore = useAnimalsStore()
const workersStore = useWorkersStore()

const numberConverter = (value) => {
    if (value > 999 && value < 1000000) {
        return (Math.floor(value) / 1000).toFixed(2) + 'k'
    } else if (value > 999999) {
        return (Math.floor(value) / 1000000).toFixed(2) + 'm'
    } else {
        return value.toFixed(2)
    }
}
</script>

<style scoped></style>
