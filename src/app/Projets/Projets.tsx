import React from 'react';
import {
  Title,
  PageSection,
  Button,
  Grid,
  GridItem,
  Card,
  CardTitle} from '@patternfly/react-core';
import { AddCircleOIcon, GripHorizontalIcon, TableIcon } from '@patternfly/react-icons';
import { InProgressIcon, CheckCircleIcon, TimesCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons';
import { ProjetsTable } from './ProjetsTable';
import { useAppSelector } from '@app/store';

const Projets: React.FunctionComponent = () => {
  const [openCreateProjet, setOpenCreateProjet] = React.useState(false);
  const [view, setView] = React.useState('GRID');
  const { totalCount } = useAppSelector((state) => state.projets);

  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <InProgressIcon size='lg' color="green" className='mr-2' /> 4 En cours
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <CheckCircleIcon size='lg' color="green" className='mr-2' /> 15 Terminé
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <ExclamationTriangleIcon size='lg' color="orange" className='mr-2' /> 5 En pause
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <TimesCircleIcon size='lg' color="red" className='mr-2' /> 3 Annuler
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
