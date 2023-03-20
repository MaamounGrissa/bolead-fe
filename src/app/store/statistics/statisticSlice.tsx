import { initialPlanification } from "@app/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StatisticsState = {
    dashboardStatistics: {
        totalTeamMembersByStatus: [],
        totalCustomersByStatus: [],
        totalProjectsByType: [],
        totalProjectStatusByType: [],
        percentageByInspectionsType: [],
        tenHighestPlannedWorkers: [],
        nextPlannedInspection: initialPlanification,
        inspectionsOfCurrentDay: [],
    },
};

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        getDashboardStatistics: (state, action: PayloadAction<DashboardStatistics>) => {
            state.dashboardStatistics = action.payload;
        },
    }
});

export const { getDashboardStatistics } = statisticsSlice.actions;
export default statisticsSlice.reducer;