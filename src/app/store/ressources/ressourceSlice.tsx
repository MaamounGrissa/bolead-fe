import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RessourceState = {
    ressource: {
        id: '',
        name: '',
        email: '',  
        phone: '',
        status: 'Actif',
        type: 'Technicien',
        notes: '',
    },
    ressources: [
        {id: 'xx1', name: 'Maamoun Grissa', email: 'maamoun.grissa@creo.tn', phone: '101010101', notes: 'Lorem text, test lorem text', status: 'Supprimer', type: 'Technicien' },
        {id: 'xx2',  name: 'Bilel Grissa', email: 'bilel.grissa@creo.tn', phone: '101010102', notes: 'Lorem text, test lorem text', status: 'Actif', type: 'Comptable' },
        {id: 'xx3',  name: 'Faycel Yousfi', email: 'faycel.yousfi@creo.tn', phone: '101010103', notes: 'Lorem text, test lorem text', status: 'Inactif', type: 'Technicien' },
        {id: 'xx4',  name: 'Achref Mtir', email: 'achref.mtir@creo.tn', phone: '101010104', notes: 'Lorem text, test lorem text, Lorem text, test lorem text', status: 'Actif', type: 'Technicien' },
        {id: 'xx5',  name: 'Sourour Ben salah', email: 'sourour.bensalah@creo.tn', phone: '101010105', notes: 'Lorem text, test lorem text', status: 'Actif', type: 'Technicien' },
        {id: 'xx6',  name: 'Fedi Mtir', email: 'fedi.mtir@creo.tn', phone: '20', notes: 'Lorem text, test lorem text', status: 'Supprimer', type: 'Commercial' },
        {id: 'xx7',  name: 'Syrine ben salah', email: 'syrine.bensalah@creo.tn', phone: '101010107', notes: 'Lorem text', status: 'Actif', type: 'Commercial' },
        {id: 'xx8',  name: 'Haroun Grissa', email: '3', phone: 'haroun.grissa@creo.tn', notes: 'Lorem text, test lorem text', status: 'Actif', type: 'Technicien' },
        {id: 'xx9',  name: 'test1', email: '1', phone: 'test1@creo.tn', notes: 'Lorem text', status: 'Actif', type: 'Comptable' },
        {id: 'x10',  name: 'test2', email: '1', phone: 'test2@creo.tn', notes: 'Lorem text, test lorem text', status: 'Actif', type: 'Technicien' }
    ],
};

export const ressourceSlice = createSlice({
    name: 'ressource',
    initialState,
    reducers: {
        getRessources: (state) => {
            state.ressources = initialState.ressources;
        },
        getRessource: (state, action: PayloadAction<string>) => {
            const index = state.ressources.findIndex(ressource => ressource.id === action.payload);
            state.ressource = state.ressources[index];
        },
        addRessource: (state, action: PayloadAction<IRessource>) => {
            state.ressources.push(action.payload);
        },
        updateRessource: (state, action: PayloadAction<IRessource>) => {
            const index = state.ressources.findIndex(ressource => ressource.id === action.payload.id);
            state.ressources[index] = action.payload;
        },
        deleteRessource: (state, action: PayloadAction<string>) => {
            const index = state.ressources.findIndex(ressource => ressource.id === action.payload);
            state.ressources.splice(index, 1);
        }
    }
});

export const { getRessources, getRessource, addRessource, updateRessource, deleteRessource } = ressourceSlice.actions;
export default ressourceSlice.reducer;