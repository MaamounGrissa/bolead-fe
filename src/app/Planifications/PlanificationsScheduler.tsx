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
import { CloseIcon, FilePdfIcon } from '@patternfly/react-icons';

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
    setOpenUpdatePlanification: (planificationId: number) => void,
    setOpenDeletePlanification: (planificationId: number) => void,
    setOpenPdfFile: (planificationId: number) => void,
}> = (props) => {
    const { setOpenPdfFile, setOpenCreatePlanification, setOpenUpdatePlanification, setOpenDeletePlanification } = props;
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

    const AppointmentComponent = (props: any) => {
        const { data, style, children, restProps } = props;
        return (
            <Appointments.Appointment
                style={{ 
                    ...style,
                    height: `${data?.duration ? data.duration * 1.6 : 96}px`,
                    background: data?.type === 'Visite technique' ? '#578c79' : '#7E57C2',
                
                }}
                {...restProps}
            >
                {children}
            </Appointments.Appointment>
        );
    };

    const AppointmentContentComponent = (props: any) => {
        return (
            <Appointments.AppointmentContent 
             {...props}>
                <div className="appointment-content" 
                    onClick={() => setOpenUpdatePlanification(props.data.id)}>
                    <div className="appointment-content-title">
                        {props.data?.title}
                    </div>
                    <div className="appointment-content-date">
                        {moment(props.data?.startDate).format("HH:mm")} - {moment(props.data?.endDate).format("HH:mm")}
                    </div>
                    <div className="appointment-content-type">
                        {props.data?.type}
                    </div>
                    <div className="appointment-content-ressource">
                        {props.data.ressource}
                    </div>
                    <div className='appointment-delete-action'>
                        {props.data?.status === 4 &&
                            <FilePdfIcon color='Azure' size='md'
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenPdfFile(props.data.id);
                                }}
                            />
                        }
                        <CloseIcon color='DarkRed' size='md'
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDeletePlanification(props.data.id);
                            }}
                        />
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
                duration: parseInt(`${item.duration}`) + (parseInt(`${item.travelDuration}`) * 2),
                status: item.status?.id,
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
        setFiltredData(data?.filter((item) => item.type === type));
    };

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

            <Appointments
                appointmentContentComponent={AppointmentContentComponent}
                appointmentComponent={AppointmentComponent}
            />
            <Toolbar flexibleSpaceComponent={FlexibleSpace} />
            <DateNavigator />
            <ViewSwitcher />
        </Scheduler>
    );
};