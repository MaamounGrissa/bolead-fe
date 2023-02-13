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
import { CheckCircleIcon, TimesCircleIcon, ClockIcon } from '@patternfly/react-icons';
import { RessourcesTable } from './RessourcesTable';

const Ressources: React.FunctionComponent = () => {
  const [openCreateRessource, setOpenCreateRessource] = React.useState(false);

  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <CheckCircleIcon size='lg' color="green" className='mr-2' /> 5 Visites Validées
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
            <ClockIcon size='lg' color="orange" className='mr-2' /> 10 Visites en cours
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <TimesCircleIcon size='lg' color="red" className='mr-2' /> 15 Visites Annuler
            </CardTitle>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between mobile-flex-column'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">8 Ressources</Title>
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
