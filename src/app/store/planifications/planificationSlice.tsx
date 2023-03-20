/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialPlanification } from "@app/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlanificationState = {
    totalCount: 0,
    planification: initialPlanification,
    planifications: [],
    planificationStatus: [],
    planificationTypes: [],
    vtPdfFile: null,
};

export const planificationSlice = createSlice({
    name: 'planification',
    initialState,
    reducers: {
        getPlanifications: (state, action: PayloadAction<IPlanification[]>) => {
            state.planifications = action.payload;
        },
        getPlanification: (state, action: PayloadAction<number>) => {
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
        deletePlanification: (state, action: PayloadAction<number>) => {
            const index = state.planifications.findIndex(planification => planification.id === action.payload);
            state.planifications.splice(index, 1);
        },
        getPlanificationStatus: (state, action: PayloadAction<IPlanificationStatus[]>) => {
            state.planificationStatus = action.payload;
        },
        getPlanificationTypes: (state, action: PayloadAction<IPlanificationType[]>) => {
            state.planificationTypes = action.payload;
        },
        setPlanificationsTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
        getPlanificationFile: (state, action: PayloadAction<any>) => {
            state.vtPdfFile = action.payload;
        },
    }
});

export const { getPlanifications, getPlanification, addPlanification, updatePlanification, deletePlanification, getPlanificationStatus, getPlanificationTypes, setPlanificationsTotalCount } = planificationSlice.actions;
export default planificationSlice.reducer;