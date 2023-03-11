/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, FormGroup, TextInput, Select, SelectOption, DropdownPosition, TextArea, Grid, GridItem } from '@patternfly/react-core';
import { useAppDispatch, useAppSelector } from '@app/store';
import { addRessource, updateRessource } from '@app/store/ressources/ressourceSlice';
import { initialRessource } from '@app/utils/constant';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';

export const RessourceForm: React.FunctionComponent<{ ressource: IRessource, save: boolean, close: () => void}> = ({ressource, save, close}) => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);
    const { ressourceStatus, ressourceTypes } = useAppSelector(state => state.ressources);
    const [formData, setFormData] = React.useState<IRessource>(initialRessource);

    const clearForm = () => {
        setFormData(initialRessource);
    };

    React.useEffect(() => {
        if (ressource) {
            setFormData(ressource);
        } else {
            clearForm();
        }
    }, [ressource]);

    // Ressource DTO

    /* {
        "team": {
            "id": 1
        },
        "status": {
            "id": 1
        },
        "contact": {
            "firstName": "Mammoun",
            "lastName": "grissa",
            "email": "maamoun@grissa",
            "phone": 648526532,
            "address": {
            "street": "34 Rue Auber",
            "streetLine2": "App 34",
            "city": "Paris",
            "postcode": 75001,
            "country": "France"
            }
        }
    } */

    const addRessourceRequest = async (RessourceForm: any) => {
        await axiosInstance?.current?.post('members', RessourceForm).then((response) => {
            enqueueSnackbar('Ressource ajouté avec succès', {
                variant: 'success',
            });
            dispatch(addRessource(formData));
            setTimeout(() => {
                close();
            }, 500);
            return response;
        }).catch((error) => {
            enqueueSnackbar('Erreur lors de l\'ajout du client. ' + error.message, {
                variant: 'error',
            });
        });
    };

    const editRessourceRequest = async (RessourceForm: any) => {
        await axiosInstance?.current?.put('members/' + formData.id, RessourceForm).then((response) => {
            enqueueSnackbar('Ressource modifié avec succès', {
                variant: 'success',
            });
            dispatch(updateRessource(formData));
            setTimeout(() => {
                close();
            }, 500);
            return response;
        }).catch((error) => {
            enqueueSnackbar('Erreur lors de la modification du projet. ' + error.message, {
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        if (save) {
            setTimeout(() => {
                if (formData.id === '') {
                    const newRessource = {
                        team: {
                            id: formData.type,
                        },
                        status: {
                            id: formData.status,
                        },
                        contact: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            address: {
                                street: 'formData.address',
                                streetLine2: formData.notes,
                                city: 'Paris',
                                postcode: '75001',
                                country: 'France',
                            }
                        }
                    }
                    addRessourceRequest(newRessource);
                } else {
                    const newRessource = {
                        id : formData.id,
                        team: {
                            id: formData.type,
                        },
                        status: {
                            id: formData.status,
                        },
                        contact: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            address: {
                                street: 'formData.address',
                                streetLine2: formData.notes,
                                city: 'Paris',
                                postcode: '75001',
                                country: 'France',
                            }
                        }
                    }
                    editRessourceRequest(newRessource);
                }
            }, 500);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [save]);

    const typeMenuItems = ressourceTypes?.map((type) => (
        <SelectOption key={type.id} value={type.id}>
            {type.name}
        </SelectOption>
    ));

    const statusMenuItems = ressourceStatus?.map((status) => (
        <SelectOption key={status.id} value={status.id}>
            {status.name}
        </SelectOption>
    ));

    const handleEmailInputChange = (value: string) => {
        setFormData({
            ...formData,
            email: value,
        });
    };
    const handlePhoneInputChange = (value: string) => {
        setFormData({
            ...formData,
            phone: value,
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
                <Grid hasGutter>
                    <GridItem span={6}>
                        <FormGroup
                            label="Prénom"
                            isRequired
                            fieldId="modal-with-form-form-firstName"
                        >
                            <TextInput
                            isRequired
                            type="text"
                            id="modal-with-form-form-firstName"
                            name="modal-with-form-form-name"
                            value={formData.firstName}
                            onChange={(value) => setFormData({...formData, firstName: value})}
                            />
                        </FormGroup>
                    </GridItem>
                    <GridItem span={6}>
                        <FormGroup
                            label="Nom"
                            isRequired
                            fieldId="modal-with-form-form-lastName"
                        >
                            <TextInput
                            isRequired
                            type="text"
                            id="modal-with-form-form-lastName"
                            name="modal-with-form-form-lastName"
                            value={formData.lastName}
                            onChange={(value) => setFormData({...formData, lastName: value})}
                            />
                        </FormGroup>
                    </GridItem>
                </Grid>
                
                <FormGroup
                    label="Email"
                    isRequired
                    fieldId="modal-with-form-form-email"
                >
                    <TextInput
                    isRequired
                    type="email"
                    id="modal-with-form-form-email"
                    name="modal-with-form-form-email"
                    value={formData.email}
                    onChange={handleEmailInputChange}
                    />
                </FormGroup>
                <FormGroup
                    label="Téléphone"
                    isRequired
                    fieldId="modal-with-form-form-phone"
                >
                    <TextInput
                    isRequired
                    type="tel"
                    id="modal-with-form-form-phone"
                    name="modal-with-form-form-phone"
                    value={formData.phone}
                    onChange={handlePhoneInputChange}
                    />
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
