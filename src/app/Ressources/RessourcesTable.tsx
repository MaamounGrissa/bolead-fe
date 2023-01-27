/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Menu,
  MenuContent,
  MenuList,
  MenuItem,
  MenuToggle,
  MenuToggleCheckbox,
  Popper,
  Pagination,
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStatePrimary,
  Button,
  Bullseye,
  Badge,
  ToolbarGroup,
  ToolbarFilter,
  ToolbarToggleGroup
} from '@patternfly/react-core';
import { TableComposable, Thead, Tr, Th, Tbody, Td, ActionsColumn, IAction } from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import TrashAltIcon from '@patternfly/react-icons/dist/esm/icons/trash-alt-icon';
import UserEditIcon from '@patternfly/react-icons/dist/esm/icons/user-edit-icon';
import { CreateRessource } from './CreateRessource';

interface Ressource {
  name: string;
  email: string;
  phone: string;
  notes: string;
  status: string;
  type: string;
}

// In real usage, this data would come from some external source like an API via props.
const ressources: Ressource[] = [
  { name: 'Maamoun Grissa', email: 'maamoun.grissa@creo.tn', phone: '101010101', notes: '5', status: 'Stopped', type: 'Technicien' },
  { name: 'Bilel Grissa', email: 'bilel.grissa@creo.tn', phone: '101010102', notes: '2', status: 'Down', type: 'Comptable' },
  { name: 'Faycel Yousfi', email: 'faycel.yousfi@creo.tn', phone: '101010103', notes: '12', status: 'Degraded', type: 'Technicien' },
  { name: 'Achref Mtir', email: 'achref.mtir@creo.tn', phone: '101010104', notes: '18', status: 'Needs Maintenance', type: 'Technicien' },
  { name: 'Sourour Ben salah', email: 'sourour.bensalah@creo.tn', phone: '101010105', notes: '5', status: 'Running', type: 'Technicien' },
  { name: 'Fedi Mtir', email: 'fedi.mtir@creo.tn', phone: '20', notes: '101010106', status: 'Stopped', type: 'Commercial' },
  { name: 'Syrine ben salah', email: 'syrine.bensalah@creo.tn', phone: '101010107', notes: '13', status: 'Down', type: 'Commercial' },
  { name: 'Haroun Grissa', email: '3', phone: 'haroun.grissa@creo.tn', notes: '101010108', status: 'Running', type: 'Technicien' },
  { name: 'test1', email: '1', phone: 'test1@creo.tn', notes: '101010109', status: 'Down', type: 'Comptable' },
  { name: 'test2', email: '1', phone: 'test2@creo.tn', notes: '101010110', status: 'Running', type: 'Technicien' }
];

const columnNames = {
  name: 'Nom et Prénom',
  email: 'Email',
  phone: 'Téléphone',
  notes: 'Notes',
  status: 'Status',
  type: 'Type'
};

