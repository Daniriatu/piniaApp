<script setup lang="ts">
import LoadingModal from "@/shared/components/LoadingModal.vue";
import { useRoute, useRouter } from "vue-router";
import useClient from "../composables/useClient";
import { watch } from "vue";

const route = useRoute();

const router = useRouter();

const {
  client,
  isLoading,
  isError,
  clientMutation,
  updatedClient,
  isUpdating,
  updated,
} = useClient(+route.params.id);

// const onSubmit = () => {
//   console.log("submit");
// };

// const updatedClient = async (client: Client): Promise<Client> => {
//   await new Promise((resolve) => {
//     setTimeout(() => resolve(true), 1500);
//   });

//   const { data } = await clientsApi.patch<Client>(
//     `/clients/${client.id}`,
//     client
//   );
//   return data;
// };

// const clientMutation = useMutation(updatedClient);

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset();
  }, 1500);
});

watch(isError, () => {
  if (isError.value) {
    router.replace("/clients");
  }
});
</script>

<template>
  <h3 v-if="isUpdating">Guardando...</h3>
  <h3 v-if="updated">Guardado</h3>
  <LoadingModal v-if="isLoading" />

  <div v-if="client">
    <h1>{{ client.name }}</h1>

    <form @submit.prevent="updatedClient(client!)">
      <input type="text" placeholder="Nombre" v-model="client.name" />
      <br />
      <input type="text" placeholder="Dirección" v-model="client.address" />
      <br />
      <button type="submit" :disabled="isUpdating">Guardar</button>
    </form>
  </div>

  <code> {{ client }} </code>
</template>

<style scoped></style>
