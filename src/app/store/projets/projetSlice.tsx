import { initialProjet } from "@app/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProjetState = {
    totalCount: 0,
    projet: initialProjet,
    projets: [],
    projetStatus: [],
    projetTypes: [],
    projetsList: [],
};

export const projetSlice = createSlice({
    name: 'projet',
    initialState,
    reducers: {
        getProjets: (state, action: PayloadAction<IProjet[]>) => {
            state.projets = action.payload;
        },
        getProjet: (state, action: PayloadAction<number>) => {
            const index = state.projets.findIndex(projet => projet.id === action.payload);
            state.projet = state.projets[index];
        },
        addProjet: (state, action: PayloadAction<IProjet>) => {
            state.projets.push(action.payload);
        },
        updateProjet: (state, action: PayloadAction<IProjet>) => {
            const index = state.projets.findIndex(projet => projet.id === action.payload.id);
            state.projets[index] = action.payload;
        },
        deleteProjet: (state, action: PayloadAction<number>) => {
            const index = state.projets.findIndex(projet => projet.id === action.payload);
            state.projets.splice(index, 1);
        },
        getProjetStatus: (state, action: PayloadAction<IProjetStatus[]>) => {
            state.projetStatus = action.payload;
        },
        getProjetTypes: (state, action: PayloadAction<IProjetType[]>) => {
            state.projetTypes = action.payload;
        },
        getProjetsList: (state, action: PayloadAction<IProjet[]>) => {
            state.projetsList = action.payload.map((projet) => {
                return {
                    id: projet.id || 0, 
                    uuid: projet.uuid || '',
                    reference: projet.reference,
                    address: projet.customer?.contact?.address,
                };
            });
        },
        setProjetsTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
    }
});

export const { getProjets, getProjet, addProjet, updateProjet, deleteProjet, getProjetStatus, getProjetTypes, getProjetsList, setProjetsTotalCount} = projetSlice.actions;
export default projetSlice.reducer;