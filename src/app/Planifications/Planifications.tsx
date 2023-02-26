import React from 'react';
import {
  Title,
  PageSection,
  Button,
  Grid,
  GridItem,
  Card,
  CardTitle} from '@patternfly/react-core';
import { OutlinedCalendarAltIcon, OutlinedCalendarPlusIcon, TableIcon, UserCogIcon, UserSecretIcon, UserTieIcon } from '@patternfly/react-icons';
import { PlanificationsTable } from './PlanificationsTable';

const Planifications: React.FunctionComponent = () => {
  const [openCreatePlanification, setOpenCreatePlanification] = React.useState(false);
  const [view, setView] = React.useState('GRID');

  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <UserCogIcon size='lg' color="DarkCyan" className='mr-2' /> 4 Visites Technique
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <UserTieIcon size='lg' color="blue" className='mr-2' /> 15 Visites Commerciale
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <UserSecretIcon size='lg' color="orange" className='mr-2' /> 3 Opérations d&apos;Audits
            </CardTitle>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between mobile-flex-column'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">13 Planifications</Title>
        <div className='mobile-m-2'>
          <Button variant="primary" onClick={() => setOpenCreatePlanification(true)}><OutlinedCalendarPlusIcon />&nbsp;Rendez-vous</Button>
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
