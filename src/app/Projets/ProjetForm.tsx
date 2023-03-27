/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, FormGroup, TextInput, Select, SelectOption, DropdownPosition, TextArea, SelectVariant } from '@patternfly/react-core';
import { useAppDispatch, useAppSelector } from '@app/store';
import { addProjet, updateProjet } from '@app/store/projets/projetSlice';
import { getClientsList } from '@app/store/clients/clientSlice';
import { initialProjet } from '@app/utils/constant';
import { useAxios } from '@app/network';
import { useSnackbar } from 'notistack';
//import { HashLoader } from 'react-spinners';
//import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

export const ProjetForm: React.FunctionComponent<{ projet: IProjet, save: boolean, close: () => void}> = ({projet, save, close}) => {
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const dispatch = useAppDispatch();
    /* const googleKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleKey,
        libraries: ['places'],
    })

    const options = {
        componentRestrictions: { country: "fr" },
    }; */
     /** @type React.MutableRefObject<HTMLInputElement> */
    // const addressRef: React.MutableRefObject<any> = React.useRef()
    const [isClientFilterDropdownOpen, setIsClientFilterDropdownOpen] = React.useState(false);
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);
    const { clientsList } = useAppSelector(state => state.clients);
    const { projetStatus, projetTypes } = useAppSelector(state => state.projets);
    const [formData, setFormData] = React.useState<IProjet>(initialProjet);

    const clearForm = () => {
        setFormData(initialProjet);
    };

    const fetchClientList = async () => {
        await axiosInstance?.current?.get(`services/inspections/api/customers`).then((res) => {
            dispatch(getClientsList(res.data));
        }).catch((err) => {
            console.log(err);
        });
    };

    React.useEffect(() => {
        fetchClientList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    React.useEffect(() => {
        if (projet.id) {
            setFormData(projet);
        } else {
            clearForm();
        }
    }, [projet]);

    const addProjetRequest = async (formData: any) => {
        await axiosInstance?.current?.post('services/inspections/api/projects', { ...formData, customer: { uuid: formData.customer.uuid }}).then((response) => {
            enqueueSnackbar('Projet ajouté avec succès', {
                variant: 'success',
            });
            dispatch(addProjet(response.data));
            setTimeout(() => {
                close();
            }, 500);
        }).catch((error) => {
            if (error.response?.data?.fieldErrors?.length > 0) {
                error.response?.data?.fieldErrors.map((err: any) => {
                    enqueueSnackbar(err.message, {
                        variant: 'error',
                    });
                });
            } else {
                enqueueSnackbar('Erreur lors de modification!', {
                    variant: 'error',
                });
            }
        });
    };

    const editProjetRequest = async (formData: any) => {
        await axiosInstance?.current?.put('services/inspections/api/projects/' + formData.id, formData).then((response) => {
            enqueueSnackbar('Projet modifié avec succès', {
                variant: 'success',
            });
            dispatch(updateProjet(response.data));
            setTimeout(() => {
                close();
            }, 500);
        }).catch((error) => {
            if (error.response?.data?.fieldErrors?.length > 0) {
                error.response?.data?.fieldErrors.map((err: any) => {
                    enqueueSnackbar(err.message, {
                        variant: 'error',
                    });
                });
            } else {
                enqueueSnackbar('Erreur lors de modification!', {
                    variant: 'error',
                });
            }
        });
    };

    const validation = () => {
        let valid = true;
        if (formData.reference === '') {
            enqueueSnackbar('Nom de projet est obligatoire', {
                variant: 'error',
            });
            valid = false;
        }
        return valid;
    };

    React.useEffect(() => {
        if (save) {
            if (validation()) {
                setTimeout(() => {
                    if (!formData.id) {
                        addProjetRequest(formData);
                    } else {
                        editProjetRequest(formData);
                    }
                }, 500);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [save]);

    const clientMenuItems = clientsList?.map((client) => (
        <SelectOption key={client.id} value={client.uuid}>
            {client.name}
        </SelectOption>
    ));
    const typeMenuItems = projetTypes?.map((type) => (
        <SelectOption key={type.id} value={type.id}>
            {type.type}
        </SelectOption>
    ));
    const statusMenuItems = projetStatus?.map((status) => (
        <SelectOption key={status.id} value={status.id}>
            {status.status}
        </SelectOption>
    ));
    const handleNameInputChange = (value: string) => {
        setFormData({
            ...formData,
            reference: value,
        });
    };
    const handleNotesInputChange = (value: string) => {
        setFormData({
            ...formData,
            tags: value,
        });
    };
    // Clients selection
    const onClientToggle = (isOpen: boolean) => {
        setIsClientFilterDropdownOpen(isOpen);
    };
    const selectClient = (event: any, selection: any) => {
        setFormData({
            ...formData,
            customer: {
                ...formData.customer,
                uuid: selection || '',
            },
        });
        setIsClientFilterDropdownOpen(false);
    };
    const clearClientSelection = () => {
        setFormData({
            ...formData,
            customer: {
                ...formData.customer,
                uuid: '',
            },
        });
        setIsClientFilterDropdownOpen(false);
    };
    // Type selection
    const onTypeToggle = (isOpen: boolean) => {
        setIsTypeFilterDropdownOpen(isOpen);
    };
    const selectType = (event: any, selection: any) => {
        setFormData({
            ...formData,
            referentielProjectTypes: formData.referentielProjectTypes.find((type) => type.id === selection) 
                                            ? formData.referentielProjectTypes.filter((type) => type.id !== selection) 
                                            : [...formData.referentielProjectTypes, {id: selection}],
        });
        setIsTypeFilterDropdownOpen(false);
    };
    const clearTypeSelection = () => {
        setFormData({
            ...formData,
            referentielProjectTypes: [],
        });
        setIsTypeFilterDropdownOpen(false);
    };
    // Status selection
    const onStatusToggle = (isOpen: boolean) => {
        setIsStatusFilterDropdownOpen(isOpen);
    };
    const selectStatus = (event: any, selection: any) => {
        setFormData({
            ...formData,
            status: selection,
        });
        setIsStatusFilterDropdownOpen(false);
    };

    /* if (!isLoaded) {
        return <div className="loading-spinner">
        <HashLoader
          color="#444"
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
    } */

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
                    value={formData.reference}
                    onChange={handleNameInputChange}
                    />
                </FormGroup>
                <FormGroup
                    label="Client"
                    isRequired
                    fieldId="autocomplete-clients"
                >

                    <Select
                        variant={SelectVariant.typeahead}
                        onSelect={selectClient}
                        onClear={clearClientSelection}
                        selections={formData.customer.uuid}
                        position={DropdownPosition.left}
                        onToggle={onClientToggle}
                        isOpen={isClientFilterDropdownOpen}
                        style={{ width: '100%' }}
                        placeholderText="Selectionner client"
                        menuAppendTo={() => document.body}
                        >
                        {clientMenuItems}
                    </Select>
                </FormGroup>
                <FormGroup
                    label="Type"
                    fieldId="modal-with-form-form-type"
                >
                    <Select
                        variant={SelectVariant.typeaheadMulti}
                        onSelect={selectType}
                        onClear={clearTypeSelection}
                        selections={formData.referentielProjectTypes.map(type => type.id)}
                        position={DropdownPosition.left}
                        onToggle={onTypeToggle}
                        isOpen={isTypeFilterDropdownOpen}
                        style={{ width: '100%' }}
                        placeholderText="Selectionner type"
                        menuAppendTo={() => document.body}
                        >
                        {typeMenuItems}
                    </Select>
                </FormGroup>
                { projet?.id && 
                    <FormGroup
                        label="Status"
                        fieldId="modal-with-form-form-status"
                    >
                            <Select
                            onSelect={selectStatus}
                            selections={formData.status.id}
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
                    value={formData.tags}
                    onChange={handleNotesInputChange}
                    />
                </FormGroup>
            </Form>
        </React.Fragment>
    );
};
