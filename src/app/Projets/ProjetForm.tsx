/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, FormGroup, TextInput, Select, SelectOption, DropdownPosition, TextArea } from '@patternfly/react-core';
import { useAppDispatch, useAppSelector } from '@app/store';
import { addProjet, updateProjet } from '@app/store/projets/projetSlice';
import { getClientsList } from '@app/store/clients/clientSlice';
import { AutoCompleteInput } from '@app/Components/AutoCompleteInput';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { initialProjet } from '@app/utils/constant';
import { useAxios } from '@app/network';
import { useSnackbar } from 'notistack';
import { HashLoader } from 'react-spinners';

export const ProjetForm: React.FunctionComponent<{ projet: IProjet, save: boolean, close: () => void}> = ({projet, save, close}) => {
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const dispatch = useAppDispatch();
    const googleKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleKey,
        libraries: ['places'],
    })

    const options = {
        componentRestrictions: { country: "fr" },
    };
     /** @type React.MutableRefObject<HTMLInputElement> */
     const addressRef: React.MutableRefObject<any> = React.useRef()
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);
    const { clientsList } = useAppSelector(state => state.clients);
    const { projetStatus, projetTypes } = useAppSelector(state => state.projets);
    //const { ressources } = useAppSelector(state => state.ressources);

    const [formData, setFormData] = React.useState<IProjet>(initialProjet);

    const clearForm = () => {
        setFormData(initialProjet);
    };

    const fetchClientList = async () => {
        await axiosInstance?.current?.get(`customers`).then((res) => {
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
        if (projet.id?.length > 0) {
            setFormData(projet);
        } else {
            clearForm();
        }
    }, [projet]);

    const addProjetRequest = async (ProjetForm: any) => {
        await axiosInstance?.current?.post('projects', ProjetForm).then((response) => {
            enqueueSnackbar('Projet ajouté avec succès', {
                variant: 'success',
            });
            console.log(response)
            dispatch(addProjet(formData));
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

    const editProjetRequest = async (ProjetForm: any) => {
        await axiosInstance?.current?.put('projects/' + formData.id, ProjetForm).then((response) => {
            enqueueSnackbar('Projet modifié avec succès', {
                variant: 'success',
            });
            console.log(response)
            dispatch(updateProjet(formData));
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
                    const newProjet = {
                        reference: formData.name,
                        tags: formData.notes,
                        status: {
                            id: formData.status,
                        },
                        referentielProjectTypes: [
                            {
                                id: formData.type,
                            }
                        ],
                        customer: {
                            uuid: formData.clientId,
                        }
                    };
                    addProjetRequest(newProjet);
                } else {
                    const updatedProjet = {
                        reference: formData.name,
                        tags: formData.notes,
                        status: {
                            id: formData.status,
                        },
                        referentielProjectTypes: [
                            {
                                id: formData.type,
                            }
                        ],
                        customer: {
                            uuid: formData.clientId,
                        }
                    };
                    editProjetRequest(updatedProjet);
                }
            }, 500);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [save]);

    const typeMenuItems = projetTypes?.map((type) => (
        <SelectOption key={type.id} value={type.id}>
            {type.name}
        </SelectOption>
    ));

    const statusMenuItems = projetStatus?.map((status) => (
        <SelectOption key={status.id} value={status.id}>
            {status.name}
        </SelectOption>
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

    if (!isLoaded) {
        return <div className="loading-spinner">
        <HashLoader
          color="#444"
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
    }

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
                    fieldId="autocomplete-clients"
                >
                    <AutoCompleteInput
                        elementId='autocomplete-clients'
                        optionsData={clientsList}
                        setSelectedId={(id: string) => setFormData({ ...formData, clientId: id })} 
                        selectedId={formData.clientId}
                        />
                </FormGroup>
                <FormGroup
                    label="Adresse de projet"
                    isRequired
                    fieldId="modal-with-form-form-adresse"
                >
                    <Autocomplete options={options} onPlaceChanged={() => setFormData({ ...formData, adresse: addressRef.current?.value})} >
                        <TextInput
                            ref={addressRef}
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
