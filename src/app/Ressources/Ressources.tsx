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
import UserPlusIcon from '@patternfly/react-icons/dist/js/icons/user-plus-icon';
import { CheckCircleIcon, TimesCircleIcon, ClockIcon } from '@patternfly/react-icons';
import { RessourcesTable } from './RessourcesTable';

const Ressources: React.FunctionComponent = () => {
  const [openCreateRessource, setOpenCreateRessource] = React.useState(false);
  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem span={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              5 Visite Validée
            </CardTitle>
            <CardBody>
              <CheckCircleIcon size='lg' color="green" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              10 Visites en cours
            </CardTitle>
            <CardBody>
              <ClockIcon size='lg' color="orange" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              15 Visites Annuler
            </CardTitle>
            <CardBody>
              <TimesCircleIcon size='lg' color="red" />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between'>
        <Title headingLevel="h1" size="lg"  className="pf-u-mb-xl">8 Ressources</Title>
        <Button variant="primary" onClick={() => setOpenCreateRessource(true)}><UserPlusIcon />&nbsp;Ressource</Button>
      </div>
      <div>
        <RessourcesTable openCreateRessource={openCreateRessource} setOpenCreateRessource={() => setOpenCreateRessource(false)} />
      </div>
    </PageSection>
  )
}

export { Ressources };
