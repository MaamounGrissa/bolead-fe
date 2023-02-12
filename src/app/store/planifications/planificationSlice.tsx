import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlanificationState = {
    planification: {
        id: '',
        title: '',
        startDate: '',
        endDate: '',
        duration: 20,
        type: '',
        ressource: '',
        projet: '',
        notes: '',
        status: '',
    },
    planifications: [
        {id: 'px0', title: 'Immeuble X9', projet: 'IX9', type: 'Visite Technique', status: 'Terminé', notes: 'Lorem text, test lorem text', ressource: 'xx1', startDate: '2023-02-08T14:00', endDate: '2023-02-08T15:30', duration: 20},
        {id: 'px1', title: 'Immeuble X1', projet: 'IX1', type: 'Visite Technique', status: 'En cours', notes: 'Lorem text, test lorem text', ressource: 'xx1', startDate: '2023-02-12T11:00', endDate: '2023-02-12T12:00', duration: 20},
        {id: 'px2', title: 'Immeuble X2', projet: 'IX2', type: 'Visite Technique', status: 'En cours', notes: 'Lorem text, test lorem text', ressource: 'xx2', startDate: '2023-02-12T15:00', endDate: '2023-02-12T16:00', duration: 20},
        {id: 'px3', title: 'Immeuble X3', projet: 'IX3', type: 'Visite Technique', status: 'Terminé', notes: 'Lorem text, test lorem text', ressource: 'xx3', startDate: '2023-02-07T10:00', endDate: '2023-02-07T11:00', duration: 60},
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