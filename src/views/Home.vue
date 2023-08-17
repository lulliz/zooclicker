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
            <div class="stat-value text-3xl">{{ numberConverter(budget.money) }}</div>
            <div class="stat-desc">Auto: {{ numberConverter(budget.autoClick) }}/sec</div>
          </div>
        </div>
        <div class="stats border w-full md:w-2/5 lg:w-auto">
          <div class="stat">
            <div class="stat-figure text-primary">
              <p class="p-4 text-4xl">🥕</p>
            </div>
            <div class="stat-title">Total Food</div>
            <div class="stat-value text-3xl">{{ numberConverter(budget.foodCollected) }}</div>
            <div class="stat-desc">Auto: {{ numberConverter(budget.autoFood) }}/sec</div>
          </div>
        </div>
        <div class="stats border w-full md:w-2/5 lg:w-auto">
          <div class="stat">
            <div class="stat-figure text-primary">
              <p class="p-4 text-4xl">🧹</p>
            </div>
            <div class="stat-title">Total Clean</div>
            <div class="stat-value text-3xl">{{ numberConverter(budget.clean) }}</div>
            <div class="stat-desc">Auto: {{ numberConverter(budget.autoClean) }}/sec</div>
          </div>
        </div>
        <div class="stats border w-full md:w-2/5 lg:w-auto">
          <div class="stat">
            <div class="stat-figure text-primary">
              <p class="p-4 text-4xl">🦊</p>
            </div>
            <div class="stat-title">Total Animals</div>
            <div class="stat-value text-3xl">{{ numberConverter(budget.animalsPurchased) }}</div>
          </div>
        </div>
      </div>
      <div class="zoo-garden grid rounded-2xl md:w-full xl:w-4/5">
        <div class="row">
          <div ref="cage" class="col relative rounded-tl-xl border border-green-600">
            <img v-for="(rabbit, rabbitIndex) in allAnimals.rabbit.list.value" :key="rabbitIndex"
              src="@/assets/icons/rabbit.png" alt="" class="absolute transition-all w-1/5 md:w-1/6 drop-shadow" :style="{
                top: rabbit.top + 'px',
                left: rabbit.left + 'px',
                transitionDelay: rabbit.delay + 's',
                transitionDuration: rabbit.speed + 's'
              }">
          </div>
          <div class="col relative border border-amber-700">
            <img v-for="(fox, foxIndex) in allAnimals.fox.list.value" :key="foxIndex" src="@/assets/icons/fox.png" alt=""
              class="absolute transition-all w-1/5 md:w-1/6 drop-shadow" :style="{
                top: fox.top + 'px',
                left: fox.left + 'px',
                transitionDelay: fox.delay + 's',
                transitionDuration: fox.speed + 's'
              }">
          </div>
          <div ref="cell" class="col relative rounded-tr-xl border border-sky-800">
            <img v-for="(penguin, penguinIndex) in allAnimals.penguin.list.value" :key="penguinIndex"
              src="@/assets/icons/penguin.png" alt="" class="absolute transition-all w-1/5 md:w-1/6 drop-shadow" :style="{
                top: penguin.top + 'px',
                left: penguin.left + 'px',
                transitionDelay: penguin.delay + 's',
                transitionDuration: penguin.speed + 's'
              }">
          </div>
        </div>
        <div class="row">
          <div class="col relative border border-emerald-600">
            <img v-for="(monkey, monkeyIndex) in allAnimals.monkey.list.value" :key="monkeyIndex"
              src="@/assets/icons/monkey.png" alt="" class="absolute transition-all w-1/5 drop-shadow" :style="{
                top: monkey.top + 'px',
                left: monkey.left + 'px',
                transitionDelay: monkey.delay + 's',
                transitionDuration: monkey.speed + 's'
              }">
          </div>
          <div class="col relative border border-teal-700">
            <img v-for="(zebra, zebraIndex) in allAnimals.zebra.list.value" :key="zebraIndex"
              src="@/assets/icons/zebra.png" alt="" class="absolute transition-all w-1/4 drop-shadow" :style="{
                top: zebra.top + 'px',
                left: zebra.left + 'px',
                transitionDelay: zebra.delay + 's',
                transitionDuration: zebra.speed + 's'
              }">
          </div>
          <div class="col relative border border-yellow-700">
            <img v-for="(lion, lionIndex) in allAnimals.lion.list.value" :key="lionIndex" src="@/assets/icons/lion.png"
              alt="" class="absolute transition-all w-1/4 drop-shadow" :style="{
                top: lion.top + 'px',
                left: lion.left + 'px',
                transitionDelay: lion.delay + 's',
                transitionDuration: lion.speed + 's'
              }">
          </div>
        </div>
        <div class="row">
          <div class="col relative rounded-bl-xl border border-teal-800">
            <img v-for="(bear, bearIndex) in allAnimals.bear.list.value" :key="bearIndex" src="@/assets/icons/bear.png"
              alt="" class="absolute transition-all w-[30%] drop-shadow" :style="{
                top: bear.top + 'px',
                left: bear.left + 'px',
                transitionDelay: bear.delay + 's',
                transitionDuration: bear.speed + 's'
              }">
          </div>
          <div class="col relative border border-emerald-800">
            <img v-for="(dumbo, dumboIndex) in allAnimals.dumbo.list.value" :key="dumboIndex"
              src="@/assets/icons/dumbo.png" alt="" class="absolute transition-all w-[42%] drop-shadow" :style="{
                top: dumbo.top + 'px',
                left: dumbo.left + 'px',
                transitionDelay: dumbo.delay + 's',
                transitionDuration: dumbo.speed + 's'
              }">
          </div>
          <div class="col relative rounded-br-xl border border-violet-600">
            <img v-for="(dino, dinoIndex) in allAnimals.dino.list.value" :key="dinoIndex" src="@/assets/icons/dino.png"
              alt="" class="absolute transition-all w-[60%] drop-shadow" :style="{
                top: dino.top + 'px',
                left: dino.left + 'px',
                transitionDelay: dino.delay + 's',
                transitionDuration: dino.speed + 's'
              }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
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
  penguin: {
    count: ref(animals.getAnimal('penguin').count),
    list: ref([])
  },
  monkey: {
    count: ref(animals.getAnimal('monkey').count),
    list: ref([])
  },
  zebra: {
    count: ref(animals.getAnimal('zebra').count),
    list: ref([])
  },
  lion: {
    count: ref(animals.getAnimal('lion').count),
    list: ref([])
  },
  bear: {
    count: ref(animals.getAnimal('bear').count),
    list: ref([])
  },
  dumbo: {
    count: ref(animals.getAnimal('dumbo').count),
    list: ref([])
  },
  dino: {
    count: ref(animals.getAnimal('dino').count),
    list: ref([])
  },
}

