/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, FormGroup, TextInput, Select, SelectOption, DropdownPosition, TextArea } from '@patternfly/react-core';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getRessources } from '@app/store/ressources/ressourceSlice';
import { addProjet, updateProjet } from '@app/store/projets/projetSlice';
import { getClients } from '@app/store/clients/clientSlice';
import { AutoCompleteInput } from '@app/Components/AutoCompleteInput';
import { Autocomplete } from '@react-google-maps/api';

export const ProjetForm: React.FunctionComponent<{ projet: IProjet, save: boolean, close: () => void}> = ({projet, save, close}) => {
    const dispatch = useAppDispatch();
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);
    const { clients } = useAppSelector(state => state.clients);
    //const { ressources } = useAppSelector(state => state.ressources);

    const [formData, setFormData] = React.useState<IProjet>({
        id: '',
        name: '',
        client: '',
        adresse: '',
        ressource: '',
        status: 'Nouveau',
        type: 'construction',
        notes: '',
    });

    const clearForm = () => {
        setFormData({
            id: '',
            name: '',
            client: '',
            adresse: '',
            ressource: '',
            status: 'Nouveau',
            type: 'construction',
            notes: '',
        });
    };

    React.useEffect(() => {
        dispatch(getClients());
        dispatch(getRessources());
    }, [dispatch]);

    React.useEffect(() => {
        if (projet) {
            setFormData(projet);
        } else {
            clearForm();
        }
    }, [projet]);

    React.useEffect(() => {
        if (save) {
            setTimeout(() => {
                if (formData.id === '') {
                    dispatch(addProjet(formData));
                } else {
                    dispatch(updateProjet(formData));
                }
                close()
            }, 500);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [save]);

    const statusList = [
        "Nouveau",
        "En cours",
        "En pause",
        "Terminé",
        "Annulé",
        "Supprimé",
    ];

    const typeList= [
        "Construction",
        "Peinture",
        "Electricité",
        "Plomberie",
    ]

    const typeMenuItems = typeList.map((type) => (
        <SelectOption key={type} value={type} />
    ));

    const statusMenuItems = statusList.map((status) => (
        <SelectOption key={status} value={status} />
    ));

    const handleNameInputChange = (value: string) => {
        setFormData({
            ...formData,
            name: value,
        });
    };
    const handleAdresseInputChange = (value: string) => {
        setFormData({
            ...formData,
            adresse: value,
        });
    };
    const handleNotesInputChange = (value: string) => {
        setFormData({
            ...formData,
            notes: value,
        });
    };
    const onTypeToggle = (isOpen: boolean) => {
        setIsTypeFilterDropdownOpen(isOpen);
    };
    const selectType = (event: any) => {
        setFormData({
            ...formData,
            type: event.target.innerText,
        });
        setIsTypeFilterDropdownOpen(false);
    };
    const onStatusToggle = (isOpen: boolean) => {
        setIsStatusFilterDropdownOpen(isOpen);
    };
    const selectStatus = (event: any) => {
        setFormData({
            ...formData,
            status: event.target.innerText,
        });
        setIsStatusFilterDropdownOpen(false);
    };

    return (
        <React.Fragment>
            <Form id="modal-with-form-form">
                <FormGroup
                    label="Nom de projet"
                    isRequired
                    fieldId="modal-with-form-form-name"
                >
                    <TextInput
                    isRequired
                    type="text"
                    id="modal-with-form-form-name"
                    name="modal-with-form-form-name"
                    value={formData.name}
                    onChange={handleNameInputChange}
                    />
                </FormGroup>
                <FormGroup
                    label="Client"
                    isRequired
                    fieldId="modal-with-form-form-client"
                >
                    <AutoCompleteInput optionsData={clients} setSelectedId={(id: string) => setFormData({ ...formData, ressource: id })} />
                </FormGroup>
                <FormGroup
                    label="Adresse de projet"
                    isRequired
                    fieldId="modal-with-form-form-adresse"
                >
                    <Autocomplete>
                        <TextInput
                            isRequired
                            type="tel"
                            id="modal-with-form-form-adresse"
                            name="modal-with-form-form-adresse"
                            value={formData.adresse}
                            onChange={handleAdresseInputChange}
                        />
                    </Autocomplete>
                </FormGroup>
                <FormGroup
                    label="Type"
                    fieldId="modal-with-form-form-type"
                >
                    <Select
                        onSelect={selectType}
                        selections={formData.type}
                        position={DropdownPosition.left}
                        onToggle={onTypeToggle}
                        isOpen={isTypeFilterDropdownOpen}
                        style={{ width: '100%' }}
                        menuAppendTo={() => document.body}
                        >
                        {typeMenuItems}
                    </Select>
                </FormGroup>
                { projet?.id?.length > 0 && 
                    <FormGroup
                        label="Status"
                        fieldId="modal-with-form-form-status"
                    >
                            <Select
                            onSelect={selectStatus}
                            selections={formData.status}
                            position={DropdownPosition.left}
                            onToggle={onStatusToggle}
                            isOpen={isStatusFilterDropdownOpen}
                            style={{ width: '100%' }}
                            menuAppendTo={() => document.body}
                            >
                            {statusMenuItems}
                        </Select>
                    </FormGroup>
                }
                <FormGroup
                    label="Notes"
                    fieldId="modal-with-form-form-notes"
                >
                    <TextArea
                    type="text"
                    id="modal-with-form-form-notes"
                    name="modal-with-form-form-notes"
                    value={formData.notes}
                    onChange={handleNotesInputChange}
                    />
                </FormGroup>
            </Form>
        </React.Fragment>
    );
};
