import React from 'react';
import {
  Title,
  PageSection,
  Button,
  Grid,
  GridItem,
  Card,
  CardTitle} from '@patternfly/react-core';
import { FilePdfIcon, OutlinedCalendarAltIcon, OutlinedCalendarPlusIcon, TableIcon, UserCogIcon, UserSecretIcon, UserTieIcon } from '@patternfly/react-icons';
import { PlanificationsTable } from './PlanificationsTable';
import { VisiteTechniqueHTML } from './VisiteTechnique';
import { useAppSelector } from '@app/store';

const Planifications: React.FunctionComponent = () => {
  const [openCreatePlanification, setOpenCreatePlanification] = React.useState(false);
  const [view, setView] = React.useState('GRID');
  const { totalCount } = useAppSelector((state) => state.planifications);

  const [showPdf, setShowPdf] = React.useState(false);

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
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">{totalCount} Planifications</Title>
        <div className='mobile-m-2'>
          <Button variant="primary" onClick={() => setShowPdf(true)}><FilePdfIcon />&nbsp;PDF</Button>
          <Button style={{ margin: '0 5px'}} variant="primary" onClick={() => setOpenCreatePlanification(true)}><OutlinedCalendarPlusIcon />&nbsp;Rendez-vous</Button>
          <Button style={{ margin: '0 5px'}} variant={view === 'GRID' ? 'primary' : 'secondary'} onClick={() => setView('GRID')} ><OutlinedCalendarAltIcon color='white'/></Button>
          <Button variant={view === 'TABLE' ? 'primary' : 'secondary'} onClick={() => setView('TABLE')} ><TableIcon color='white'/></Button>
        </div>
      </div>
      <div>
        <PlanificationsTable view={view} openCreatePlanification={openCreatePlanification} setOpenCreatePlanification={() => setOpenCreatePlanification(true)} closeModal={() => setOpenCreatePlanification(false)} />
      </div>
      <VisiteTechniqueHTML isOpen={showPdf} close={() => setShowPdf(false)} />
    </PageSection>
  )
}

export { Planifications };
