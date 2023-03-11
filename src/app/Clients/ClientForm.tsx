/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, FormGroup, TextInput, Select, SelectOption, DropdownPosition, Grid, GridItem } from '@patternfly/react-core';
import { useAppDispatch, useAppSelector } from '@app/store';
import { addClient, updateClient } from '@app/store/clients/clientSlice';
import { useSnackbar } from 'notistack';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { HashLoader } from 'react-spinners';
import { initialClient } from '@app/utils/constant';
import { useAxios } from '@app/network';

export const ClientForm: React.FunctionComponent<{ 
    client: IClient, 
    save: boolean, close: () => void
}> = ({client, save, close}) => {
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
 
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);
    const { clientStatus } = useAppSelector(state => state.clients);

    const [formData, setFormData] = React.useState<IClient>(initialClient);

    const clearForm = () => {
        setFormData(initialClient);
    };

    const addClientRequest = async (clientForm: any) => {
        await axiosInstance?.current?.post('customers', clientForm).then((response) => {
            enqueueSnackbar('Client ajouté avec succès', {
                variant: 'success',
            });
            dispatch(addClient(formData));
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

    const editClientRequest = async (clientForm: any) => {
        await axiosInstance?.current?.put('customers/' + formData.id, clientForm).then((response) => {
            enqueueSnackbar('Client modifié avec succès', {
                variant: 'success',
            });
            dispatch(updateClient(formData));
            setTimeout(() => {
                close();
            }, 500);
            return response;
        }).catch((error) => {
            enqueueSnackbar('Erreur lors de la modification du client. ' + error.message, {
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        if (client) {
            setFormData(client);
        } else {
            clearForm();
        }
    }, [client]);

    React.useEffect(() => {
        if (save) {
            setTimeout(() => {
                if (formData.id === '') {
                    // Create Customer 
                    /* {
                        "status": {
                        "id": 1
                        },
                        "contact": {
                        "firstName": "Bilel",
                        "lastName": "GRISSA",
                        "email": "bilel.grissa@ymail.com",
                        "phone": 675443345,
                        "address": {
                            "street": "136 Aveneue Emile Zola",
                            "streetLine2": "App 234",
                            "city": "Boulogne-Billancourt",
                            "postcode": 92100,
                            "country": "France"
                        }
                        }
                    } */
                    const newClient = {
                        status: {
                            id: 1,
                        },
                        contact: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            address: {
                                street: formData.address,
                                city: 'Paris',
                                postcode: 1000,
                                country: 'France',
                            }
                        },
                    }
                    addClientRequest(newClient);
                } else {
                    const updatedClient = {
                        uuid: formData.id,
                        status: {
                            id: formData.status,
                        },
                        contact: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: parseInt(formData.phone),
                            address: {
                                street: formData.address,
                                city: '',
                                postcode: 0,
                                country: 'France',
                            }
                        },
                    }
                    editClientRequest(updatedClient);
                }
            }, 500);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [save]);

    const statusMenuItems = clientStatus?.map((status) => (
        <SelectOption key={status.id} value={status.name} />
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
                            name="modal-with-form-form-firstName"
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
                    label="Adresse"
                    fieldId="modal-with-form-form-address"
                >
                    <Autocomplete 
                        options={options}
                        onPlaceChanged={() => {
                            setFormData({...formData, address: addressRef.current?.value})
                        }}
                    >
                        <TextInput
                            ref={addressRef}
                            isRequired
                            type="tel"
                            id="modal-with-form-form-address"
                            name="modal-with-form-form-address"
                            value={formData.address}
                            onChange={(value) => setFormData({...formData, address: value})}
                        />
                    </Autocomplete>
                </FormGroup>
            </Form>
        </React.Fragment>
    );
};
