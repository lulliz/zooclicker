<template>
  <div class="bg-base-100 w-11/12 xl:w-3/4 m-auto">
    <header class="sticky top-0 z-30">
      <div class="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 navbar bg-base-100 shadow-xl rounded-box mt-4">
        <div class="hidden md:block col-span-1">
          <a class="btn btn-ghost normal-case text-xl">Zoo Clicker</a>
        </div>
        <div v-if="route.path != '/'" class="justify-center hidden lg:block">
          <a class="btn btn-ghost normal-case text-xl">💰 {{ numberConverter(budget.money) }}</a>
          <!-- <a class="btn btn-ghost normal-case text-xl">🦊 {{ numberConverter(budget.animalsPurchased) }}</a> -->
          <a class="btn btn-ghost normal-case text-xl">🥕 {{ numberConverter(budget.foodCollected) }}</a>
          <a class="btn btn-ghost normal-case text-xl">🧹 {{ numberConverter(budget.clean) }}</a>
        </div>
        <div v-if="route.path == '/'" class="md:hidden lg:block"></div>
        <div class="">
          <RouterLink to="/store" class="btn btn-square btn-ghost text-xl">
            <font-awesome-icon icon="store" />
          </RouterLink>
          <RouterLink to="/handbook" class="btn btn-square btn-ghost text-xl">
            <font-awesome-icon icon="book" />
          </RouterLink>
          <RouterLink to="/" class="btn btn-square btn-ghost text-xl">
            <font-awesome-icon icon="paw" />
          </RouterLink>
        </div>
      </div>
    </header>
    <div class="wrapper mt-4">
      <RouterView />
    </div>
    <footer class="flex justify-center navbar bg-base-100 shadow-xl rounded-box my-4">
      <p class="text-center">Made with <font-awesome-icon icon="heart" class="ml-2 hover:text-accent" /></p>
      <!-- Thanks https://www.flaticon.com/ for all icons -->
    </footer>
    <Modal></Modal>
    <dialog id="finaleModal" class="modal modal-bottom sm:modal-middle" :class="budget.winner ? 'modal-open' : ''">
      <form method="dialog" class="modal-box w-full md:w-4/5 xl:w-2/3">
        <h3 class="font-bold text-lg mb-2">Finale email</h3>
        <img src="@/assets/icons/ticket.png" alt="new game" class="w-1/3 m-auto block my-2">
        <h2 class="text-xl py-2">🎉 This is Julia again and I have something to congratulate you on! 🎉</h2>
        <p class="text-lg py-2">Looks like things are going great at the zoo and you deserve that "golden ticket".</p>
        <p class="text-lg py-2">It will allow you to create your own zoo, start all over again 😉</p>
        <p class="text-lg py-2">It was a pleasure to work with you. You rock!</p>
        <div class="modal-action">
          <button class="btn" @click="budget.newGamePlus()">New Game</button>
        </div>
      </form>
    </dialog>
    <dialog id="sadModal" class="modal modal-bottom sm:modal-middle" :class="budget.loser ? 'modal-open' : ''">
      <form method="dialog" class="modal-box w-full md:w-4/5 xl:w-2/3">
        <h3 class="font-bold text-lg mb-2">Sad email</h3>
        <img src="@/assets/icons/sad.png" alt="new game" class="w-1/3 m-auto block my-2">
        <h2 class="text-xl py-2">😔 This is Julia and I'm really upset...</h2>
        <p class="text-lg py-2">I hope you do better next time.</p>
        <div class="modal-action">
          <button class="btn" @click="budget.gameOver()">Restart</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useBudgetStore } from '@/stores/budget.js'
import Modal from '@/components/Modal.vue'
import { onMounted } from 'vue';
import { numberConverter } from './helpers/converter';

const budget = useBudgetStore()
const route = useRoute()


onMounted(() => {
  budget.income()
})
</script>

<style scoped></style>
