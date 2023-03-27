import type { Client } from "@/clients/interface/client";
import clientsApi from "@/api/clients-api";
import { useQuery } from "@tanstack/vue-query";
import { useClientsStore } from "../../store/clients";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const getClients = async (page: number): Promise<Client[]> => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1500);
  });
  const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`);
  return data;
};

const useClients = () => {
  const store = useClientsStore();

  const { currentPage, clients, totalPage } = storeToRefs(store);

  const { isLoading, data } = useQuery(["clientes?page=", currentPage], () =>
    getClients(currentPage.value)
  );

  watch(data, (clients) => {
    if (clients) {
      store.setClients(clients);
    }
  });

  return {
    isLoading,
    clients,
    totalPage,
    currentPage,

    getPage(page: number) {
      store.setPage(page);
    },

    // totalPageNumbers: computed(() =>
    //   [...new Array(totalPage.value)].map((v, i) => i + 1)
    // ),
  };

  // getPage: store.setPage
};

export default useClients;
