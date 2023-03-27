import { ref, watch, computed } from 'vue';
import type { Client } from '../interface/client';
import { useQuery, useMutation } from '@tanstack/vue-query';
import clientsApi from '@/api/clients-api';

const getClient = async (id: number): Promise<Client> => {
  const { data } = await clientsApi.get(`/clients/${id}`)

  return data
}

const updatedClient = async (client: Client): Promise<Client> => {

  const { data } = await clientsApi.patch<Client>(
    `/clients/${client.id}`,
    client
  );
  return data;
};

const useClient = (id: number) => {

  const client = ref<Client>();

  const { isLoading, data, isError } = useQuery(
    ["client", id],
    () => getClient(id),
    { retry: false }
  );

  const clientMutation = useMutation(updatedClient);


  watch(data, () => {
    if (data.value) {
      client.value = { ...data.value }
    }
  }, { immediate: true })

  return {
    isLoading,
    client,
    isError,
    clientMutation,
    updatedClient: clientMutation.mutate,
    isUpdating: computed(() => clientMutation.isLoading.value),
    updated: computed(() => clientMutation.isSuccess.value)

  }
}

export default useClient;