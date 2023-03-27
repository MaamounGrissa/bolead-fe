/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, FormGroup, TextInput, Select, SelectOption, DropdownPosition, Grid, GridItem } from '@patternfly/react-core';
import { useAppDispatch, useAppSelector } from '@app/store';
import { addRessource, updateRessource } from '@app/store/ressources/ressourceSlice';
import { initialRessource } from '@app/utils/constant';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { stringToAdress } from '@app/utils/shared';
import { HashLoader } from 'react-spinners';

const libraries: any = ['places'];

export const RessourceForm: React.FunctionComponent<{ ressource: IRessource, save: boolean, close: () => void}> = ({ressource, save, close}) => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);
    const { ressourceStatus, ressourceTypes } = useAppSelector(state => state.ressources);
    const [formData, setFormData] = React.useState<IRessource>(initialRessource);
    const googleKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleKey,
        libraries: libraries,
    })

    const options = {
        componentRestrictions: { country: "fr" },
    };
    
    /** @type React.MutableRefObject<HTMLInputElement> */
    const addressRef: React.MutableRefObject<any> = React.useRef()

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


    const addRessourceRequest = async (RessourceForm: any) => {
        await axiosInstance?.current?.post('services/inspections/api/members', RessourceForm).then((response) => {
            enqueueSnackbar('Ressource ajouté avec succès', {
                variant: 'success',
            });
            dispatch(addRessource(response.data));
            setTimeout(() => {
                close();
            }, 500);
            return response;
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

    const editRessourceRequest = async (RessourceForm: any) => {
        await axiosInstance?.current?.put('services/inspections/api/members/' + formData.id, RessourceForm).then((response) => {
            enqueueSnackbar('Ressource modifié avec succès', {
                variant: 'success',
            });
            dispatch(updateRessource(formData));
            setTimeout(() => {
                close();
            }, 500);
            return response;
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
        if (formData.contact.firstName === '') {
            enqueueSnackbar('Le prénom est obligatoire', {
                variant: 'error',
            });
            valid = false;
        }
        if (formData.contact.lastName === '') {
            enqueueSnackbar('Le nom est obligatoire', {
                variant: 'error',
            });
            valid = false;
        }
        if (formData.contact.email === '') {
            enqueueSnackbar('L\'email est obligatoire', {
                variant: 'error',
            });
            valid = false;
        }
        if (formData.contact.phone === '') {
            enqueueSnackbar('Le téléphone est obligatoire', {
                variant: 'error',
            });
            valid = false;
        }
        if (formData.team.id === 0) {
            enqueueSnackbar('Le type est obligatoire', {
                variant: 'error',
            });
            valid = false;
        }
        if (formData.status.id === 0) {
            enqueueSnackbar('Le statut est obligatoire', {
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
                        addRessourceRequest(formData);
                    } else {
                        editRessourceRequest(formData);
                    }
                }, 500);
            }
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
            {status.status}
        </SelectOption>
    ));

    const handleFirstNameInputChange = (value: string) => {
        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                firstName: value,
            }
        });
    };
    const handleLastNameInputChange = (value: string) => {
        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                lastName: value,
            }
        });
    };
    const handleEmailInputChange = (value: string) => {
        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                email: value,
            }
        });
    };
    const handlePhoneInputChange = (value: string) => {
        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                phone: value,
            }
        });
    };
    const handleSetAddress = () => {
        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                address: {
                    ...formData.contact.address,
                    ...stringToAdress(addressRef.current.value)
                },
            },
        });
    };
    const onTypeToggle = (isOpen: boolean) => {
        setIsTypeFilterDropdownOpen(isOpen);
    };
    const selectType = (event: any, selection: any) => {
        event.preventDefault();
        setFormData({
            ...formData,
            team: {
                ...formData.team,
                id: parseInt(selection)
            },
        });
        setIsTypeFilterDropdownOpen(false);
    };
    const onStatusToggle = (isOpen: boolean) => {
        setIsStatusFilterDropdownOpen(isOpen);
    };
    const selectStatus = (event: any, selection: any) => {
        event.preventDefault();
        setFormData({
            ...formData,
            status: {
                ...formData.status,
                id: parseInt(selection)
            },
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
                            value={formData.contact.firstName}
                            onChange={handleFirstNameInputChange}
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
                            value={formData.contact.lastName}
                            onChange={handleLastNameInputChange}
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
                    value={formData.contact.email}
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
                    value={formData.contact.phone}
                    onChange={handlePhoneInputChange}
                    />
                </FormGroup>
                <FormGroup
                    label="Adresse"
                    isRequired
                    fieldId="modal-with-form-form-address"
                >
                    <Autocomplete 
                        options={options}
                        onPlaceChanged={() => handleSetAddress()}
                    >
                        <TextInput
                            ref={addressRef}
                            isRequired
                            type="text"
                            id="modal-with-form-form-address"
                            name="modal-with-form-form-address"
                            value={formData.contact.address.street}
                            onChange={(value) => setFormData({...formData, contact: {...formData.contact, address: {...formData.contact.address, street: value}}})}
                        />
                    </Autocomplete>
                </FormGroup>
                <FormGroup
                    label="Type"
                    fieldId="modal-with-form-form-type"
                >
                    <Select
                        onSelect={selectType}
                        selections={formData.team.id}
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
            </Form>
        </React.Fragment>
    );
};
