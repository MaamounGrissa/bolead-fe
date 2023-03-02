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
  Popper,
  Pagination,
  Badge,
  ToolbarGroup,
  ToolbarFilter,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { useAppSelector } from '@app/store';

export const ProjetsFilter: React.FunctionComponent<{
  projets: IProjet[], 
  filterData: (data: IProjet[]) => void,
  page: number,
  handleSetPage: (page: number) => void,
  size: number,
  handleSetSize: (size: number) => void,
}> = (props) => {
    const { projets, filterData, page, handleSetPage, size, handleSetSize } = props;
    // Set up repo filtering
    const [searchValue, setSearchValue] = React.useState('');
    const [typeSelections, setTypeSelections] = React.useState<string[]>([]);
    const [statusSelection, setStatusSelection] = React.useState('');
    const { projetStatus, projetTypes } = useAppSelector(state => state.projets)

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const onFilter = (repo: IProjet) => {
    // Search name with search value
    let searchValueInput: RegExp;
    try {
      searchValueInput = new RegExp(searchValue, 'i');
    } catch (err) {
      searchValueInput = new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }
    const matchesSearchValue = repo.name.search(searchValueInput) >= 0;

    // Search status with status selection
    const matchesStatusValue = repo.status === parseInt(statusSelection);

    // Search type with type selections
    const matchesTypeValue = typeSelections.filter(selection => parseInt(selection) === repo.type)?.length > 0;

    return (
      (searchValue === '' || matchesSearchValue) &&
      (statusSelection === '' || matchesStatusValue) &&
      (typeSelections.length === 0 || matchesTypeValue)
    );
  };

  React.useEffect(() => {
    const filteredRepos = projets.filter(onFilter);
    filterData(filteredRepos);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, statusSelection, typeSelections, projets]);

  // Set up name search input
  const searchInput = (
    <SearchInput
      placeholder="Rechercher un projet"
      value={searchValue}
      onChange={(e, value: string) => onSearchChange(value)}
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
          {
            projetStatus.map((status, index) => (
              <MenuItem key={index} itemId={status.id}>{status.name}</MenuItem>
            ))
          }
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
          {
            projetTypes?.map((type, index) => (
              <MenuItem key={index} itemId={type.id}>{type.name}</MenuItem>
            ))
          }
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
      titles={{ paginationTitle: 'Pagination' }}
      perPageComponent="button"
      itemCount={projets.length}
      perPage={size}
      onPerPageSelect={(_ev, perPage) => handleSetSize(perPage)}
      page={page}
      onSetPage={(_ev, page) => handleSetPage(page)}
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

  return (
    <React.Fragment>
      {toolbar}
    </React.Fragment>
  );
};
