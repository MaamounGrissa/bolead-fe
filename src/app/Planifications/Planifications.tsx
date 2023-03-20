import React from 'react';
import {
  Title,
  PageSection,
  Button,
  Grid,
  GridItem,
  Card,
  CardTitle} from '@patternfly/react-core';
import { CalendarDayIcon, OutlinedCalendarAltIcon, OutlinedCalendarPlusIcon, SuitcaseIcon, TableIcon, ToolsIcon } from '@patternfly/react-icons';
import { PlanificationsTable } from './PlanificationsTable';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';
import { getDashboardStatistics } from '@app/store/statistics/statisticSlice';
import moment from 'moment';

const Planifications: React.FunctionComponent = () => {
  const [openCreatePlanification, setOpenCreatePlanification] = React.useState(false);
  const [view, setView] = React.useState('GRID');
  const { totalCount } = useAppSelector((state) => state.planifications);

  const { dashboardStatistics } = useAppSelector(state => state.statistics)

  const { enqueueSnackbar } = useSnackbar();
  const axiosInstance = useAxios();
  const dispatch = useAppDispatch();

  const fetchDashboardStatistics = async () => {
    await axiosInstance?.current?.get(`dashboard`)
    .then(response => {
        dispatch(getDashboardStatistics(response.data));
    }).catch(error => {
        enqueueSnackbar(error.message, { variant: 'error' });
    });
  };

  React.useEffect(() => {
    if (dashboardStatistics?.totalCustomersByStatus?.length === 0) {
      fetchDashboardStatistics();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <ToolsIcon size='lg' color="DodgerBlue" className='mr-2' />
              {dashboardStatistics?.percentageByInspectionsType?.find(item => item.type === 'Visite technique')?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp; Visites Techniques
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <SuitcaseIcon size='lg' color="MediumOrchid" className='mr-2' />
              {dashboardStatistics?.percentageByInspectionsType?.find(item => item.type === 'Visite commercial')?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp; Visites Commerciales
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <CalendarDayIcon size='lg' color="orange" className='mr-2' />
               {
                dashboardStatistics.nextPlannedInspection?.id
                  ?  `Prochain RDV le ${moment(dashboardStatistics?.nextPlannedInspection?.startTime).format("DD/MM/YYYY à HH:mm")}`
                  : 'Aucun rendez-vous prévu'
              }
            </CardTitle>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between mobile-flex-column'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">{totalCount} Planifications</Title>
        <div className='mobile-m-2'>
          <Button style={{ margin: '0 5px'}} variant="primary" onClick={() => setOpenCreatePlanification(true)}><OutlinedCalendarPlusIcon />&nbsp;Rendez-vous</Button>
          <Button style={{ margin: '0 5px'}} variant={view === 'GRID' ? 'primary' : 'secondary'} onClick={() => setView('GRID')} ><OutlinedCalendarAltIcon color='white'/></Button>
          <Button variant={view === 'TABLE' ? 'primary' : 'secondary'} onClick={() => setView('TABLE')} ><TableIcon color='white'/></Button>
        </div>
      </div>
      <div>
        <PlanificationsTable view={view} openCreatePlanification={openCreatePlanification} setOpenCreatePlanification={() => setOpenCreatePlanification(true)} closeModal={() => setOpenCreatePlanification(false)} />
      </div>
    </PageSection>
  )
}

export { Planifications };
