import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ClientState = {
    client: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',  
        phone: '',
        status: 1,
        notes: '',
        address: '',
    },
    clients: [],
    clientStatus: [
        {id: 0, name: 'Sélectionner le statut'},
    ],
    clientsList: [
        {id: '0', name: 'Sélectionner le client'}
    ],
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        getClients: (state, action: PayloadAction<IClientAPI[]>) => {
            state.clients = action.payload?.map((client) => {
                return {
                    id: client.uuid || '', 
                    firstName: client.contact?.firstName  || '', 
                    lastName: client.contact?.lastName || '', 
                    email: client.contact?.email || '', 
                    phone: client.contact?.phone || '', 
                    status: client.status?.id || 0,
                    address: client.contact?.address?.street || '',
                    notes: '',
                };
            });
        },
        getClient: (state, action: PayloadAction<string>) => {
            const index = state.clients.findIndex(client => client.id === action.payload);
            state.client = state.clients[index];
        },
        addClient: (state, action: PayloadAction<IClient>) => {
            state.clients.push(action.payload);
        },
        updateClient: (state, action: PayloadAction<IClient>) => {
            const index = state.clients.findIndex(client => client.id === action.payload.id);
            state.clients[index] = action.payload;
        },
        deleteClient: (state, action: PayloadAction<string>) => {
            const index = state.clients.findIndex(client => client.id === action.payload);
            state.clients.splice(index, 1);
        },
        getClientStatus: (state, action: PayloadAction<IClientStatusAPI[]>) => {
            state.clientStatus = action.payload.map((status) => {
                return {id: status.id, name: status.status};
            });
        },
        getClientsList: (state, action: PayloadAction<IClientAPI[]>) => {
            state.clientsList = action.payload?.map((client) => {
                return {
                    id: client.uuid || '',
                    name: `${client.contact?.firstName} ${client.contact?.lastName}` || ''
                };
            });
        }
    }
});

export const { getClients, getClient, addClient, updateClient, deleteClient, getClientStatus, getClientsList } = clientSlice.actions;
export default clientSlice.reducer;