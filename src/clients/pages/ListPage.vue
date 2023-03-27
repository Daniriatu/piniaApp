<script setup lang="ts">
import ClientList from "@/clients/components/ClientList.vue";
import LoadingModal from "@/shared/components/LoadingModal.vue";
import PaginationNumbers from "../components/PaginationNumbers.vue";
import useClients from "../composables/useClients";

const { isLoading, clients, currentPage, totalPage, getPage } = useClients();
</script>

<template>
  <h1>Listado de clientes</h1>

  <ClientList :clients="clients" />

  <PaginationNumbers
    :current-page="currentPage"
    :total-pages="totalPage"
    @page-changed="getPage"
  />

  <!-- <h1 v-if="isLoading">Loading...</h1> -->

  <LoadingModal v-if="isLoading" />
</template>

<style scoped></style>
