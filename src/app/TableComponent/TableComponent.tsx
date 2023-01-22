import * as React from 'react';
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
  SearchInput
} from '@patternfly/react-core';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import SortAmountDownIcon from '@patternfly/react-icons/dist/esm/icons/sort-amount-down-icon';
import DashboardWrapper from '@patternfly/react-core/src/demos/examples/DashboardWrapper.js';
import { capitalize } from '@patternfly/react-table/src/components/Table/utils/utils';
import { Table, TableBody, TableComposable, TableHeader, TableText, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { SearchIcon } from '@patternfly/react-icons';

export const TableComponent = ({ columns, rows }) => {
  const defaultColumns = columns;
  const defaultRows = rows;

  const [filters, setFilters] = React.useState({
    location: [],
    name: [],
    status: []
  });
  const [filteredColumns, setFilteredColumns] = React.useState([]);
  const [managedColumns, setManagedColumns] = React.useState(defaultColumns);
  const [managedRows, setManagedRows] = React.useState(defaultRows);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [checkedState, setCheckedState] = React.useState(Array(columns.length).fill(true));
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [paginatedRows, setPaginatedRows] = React.useState(rows);
  const [loading, setLoading] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState('Status');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = React.useState(false);




  const matchCheckboxNameToColumn = (name: any) => {
    switch (name) {
      case 'check1':
        return 'Servers';
      case 'check2':
        return 'Threads';
      case 'check3':
        return 'Applications';
      case 'check4':
        return 'Workspaces';
      case 'check5':
        return 'Status';
      case 'check6':
        return 'Location';
      case 'check7':
        return 'Last Modified';
      case 'check8':
        return 'URL';
    }
  };
  const matchSelectedColumnNameToAttr = (name: any) => {
    switch (name) {
      case 'Servers':
        return 'name';
      case 'Threads':
        return 'threads';
      case 'Applications':
        return 'applications';
      case 'Workspaces':
        return 'workspaces';
      case 'Status':
        return 'status';
      case 'Location':
        return 'location';
      case 'Last Modified':
        return 'lastModified';
      case 'URL':
        return 'url';
    }
  };

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

  React.useEffect(() => {
    setPaginatedRows(managedRows.slice((page - 1) * perPage, page * perPage - 1));
  }, [managedRows, page, perPage]);

  // Removes attribute from each node object in Data.jsx
  const removePropFromObject = (object, keys) =>
    keys.reduce((obj, prop) => {
      const { [prop]: _, ...keep } = obj;
      return keep;
    }, object);

  // Filters columns out of table that are not selected in the column management modal
  const filterData = (checked, name) => {
    const selectedColumn = matchSelectedColumnNameToAttr(name);

    const filteredRows = [];
    if (checked) {
      const updatedFilters = filters.filter(item => item !== selectedColumn);

      // Only show the names of columns that were selected in the modal
      const filteredColumns = defaultColumns.filter(
        column => !updatedFilters.includes(matchSelectedColumnNameToAttr(column))
      );

      // Remove the attributes (i.e. "columns") that were not selected
      defaultRows.forEach(item => filteredRows.push(removePropFromObject(item, updatedFilters)));

      setFilters(updatedFilters);
      setFilteredColumns(filteredColumns);
      setFilteredRows(filteredRows);
    } else {
      let updatedFilters = filters;
      updatedFilters.push(selectedColumn);

      // Only show the names of columns that were selected in the modal
      const filteredColumns = managedColumns.filter(column => !filters.includes(matchSelectedColumnNameToAttr(column)));

      // Remove the attributes (i.e. "columns") that were not selected
      managedRows.forEach(item => filteredRows.push(removePropFromObject(item, updatedFilters)));

      setFilters(updatedFilters);
      setFilteredColumns(filteredColumns);
      setFilteredRows(filteredRows);
    }
  };
  const unfilterAllData = () => {
    setFilters([]);
    setFilteredColumns(defaultColumns);
    setFilteredRows(defaultRows);
  };

  const handleChange = (checked, event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // Remove any columns from the table that aren't checked
    filterData(checked, matchCheckboxNameToColumn(target.name));
    const checkedIndex = columns.findIndex(element => element === matchCheckboxNameToColumn(target.name));

    const updatedCheckedState = [...checkedState];
    updatedCheckedState[checkedIndex] = value;
    setCheckedState(updatedCheckedState);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSave = () => {
    setManagedColumns(filteredColumns);
    setManagedRows(filteredRows);
    setPaginatedRows(filteredRows);
    setIsModalOpen(!isModalOpen);
  };

  const selectAllColumns = () => {
    setCheckedState(Array(columns.length).fill(true));
  };

  const renderModal = () => {
    return (
      <Modal
        title="Manage columns"
        isOpen={isModalOpen}
        variant="small"
        description={
          <TextContent>
            <Text component={TextVariants.p}>Selected categories will be displayed in the table.</Text>
            <Button isInline onClick={selectAllColumns} variant="link">
              Select all
            </Button>
          </TextContent>
        }
        onClose={handleModalToggle}
        actions={[
          <Button key="save" variant="primary" onClick={onSave}>
            Save
          </Button>,
          <Button key="cancel" variant="secondary" onClick={handleModalToggle}>
            Cancel
          </Button>
        ]}
      >
        <DataList aria-label="Table column management" id="table-column-management" isCompact>
          <DataListItem aria-labelledby="table-column-management-item1">
            <DataListItemRow>
              <DataListCheck
                aria-labelledby="table-column-management-item1"
                checked={checkedState[0]}
                name="check1"
                id="check1"
                onChange={handleChange}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell id="table-column-management-item1" key="table-column-management-item1">
                    <label htmlFor="check1">{columns[0]}</label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="table-column-management-item2">
            <DataListItemRow>
              <DataListCheck
                aria-labelledby="table-column-management-item2"
                checked={checkedState[1]}
                name="check2"
                id="check2"
                onChange={handleChange}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell id="table-column-management-item2" key="table-column-management-item2">
                    <label htmlFor="check2">{columns[1]}</label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="table-column-management-item3">
            <DataListItemRow>
              <DataListCheck
                aria-labelledby="table-column-management-item3"
                checked={checkedState[2]}
                name="check3"
                id="check3"
                onChange={handleChange}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell id="table-column-management-item3" key="table-column-management-item3">
                    <label htmlFor="check3">{columns[2]}</label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="table-column-management-item4">
            <DataListItemRow>
              <DataListCheck
                aria-labelledby="table-column-management-item4"
                checked={checkedState[3]}
                name="check4"
                id="check4"
                onChange={handleChange}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell id="table-column-management-item4" key="table-column-management-item4">
                    <label htmlFor="check4">{columns[3]}</label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="table-column-management-item4">
            <DataListItemRow>
              <DataListCheck
                aria-labelledby="table-column-management-item4"
                checked={checkedState[4]}
                name="check5"
                id="check5"
                onChange={handleChange}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell id="table-column-management-item4" key="table-column-management-item4">
                    <label htmlFor="check5">{columns[4]}</label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="table-column-management-item5">
            <DataListItemRow>
              <DataListCheck
                aria-labelledby="table-column-management-item5"
                checked={checkedState[5]}
                name="check6"
                id="check6"
                onChange={handleChange}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell id="table-column-management-item5" key="table-column-management-item5">
                    <label htmlFor="check6">{columns[5]}</label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="table-column-management-item6">
            <DataListItemRow>
              <DataListCheck
                aria-labelledby="table-column-management-item6"
                checked={checkedState[6]}
                name="check7"
                id="check7"
                onChange={handleChange}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell id="table-column-management-item6" key="table-column-management-item5">
                    <label htmlFor="check7">{columns[6]}</label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="table-column-management-item5">
            <DataListItemRow>
              <DataListCheck
                aria-labelledby="table-column-management-item5"
                checked={checkedState[7]}
                name="check8"
                id="check8"
                onChange={handleChange}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell id="table-column-management-item7" key="table-column-management-item7">
                    <label htmlFor="check8">{columns[7]}</label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        </DataList>
      </Modal>
    );
  };

  const renderLabel = (labelText: any) => {
    switch (labelText) {
      case 'Running':
        return <Label color="green">{labelText}</Label>;
      case 'Stopped':
        return <Label color="orange">{labelText}</Label>;
      case 'Needs Maintenance':
        return <Label color="blue">{labelText}</Label>;
      case 'Down':
        return <Label color="red">{labelText}</Label>;
    }
  };

  const onDelete = (type = '', id = '') => {
    if (type) {
      setFilters({
        ...filters,
        [type.toLowerCase()]: filters[type.toLowerCase()].filter(s => s !== id)
      })
    } else {
      setFilters({
        location: [],
        name: [],
        status: []
       })
    }
  };

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

  const onRowSelect = (event: any, isSelected: boolean, rowId: number) => {
    let myrows;
    if (rowId === -1) {
        myrows = rows.map(oneRow => {
        oneRow.selected = isSelected;
        return oneRow;
      });
    } else {
        myrows = [...rows];
        myrows[rowId].selected = isSelected;
    }
    setFilteredRows(rows);
  };

  const onStatusSelect = (event, selection) => {
    const checked = event.target.checked;
    setFilters({
        ...filters,
        ['status']: checked ? [selection] : []
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
    setInputValue('');
  };

  const onLocationSelect = (event, selection) => {
    setFilters({
        ...filters,
        ['location']: [selection]
    })
    onFilterSelect();
  };

  const buildCategoryDropdown = () => {
    const categoryMenuItems = [
      <SelectOption key="cat1" value="Location" />,
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
    const locationMenuItems = [
      <SelectOption key="raleigh" value="Raleigh" />,
      <SelectOption key="westford" value="Westford" />,
      <SelectOption key="boston" value="Boston" />,
      <SelectOption key="brno" value="Brno" />,
      <SelectOption key="bangalore" value="Bangalore" />
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
          chips={filters.location}
          deleteChip={onDelete}
          categoryName="Location"
          showToolbarItem={currentCategory === 'Location'}
        >
          <Select
            aria-label="Location"
            onToggle={onFilterToggle}
            onSelect={onLocationSelect}
            selections={filters.location[0]}
            isOpen={isFilterDropdownOpen}
            placeholderText="Any"
          >
            {locationMenuItems}
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
              <OverflowMenuGroup groupType="button" isPersistent>
                <OverflowMenuItem>
                  <Button variant="primary">Action</Button>
                </OverflowMenuItem>
                <OverflowMenuItem breakpoint="md" isPersistent>
                  <Button variant="link" onClick={handleModalToggle}>
                    Manage columns
                  </Button>
                </OverflowMenuItem>
              </OverflowMenuGroup>
            </OverflowMenu>
          </ToolbarItem>
          <ToolbarItem variant="pagination">{renderPagination(PaginationVariant.top)}</ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </React.Fragment>
  );


  const filteredRows =
      filters.name.length > 0 || filters.location.length > 0 || filters.status.length > 0
        ? rows.filter(row => {
            return (
              (filters.name.length === 0 ||
                filters.name.some(name => row.cells[0].toLowerCase().includes(name.toLowerCase()))) &&
              (filters.location.length === 0 || filters.location.includes(row.cells[5])) &&
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
                          this.onDelete(null);
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
    const onSelect = loading || filteredRows.length === 0 ? null : onRowSelect; // To remove the select box when there are no rows

  return (
    <React.Fragment>
          <Card>
            {toolbarItems}
            <Table cells={managedColumns} rows={paginatedRows} onSelect={onSelect} aria-label="Filterable Table Demo">
                <TableHeader />
                <TableBody />
            </Table>
            {renderPagination(PaginationVariant.bottom)}
            {renderModal()}
          </Card>
    </React.Fragment>
  );
};