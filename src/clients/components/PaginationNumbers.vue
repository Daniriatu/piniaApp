<script setup lang="ts">
import { toRef, ref, watch } from "vue";
// import useClients from "../composables/useClients";

// const { getPage, totalPageNumbers, currentPage, totalPages } = useClients();

interface Props {
  totalPages: number;
  currentPage: number;
}

interface Emits {
  (e: "pageChanged", page: number): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const totalPages = toRef(props, "totalPages");
const currentPage = toRef(props, "currentPage");

const totalPageNumbers = ref<number[]>([]);

watch(
  totalPages,
  () => {
    totalPageNumbers.value = [...new Array(totalPages.value)].map(
      (v, i) => i + 1
    );
  },
  { immediate: true }
);

// const { getPage } = useClients();
</script>

<template>
  <button
    :disabled="currentPage === 1"
    @click="emits('pageChanged', currentPage - 1)"
  >
    Anterior
  </button>
  <button
    v-for="number of totalPageNumbers"
    :key="number"
    @click="emits('pageChanged', number)"
    :class="{ active: currentPage === number }"
  >
    {{ number }}
  </button>
  <button
    :disabled="currentPage === totalPages"
    @click="emits('pageChanged', currentPage + 1)"
  >
    Siguiente
  </button>
</template>

<style scoped></style>
