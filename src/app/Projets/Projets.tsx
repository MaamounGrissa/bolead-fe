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
import { AddCircleOIcon, GripHorizontalIcon, TableIcon } from '@patternfly/react-icons';
import { InProgressIcon, CheckCircleIcon, TimesCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons';
import { ProjetsTable } from './ProjetsTable';

const Projets: React.FunctionComponent = () => {
  const [openCreateProjet, setOpenCreateProjet] = React.useState(false);
  const [view, setView] = React.useState('GRID');

  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              4 En cours
            </CardTitle>
            <CardBody>
              <InProgressIcon size='lg' color="green" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              15 Terminé
            </CardTitle>
            <CardBody>
              <CheckCircleIcon size='lg' color="green" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              5 En pause
            </CardTitle>
            <CardBody>
              <ExclamationTriangleIcon size='lg' color="orange" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={12} sm={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              3 Annuler
            </CardTitle>
            <CardBody>
              <TimesCircleIcon size='lg' color="red" />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between mobile-flex-column'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">13 Projets</Title>
        <div className='mobile-m-2'>
          <Button variant="primary" onClick={() => setOpenCreateProjet(true)}><AddCircleOIcon />&nbsp;Projet</Button>
          <Button style={{ margin: '0 5px'}} variant={view === 'GRID' ? 'primary' : 'secondary'} onClick={() => setView('GRID')} ><GripHorizontalIcon color='white'/></Button>
          <Button variant={view === 'TABLE' ? 'primary' : 'secondary'} onClick={() => setView('TABLE')} ><TableIcon color='white'/></Button>
        </div>
      </div>
      <div>
        <ProjetsTable view={view} openCreateProjet={openCreateProjet} setOpenCreateProjet={() => setOpenCreateProjet(false)} />
      </div>
    </PageSection>
  )
}

export { Projets };
