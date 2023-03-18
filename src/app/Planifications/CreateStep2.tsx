/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Bullseye, DropdownPosition, FormGroup, Grid, GridItem, Select, SelectOption } from '@patternfly/react-core';
import { useAppSelector } from '@app/store';
//import { AutoCompleteInput } from '@app/Components/AutoCompleteInput';

export const CreateStep2: React.FunctionComponent<{ 
    formData: IPlanification,
    handleSelectType: (value: number) => void,
    handleSelectProjet: (value: string) => void,
    handleSelectRessource: (value: string) => void,
}> = (props) => {
    const { formData, handleSelectProjet, handleSelectType, handleSelectRessource } = props;
    const [isProjetFilterDropdownOpen, setIsProjetFilterDropdownOpen] = React.useState(false);
    const [isRessourceFilterDropdownOpen, setIsRessourceFilterDropdownOpen] = React.useState(false);
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const { projetsList } = useAppSelector(state => state.projets);
    const { ressourcesList } = useAppSelector(state => state.ressources);
    const { planificationTypes } = useAppSelector(state => state.planifications);
    const [typeMenuItems, setTypeMenuItems] = React.useState<any>([]);
    const [ressourcesListItems, setRessourcesListItems] = React.useState<any>([]);
    const [projetsListItems, setProjetsListItems] = React.useState<any>([]);

    React.useEffect(() => {
        if (planificationTypes?.length > 0) {
            const typeMenuItemsTemp = planificationTypes?.map((type) => (
                <SelectOption key={type.id} value={type.id} >
                    {type.type}
                </SelectOption>
            ));
            setTypeMenuItems(typeMenuItemsTemp);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [planificationTypes]);

    React.useEffect(() => {
        if (ressourcesList?.length > 0) {
            const ressourcesListItemsTemp = ressourcesList?.map((ressource) => (
                <SelectOption key={ressource.id} value={ressource.uuid}>
                    {ressource.name}
                </SelectOption>
            ));
            setRessourcesListItems(ressourcesListItemsTemp);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ressourcesList]);

    React.useEffect(() => {
        if (projetsList?.length > 0) {
            const projetsListItemsTemp = projetsList?.map((projet) => (
                <SelectOption key={projet.id} value={projet.uuid}>
                    {projet.reference}
                </SelectOption>
            ));
            setProjetsListItems(projetsListItemsTemp);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projetsList]);
  
    const onProjetToggle = (isOpen: boolean) => {
        setIsProjetFilterDropdownOpen(isOpen);
    };

    const selectProjet = (event: any, selection: any) => {
        handleSelectProjet(selection);
        setIsProjetFilterDropdownOpen(false);
    };

    const onRessourceToggle = (isOpen: boolean) => {
        setIsRessourceFilterDropdownOpen(isOpen);
    };

    const selectRessource = (event: any, selection: any) => {
        handleSelectRessource(selection);
        setIsRessourceFilterDropdownOpen(false);
    };

    const onTypeToggle = (isOpen: boolean) => {
        setIsTypeFilterDropdownOpen(isOpen);
    };

    const selectType = (event: any, selection: any) => {
        handleSelectType(selection);
        setIsTypeFilterDropdownOpen(false);
    };
 
    return (
        <React.Fragment>
            <Bullseye>
                <div className='step-container'>
                    <Grid hasGutter style={{ marginTop: '20px', marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Type"
                                fieldId="modal-with-form-form-types"
                            >
                                <Select
                                    onSelect={selectType}
                                    selections={formData.type?.id}
                                    position={DropdownPosition.left}
                                    onToggle={onTypeToggle}
                                    isOpen={isTypeFilterDropdownOpen}
                                    style={{ width: '100%' }}
                                    menuAppendTo={() => document.body}
                                    >
                                    <SelectOption key={0} value={'0'} >
                                        Sélectionner un type
                                    </SelectOption>
                                    {typeMenuItems}
                                </Select>
                            </FormGroup>
                        </GridItem>
                    </Grid>
                    <Grid hasGutter style={{ marginTop: '20px', marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Ressources"
                                isRequired
                                fieldId="modal-with-form-form-ressource"
                            >
                                <Select
                                    onSelect={selectRessource}
                                    selections={formData.member?.uuid}
                                    position={DropdownPosition.left}
                                    onToggle={onRessourceToggle}
                                    isOpen={isRessourceFilterDropdownOpen}
                                    style={{ width: '100%' }}
                                    menuAppendTo={() => document.body}
                                    >
                                    <SelectOption key={0} value={'0'} >
                                        Sélectionner une ressource
                                    </SelectOption>
                                    {ressourcesListItems}
                                </Select>
                                    {/* <AutoCompleteInput
                                    elementId="autocomplete-ressource"
                                    optionsData={ressourcesList} 
                                    selectedId={formData.ressource} 
                                    setSelectedId={(id: string) => handleSelectRessource(id)} /> */}
                            </FormGroup>
                        </GridItem>
                    </Grid>
                    <Grid hasGutter style={{ marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Projets"
                                fieldId="modal-with-form-form-projet"
                            >
                                <Select
                                    onSelect={selectProjet}
                                    selections={formData.project?.uuid}
                                    position={DropdownPosition.left}
                                    onToggle={onProjetToggle}
                                    isOpen={isProjetFilterDropdownOpen}
                                    style={{ width: '100%' }}
                                    menuAppendTo={() => document.body}
                                    >
                                    <SelectOption key={0} value={'0'} >
                                        Sélectionner un projet
                                    </SelectOption>
                                    {projetsListItems}
                                </Select>
                            </FormGroup>
                        </GridItem>
                    </Grid>
                </div>
            </Bullseye>
        </React.Fragment>
    );
};
