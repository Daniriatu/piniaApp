<script setup lang="ts">
import useClients from "../composables/useClients";

const { getPage, totalPageNumbers, currentPage, totalPage } = useClients();
</script>

<template>
  <button :disabled="currentPage === 1" @click="getPage(currentPage - 1)">
    Anterior
  </button>
  <button
    v-for="number of totalPageNumbers"
    :key="number"
    @click="getPage(number)"
    :class="{ active: currentPage === number }"
  >
    {{ number }}
  </button>
  <button
    :disabled="currentPage === totalPage"
    @click="getPage(currentPage + 1)"
  >
    Siguiente
  </button>
</template>

<style scoped></style>
