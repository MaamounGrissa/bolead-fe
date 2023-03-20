import { initialClient } from "@app/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ClientState = {
    totalCount: 0,
    client: initialClient,
    clients: [],
    clientStatus: [],
    clientsList: [],
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        getClients: (state, action: PayloadAction<IClient[]>) => {
            state.clients = action.payload;
        },
        getClient: (state, action: PayloadAction<number>) => {
            const index = state.clients.findIndex(client => client.id === action.payload);
            state.client = state.clients[index];
        },
        addClient: (state, action: PayloadAction<IClient>) => {
            state.clients.push(action.payload);
            state.totalCount++;
        },
        updateClient: (state, action: PayloadAction<IClient>) => {
            const index = state.clients.findIndex(client => client.id === action.payload.id);
            state.clients[index] = action.payload;
        },
        deleteClient: (state, action: PayloadAction<number>) => {
            const index = state.clients.findIndex(client => client.id === action.payload);
            state.clients.splice(index, 1);
            state.totalCount--;
        },
        getClientStatus: (state, action: PayloadAction<IClientStatus[]>) => {
            state.clientStatus = action.payload.map((status) => {
                return {id: status.id, status: status.status};
            });
        },
        getClientsList: (state, action: PayloadAction<IClient[]>) => {
            state.clientsList = action.payload?.map((client) => {
                return {
                    id: client.id || 0,
                    uuid: client.uuid || '',
                    name: `${client.contact?.firstName} ${client.contact?.lastName}`,                };
            });
        },
        setClientsTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
    }
});

export const { getClients, getClient, addClient, updateClient, deleteClient, getClientStatus, getClientsList, setClientsTotalCount } = clientSlice.actions;
export default clientSlice.reducer;