import React from 'react';
import {
  Title,
  PageSection,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardTitle} from '@patternfly/react-core';
import { OutlinedCalendarAltIcon, OutlinedCalendarPlusIcon, TableIcon, UserCogIcon, UserSecretIcon, UserTieIcon } from '@patternfly/react-icons';
import { PlanificationsTable } from './PlanificationsTable';

const Planifications: React.FunctionComponent = () => {
  const [openCreatePlanification, setOpenCreatePlanification] = React.useState(false);
  const [view, setView] = React.useState('GRID');

  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem span={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              4 Visite Technique
            </CardTitle>
            <CardBody>
              <UserCogIcon size='lg' color="DarkCyan" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              15 Visite Commerciale
            </CardTitle>
            <CardBody>
              <UserTieIcon size='lg' color="blue" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              3 Audit
            </CardTitle>
            <CardBody>
              <UserSecretIcon size='lg' color="orange" />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">13 Planifications</Title>
        <div>
          <Button variant="primary" onClick={() => setOpenCreatePlanification(true)}><OutlinedCalendarPlusIcon />&nbsp;Rendez-vous</Button>
          <Button style={{ margin: '0 5px'}} variant={view === 'GRID' ? 'primary' : 'secondary'} onClick={() => setView('GRID')} ><OutlinedCalendarAltIcon color='white'/></Button>
          <Button variant={view === 'TABLE' ? 'primary' : 'secondary'} onClick={() => setView('TABLE')} ><TableIcon color='white'/></Button>
        </div>
      </div>
      <div>
        <PlanificationsTable view={view} openCreatePlanification={openCreatePlanification} setOpenCreatePlanification={() => setOpenCreatePlanification(false)} />
      </div>
    </PageSection>
  )
}

export { Planifications };
