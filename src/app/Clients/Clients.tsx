import React from 'react';
import {
  Title,
  PageSection,
  Button,
  Grid,
  GridItem,
  Card,
  CardTitle} from '@patternfly/react-core';
import UserPlusIcon from '@patternfly/react-icons/dist/js/icons/user-plus-icon';
import { OutlinedUserCircleIcon, OutlinedGrinStarsIcon, OutlinedCalendarCheckIcon, OutlinedIdBadgeIcon } from '@patternfly/react-icons';
import { ClientsTable } from './ClientsTable';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';
import { getDashboardStatistics } from '@app/store/statistics/statisticSlice';

const Clients: React.FunctionComponent = () => {
  const [openCreateClient, setOpenCreateClient] = React.useState(false);
  const { totalCount } = useAppSelector(state => state.clients)
  const { dashboardStatistics } = useAppSelector(state => state.statistics)

  const { enqueueSnackbar } = useSnackbar();
  const axiosInstance = useAxios();
  const dispatch = useAppDispatch();

  const fetchDashboardStatistics = async () => {
    await axiosInstance?.current?.get(`inspections/api/dashboard`)
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
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <OutlinedUserCircleIcon size='lg' color="blue" className='mr-2' />
                {dashboardStatistics?.totalCustomersByStatus?.find(item => item.status === 'Prospet')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Prospets
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <OutlinedGrinStarsIcon size='lg' color="green" className='mr-2' />
                {dashboardStatistics?.totalCustomersByStatus?.find(item => item.status === 'Active')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Actives
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <OutlinedCalendarCheckIcon size='lg' color="orange" className='mr-2' />
                {dashboardStatistics?.totalCustomersByStatus?.find(item => item.status === 'Expiré')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Expirés
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <OutlinedIdBadgeIcon size='lg' color="DimGray" className='mr-2' />
                {dashboardStatistics?.totalCustomersByStatus?.find(item => item.status === 'Archiver')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Archivés
            </CardTitle>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between mobile-flex-column'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">{totalCount} Clients</Title>
        <div className='mobile-m-2'>
          <Button variant="primary" onClick={() => setOpenCreateClient(true)}><UserPlusIcon />&nbsp;Client</Button>
        </div>
      </div>
      <div>
        <ClientsTable openCreateClient={openCreateClient} setOpenCreateClient={() => setOpenCreateClient(false)} />
      </div>
    </PageSection>
  )
}

export { Clients };
