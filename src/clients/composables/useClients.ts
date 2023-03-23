import type { Client } from "@/clients/interface/client";
import clientsApi from '@/api/clients-api';

const getClients = async(): Promise<Client[]> => {

    const { data } = await clientsApi.get<Client[]>('/clients?_page=1');
    return data;
}

const useClients = () => {



    return {

    }
}

export default useClients;