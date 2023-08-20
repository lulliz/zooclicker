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
  <!-- <td v-if="(hType.count > 0 || hType.unlock) && (typeIt == 'animal' || typeIt == 'extra')"
          class="text-success text-center">+ {{ numberConverter(hType.income) }}</td> -->
</template>

<script setup>

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

const numberConverter = (value) => {
  if (value > 999 && value < 1000000) {
    return (Math.floor(value) / 1000).toFixed(2) + 'k'
  } else if (value > 999999) {
    return (Math.floor(value) / 1000000).toFixed(2) + 'm'
  } else {
    return value.toFixed(2)
  }
}

const getImage = (name) => new URL(`../assets/icons/${name}.png`, import.meta.url).href
</script>