function generateAnimalList(count) {
  const list = []
  for (let i = 0; i < count; i++) {
    list.push({
      id: i,
      top: 0,
      left: 0,
      speed: 1,
      delay: 0,
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


function setRandomPositions(list) {
  maxTop.value = cage.value.offsetHeight - ballSize
  maxLeft.value = cage.value.offsetWidth - ballSize

  const then = ref(Date.now())
  list.forEach(item => {
    item.top = Math.floor(Math.random() * maxTop.value)
    item.left = Math.floor(Math.random() * maxLeft.value)
  })
  function animate() {
    const delta = Date.now() - then.value;
    if (delta < 5000) {
      requestAnimationFrame(animate);
      return;
    }
    then.value = Date.now();
    const randomItem = list[Math.floor(Math.random() * list.length)]
    randomItem.top = Math.floor(Math.random() * maxTop.value)
    randomItem.left = Math.floor(Math.random() * maxLeft.value)
    randomItem.delay = Math.random() * 5
    randomItem.speed = (Math.random() * 5) + 1
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

const ballSize = 40
const cage = ref(null)
const maxTop = ref(0)
const maxLeft = ref(0)


onMounted(() => {
  watchAndGenerateList(allAnimals.rabbit)
  watchAndGenerateList(allAnimals.fox)
  watchAndGenerateList(allAnimals.penguin)
  watchAndGenerateList(allAnimals.monkey)
  watchAndGenerateList(allAnimals.zebra)
  watchAndGenerateList(allAnimals.lion)
  watchAndGenerateList(allAnimals.bear)
  watchAndGenerateList(allAnimals.dumbo)
  watchAndGenerateList(allAnimals.dino)

  // maxTop.value = cage.value.offsetHeight - ballSize
  // maxLeft.value = cage.value.offsetWidth - ballSize

  setRandomPositions(allAnimals.rabbit.list.value)
  setRandomPositions(allAnimals.fox.list.value)
  setRandomPositions(allAnimals.penguin.list.value)
  setRandomPositions(allAnimals.monkey.list.value)
  setRandomPositions(allAnimals.zebra.list.value)
  setRandomPositions(allAnimals.lion.list.value)
  setRandomPositions(allAnimals.bear.list.value)
  setRandomPositions(allAnimals.dumbo.list.value)
  setRandomPositions(allAnimals.dino.list.value)
})
</script>

<style scoped>
.row {
  display: flex;
  min-height: 7rem;
}

.col {
  flex: 1;
  overflow: hidden;
  background-image: repeating-linear-gradient(45deg, hsl(var(--b1)), hsl(var(--b1)) 13px, hsl(var(--b2)) 13px, hsl(var(--b2)) 14px);
  /* border: 1px solid; */
}
</style>