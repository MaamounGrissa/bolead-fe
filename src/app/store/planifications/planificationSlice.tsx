import { initialPlanification } from "@app/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlanificationState = {
    totalCount: 0,
    planification: initialPlanification,
    planifications: [],
    planificationStatus: [
        {id: 0, name: 'Sélectionner le statut'},
    ],
    planificationTypes: [
        {id: 0, name: 'Sélectionner le type'},
    ],
};

export const planificationSlice = createSlice({
    name: 'planification',
    initialState,
    reducers: {
        getPlanifications: (state, action: PayloadAction<IPlanificationAPI[]>) => {
            state.planifications = action.payload?.map((planification) => {
                return {
                    id: planification.id.toString() || '',
                    title: planification.title || '',
                    distance: planification.distance || '',
                    origin: planification.origin || '',
                    destination: planification.destination || '',
                    notes: planification.comment || '',
                    startDate: planification.startTime || '',
                    endDate: planification.endTime || '',
                    duration: planification.duration || '',
                    travelMode: planification.travelMode || '',
                    trajetDuration: planification.travelDuration || '',
                    trajetDurationText: '',
                    status: planification.status?.id || 0,
                    type: planification.type?.id || 0,
                    ressource: planification.member?.uuid || '',
                    projet: planification.project?.uuid || '',
                }
            });
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
        },
        getPlanificationStatus: (state, action: PayloadAction<IPlanificationStatusAPI[]>) => {
            state.planificationStatus = action.payload.map((status) => {
                return {id: status.id, name: status.status};
            });
        },
        getPlanificationTypes: (state, action: PayloadAction<IPlanificationTypesAPI[]>) => {
            state.planificationTypes = action.payload.map((type) => {
                return {id: type.id, name: type.type};
            });
        },
        setPlanificationsTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
    }
});

export const { getPlanifications, getPlanification, addPlanification, updatePlanification, deletePlanification, getPlanificationStatus, getPlanificationTypes, setPlanificationsTotalCount } = planificationSlice.actions;
export default planificationSlice.reducer;