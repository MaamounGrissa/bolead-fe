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
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <CheckCircleIcon size='lg' color="green" className='mr-2' /> 5 Actif
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <ClockIcon size='lg' color="orange" className='mr-2' /> 10 Prospet
            </CardTitle>
          </Card>
        </GridItem>
        <GridItem span={12} sm={4} >
          <Card style={{ textAlign: "center" }}>
            <CardTitle style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
              <TimesCircleIcon size='lg' color="red" className='mr-2' /> 15 Expiré
            </CardTitle>
          </Card>
        </GridItem>
      </Grid>
      <div className='flex-between mobile-flex-column'>
        <Title headingLevel="h1" size="xl"  className="pf-u-mb-xl">8 Clients</Title>
        <div className='mobile-m-2'>
          <Button variant="primary" onClick={() => setOpenCreateClient(true)}><UserPlusIcon />&nbsp;Client</Button>
        </div>
      </div>
      <div>
        <ClientsTable openCreateClient={openCreateClient} setOpenCreateClient={() => setOpenCreateClient(false)} />
      </div>
    </PageSection>
  )
}

export { Clients };