export const RessourcesTable: React.FunctionComponent<{openCreateRessource: boolean, setOpenCreateRessource: () => void}> = ({openCreateRessource, setOpenCreateRessource}) => {
  // Set up repo filtering
  const [searchValue, setSearchValue] = React.useState('');
  const [typeSelections, setTypeSelections] = React.useState<string[]>([]);
  const [statusSelection, setStatusSelection] = React.useState('');

  const actions = (repo: Ressource): IAction[] => [
    {
        title: <span key="action1"><UserEditIcon />&nbsp;Modifier</span>,
        onClick: () => console.log(`clicked to modify on Some action, on row ${repo.name}`)
    },
    {
        title: <span  key="action2"><TrashAltIcon />&nbsp;Supprimer</span>,
        onClick: () => console.log(`clicked to delete on Another action, on row ${repo.name}`)
    },
  ];

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const onFilter = (repo: Ressource) => {
    // Search name with search value
    let searchValueInput: RegExp;
    try {
      searchValueInput = new RegExp(searchValue, 'i');
    } catch (err) {
      searchValueInput = new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }
    const matchesSearchValue = repo.name.search(searchValueInput) >= 0;

    // Search status with status selection
    const matchesStatusValue = repo.status.toLowerCase() === statusSelection.toLowerCase();

    // Search type with type selections
    const matchesTypeValue = typeSelections.includes(repo.type);

    return (
      (searchValue === '' || matchesSearchValue) &&
      (statusSelection === '' || matchesStatusValue) &&
      (typeSelections.length === 0 || matchesTypeValue)
    );
  };
  const filteredRepos = ressources.filter(onFilter);

  // Set up table row selection
  // In this example, selected rows are tracked by the repo names from each row. This could be any unique identifier.
  // This is to prevent state from being based on row order index in case we later add sorting.
  const isRepoSelectable = (repo: Ressource) => repo.name !== 'a'; // Arbitrary logic for this example
  const [selectedRepoNames, setSelectedRepoNames] = React.useState<string[]>([]);
  const setRepoSelected = (repo: Ressource, isSelecting = true) =>
    setSelectedRepoNames(prevSelected => {
      const otherSelectedRepoNames = prevSelected.filter(r => r !== repo.name);
      return isSelecting && isRepoSelectable(repo) ? [...otherSelectedRepoNames, repo.name] : otherSelectedRepoNames;
    });
  const selectAllRepos = (isSelecting = true) =>
    setSelectedRepoNames(isSelecting ? filteredRepos.map(r => r.name) : []); // Selecting all should only select all currently filtered rows
  const areAllReposSelected = selectedRepoNames.length === filteredRepos.length && filteredRepos.length > 0;
  const areSomeReposSelected = selectedRepoNames.length > 0;
  const isRepoSelected = (repo: Ressource) => selectedRepoNames.includes(repo.name);

  // To allow shift+click to select/deselect multiple rows
  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = React.useState<number | null>(null);
  const [shifting, setShifting] = React.useState(false);

  const onSelectRepo = (repo: Ressource, rowIndex: number, isSelecting: boolean) => {
    // If the user is shift + selecting the checkboxes, then all intermediate checkboxes should be selected
    if (shifting && recentSelectedRowIndex !== null) {
      const numberSelected = rowIndex - recentSelectedRowIndex;
      const intermediateIndexes =
        numberSelected > 0
          ? Array.from(new Array(numberSelected + 1), (_x, i) => i + recentSelectedRowIndex)
          : Array.from(new Array(Math.abs(numberSelected) + 1), (_x, i) => i + rowIndex);
      intermediateIndexes.forEach(index => setRepoSelected(ressources[index], isSelecting));
    } else {
      setRepoSelected(repo, isSelecting);
    }
    setRecentSelectedRowIndex(rowIndex);
  };

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShifting(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShifting(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Set up bulk selection menu
  const bulkSelectMenuRef = React.useRef<HTMLDivElement>(null);
  const bulkSelectToggleRef = React.useRef<any>(null);
  const bulkSelectContainerRef = React.useRef<HTMLDivElement>(null);

  const [isBulkSelectOpen, setIsBulkSelectOpen] = React.useState<boolean>(false);

  const handleBulkSelectClickOutside = (event: MouseEvent) => {
    if (isBulkSelectOpen && !bulkSelectMenuRef.current?.contains(event.target as Node)) {
      setIsBulkSelectOpen(false);
    }
  };

  const handleBulkSelectMenuKeys = (event: KeyboardEvent) => {
    if (!isBulkSelectOpen) {
      return;
    }
    if (
      bulkSelectMenuRef.current?.contains(event.target as Node) ||
      bulkSelectToggleRef.current?.contains(event.target as Node)
    ) {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsBulkSelectOpen(!isBulkSelectOpen);
        bulkSelectToggleRef.current?.querySelector('button').focus();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleBulkSelectMenuKeys);
    window.addEventListener('click', handleBulkSelectClickOutside);
    return () => {
      window.removeEventListener('keydown', handleBulkSelectMenuKeys);
      window.removeEventListener('click', handleBulkSelectClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBulkSelectOpen, bulkSelectMenuRef]);

  const onBulkSelectToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (bulkSelectMenuRef.current) {
        const firstElement = bulkSelectMenuRef.current.querySelector('li > button:not(:disabled)');
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsBulkSelectOpen(!isBulkSelectOpen);
  };

  let menuToggleCheckmark: boolean | null = false;
  if (areAllReposSelected) {
    menuToggleCheckmark = true;
  } else if (areSomeReposSelected) {
    menuToggleCheckmark = null;
  }

  const bulkSelectToggle = (
    <MenuToggle
      ref={bulkSelectToggleRef}
      onClick={onBulkSelectToggleClick}
      isExpanded={isBulkSelectOpen}
      splitButtonOptions={{
        items: [
          <MenuToggleCheckbox
            id="attribute-search-input-bulk-select"
            key="attribute-search-input-bulk-select"
            aria-label="Select all"
            isChecked={menuToggleCheckmark}
            onChange={(checked) => selectAllRepos(checked)}
          />
        ]
      }}
      aria-label="Full table selection checkbox"
    />
  );

  const bulkSelectMenu = (
    <Menu
      id="attribute-search-input-bulk-select"
      ref={bulkSelectMenuRef}
      onSelect={(_ev, itemId) => {
        selectAllRepos(itemId === 1 || itemId === 2);
        setIsBulkSelectOpen(!isBulkSelectOpen);
        bulkSelectToggleRef.current?.querySelector('button').focus();
      }}
    >
      <MenuContent>
        <MenuList>
          <MenuItem itemId={0}>Select none (0 items)</MenuItem>
          <MenuItem itemId={1}>Select page ({ressources.length} items)</MenuItem>
          <MenuItem itemId={2}>Select all ({ressources.length} items)</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  const toolbarBulkSelect = (
    <div ref={bulkSelectContainerRef}>
      <Popper
        trigger={bulkSelectToggle}
        popper={bulkSelectMenu}
        appendTo={bulkSelectContainerRef.current || undefined}
        isVisible={isBulkSelectOpen}
        popperMatchesTriggerWidth={false}
      />
    </div>
  );

  // Set up name search input
  const searchInput = (
    <SearchInput
      placeholder="Filter by name"
      value={searchValue}
      onChange={onSearchChange}
      onClear={() => onSearchChange('')}
    />
  );

  // Set up status single select
  const [isStatusMenuOpen, setIsStatusMenuOpen] = React.useState<boolean>(false);
  const statusToggleRef = React.useRef<HTMLButtonElement>(null);
  const statusMenuRef = React.useRef<HTMLDivElement>(null);
  const statusContainerRef = React.useRef<HTMLDivElement>(null);

  const handleStatusMenuKeys = (event: KeyboardEvent) => {
    if (isStatusMenuOpen && statusMenuRef.current?.contains(event.target as Node)) {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsStatusMenuOpen(!isStatusMenuOpen);
        statusToggleRef.current?.focus();
      }
    }
  };

  const handleStatusClickOutside = (event: MouseEvent) => {
    if (isStatusMenuOpen && !statusMenuRef.current?.contains(event.target as Node)) {
      setIsStatusMenuOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleStatusMenuKeys);
    window.addEventListener('click', handleStatusClickOutside);
    return () => {
      window.removeEventListener('keydown', handleStatusMenuKeys);
      window.removeEventListener('click', handleStatusClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatusMenuOpen, statusMenuRef]);

  const onStatusToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (statusMenuRef.current) {
        const firstElement = statusMenuRef.current.querySelector('li > button:not(:disabled)');
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsStatusMenuOpen(!isStatusMenuOpen);
  };

  function onStatusSelect(event: React.MouseEvent | undefined, itemId: string | number | undefined) {
    if (typeof itemId === 'undefined') {
      return;
    }

    setStatusSelection(itemId.toString());
    setIsStatusMenuOpen(!isStatusMenuOpen);
  }

  const statusToggle = (
    <MenuToggle
      ref={statusToggleRef}
      onClick={onStatusToggleClick}
      isExpanded={isStatusMenuOpen}
      style={
        {
          width: '200px'
        } as React.CSSProperties
      }
    >
      Filter by status
    </MenuToggle>
  );

  const statusMenu = (
    <Menu ref={statusMenuRef} id="attribute-search-status-menu" onSelect={onStatusSelect} selected={statusSelection}>
      <MenuContent>
        <MenuList>
          <MenuItem itemId="Degraded">Degraded</MenuItem>
          <MenuItem itemId="Down">Down</MenuItem>
          <MenuItem itemId="Needs maintenance">Needs maintenance</MenuItem>
          <MenuItem itemId="Running">Running</MenuItem>
          <MenuItem itemId="Stopped">Stopped</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  const statusSelect = (
    <div ref={statusContainerRef}>
      <Popper
        trigger={statusToggle}
        popper={statusMenu}
        appendTo={statusContainerRef.current || undefined}
        isVisible={isStatusMenuOpen}
      />
    </div>
  );

  // Set up Type checkbox select
  const [isTypeMenuOpen, setIsTypeMenuOpen] = React.useState<boolean>(false);
  const typeToggleRef = React.useRef<HTMLButtonElement>(null);
  const typeMenuRef = React.useRef<HTMLDivElement>(null);
  const typeContainerRef = React.useRef<HTMLDivElement>(null);

  const handleTypeMenuKeys = (event: KeyboardEvent) => {
    if (isTypeMenuOpen && typeMenuRef.current?.contains(event.target as Node)) {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsTypeMenuOpen(!isTypeMenuOpen);
        typeToggleRef.current?.focus();
      }
    }
  };

  const handleTypeClickOutside = (event: MouseEvent) => {
    if (isTypeMenuOpen && !typeMenuRef.current?.contains(event.target as Node)) {
      setIsTypeMenuOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleTypeMenuKeys);
    window.addEventListener('click', handleTypeClickOutside);
    return () => {
      window.removeEventListener('keydown', handleTypeMenuKeys);
      window.removeEventListener('click', handleTypeClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTypeMenuOpen, typeMenuRef]);

  const onTypeMenuToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (typeMenuRef.current) {
        const firstElement = typeMenuRef.current.querySelector('li > button:not(:disabled)');
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsTypeMenuOpen(!isTypeMenuOpen);
  };

  function onTypeMenuSelect(event: React.MouseEvent | undefined, itemId: string | number | undefined) {
    if (typeof itemId === 'undefined') {
      return;
    }

    const itemStr = itemId.toString();

    setTypeSelections(
      typeSelections.includes(itemStr)
        ? typeSelections.filter(selection => selection !== itemStr)
        : [itemStr, ...typeSelections]
    );
  }

  const typeToggle = (
    <MenuToggle
      ref={typeToggleRef}
      onClick={onTypeMenuToggleClick}
      isExpanded={isTypeMenuOpen}
      {...(typeSelections.length > 0 && { badge: <Badge isRead>{typeSelections.length}</Badge> })}
      style={
        {
          width: '200px'
        } as React.CSSProperties
      }
    >
      Filter by Type
    </MenuToggle>
  );

  const typeMenu = (
    <Menu
      ref={typeMenuRef}
      id="attribute-search-type-menu"
      onSelect={onTypeMenuSelect}
      selected={typeSelections}
    >
      <MenuContent>
        <MenuList>
          <MenuItem hasCheck isSelected={typeSelections.includes('Technicien')} itemId="Technicien">
            Technicien
          </MenuItem>
          <MenuItem hasCheck isSelected={typeSelections.includes('Commercial')} itemId="Commercial">
            Commercial
          </MenuItem>
          <MenuItem hasCheck isSelected={typeSelections.includes('Comptable')} itemId="Comptable">
            Comptable
          </MenuItem>
          <MenuItem hasCheck isSelected={typeSelections.includes('Administrateur')} itemId="Administrateur">
            Administrateur
          </MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );
  const typeSelect = (
    <div ref={typeContainerRef}>
      <Popper
        trigger={typeToggle}
        popper={typeMenu}
        appendTo={typeContainerRef.current || undefined}
        isVisible={isTypeMenuOpen}
      />
    </div>
  );

  // Set up attribute selector
  const [activeAttributeMenu, setActiveAttributeMenu] = React.useState<'Name' | 'Status' | 'Type'>('Name');
  const [isAttributeMenuOpen, setIsAttributeMenuOpen] = React.useState(false);
  const attributeToggleRef = React.useRef<HTMLButtonElement>(null);
  const attributeMenuRef = React.useRef<HTMLDivElement>(null);
  const attributeContainerRef = React.useRef<HTMLDivElement>(null);

  const handleAttribueMenuKeys = (event: KeyboardEvent) => {
    if (!isAttributeMenuOpen) {
      return;
    }
    if (
      attributeMenuRef.current?.contains(event.target as Node) ||
      attributeToggleRef.current?.contains(event.target as Node)
    ) {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsAttributeMenuOpen(!isAttributeMenuOpen);
        attributeToggleRef.current?.focus();
      }
    }
  };

  const handleAttributeClickOutside = (event: MouseEvent) => {
    if (isAttributeMenuOpen && !attributeMenuRef.current?.contains(event.target as Node)) {
      setIsAttributeMenuOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleAttribueMenuKeys);
    window.addEventListener('click', handleAttributeClickOutside);
    return () => {
      window.removeEventListener('keydown', handleAttribueMenuKeys);
      window.removeEventListener('click', handleAttributeClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttributeMenuOpen, attributeMenuRef]);

  const onAttributeToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (attributeMenuRef.current) {
        const firstElement = attributeMenuRef.current.querySelector('li > button:not(:disabled)');
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsAttributeMenuOpen(!isAttributeMenuOpen);
  };

  const attributeToggle = (
    <MenuToggle
      ref={attributeToggleRef}
      onClick={onAttributeToggleClick}
      isExpanded={isAttributeMenuOpen}
      icon={<FilterIcon />}
    >
      {activeAttributeMenu}
    </MenuToggle>
  );
  const attributeMenu = (
    // eslint-disable-next-line no-console
    <Menu
      ref={attributeMenuRef}
      onSelect={(_ev, itemId) => {
        setActiveAttributeMenu(itemId?.toString() as 'Name' | 'Status' | 'Type');
        setIsAttributeMenuOpen(!isAttributeMenuOpen);
      }}
    >
      <MenuContent>
        <MenuList>
          <MenuItem itemId="Name">Name</MenuItem>
          <MenuItem itemId="Status">Status</MenuItem>
          <MenuItem itemId="Type">Type</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  const attributeDropdown = (
    <div ref={attributeContainerRef}>
      <Popper
        trigger={attributeToggle}
        popper={attributeMenu}
        appendTo={attributeContainerRef.current || undefined}
        isVisible={isAttributeMenuOpen}
      />
    </div>
  );

  // Set up pagination and toolbar
  const toolbarPagination = (
    <Pagination
      titles={{ paginationTitle: 'Attribute search pagination' }}
      perPageComponent="button"
      itemCount={ressources.length}
      perPage={10}
      page={1}
      widgetId="attribute-search-mock-pagination"
      isCompact
    />
  );

  const toolbar = (
    <Toolbar
      id="attribute-search-filter-toolbar"
      clearAllFilters={() => {
        setSearchValue('');
        setStatusSelection('');
        setTypeSelections([]);
      }}
    >
      <ToolbarContent>
        <ToolbarItem>{toolbarBulkSelect}</ToolbarItem>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
          <ToolbarGroup variant="filter-group">
            <ToolbarItem>{attributeDropdown}</ToolbarItem>
            <ToolbarFilter
              chips={searchValue !== '' ? [searchValue] : ([] as string[])}
              deleteChip={() => setSearchValue('')}
              deleteChipGroup={() => setSearchValue('')}
              categoryName="Name"
              showToolbarItem={activeAttributeMenu === 'Name'}
            >
              {searchInput}
            </ToolbarFilter>
            <ToolbarFilter
              chips={statusSelection !== '' ? [statusSelection] : ([] as string[])}
              deleteChip={() => setStatusSelection('')}
              deleteChipGroup={() => setStatusSelection('')}
              categoryName="Status"
              showToolbarItem={activeAttributeMenu === 'Status'}
            >
              {statusSelect}
            </ToolbarFilter>
            <ToolbarFilter
              chips={typeSelections}
              deleteChip={(category, chip) => onTypeMenuSelect(undefined, chip as string)}
              deleteChipGroup={() => setTypeSelections([])}
              categoryName="Type"
              showToolbarItem={activeAttributeMenu === 'Type'}
            >
              {typeSelect}
            </ToolbarFilter>
          </ToolbarGroup>
        </ToolbarToggleGroup>
        <ToolbarItem variant="pagination">{toolbarPagination}</ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const emptyState = (
    <EmptyState>
      <EmptyStateIcon icon={SearchIcon} />
      <Title size="lg" headingLevel="h4">
        No results found
      </Title>
      <EmptyStateBody>No results match the filter criteria. Clear all filters and try again.</EmptyStateBody>
      <EmptyStatePrimary>
        <Button
          variant="link"
          onClick={() => {
            setSearchValue('');
            setStatusSelection('');
            setTypeSelections([]);
          }}
        >
          Clear all filters
        </Button>
      </EmptyStatePrimary>
    </EmptyState>
  );

  return (
    <React.Fragment>
      {toolbar}
      <TableComposable aria-label="Selectable table">
        <Thead>
          <Tr>
            <Th />
            <Th width={20}>{columnNames.name}</Th>
            <Th width={10}>{columnNames.email}</Th>
            <Th width={10}>{columnNames.phone}</Th>
            <Th width={20}>{columnNames.type}</Th>
            <Th width={20}>{columnNames.status}</Th>
            <Th width={10}>{columnNames.notes}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRepos.length > 0 &&
            filteredRepos.map((repo, rowIndex) => {
                const actionsRow: IAction[] | null = actions(repo);
                return (
                <Tr key={repo.name}>
                    <Td
                    select={{
                        rowIndex,
                        onSelect: (_event, isSelecting) => onSelectRepo(repo, rowIndex, isSelecting),
                        isSelected: isRepoSelected(repo),
                        disable: !isRepoSelectable(repo)
                    }}
                    />
                    <Td dataLabel={columnNames.name} modifier="truncate">
                    {repo.name}
                    </Td>
                    <Td dataLabel={columnNames.email} modifier="truncate">
                    {repo.email}
                    </Td>
                    <Td dataLabel={columnNames.phone} modifier="truncate">
                    {repo.phone}
                    </Td>
                    <Td dataLabel={columnNames.type} modifier="truncate">
                    {repo.type}
                    </Td>
                    <Td dataLabel={columnNames.status} modifier="truncate">
                    {repo.status}
                    </Td>
                    <Td dataLabel={columnNames.notes} modifier="truncate">
                    {repo.notes}
                    </Td>
                    <Td isActionCell>
                        <ActionsColumn
                        items={actionsRow}
                        isDisabled={repo.name === '4'} // Also arbitrary for the example
                        //actionsToggle={exampleChoice === 'customToggle' ? customActionsToggle : undefined}
                        />
                    </Td>
                </Tr>
            )})}
          {filteredRepos.length === 0 && (
            <Tr>
              <Td colSpan={8}>
                <Bullseye>{emptyState}</Bullseye>
              </Td>
            </Tr>
          )}
        </Tbody>
      </TableComposable>
      <CreateRessource isOpen={openCreateRessource} close={setOpenCreateRessource} />
    </React.Fragment>
  );
};
