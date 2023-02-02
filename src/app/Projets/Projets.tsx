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
import { AddCircleOIcon } from '@patternfly/react-icons';
import { InProgressIcon, CheckCircleIcon, TimesCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons';
import { ProjetsTable } from './ProjetsTable';

const Projets: React.FunctionComponent = () => {
  const [openCreateProjet, setOpenCreateProjet] = React.useState(false);

  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem span={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              4 En cours
            </CardTitle>
            <CardBody>
              <InProgressIcon size='lg' color="green" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              15 Terminé
            </CardTitle>
            <CardBody>
              <CheckCircleIcon size='lg' color="green" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={3} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              5 En pause
            </CardTitle>
            <CardBody>
              <ExclamationTriangleIcon size='lg' color="orange" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={3} >
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
      <div className='flex-between'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">13 Projets</Title>
        <Button variant="primary" onClick={() => setOpenCreateProjet(true)}><AddCircleOIcon />&nbsp;Projet</Button>
      </div>
      <div>
        <ProjetsTable openCreateProjet={openCreateProjet} setOpenCreateProjet={() => setOpenCreateProjet(false)} />
      </div>
    </PageSection>
  )
}

export { Projets };
