import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProjetState = {
    projet: {
        id: '',
        name: '',
        client: '',
        adresse: '',
        type: '',
        status: '',
        notes: '',
        ressources: []
    },
    projets: [
        {id: 'IX1', name: 'Immeuble X1', client: 'xx1', adresse: 'Tunis', type: 'Construction', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX2', name: 'Immeuble X2', client: 'xx2', adresse: 'Tunis', type: 'Construction', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX3', name: 'Immeuble X3', client: 'xx3', adresse: 'Tunis', type: 'Peinture', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX4', name: 'Immeuble X4', client: 'xx4', adresse: 'Tunis', type: 'Peinture', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX5', name: 'Immeuble X5', client: 'xx5', adresse: 'Tunis', type: 'Peinture', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX6', name: 'Immeuble X6', client: 'xx6', adresse: 'Tunis', type: 'Construction', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX7', name: 'Immeuble X7', client: 'xx7', adresse: 'Tunis', type: 'Construction', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX8', name: 'Immeuble X8', client: 'xx8', adresse: 'Tunis', type: 'Construction', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX9', name: 'Immeuble X9', client: 'xx9', adresse: 'Tunis', type: 'Construction', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX10', name: 'Immeuble X10', client: 'xx10', adresse: 'Tunis', type: 'Electricité', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX12', name: 'Immeuble X12', client: 'xx12', adresse: 'Tunis', type: 'Electricité', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX13', name: 'Immeuble X13', client: 'xx13', adresse: 'Tunis', type: 'Plomberie', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
        {id: 'IX14', name: 'Immeuble X14', client: 'xx14', adresse: 'Tunis', type: 'Plomberie', status: 'En cours', notes: 'Lorem text, test lorem text', ressources: ['xx1', 'xx2', 'xx3']},
    ],
};

export const projetSlice = createSlice({
    name: 'projet',
    initialState,
    reducers: {
        getProjets: (state) => {
            state.projets = initialState.projets;
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
        }
    }
});

export const { getProjets, getProjet, addProjet, updateProjet, deleteProjet } = projetSlice.actions;
export default projetSlice.reducer;