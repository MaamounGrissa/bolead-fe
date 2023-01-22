import React, {useState, useEffect} from 'react';
import {
  Button,
  Bullseye,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToolbarFilter,
  ToolbarToggleGroup,
  ToolbarGroup,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  DropdownToggle,
  Title,
  PageSection,
  Select,
  SelectOption,
  SelectVariant,
  SearchInput,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  OnSetPage,
  OnPerPageSelect
} from '@patternfly/react-core';
import { Pagination } from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { TableComponent } from '@app/TableComponent/TableComponent';

interface Repository {
  Servers: string;
  Threads: string;
  Applications: string;
  Workspaces: string;
  Status: string;
  Location: string;
}

const Ressources: React.FunctionComponent = () => {
  const columns = [
    'Servers',
    'Threads',
    'Applications',
    'Workspaces',
    'Status',
    'Location',
    'Url'
  ];

  const rows = [
    {
      servers: 'US-Node 1',
      threads: 5,
      applications: 25,
      workspaces: 5,
      status: 'Stopped',
      location: 'Raleigh',
      url: 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'
    },
    {
      servers: 'US-Node 2',
      threads: 5,
      applications: 30,
      workspaces: 2,
      status: 'Down',
      location: 'Westford',
      url: 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'
    },
    {
      servers: 'US-Node 3',
      threads: 13,
      applications: 35,
      workspaces: 12,
      status: 'Degraded',
      location: 'Boston',
      url: 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'
    },
    {
      servers: 'US-Node 4',
      threads: 2,
      applications: 5,
      workspaces: 18,
      status: 'Needs Maintainence',
      location: 'Raleigh',
      url: 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'
    },
    {
      servers: 'US-Node 5',
      threads: 7,
      applications: 30,
      workspaces: 5,
      status: 'Running',
      location: 'Boston',
      url: 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'
    },
  ]

  return (
    <PageSection>
      <Title headingLevel="h1" size="lg">Liste des Ressources</Title>
      <div>
        <TableComponent columns={columns} rows={rows} />
      </div>
    </PageSection>
  )
}

export { Ressources };
