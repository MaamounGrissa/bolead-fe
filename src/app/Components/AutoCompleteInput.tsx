/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { 
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  Popper, 
  SearchInput
} from '@patternfly/react-core';

interface IAutoCompleteInputData {
  id: string;
  name: string;
}

export const AutoCompleteInput: React.FunctionComponent<{
  optionsData: IAutoCompleteInputData[],
  setSelectedId: (id: string) => void,
  selectedId: string,
  elementId: string,
}> = ({
  optionsData,
  setSelectedId,
  selectedId,
  elementId,
}) => {
  const [value, setValue] = React.useState<any>('');
  const [hint, setHint] = React.useState('');
  const [autocompleteOptions, setAutocompleteOptions] = React.useState<any>([]);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = React.useState(false);
  
  const searchInputRef = React.useRef<any>(null);
  const autocompleteRef = React.useRef<any>(null);

  const onClear = () => {
    setValue('');
  };

  React.useEffect(() => {
    if (selectedId && optionsData) {
      setValue(optionsData.find((option) => option.id === selectedId)?.name || '');
    } else {
      setValue('');
    }
  }, [selectedId, optionsData]);
  
  const onChange = (newValue: string) => {
    if (newValue !== '' && searchInputRef && searchInputRef.current && searchInputRef.current.contains(document.activeElement)) {

      setIsAutocompleteOpen(true);
      
      // When the value of the search input changes, build a list of no more than 10 autocomplete options.
      // Options which start with the search input value are listed first, followed by options which contain
      // the search input value.
      let options = optionsData.filter((option) => option?.name?.startsWith(newValue.toLowerCase())).map((option) => <MenuItem itemId={option.id} key={option.id}>{option.name}</MenuItem>);
      if (options.length > 10) {
        options = options.slice(0,10);
      } else {
        options = [...options, ...optionsData.filter((option) => !option?.name?.startsWith(newValue.toLowerCase()) && option.name.includes(newValue.toLowerCase())).map((option) => <MenuItem itemId={option.id} key={option.id}>{option.name}</MenuItem>)].slice(0, 10)
      }
      
      // The hint is set whenever there is only one autocomplete option left.
      setHint(options.length === 1? options[0].props.itemId : '');
      // The menu is hidden if there are no options
      setIsAutocompleteOpen(options.length > 0);
      setAutocompleteOptions(options);
    } else {
      setIsAutocompleteOpen(false);
    }
    setValue(optionsData.find((option) => option.id === newValue)?.name || newValue);
  };
  
  // Whenever an autocomplete option is selected, set the search input value, close the menu, and put the browser
  // focus back on the search input
  const onSelect = (e, itemId) => {
    e.stopPropagation();
    setValue(optionsData?.find((option) => option.id === itemId)?.name || itemId);
    setSelectedId(itemId);
    setIsAutocompleteOpen(false);
    searchInputRef.current?.focus();
  };
  
  const handleMenuKeys = event => {
    // If there is a hint while the browser focus is on the search input, tab or right arrow will 'accept' the hint value 
    // and set it as the search input value
    if (hint && (event.key === 'Tab' || event.key === 'ArrowRight') && searchInputRef.current === event.target) {
      setValue(hint);
      setHint('');
      setIsAutocompleteOpen(false);
      if (event.key === 'ArrowRight') {
        event.preventDefault();   
      }
    // if the autocomplete is open and the browser focus is on the search input,
    } else if (isAutocompleteOpen && searchInputRef.current && searchInputRef.current === event.target) {
      // the escape key closes the autocomplete menu and keeps the focus on the search input.
      if (event.key === 'Escape') {
        setIsAutocompleteOpen(false);
        searchInputRef.current.focus();
      // the up and down arrow keys move browser focus into the autocomplete menu
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const firstElement = autocompleteRef.current.querySelector('li > button:not(:disabled)');
        firstElement && firstElement.focus();
        event.preventDefault(); // by default, the up and down arrow keys scroll the window
      // the tab, enter, and space keys will close the menu, and the tab key will move browser
      // focus forward one element (by default)
      }  else if (event.key === 'Tab'|| event.key === "Enter" || event.key === 'Space'){
        setIsAutocompleteOpen(false);
        if (event.key === "Enter" || event.key === 'Space') {
          event.preventDefault();
        }
      }
    // If the autocomplete is open and the browser focus is in the autocomplete menu
    // hitting tab will close the autocomplete and but browser focus back on the search input.  
    } else if (isAutocompleteOpen && autocompleteRef.current.contains(event.target) && (event.key === 'Tab')) {
      event.preventDefault();
      setIsAutocompleteOpen(false);
      searchInputRef.current.focus();
    }
    
  };
  
  // The autocomplete menu should close if the user clicks outside the menu.
  const handleClickOutside = event => {
    if (isAutocompleteOpen && autocompleteRef && autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
      setIsAutocompleteOpen(false);
    }
  };
  
  React.useEffect(() => {
    window.addEventListener('keydown', handleMenuKeys);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleMenuKeys);
      window.removeEventListener('click', handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutocompleteOpen, hint, searchInputRef.current]);
  
  const searchInput = (
    <SearchInput
      value={value}
      onChange={(e, value) => onChange(value)}
      onClear={onClear}
      ref={searchInputRef}
      //hint={hint}
      id={elementId}
    />
  );
  
  const autocomplete = (
    <Menu ref={autocompleteRef} onSelect={onSelect}>
      <MenuContent>
        <MenuList>
          {autocompleteOptions?.map((option: any) => option)}
        </MenuList>
      </MenuContent>
    </Menu>
  );
  
  const htmlE: HTMLElement = document.querySelector(`#${elementId}`) as HTMLElement;

  return (
    <Popper
      trigger={searchInput}
      popper={autocomplete}
      isVisible={isAutocompleteOpen}
      enableFlip={false}
      // append the autocomplete menu to the search input in the DOM for the sake of the keyboard navigation experience
      appendTo={htmlE}
    />
  );
};