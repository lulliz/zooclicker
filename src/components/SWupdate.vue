<template>
    <button v-if="hasUpdate" @click="updateSW" class="btn m-auto w-full lg:w-2/5 fixed top-4 z-50 right-0 left-0 btn-info touch-manipulation">
      Update
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { registerSW } from 'virtual:pwa-register'
  
  const hasUpdate = ref(false)
  
  onMounted(() => {
    registerSW({ 
      onNeedRefresh() {
        hasUpdate.value = true
      }
    })
  })
  
  const updateSW = () => {
    if (hasUpdate.value) {
      hasUpdate.value = false
    //   location.reload()
    }
  }
  </script>