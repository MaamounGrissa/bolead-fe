import * as React from 'react';
import { Card, CardBody, CardTitle, Grid, GridItem } from '@patternfly/react-core';
import { CheckCircleIcon, EllipsisHIcon, ExclamationTriangleIcon, InProgressIcon, OutlinedTrashAltIcon, TimesCircleIcon, UserAltIcon, UserTieIcon, UsersCogIcon } from '@patternfly/react-icons';
import ressourceImage from './ressources-icon.png';
import clientImage from './clients-icon.png';
import projetImage from './projets-icon.png';
import { useAppSelector } from '@app/store';


const TotalsCards: React.FunctionComponent = () => {
  const { dashboardStatistics } = useAppSelector((state) => state.statistics);
  
  return (
    <Grid hasGutter>
    <GridItem span={12} sm={4} >
      <Card style={{ textAlign: "center" }}>
        <CardTitle style={{ textAlign: "center" }}>
          Projets
        </CardTitle>
        <CardBody>
          <div className='body-card-container'>
            <div className='flex-row'>
                <EllipsisHIcon size='sm' color="blue" />
                &nbsp;&nbsp;&nbsp;{dashboardStatistics?.totalProjectStatusByType?.reduce((acc, item) => acc + item.nouveau, 0) || 0}&nbsp;&nbsp;&nbsp;&nbsp; Nouveaux
            </div>
            <div className='flex-row'>
                <InProgressIcon size='sm' color="purple" />
                &nbsp;&nbsp;&nbsp;{dashboardStatistics?.totalProjectStatusByType?.reduce((acc, item) => acc + item.active, 0) || 0}&nbsp;&nbsp;&nbsp;&nbsp; Actifs
            </div>
            <div className='flex-row'>
                <ExclamationTriangleIcon size='sm' color="orange" />
                &nbsp;&nbsp;&nbsp;{/*dashboardStatistics?.totalProjectStatusByType?.reduce((acc, item) => acc + item.suspended, 0) || 0*/}0&nbsp;&nbsp;&nbsp;&nbsp; Suspendus
            </div>
            <div className='flex-row'>
                <CheckCircleIcon size='sm' color="green" />
                &nbsp;&nbsp;&nbsp;{/*dashboardStatistics?.totalProjectStatusByType?.reduce((acc, item) => acc + item.isCompleted, 0) || 0*/}0&nbsp;&nbsp;&nbsp;&nbsp; Terminés
            </div>
            <div className='card-icon-img'>
              {/* <StoreAltIcon size='xl' color="blue" /> */}
              <img src={projetImage} alt="Projets" width="100%"/>
            </div>
          </div>
        </CardBody>
      </Card>
    </GridItem>
    <GridItem span={12} sm={4} >
      <Card style={{ textAlign: "center" }}>
        <CardTitle style={{ textAlign: "center" }}>
          Clients
        </CardTitle>
        <CardBody>
          <div className='body-card-container'>
            <div className='flex-row'>
                <InProgressIcon size='sm' color="blue" />
                &nbsp;&nbsp;&nbsp;{dashboardStatistics?.totalCustomersByStatus?.find((item) => item.status === 'Prospet')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Prospets
            </div>
            <div className='flex-row'>
                <CheckCircleIcon size='sm' color="green" />
                &nbsp;&nbsp;&nbsp;{dashboardStatistics?.totalCustomersByStatus?.find((item) => item.status === 'Active')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Actifs
            </div>
            <div className='flex-row'>
                <TimesCircleIcon size='sm' color="orange" />
                &nbsp;&nbsp;&nbsp;{dashboardStatistics?.totalCustomersByStatus?.find((item) => item.status === 'Expiré')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Expirés
            </div>
            <div className='flex-row'>
                <OutlinedTrashAltIcon size='sm' color="red" />
                &nbsp;&nbsp;&nbsp;{dashboardStatistics?.totalCustomersByStatus?.find((item) => item.status === 'Archiver')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Archivés
            </div>
            <div className='card-icon-img'>
              {/* <UsersIcon size='xl' color="blue" /> */}
              <img 
                src={clientImage}
                alt="Clients"
                width="100%"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </GridItem>
    <GridItem span={12} sm={4} >
      <Card style={{ textAlign: "center" }}>
        <CardTitle style={{ textAlign: "center" }}>
          Équipe
        </CardTitle>
        <CardBody>
          <div className='body-card-container'>
            <div className='flex-row'>
                <UsersCogIcon size='sm' color="DarkSlateGray" />
                &nbsp;&nbsp;&nbsp;{dashboardStatistics?.totalTeamMembersByStatus?.find((item) => item.status === 'Technicien')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Techniciens
            </div>
            <div className='flex-row'>
                <UserAltIcon size='sm' color="DarkOliveGreen" />
                &nbsp;&nbsp;&nbsp;{dashboardStatistics?.totalTeamMembersByStatus?.find((item) => item.status === 'Commercial')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Commerciaux
            </div>
            <div className='flex-row'>
                <UserTieIcon size='sm' color="LightCoral" />
                &nbsp;&nbsp;&nbsp;{dashboardStatistics?.totalTeamMembersByStatus?.find((item) => item.status === 'Gestionnaire')?.value || 0}&nbsp;&nbsp;&nbsp;&nbsp; Gestionnaires
            </div>
            <div className='flex-row'>
                &nbsp;&nbsp;&nbsp;
            </div>
            <div className='card-icon-img'>
              {/* <UsersCogIcon size='xl' color="blue" /> */}
              <img src={ressourceImage} alt="Ressources" width="100%"/>
            </div>
          </div>
        </CardBody>
      </Card>
    </GridItem>
  </Grid>
)};

export { TotalsCards };
