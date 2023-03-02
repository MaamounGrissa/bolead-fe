import { initialProjet } from "@app/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProjetState = {
    projet: initialProjet,
    projets: [],
    projetStatus: [{
        id: 0,
        name: 'Sélectionner un status'
    }],
    projetTypes: [{
        id: 0,
        name: 'Sélectionner un type'
    }]
};

export const projetSlice = createSlice({
    name: 'projet',
    initialState,
    reducers: {
        getProjets: (state, action: PayloadAction<IProjetAPI[]>) => {
            state.projets = action.payload?.map((projet) => {
                return {
                    id: projet.uuid || '',
                    name: projet.reference || '',
                    clientName: `${projet.customer?.contact?.firstName} ${projet.customer?.contact?.lastName}` || '',
                    clientId: projet.customer?.uuid || '',
                    adresse: projet.customer?.contact?.address?.street || '',
                    type: projet.referentielProjectTypes[0]?.id || 0,
                    status: projet.status?.id|| 0,
                    notes: projet.tags || '',
                };
            });
        },
        getProjet: (state, action: PayloadAction<string>) => {
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
        deleteProjet: (state, action: PayloadAction<string>) => {
            const index = state.projets.findIndex(projet => projet.id === action.payload);
            state.projets.splice(index, 1);
        },
        getProjetStatus: (state, action: PayloadAction<IProjetStatusAPI[]>) => {
            state.projetStatus = action.payload.map((status) => {
                return {id: status.id, name: status.status};
            });
        },
        getProjetTypes: (state, action: PayloadAction<IProjetTypesAPI[]>) => {
            state.projetTypes = action.payload.map((type) => {
                return {id: type.id, name: type.type};
            });
        },
    }
});

export const { getProjets, getProjet, addProjet, updateProjet, deleteProjet, getProjetStatus, getProjetTypes } = projetSlice.actions;
export default projetSlice.reducer;