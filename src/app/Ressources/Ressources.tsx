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
    { title: 'Servers' },
    { title: 'Threads' },
    { title: 'Applications' },
    { title: 'Workspaces' },
    { title: 'Status' },
    { title: 'Location' },
    { title: 'Url' }
  ];

  const rows = [
    { cells: ['US-Node 1', '5', '25', '5', 'Stopped', 'Raleigh', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'] },
    { cells: ['US-Node 2', '5', '30', '2', 'Down', 'Westford', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'] },
    { cells: ['US-Node 3', '13', '35', '12', 'Degraded', 'Boston', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'] },
    { cells: ['US-Node 4', '2', '5', '18', 'Needs Maintainence', 'Raleigh', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'] },
    { cells: ['US-Node 5', '7', '30', '5', 'Running', 'Boston', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#']},
    { cells: ['US-Node 6', '5', '20', '15', 'Stopped', 'Raleigh', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'] },
    { cells: ['CZ-Node 1', '12', '48', '13', 'Down', 'Brno', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'] },
    { cells: ['CZ-Node 2', '3', '8', '20', 'Running', 'Brno', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'] },
    { cells: ['CZ-Remote-Node 1', '15', '20', '10', 'Down', 'Brno', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'] },
    { cells: ['Bangalore-Node 1', '20', '30', '30', 'Running', 'Bangalore', 'https://www.patternfly.org/v4/components/table/react-demos/column-management/#'] }
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
