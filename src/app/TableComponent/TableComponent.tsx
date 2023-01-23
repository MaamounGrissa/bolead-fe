import React, {useState, useEffect} from 'react';
import {
  Button,
  DataList,
  DataListCheck,
  DataListItem,
  DataListItemRow,
  DataListCell,
  DataListItemCells,
  Label,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Modal,
  OverflowMenu,
  OverflowMenuGroup,
  OverflowMenuItem,
  OptionsMenu,
  OptionsMenuToggle,
  Pagination,
  PaginationVariant,
  Text,
  TextContent,
  Select,
  SelectVariant,
  Card,
  TextVariants,
  Title,
  Bullseye,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  SelectOption,
  ToolbarFilter,
  DropdownPosition,
  ToolbarToggleGroup,
  ToolbarGroup,
  SearchInput,
  Avatar
} from '@patternfly/react-core';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import SortAmountDownIcon from '@patternfly/react-icons/dist/esm/icons/sort-amount-down-icon';
import DashboardWrapper from '@patternfly/react-core/src/demos/examples/DashboardWrapper.js';
import { Table, TableBody, TableHeader, TableProps, headerCol } from '@patternfly/react-table';
import { SearchIcon } from '@patternfly/react-icons';

export const TableComponent: React.FunctionComponent = ({ columns, rows }) => {
    const defaultColumns = columns;
    const defaultRows = rows;

    const [filters, setFilters] = useState({
        type: [],
        name: [],
        status: []
    });
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [paginatedRows, setPaginatedRows] = useState(rows);
    const [loading, setLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('Status');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Pagination logic
  const handleSetPage = (_evt: any, newPage: any) => {
    setPage(newPage);
  };

  const handlePerPageSelect = (_evt: any, newPerPage: any) => {
    setPerPage(newPerPage);
  };

  const renderPagination = (variant: string | undefined, isCompact: boolean | undefined) => (
    <Pagination
      isCompact={isCompact}
      itemCount={rows.length}
      page={page}
      perPage={perPage}
      onSetPage={handleSetPage}
      onPerPageSelect={handlePerPageSelect}
      variant={variant}
      titles={{
        paginationTitle: `${variant} pagination`
      }}
    />
  );

  useEffect(() => {
    setPaginatedRows(defaultRows.slice((page - 1) * perPage, page * perPage - 1));
  }, [defaultRows, page, perPage]);

  // Removes attribute from each node object in Data.jsx
  const removePropFromObject = (object, keys) =>
    keys.reduce((obj, prop) => {
      const { [prop]: _, ...keep } = obj;
      return keep;
    }, object);

    const onDelete= () => {
        return 'delete';
    }

  const onCategoryToggle = (isOpen: any) => {
    setIsCategoryDropdownOpen(isOpen);
  };

  const onCategorySelect = (event: any) => {
    setCurrentCategory(event.target.innerText);
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const onFilterToggle = (isOpen: boolean) => {
    setIsFilterDropdownOpen(isOpen);
  };

  const onFilterSelect = (event: any) => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const onInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const onStatusSelect = (event, selection) => {
    setFilters({
        ...filters,
        ['status']: [selection]
    })
  };

  const onNameInput = (event: any) => {
    if (event.key && event.key !== 'Enter') {
      return;
    }
    setFilters({
        ...filters,
        ['name']: [inputValue]
    })
  };

  const onTypeSelect = (event, selection) => {
    setFilters({
        ...filters,
        ['type']: [selection]
    })
  };

  const buildCategoryDropdown = () => {
    const categoryMenuItems = [
      <SelectOption key="cat1" value="Type" />,
      <SelectOption key="cat2" value="Name" />,
      <SelectOption key="cat3" value="Status" />
    ];

    return (
      <ToolbarItem>
        <Select
          onSelect={onCategorySelect}
          selections={currentCategory}
          position={DropdownPosition.left}
          onToggle={onCategoryToggle}
          isOpen={isCategoryDropdownOpen}
          toggleIcon={<FilterIcon />}
          style={{ width: '100%' }}
        >
          {categoryMenuItems}
        </Select>
      </ToolbarItem>
    );
  }

  const buildFilterDropdown = () => {
    const TypeMenuItems = [
      <SelectOption key="technicien" value="Technicien" />,
      <SelectOption key="admin" value="Admin" />,
      <SelectOption key="Operateur" value="Operateur" />,
    ];

    const statusMenuItems = [
      <SelectOption key="statusRunning" value="Running" />,
      <SelectOption key="statusStopped" value="Stopped" />,
      <SelectOption key="statusDown" value="Down" />,
      <SelectOption key="statusDegraded" value="Degraded" />,
      <SelectOption key="statusMaint" value="Needs Maintainence" />
    ];

    return (
      <React.Fragment>
        <ToolbarFilter
          chips={filters.type}
          deleteChip={onDelete}
          categoryName="Type"
          showToolbarItem={currentCategory === 'Type'}
        >
          <Select
            aria-label="Type"
            onToggle={onFilterToggle}
            onSelect={onTypeSelect}
            selections={filters.type[0]}
            isOpen={isFilterDropdownOpen}
            placeholderText="Any"
          >
            {TypeMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.name}
          deleteChip={onDelete}
          categoryName="Name"
          showToolbarItem={currentCategory === 'Name'}
        >
          <SearchInput
            aria-label="name filter"
            placeholder="Filter by name..."
            onChange={onInputChange}
            value={inputValue}
            onClear={() => {
              onInputChange('');
            }}
            onSearch={onNameInput}
          />
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.status}
          deleteChip={onDelete}
          categoryName="Status"
          showToolbarItem={currentCategory === 'Status'}
        >
          <Select
            variant={SelectVariant.checkbox}
            aria-label="Status"
            onToggle={onFilterToggle}
            onSelect={onStatusSelect}
            selections={filters.status}
            isOpen={isFilterDropdownOpen}
            placeholderText="Filter by status"
          >
            {statusMenuItems}
          </Select>
        </ToolbarFilter>
      </React.Fragment>
    );
  }

  const toolbarItems = (
    <React.Fragment>
      <Toolbar id="page-layout-table-column-management-action-toolbar-top">
        <span id="page-layout-table-column-management-action-toolbar-top-select-checkbox-label" hidden>
          Choose one
        </span>
        <ToolbarContent>
          <ToolbarItem variant="overflow-menu">
            <OverflowMenu breakpoint="md">
              <OverflowMenuItem>
                <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
                    <ToolbarGroup variant="filter-group">
                    {buildCategoryDropdown()}
                    {buildFilterDropdown()}
                    </ToolbarGroup>
                </ToolbarToggleGroup>
              </OverflowMenuItem>
              <OverflowMenuItem>
                <OptionsMenu
                  id="page-layout-table-column-management-action-toolbar-top-options-menu-toggle"
                  isPlain
                  menuItems={[]}
                  toggle={
                    <OptionsMenuToggle
                      toggleTemplate={<SortAmountDownIcon aria-hidden="true" />}
                      aria-label="Sort by"
                      hideCaret
                    />
                  }
                />
              </OverflowMenuItem>
            </OverflowMenu>
          </ToolbarItem>
          <ToolbarItem variant="pagination">{renderPagination(PaginationVariant.top)}</ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </React.Fragment>
  );

  const filteredRows =
      filters.name.length > 0 || filters.type.length > 0 || filters.status.length > 0
        ? rows.filter((row: any) => {
            return (
              (filters.name.length === 0 ||
                filters.name.some((name: string) => row.cells[0].toLowerCase().includes(name.toLowerCase()))) &&
              (filters.type.length === 0 || filters.type.includes(row.cells[3])) &&
              (filters.status.length === 0 || filters.status.includes(row.cells[4]))
            );
          })
        : rows;

    let tableRows = filteredRows;
    if (!loading && filteredRows.length === 0) {
      tableRows = [
        {
          heightAuto: true,
          cells: [
            {
              props: { colSpan: 8 },
              title: (
                <Bullseye>
                  <EmptyState>
                    <EmptyStateIcon icon={SearchIcon} />
                    <Title headingLevel="h5" size="lg">
                      Clear all filters and try again.
                    </Title>
                    <EmptyStateBody>
                      No results match this filter criteria. Remove all filters or clear all filters to show results.
                    </EmptyStateBody>
                    <EmptyStateSecondaryActions>
                      <Button
                        variant="link"
                        onClick={() => {
                          onDelete();
                        }}
                      >
                        Clear all filters
                      </Button>
                    </EmptyStateSecondaryActions>
                  </EmptyState>
                </Bullseye>
              )
            }
          ]
        }
      ];
    } else if (loading) {
      tableRows = [
        {
          heightAuto: true,
          cells: [
            {
              props: { colSpan: 8 },
              title: (
                <Title headingLevel="h2" size="3xl">
                  Please wait while loading data
                </Title>
              )
            }
          ]
        }
      ];
    }
    
    const tableColumns: TableProps['cells'] = [
        { title: 'Avatar' },
        { title: 'Name' },
        { title: 'Phone' },
        { title: 'Email' },
        { title: 'Type' },
        { title: 'Status' }
    ];
    const finalRows: TableProps['rows'] = tableRows.map((repo: any) => ({
        cells: [
            <><Avatar src={repo.avatar} alt="avatar" size="md" /></>, 
            repo.name, 
            repo.phone, 
            repo.email, 
            repo.type, 
            repo.status
        ],
    }));

  return (
    <React.Fragment>
          <Card>
            {toolbarItems}
            <Table 
                cells={tableColumns} 
                rows={finalRows} 
                aria-label="Filterable Table Demo">
                <TableHeader />
                <TableBody />
            </Table>
            {renderPagination(PaginationVariant.bottom)}
          </Card>
    </React.Fragment>
  );
};