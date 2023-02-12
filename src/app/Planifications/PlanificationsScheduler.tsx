{/* @typescript ignore */}
import * as React from 'react';
import { ViewState, SchedulerDateTime} from '@devexpress/dx-react-scheduler';
import {
  Scheduler, DayView, WeekView, Appointments, Resources, Toolbar, DateNavigator, ViewSwitcher 
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import { LocationSelector, MyStyledFlexibleSpace, TimeTableCell } from './schedulerOptions';
import { useAppSelector } from '@app/store';

const resources = [{
  fieldName: 'type',
  title: 'Type',
  instances: [
    { id: 'private', text: 'Private', color: '#EC407A' },
    { id: 'work', text: 'Work', color: '#7E57C2' },
  ],
}];

export const PlanificationsScheduler: React.FunctionComponent<{
    setOpenCreatePlanification: () => void,
    setOpenUpdatePlanification: (data: IPlanification) => void,
    setOpenDeletePlanification: (data: IPlanification) => void,
}> = (props) => {
    const { setOpenCreatePlanification, setOpenUpdatePlanification, setOpenDeletePlanification } = props;
    console.log(setOpenCreatePlanification, setOpenUpdatePlanification, setOpenDeletePlanification);
    const { planifications } = useAppSelector(state => state.planifications);
    
    const FlexibleSpace = () => {
        const ontypesChange = (type: string) => {
            typeFilter(type);
        };
        return (
            <MyStyledFlexibleSpace>
                <LocationSelector ontypesChange={ontypesChange} />
            </MyStyledFlexibleSpace>
    )};

    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(moment().format('YYYY-MM-DD'));
    const onCurrentDateChange = (currentDate: SchedulerDateTime) => {
        setCurrentDate(currentDate);
    };
    const [currentViewName, setCurrentViewName] = React.useState<string>('Week');
    const onCurrentViewNameChange = (currentViewName: string) => {
        setCurrentViewName(currentViewName);
    };

    const [data, setData] = React.useState<IPlanification[]>([]);
    React.useEffect(() => {
        setData(planifications);
    }, [planifications]);

    const [filtredData, setFiltredData] = React.useState<IPlanification[]>([]);
    React.useEffect(() => {
        if (data.length > 0) {
            setFiltredData(data);
        }
    }, [data]);
    const typeFilter = (type: string) => {
        setFiltredData(data.filter((item) => item.type === type));
    };

    //console.log(filtredData);

    return (
        <Scheduler
            data={filtredData}
        >
            <ViewState
                currentDate={currentDate}
                onCurrentDateChange={onCurrentDateChange}
                currentViewName={currentViewName}
                onCurrentViewNameChange={onCurrentViewNameChange}
            />
            <DayView
                startDayHour={9}
                endDayHour={19}
            />
            <WeekView
                startDayHour={8}
                endDayHour={19}
                timeTableCellComponent={TimeTableCell}
               // dayScaleCellComponent={DayScaleCell}
            />

            <Appointments
                //appointmentContentComponent={AppointmentContent}
            />
            <Resources
                data={resources}
            />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
        </Scheduler>
    );
};