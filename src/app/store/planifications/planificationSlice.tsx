import { initialPlanification } from "@app/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlanificationState = {
    planification: initialPlanification,
    planifications: [
        {id: 'px0', title: 'Immeuble X9', projet: 'IX9', type: 'Visite Technique', status: 'Terminé', notes: 'Lorem text, test lorem text', ressource: 'xx1', startDate: '2023-02-27T14:00', endDate: '2023-02-27T15:30', duration: 20, origin: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', destination: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', distance: '0 km', trajetDuration: 0, trajetDurationText: '0 min'},
        {id: 'px1', title: 'Immeuble X1', projet: 'IX1', type: 'Visite Technique', status: 'En cours', notes: 'Lorem text, test lorem text', ressource: 'xx1', startDate: '2023-02-28T11:00', endDate: '2023-02-28T13:00', duration: 20, origin: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', destination: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', distance: '0 km', trajetDuration: 0, trajetDurationText: '0 min'},
        {id: 'px2', title: 'Immeuble X2', projet: 'IX2', type: 'Visite Technique', status: 'En cours', notes: 'Lorem text, test lorem text', ressource: 'xx2', startDate: '2023-03-01T14:00', endDate: '2023-03-01T16:00', duration: 20, origin: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', destination: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', distance: '0 km', trajetDuration: 0, trajetDurationText: '0 min'},
        {id: 'px3', title: 'Immeuble X3', projet: 'IX3', type: 'Visite Technique', status: 'Terminé', notes: 'Lorem text, test lorem text', ressource: 'xx3', startDate: '2023-03-01T10:00', endDate: '2023-03-01T12:00', duration: 60, origin: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', destination: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', distance: '0 km', trajetDuration: 0, trajetDurationText: '0 min'},
        {id: 'px4', title: 'Immeuble X4', projet: 'IX4', type: 'Visite Technique', status: 'Terminé', notes: 'Lorem text, test lorem text', ressource: 'xx4', startDate: '2023-03-01T09:00', endDate: '2023-03-01T11:00', duration: 60, origin: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', destination: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', distance: '0 km', trajetDuration: 0, trajetDurationText: '0 min'},
        {id: 'px5', title: 'Immeuble X5', projet: 'IX5', type: 'Visite Technique', status: 'Terminé', notes: 'Lorem text, test lorem text', ressource: 'xx5', startDate: '2023-02-01T10:00', endDate: '2023-03-01T13:00', duration: 60, origin: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', destination: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', distance: '0 km', trajetDuration: 0, trajetDurationText: '0 min'},
        {id: 'px6', title: 'Immeuble X6', projet: 'IX6', type: 'Visite Technique', status: 'Terminé', notes: 'Lorem text, test lorem text', ressource: 'xx6', startDate: '2023-02-02T10:00', endDate: '2023-03-02T12:00', duration: 60, origin: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', destination: '15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France', distance: '0 km', trajetDuration: 0, trajetDurationText: '0 min'},
    ],
};

export const planificationSlice = createSlice({
    name: 'planification',
    initialState,
    reducers: {
        getPlanifications: (state) => {
            state.planifications = initialState.planifications;
        },
        getPlanification: (state, action: PayloadAction<string>) => {
            const index = state.planifications.findIndex(planification => planification.id === action.payload);
            state.planification = state.planifications[index];
        },
        addPlanification: (state, action: PayloadAction<IPlanification>) => {
            state.planifications.push(action.payload);
        },
        updatePlanification: (state, action: PayloadAction<IPlanification>) => {
            const index = state.planifications.findIndex(planification => planification.id === action.payload.id);
            state.planifications[index] = action.payload;
        },
        deletePlanification: (state, action: PayloadAction<string>) => {
            const index = state.planifications.findIndex(planification => planification.id === action.payload);
            state.planifications.splice(index, 1);
        }
    }
});

export const { getPlanifications, getPlanification, addPlanification, updatePlanification, deletePlanification } = planificationSlice.actions;
export default planificationSlice.reducer;