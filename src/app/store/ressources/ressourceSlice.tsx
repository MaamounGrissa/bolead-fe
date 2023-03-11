import { initialRessource } from "@app/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RessourceState = {
    totalCount: 0,
    ressource: initialRessource,
    ressources: [],
    ressourcesList: [],
    ressourceStatus: [{
        id: 0,
        name: 'Sélectionner un status'
    }],
    ressourceTypes: [{
        id: 0,
        name: 'Sélectionner un type'
    }]
};

export const ressourceSlice = createSlice({
    name: 'ressource',
    initialState,
    reducers: {
        getRessources: (state, action: PayloadAction<IRessourceAPI[]>) => {
            state.ressources = action.payload?.map((ressource) => {
                return {
                    id: ressource.id.toString() || '',
                    firstName: ressource.contact?.firstName || '',
                    lastName: ressource.contact?.lastName || '',
                    email: ressource.contact?.email || '',
                    phone: ressource.contact?.phone || '',
                    type: ressource.team?.id || 0,
                    status: ressource.status?.id || 0,
                    notes: ressource.contact?.address?.streetLine2 || '',      
                };
            });
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
        },
        getRessourceStatus: (state, action: PayloadAction<IRessourceStatusAPI[]>) => {
            state.ressourceStatus = action.payload.map((status) => {
                return {id: status.id, name: status.status};
            });
        },
        getRessourceTypes: (state, action: PayloadAction<IRessourceTeam[]>) => {
            state.ressourceTypes = action.payload.map((type) => {
                return {id: type.id, name: type.name};
            });
        },
        getRessourcesList: (state, action: PayloadAction<IRessourceAPI[]>) => {
            state.ressourcesList = action.payload?.map((ressource) => {
                return {
                    id: ressource.uuid || '',
                    name: `${ressource.contact?.firstName} ${ressource.contact?.lastName}` || '',
                    type: ressource.team?.id || 0,
                    status: ressource.status?.id || 0,        
                };
            });
        },
        setRessourcesTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
    }
});

export const { getRessources, getRessource, addRessource, updateRessource, deleteRessource, getRessourceStatus, getRessourceTypes, getRessourcesList, setRessourcesTotalCount } = ressourceSlice.actions;
export default ressourceSlice.reducer;