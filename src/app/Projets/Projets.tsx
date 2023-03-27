import React from 'react';
import {
  Title,
  PageSection,
  Button,
  Grid,
  GridItem,
  Card,
  CardTitle} from '@patternfly/react-core';
import { AddCircleOIcon, GripHorizontalIcon, OutlinedFileIcon, TableIcon } from '@patternfly/react-icons';
import { ProjetsTable } from './ProjetsTable';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';
import { getDashboardStatistics } from '@app/store/statistics/statisticSlice';

const Projets: React.FunctionComponent = () => {
  const [openCreateProjet, setOpenCreateProjet] = React.useState(false);
  const [view, setView] = React.useState('GRID');
  const { totalCount } = useAppSelector((state) => state.projets);

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
              <OutlinedFileIcon size='lg' color="DimGray" className='mr-2' />
              {dashboardStatistics?.totalProjectsByType?.find(item => item.type === 'ISO Plancher')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; ISO Plancher
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <OutlinedFileIcon size='lg' color="DimGray" className='mr-2' />
              {dashboardStatistics?.totalProjectsByType?.find(item => item.type === 'PAC')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; PAC
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <OutlinedFileIcon size='lg' color="DimGray" className='mr-2' />
              {dashboardStatistics?.totalProjectsByType?.find(item => item.type === 'Chaudière gaz')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Chaudière gaz
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <OutlinedFileIcon size='lg' color="DimGray" className='mr-2' />
              {dashboardStatistics?.totalProjectsByType?.find(item => item.type === 'ITE')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; ITE
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <OutlinedFileIcon size='lg' color="DimGray" className='mr-2' />
              {dashboardStatistics?.totalProjectsByType?.find(item => item.type === 'ISO Compbles')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; ISO Compbles
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <OutlinedFileIcon size='lg' color="DimGray" className='mr-2' />
              {dashboardStatistics?.totalProjectsByType?.find(item => item.type === 'ITI')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; ITI
            </CardTitle>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between mobile-flex-column'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">{totalCount} Projets</Title>
        <div className='mobile-m-2'>
          <Button variant="primary" onClick={() => setOpenCreateProjet(true)}><AddCircleOIcon />&nbsp;Projet</Button>
          <Button style={{ margin: '0 5px'}} variant={view === 'GRID' ? 'primary' : 'secondary'} onClick={() => setView('GRID')} ><GripHorizontalIcon color='white'/></Button>
          <Button variant={view === 'TABLE' ? 'primary' : 'secondary'} onClick={() => setView('TABLE')} ><TableIcon color='white'/></Button>
        </div>
      </div>
      <div>
        <ProjetsTable view={view} openCreateProjet={openCreateProjet} setOpenCreateProjet={() => setOpenCreateProjet(!openCreateProjet)} />
      </div>
    </PageSection>
  )
}

export { Projets };
