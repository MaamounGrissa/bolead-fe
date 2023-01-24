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
import TrashAltIcon from '@patternfly/react-icons/dist/esm/icons/trash-alt-icon';
import UserEditIcon from '@patternfly/react-icons/dist/esm/icons/user-edit-icon';
import DashboardWrapper from '@patternfly/react-core/src/demos/examples/DashboardWrapper.js';
import { Table, TableBody, TableHeader, TableProps, TableVariant, headerCol } from '@patternfly/react-table';
import { SearchIcon } from '@patternfly/react-icons';

export default interface Resource {
    name: string;
    phone: string;
    email: string;
    type: string;
    status: string;
}

export const TableComponent: React.FunctionComponent = () => {
    const rows: any = [
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
    const defaultRows = rows;
    const [filters, setFilters] = useState({
        type: "",
        name: "",
        status: ""
    });
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [paginatedRows, setPaginatedRows] = useState(rows);
    const [loading, setLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('Status');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [actions, setActions] = useState([
        {
          title: <span key="action1"><UserEditIcon />&nbsp;Modifier</span>,
          onClick: (event: any, rowId, rowData, extra) => console.log('clicked on Some action, on row: ', rowId)
        },
        {
            title: <span  key="action2"><TrashAltIcon />&nbsp;Supprimer</span>,
            onClick: (event: any, rowId, rowData, extra) => console.log('clicked on Some action, on row: ', rowId)
        }
      ]);

    // Pagination logic
    const handleSetPage = (_evt: any, newPage: any) => {
        setPage(newPage);
    };

    const handlePerPageSelect = (_evt: any, newPerPage: number) => {
        setPerPage(newPerPage);
    };

    const renderPagination = (variant: string | "bottom", isCompact: boolean | true) => {
        return (
            <Pagination
            isCompact={isCompact}
            itemCount={rows.length}
            page={page}
            perPage={perPage}
            onSetPage={handleSetPage}
            onPerPageSelect={handlePerPageSelect}
            variant={variant === "top" ? PaginationVariant.top : PaginationVariant.bottom}
            titles={{
                paginationTitle: `${variant} pagination`
            }}
            />
        )
    };

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

    const onStatusSelect = (event: any) => {
        setFilters({
            ...filters,
            status: event.target.value
        })
    };

    const onNameInput = (event: any) => {
        if (event.key && event.key !== 'Enter') {
        return;
        }
        setFilters({
            ...filters,
            name: inputValue
        })
    };

    const onTypeSelect = (event: any) => {
        setFilters({
            ...filters,
            type: event.target.value
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
        <SelectOption key="Actif" value="Actif" />,
        <SelectOption key="Pause" value="Pause" />,
        <SelectOption key="Deleted" value="Deleted" />,
        ];

        return (
        <React.Fragment>
            <ToolbarFilter
            chips={[filters.type]}
            deleteChip={onDelete}
            categoryName="Type"
            showToolbarItem={currentCategory === 'Type'}
            >
            <Select
                aria-label="Type"
                onToggle={onFilterToggle}
                onSelect={onTypeSelect}
                selections={filters.type}
                isOpen={isFilterDropdownOpen}
                placeholderText="Any"
            >
                {TypeMenuItems}
            </Select>
            </ToolbarFilter>
            <ToolbarFilter
            chips={[filters.name]}
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
            chips={[filters.status]}
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
            <ToolbarItem variant='pagination'>{renderPagination("top", true)}</ToolbarItem>
            </ToolbarContent>
        </Toolbar>
        </React.Fragment>
    );

    const filteredRows =
        filters.name.length > 0 || filters.type.length > 0 || filters.status.length > 0
            ? rows.filter((row: any) => {
                return (
                (filters.name.length === 0 ||
                    filters.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
                (filters.type?.length === 0 || filters.type?.includes(row[3])) &&
                (filters.status?.length === 0 || filters.status?.includes(row[4]))
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

    const renderLabel = (labelText: string) => {
        switch (labelText) {
          case 'Actif':
            return <Label color="green">{labelText}</Label>;
          case 'Pause':
            return <Label color="orange">{labelText}</Label>;
          case 'Needs Maintenance':
            return <Label color="blue">{labelText}</Label>;
          case 'Deleted':
            return <Label color="red">{labelText}</Label>;
          default:
            return <Label color="red">{labelText}</Label>;
        }
    };
    
    const tableColumns: TableProps['cells'] = [
        { title: 'Name' },
        { title: 'Phone' },
        { title: 'Email' },
        { title: 'Type' },
        { title: 'Status' }
    ];
    const finalRows: TableProps['rows'] = tableRows.map((repo: any) => ({
        cells: [
            repo.name,
            repo.phone,
            repo.email,
            repo.type,
            <>{renderLabel(repo.status)}</>,
        ],
    }));

  return (
    <React.Fragment>
          <Card>
            {toolbarItems}
            <Table 
                cells={tableColumns} 
                rows={finalRows} 
                aria-label="Filterable Table Demo"
                variant={TableVariant.compact}
                actions={actions}
            >
                <TableHeader />
                <TableBody />
            </Table>
            {renderPagination("bottom", true)}
          </Card>
    </React.Fragment>
  );
};