<template>
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="achivModal" class="modal" :class="{'modal-open': isOpen}">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">{{ achive.achives[currentItemIndex].name }}</h3>
            <p class="py-4 text-lg">{{ achive.achives[currentItemIndex].text }}</p>
            <p class="p-4 border rounded-xl">And now... {{ achive.achives[currentItemIndex].present }}</p>
            
            <div class="modal-action">
                <button class="btn" @click="closeModal()">Close</button>
            </div>
        </form>
    </dialog>
</template>

<script setup>
import { useAchiveStore } from '@/stores/achievements.js'
import { watch, ref } from 'vue'
import { numberConverter } from '../helpers/converter';

const achive = useAchiveStore()

const isOpen = ref(false) 

function closeModal() {
  isOpen.value = false
}

let currentItemIndex = ref(0)

function openModal(index) {
  currentItemIndex.value = index  
  isOpen.value = true
}

achive.achives.forEach((item, index) => {

  watch(() => item.done, newDone => {
    if(newDone && item.done && !item.viewed) {
      openModal(index)
      achive.getAchive(item.name).viewed = true
    }  
  })
})
</script>