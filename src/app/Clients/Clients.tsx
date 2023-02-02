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
import { ClientsTable } from './ClientsTable';

const Clients: React.FunctionComponent = () => {
  const [openCreateClient, setOpenCreateClient] = React.useState(false);

  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem span={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              5 Actif
            </CardTitle>
            <CardBody>
              <CheckCircleIcon size='lg' color="green" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              10 Prospet
            </CardTitle>
            <CardBody>
              <ClockIcon size='lg' color="orange" />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center" }}>
              15 Expiré
            </CardTitle>
            <CardBody>
              <TimesCircleIcon size='lg' color="red" />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">8 Clients</Title>
        <Button variant="primary" onClick={() => setOpenCreateClient(true)}><UserPlusIcon />&nbsp;Client</Button>
      </div>
      <div>
        <ClientsTable openCreateClient={openCreateClient} setOpenCreateClient={() => setOpenCreateClient(false)} />
      </div>
    </PageSection>
  )
}

export { Clients };
