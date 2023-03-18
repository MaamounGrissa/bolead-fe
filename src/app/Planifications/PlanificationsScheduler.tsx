/* eslint-disable @typescript-eslint/no-explicit-any */
{/* @typescript ignore */}
import * as React from 'react';
import { ViewState, SchedulerDateTime, AppointmentModel} from '@devexpress/dx-react-scheduler';
import {
  Scheduler, DayView, WeekView, Appointments, Toolbar, DateNavigator, ViewSwitcher 
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import { LocationSelector, MyStyledFlexibleSpace } from './schedulerOptions';
import { useAppSelector } from '@app/store';
import { TrashAltIcon } from '@patternfly/react-icons';

/* const resources = [{
  fieldName: 'type',
  title: 'Type',
  instances: [
    { id: 'private', text: 'Private', color: '#EC407A' },
    { id: 'work', text: 'Work', color: '#7E57C2' },
  ],
}]; */

export const PlanificationsScheduler: React.FunctionComponent<{
    setOpenCreatePlanification: (data: string) => void,
    setOpenUpdatePlanification: (data: IPlanification) => void,
    setOpenDeletePlanification: (data: IPlanification) => void,
}> = (props) => {
    const { setOpenCreatePlanification, setOpenUpdatePlanification, setOpenDeletePlanification } = props;
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

    const AppointmentContent = (props: any) => {
        return (
            <Appointments.AppointmentContent {...props}>
                <div className="appointment-content" onClick={() => setOpenUpdatePlanification(props.data.id)}>
                    <div className="appointment-content-title">
                        {props.data?.title}
                    </div>
                    <div className="appointment-content-date">
                        {props.data?.startDate} - {props.data?.endDate}
                    </div>
                    <div className="appointment-content-type">
                        {props.data?.type} - {props.data.ressource}
                    </div>
                    <div className='appointment-delete-action'>
                        <TrashAltIcon color='red' size='lg' onClick={() => {
                            setOpenDeletePlanification(props.data.id);
                        }} />
                    </div>
                </div>
            </Appointments.AppointmentContent>
        );
    };

    const WeekTableCell = (props: any) => {
        const { startDate, formatDate } = props;
        const isFirstMonthDay = startDate.getDate() === 1;
        const formatOptions = isFirstMonthDay ? { day: 'numeric', month: 'long' } : { day: 'numeric' };
        return (
            <WeekView.TimeTableCell
                {...props}
                formatDate={formatDate}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...(isFirstMonthDay ? { formatDate: (date: Date) => formatDate(date, formatOptions) } : null)}
                onClick={() => {
                    setOpenCreatePlanification(moment(startDate).format('YYYY-MM-DDTHH:mm:ss'));
                }}
                style={{ cursor: 'pointer' }}
            />
        );
    };

    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(moment().format('YYYY-MM-DD'));
    const onCurrentDateChange = (currentDate: SchedulerDateTime) => {
        setCurrentDate(currentDate);
    };
    const [currentViewName, setCurrentViewName] = React.useState<string>('Week');
    const onCurrentViewNameChange = (currentViewName: string) => {
        setCurrentViewName(currentViewName);
    };

    const [data, setData] = React.useState<AppointmentModel[]>([]);
    React.useEffect(() => {
        setData(planifications.map((item) => {
            return {
                id: item.id,
                title: item.title,
                startDate: item.startTime,
                endDate: item.endTime,
                type: item.type?.type,
                ressource: item.member?.contact?.firstName + ' ' + item.member?.contact?.lastName,
                project: item.project,
            };
        }));
    }, [planifications]);

    const [filtredData, setFiltredData] = React.useState<AppointmentModel[]>([]);
    React.useEffect(() => {
        if (data.length > 0) {
            setFiltredData(data);
        }
    }, [data]);
    const typeFilter = (type: string) => {
        setFiltredData(data.filter((item) => item.type.id === parseInt(type)));
    };

    //console.log(filtredData);

    return (
        <Scheduler
            data={filtredData}
            locale="fr-FR"
        >
            <ViewState
                currentDate={currentDate}
                onCurrentDateChange={onCurrentDateChange}
                currentViewName={currentViewName}
                onCurrentViewNameChange={onCurrentViewNameChange}
            />
            <DayView
                startDayHour={6}
                endDayHour={22}
            />
            <WeekView
                startDayHour={6}
                endDayHour={22}
                timeTableCellComponent={WeekTableCell}
            />

            <Appointments appointmentContentComponent={AppointmentContent}
            />
            <Toolbar flexibleSpaceComponent={FlexibleSpace} />
            <DateNavigator />
            <ViewSwitcher />
        </Scheduler>
    );
};