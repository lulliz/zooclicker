<template>
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
          <tr v-for="(type, typeIndex) in typeStore" :key="typeIndex">
            <th v-if="type.count > 0 || type.unlock" class="w-40">
              <div class="flex items-center">
                <div class="avat">
                  <div class="w-12 h-12 flex">
                    <img :src="getImage(type.name)" alt="Avatar" class="w-4/5 m-auto" />
                  </div>
                </div>
                <div>
                  <div class="ml-2 font-bold capitalize">{{ type.name }}</div>
                </div>
              </div>
            </th>
            <td v-if="type.count > 0 || type.unlock" class="min-w-[12rem] md:w-80 first-letter:uppercase">{{ type.desc }}</td>
            <td v-if="type.count > 0 || type.unlock" class="text-center min-w-[5rem]">{{ type.count }} / {{ type.max }}</td>
            <td v-if="type.count > 0 || type.unlock" class="text-center">{{ numberConverter(type.price) }}</td>
            <!-- <td v-if="worker.count > 0 || worker.unlock" class="text-success text-center">+ {{ numberConverter(worker.health) }}</td> -->
            <td v-if="(type.count > 0 || type.unlock) && (typeIt == 'worker' || typeIt == 'extra')" class="text-success text-center">+ {{ numberConverter(type.food) }}</td>
            <td v-if="(type.count > 0 || type.unlock) && (typeIt == 'worker' || typeIt == 'extra')" class="text-success text-center">+ {{ numberConverter(type.clean) }}</td>
            <td v-if="(type.count > 0 || type.unlock) && (typeIt == 'worker')" class="text-error text-center">- {{ numberConverter(type.income) }}</td>
            <td v-if="(type.count > 0 || type.unlock) && (typeIt == 'animal')" class="text-error text-center">- {{ numberConverter(type.food) }}</td>
            <td v-if="(type.count > 0 || type.unlock) && (typeIt == 'animal')" class="text-error text-center">- {{ numberConverter(type.clean) }}</td>
            <td v-if="(type.count > 0 || type.unlock) && (typeIt == 'animal' || typeIt == 'extra')" class="text-success text-center">+ {{ numberConverter(type.income) }}</td>

            <th v-if="!type.unlock" class="w-40">
              <div class="flex items-center">
                <div class="avat">
                  <div class="w-12 h-12 flex">
                    <img src="@/assets/icons/profits.png" alt="Avatar" class="w-4/5 m-auto grayscale" />
                  </div>
                </div>
                <div>
                  <div class="ml-2 font-bold capitalize blur-md">secret</div>
                </div>
              </div>
            </th>
            <td v-if="!type.unlock" class="blur-md">secret info :)</td>
            <td v-if="!type.unlock" class="blur-md">secret info :)</td>
            <td v-if="!type.unlock" class="blur-md">secret info :)</td>
            <td v-if="!type.unlock" class="blur-md">secret info :)</td>
            <td v-if="!type.unlock" class="blur-md">secret info :)</td>
            <td v-if="!type.unlock" class="blur-md">secret info :)</td>
            
          </tr>
        </tbody>
      </table>
</template>

<script setup>

const props = defineProps({
    typeStore: {
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