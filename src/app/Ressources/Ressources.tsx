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
import { TableComponent } from '@app/TableComponent/TableComponent';
import Resource from './RessourceInterface';
import UserPlusIcon from '@patternfly/react-icons/dist/js/icons/user-plus-icon';
import { CheckCircleIcon, TimesCircleIcon, ClockIcon } from '@patternfly/react-icons';


const Ressources: React.FunctionComponent = () => {
  const columns = {
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    type: 'Type',
    status: 'Status'
  }

  const rows: Resource[] = [
    {
      name: 'John Smith',
      phone: '555-555-5555',
      email: 'john@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'Anna Smith',
      phone: '555-555-5555',
      email: 'anna@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'Peter Smith',
      phone: '555-555-5555',
      email: 'peter@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      name: 'Randy Schwartz',
      phone: '555-555-5555',
      email: 'randy@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      name: 'Michael Smith',
      phone: '555-555-5555',
      email: 'michael@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'John Smith',
      phone: '555-555-5555',
      email: 'john@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'Anna Smith',
      phone: '555-555-5555',
      email: 'anna@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'Peter Smith',
      phone: '555-555-5555',
      email: 'peter@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      name: 'Randy Schwartz',
      phone: '555-555-5555',
      email: 'randy@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      name: 'Michael Smith',
      phone: '555-555-5555',
      email: 'michael@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'John Smith',
      phone: '555-555-5555',
      email: 'john@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'Anna Smith',
      phone: '555-555-5555',
      email: 'anna@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'Peter Smith',
      phone: '555-555-5555',
      email: 'peter@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      name: 'Randy Schwartz',
      phone: '555-555-5555',
      email: 'randy@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      name: 'Michael Smith',
      phone: '555-555-5555',
      email: 'michael@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'John Smith',
      phone: '555-555-5555',
      email: 'john@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'Anna Smith',
      phone: '555-555-5555',
      email: 'anna@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      name: 'Peter Smith',
      phone: '555-555-5555',
      email: 'peter@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      name: 'Randy Schwartz',
      phone: '555-555-5555',
      email: 'randy@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      name: 'Michael Smith',
      phone: '555-555-5555',
      email: 'michael@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    }
  ];

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', marginTop: "40px" }}>
        <Title headingLevel="h1" size="lg"  className="pf-u-mb-xl">8 Ressources</Title>
        <Button variant="primary"><UserPlusIcon />&nbsp;Ressource</Button>
      </div>
      <div>
        <TableComponent columns={columns} rows={rows} />
      </div>
    </PageSection>
  )
}

export { Ressources };
