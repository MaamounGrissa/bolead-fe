import { initialRessource } from "@app/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RessourceState = {
    totalCount: 0,
    ressource: initialRessource,
    ressources: [],
    ressourcesList: [],
    ressourceStatus: [],
    ressourceTypes: []
};

export const ressourceSlice = createSlice({
    name: 'ressource',
    initialState,
    reducers: {
        getRessources: (state, action: PayloadAction<IRessource[]>) => {
            state.ressources = action.payload;
        },
        getRessource: (state, action: PayloadAction<number>) => {
            const index = state.ressources.findIndex(ressource => ressource.id === action.payload);
            state.ressource = state.ressources[index];
        },
        addRessource: (state, action: PayloadAction<IRessource>) => {
            state.ressources.push(action.payload);
            state.totalCount++;
        },
        updateRessource: (state, action: PayloadAction<IRessource>) => {
            const index = state.ressources.findIndex(ressource => ressource.id === action.payload.id);
            state.ressources[index] = action.payload;
        },
        deleteRessource: (state, action: PayloadAction<number>) => {
            const index = state.ressources.findIndex(ressource => ressource.id === action.payload);
            state.ressources.splice(index, 1);
            state.totalCount--;
        },
        getRessourceStatus: (state, action: PayloadAction<IRessourceStatus[]>) => {
            state.ressourceStatus = action.payload;
        },
        getRessourceTypes: (state, action: PayloadAction<IRessourceTeam[]>) => {
            state.ressourceTypes = action.payload;
        },
        getRessourcesList: (state, action: PayloadAction<IRessource[]>) => {
            state.ressourcesList = action.payload?.map((ressource) => {
                return {
                    id: ressource.id || 0,
                    uuid: ressource.uuid || '',
                    name: `${ressource.contact?.firstName} ${ressource.contact?.lastName}` || '',
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