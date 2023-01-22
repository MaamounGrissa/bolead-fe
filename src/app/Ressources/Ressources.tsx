import React from 'react';
import {
  Title,
  PageSection} from '@patternfly/react-core';
import { TableComponent } from '@app/TableComponent/TableComponent';
import Resource from './RessourceInterface';


const Ressources: React.FunctionComponent = () => {

  const columns = {
    avatar: 'Avatar',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    type: 'Type',
    status: 'Status'
  }

  const rows: Resource[] = [
    {
      avatar: 'https://i.stack.imgur.com/l60Hf.png',
      name: 'John Smith',
      phone: '555-555-5555',
      email: 'john@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      avatar: 'https://i.stack.imgur.com/l60Hf.png',
      name: 'Anna Smith',
      phone: '555-555-5555',
      email: 'anna@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    },
    {
      avatar: 'https://i.stack.imgur.com/l60Hf.png',
      name: 'Peter Smith',
      phone: '555-555-5555',
      email: 'peter@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      avatar: 'https://i.stack.imgur.com/l60Hf.png',
      name: 'Randy Schwartz',
      phone: '555-555-5555',
      email: 'randy@bolead.fr',
      type: 'Administrateur',
      status: 'Actif'
    },
    {
      avatar: 'https://i.stack.imgur.com/l60Hf.png',
      name: 'Michael Smith',
      phone: '555-555-5555',
      email: 'michael@bolead.fr',
      type: 'Technicien',
      status: 'Actif'
    }
  ];

  return (
    <PageSection>
      <Title headingLevel="h1" size="lg"  className="pf-u-mb-xl">Ressources Page Title!</Title>
      <div>
        <TableComponent columns={columns} rows={rows} />
      </div>
    </PageSection>
  )
}

export { Ressources };
