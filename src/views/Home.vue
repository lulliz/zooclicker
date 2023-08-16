<template>
  <div @keydown.prevent="false" class="home bg-base-100 shadow-xl rounded-box mt-4 p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <div class="flex flex-col lg:flex-row gap-4">
      <div class="flex flex-row flex-wrap lg:flex-col justify-between lg:justify-normal gap-4 w-full lg:w-1/3 xl:w-1/5">
        <div class="stats w-full lg:w-auto border">
          <div class="stat flex justify-between">
            <button @click="budget.getCoin()" class="btn w-2/5 btn-success">Coin</button>
            <button @click="budget.getFood()" class="btn w-2/5 btn-warning">Food</button>
          </div>
        </div>
        <div class="stats border w-full md:w-2/5 lg:w-auto">
          <div class="stat">
            <div class="stat-figure text-primary">
              <p class="p-4 text-4xl">💰</p>
            </div>
            <div class="stat-title">Total Money</div>
            <div class="stat-value">{{ numberConverter(budget.money) }}</div>
          </div>
        </div>
        <div class="stats border w-full md:w-2/5 lg:w-auto">
          <div class="stat">
            <div class="stat-figure text-primary">
              <p class="p-4 text-4xl">🥕</p>
            </div>
            <div class="stat-title">Total Food</div>
            <div class="stat-value">{{ numberConverter(budget.foodCollected) }}</div>
          </div>
        </div>
        <div class="stats border w-full md:w-2/5 lg:w-auto">
          <div class="stat">
            <div class="stat-figure text-primary">
              <p class="p-4 text-4xl">🦊</p>
            </div>
            <div class="stat-title">Total Animals</div>
            <div class="stat-value">{{ numberConverter(budget.animalsPurchased) }}</div>
          </div>
        </div>
        <div class="stats border w-full md:w-2/5 lg:w-auto">
          <div class="stat">
            <div class="stat-figure text-primary">
              <p class="p-4 text-4xl">🧹</p>
            </div>
            <div class="stat-title">Total Clean</div>
            <div class="stat-value">{{ numberConverter(budget.clean) }}</div>
          </div>
        </div>
      </div>
      <div class="zoo-garden grid rounded-2xl md:w-full xl:w-4/5">
        <div class="row">
          <div ref="cell" class="col relative rounded-tl-xl border border-green-600">
            <img v-for="(rabbit, rabbitIndex) in allAnimals.rabbit.list.value" :key="rabbitIndex"
            src="@/assets/icons/rabbit.png" alt="" 
            class="absolute transition-all duration-1000 w-1/5 md:w-1/6 drop-shadow"
            :style="{
              top: rabbit.top + 'px',
              left: rabbit.left + 'px',
              transitionDelay: rabbit.delay + 's'
            }">
          </div>
          <div ref="cell" class="col relative border border-amber-700">
            <img v-for="(fox, foxIndex) in allAnimals.fox.list.value" :key="foxIndex"
            src="@/assets/icons/fox.png" alt="" 
            class="absolute transition-all duration-1000 w-1/5 md:w-1/6 drop-shadow"
            :style="{
              top: fox.top + 'px',
              left: fox.left + 'px',
              transitionDelay: fox.delay + 's'
            }">
          </div>
          <div ref="cell" class="col rounded-tr-xl border border-sky-800"></div>
        </div>
        <div class="row">
          <div class="col border border-teal-700"></div>
          <div class="col border border-yellow-700"></div>
          <div class="col border border-emerald-600"></div>
        </div>
        <div class="row">
          <div class="col rounded-bl-xl border border-teal-800"></div>
          <div class="col border border-emerald-800"></div>
          <div class="col rounded-br-xl border border-violet-600"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useBudgetStore } from '@/stores/budget.js'
import { useAnimalsStore } from '@/stores/animals.js'

const budget = useBudgetStore()
const animals = useAnimalsStore()

// корректное оторажение чисел
const numberConverter = (value) => {
  if (value > 999 && value < 1000000) {
    return (Math.floor(value) / 1000).toFixed(1) + 'k'
  } else if (value > 999999) {
    return (Math.floor(value) / 1000000).toFixed(1) + 'm'
  } else {
    return Math.floor(value)
  }
}


const allAnimals = {
  rabbit: {
    count: ref(animals.getAnimal('rabbit').count), 
    list: ref([])
  },
  fox: {
    count: ref(animals.getAnimal('fox').count),
    list: ref([]) 
  },
  // etc
}

function generateAnimalList(count) {
  const list = []
  for(let i = 0; i < count; i++) {  
    list.push({
      id: i,
      top: 0, 
      left: 0,
      delay: 0.1
    })
  }
  return list
}

function watchAndGenerateList(animal) {
  watch(animal.count, (count) => {
    animal.list.value = generateAnimalList(count)  
  })
  animal.list.value = generateAnimalList(animal.count.value)
}


function setRandomPositions(list, h, w) {
  list.forEach(item => {
    item.top = Math.floor(Math.random() * h)
    item.left = Math.floor(Math.random() * w)
    item.delay = (Math.random() + 3)
  })
}

const cell = ref(null)
onMounted(() => {
  const h = cell.value.offsetHeight - 33;
  const w = cell.value.offsetWidth - 33;
  watchAndGenerateList(allAnimals.rabbit)
  watchAndGenerateList(allAnimals.fox)
  
  setRandomPositions(allAnimals.rabbit.list.value, h, w)
  setRandomPositions(allAnimals.fox.list.value, h, w) 
  setInterval(() => {
    setRandomPositions(allAnimals.rabbit.list.value, h, w)
    setRandomPositions(allAnimals.fox.list.value, h, w) 
  }, 5000)
})
</script>

<style scoped>
.row {
  display: flex;
  min-height: 7rem;
}

.col {
  flex: 1;
  background-image: repeating-linear-gradient(45deg, hsl(var(--b1)), hsl(var(--b1)) 13px, hsl(var(--b2)) 13px, hsl(var(--b2)) 14px);
  /* border: 1px solid; */
}
</style>