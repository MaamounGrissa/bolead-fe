import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ClientState = {
    client: {
        id: '',
        name: '',
        email: '',  
        phone: '',
        status: 'Prospect',
        notes: '',
    },
    clients: [
        {id: 'xx1', name: 'Maamoun Grissa', email: 'maamoun.grissa@creo.tn', phone: '101010101', notes: 'Lorem text, test lorem text', status: 'Supprimer'},
        {id: 'xx2',  name: 'Bilel Grissa', email: 'bilel.grissa@creo.tn', phone: '101010102', notes: 'Lorem text, test lorem text', status: 'Actif'},
        {id: 'xx3',  name: 'Faycel Yousfi', email: 'faycel.yousfi@creo.tn', phone: '101010103', notes: 'Lorem text, test lorem text', status: 'Inactif'},
        {id: 'xx4',  name: 'Achref Mtir', email: 'achref.mtir@creo.tn', phone: '101010104', notes: 'Lorem text, test lorem text, Lorem text, test lorem text', status: 'Actif'},
        {id: 'xx5',  name: 'Sourour Ben salah', email: 'sourour.bensalah@creo.tn', phone: '101010105', notes: 'Lorem text, test lorem text', status: 'Actif'},
        {id: 'xx6',  name: 'Fedi Mtir', email: 'fedi.mtir@creo.tn', phone: '20', notes: 'Lorem text, test lorem text', status: 'Supprimer'},
        {id: 'xx7',  name: 'Syrine ben salah', email: 'syrine.bensalah@creo.tn', phone: '101010107', notes: 'Lorem text', status: 'Actif'},
        {id: 'xx8',  name: 'Haroun Grissa', email: '3', phone: 'haroun.grissa@creo.tn', notes: 'Lorem text, test lorem text', status: 'Actif'},
        {id: 'xx9',  name: 'test1', email: '1', phone: 'test1@creo.tn', notes: 'Lorem text', status: 'Actif'},
        {id: 'x10',  name: 'test2', email: '1', phone: 'test2@creo.tn', notes: 'Lorem text, test lorem text', status: 'Actif'}
    ],
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        getClients: (state) => {
            state.clients = initialState.clients;
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
        }
    }
});

export const { getClients, getClient, addClient, updateClient, deleteClient } = clientSlice.actions;
export default clientSlice.reducer;