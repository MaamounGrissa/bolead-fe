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
import { UserCogIcon, UserTieIcon, UserSecretIcon } from '@patternfly/react-icons';
import { RessourcesTable } from './RessourcesTable';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getDashboardStatistics } from '@app/store/statistics/statisticSlice';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';

const Ressources: React.FunctionComponent = () => {
  const [openCreateRessource, setOpenCreateRessource] = React.useState(false);
  const { totalCount } = useAppSelector(state => state.ressources)
  const { dashboardStatistics } = useAppSelector(state => state.statistics)

  const { enqueueSnackbar } = useSnackbar();
  const axiosInstance = useAxios();
  const dispatch = useAppDispatch();

  const fetchDashboardStatistics = async () => {
    await axiosInstance?.current?.get(`services/inspections/api/dashboard`)
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
              <UserCogIcon size='lg' color="green" className='mr-2' /> 
                {dashboardStatistics?.totalTeamMembersByStatus?.find(item => item.status === 'Technicien')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Techniciens
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
            <UserTieIcon size='lg' color="orange" className='mr-2' />
              {dashboardStatistics?.totalTeamMembersByStatus?.find(item => item.status === 'Commercial')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Commercials
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <UserSecretIcon size='lg' color="blue" className='mr-2' />
                {dashboardStatistics?.totalTeamMembersByStatus?.find(item => item.status === 'Gestionnaire')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Gestionnaires
            </CardTitle>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between mobile-flex-column'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">{totalCount} Ressources</Title>
        <div className='mobile-m-2'>
          <Button variant="primary" onClick={() => setOpenCreateRessource(true)}><UserPlusIcon />&nbsp;Ressource</Button>
        </div>
      </div>
      <div>
        <RessourcesTable openCreateRessource={openCreateRessource} setOpenCreateRessource={() => setOpenCreateRessource(false)} />
      </div>
    </PageSection>
  )
}

export { Ressources };
