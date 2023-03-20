/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { Form, FormGroup, TextInput, Select, SelectOption, DropdownPosition, TextArea, Grid, GridItem } from '@patternfly/react-core';
import { useAppDispatch, useAppSelector } from '@app/store';
//import { getRessources } from '@app/store/ressources/ressourceSlice';
//import { getProjets } from '@app/store/projets/projetSlice';
import { addPlanification, updatePlanification } from '@app/store/planifications/planificationSlice';
import moment from 'moment';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { initialPlanification } from '@app/utils/constant';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';
import { getProjetsList } from '@app/store/projets/projetSlice';
import { getRessourcesList } from '@app/store/ressources/ressourceSlice';

export const PlanificationForm: React.FunctionComponent<{ planification: IPlanification, save: boolean, close: () => void}> = ({planification, save, close}) => {
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const googleKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleKey,
        libraries: ['places'],
    })

    const options = {
        componentRestrictions: { country: "fr" },
    };
    const dispatch = useAppDispatch();
    const [isProjetFilterDropdownOpen, setIsProjetFilterDropdownOpen] = React.useState(false);
    const [isRessourceFilterDropdownOpen, setIsRessourceFilterDropdownOpen] = React.useState(false);
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);
    const { projetsList } = useAppSelector(state => state.projets);
    const { ressourcesList } = useAppSelector(state => state.ressources);
    const { planificationStatus, planificationTypes } = useAppSelector(state => state.planifications);

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef: React.MutableRefObject<any> = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef: React.MutableRefObject<any> = useRef()

    const [formData, setFormData] = React.useState<IPlanification>(initialPlanification);

    const fetchProjetsList = async () => {
        await axiosInstance?.current?.get(`inspections/api/projects`).then((res) => {
            dispatch(getProjetsList(res.data));
        }).catch((err) => {
            console.log(err);
        });
    };

    const fetchRessourcesList = async () => {
        await axiosInstance?.current?.get(`inspections/api/members`).then((res) => {
            dispatch(getRessourcesList(res.data));
        }).catch((error) => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchProjetsList();
        fetchRessourcesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const clearForm = () => {
        setFormData(initialPlanification);
    };

    React.useEffect(() => {
        //dispatch(getProjets());
        //dispatch(getRessources());
    }, [dispatch]);

    React.useEffect(() => {
        if (planification) {
            setFormData(planification);
        } else {
            clearForm();
        }
    }, [planification]);

    React.useEffect(() => {
        if (save) {
            setTimeout(() => {
                if (!formData.id) {
                    dispatch(addPlanification(formData));
                } else {
                    dispatch(updatePlanification(formData));
                }
                close()
            }, 500);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [save]);

    const typeMenuItems = planificationTypes?.map((type) => (
        <SelectOption key={type.id} value={type.id} >
            {type.type}
        </SelectOption>
    ));

    const statusMenuItems = planificationStatus?.map((status) => (
        <SelectOption key={status.id} value={status.id} >
            {status.status}
        </SelectOption>
    ));

    const ressourcesListItems = ressourcesList?.map((ressource) => (
        <SelectOption key={ressource.id} value={ressource.uuid}>
            {ressource.name}
        </SelectOption>
    )); 

    const projetsListItems = projetsList?.map((projet) => (
        <SelectOption key={projet.id} value={projet.uuid}>
            {projet.reference}
        </SelectOption>
    ));

    const handleTitleInputChange = (value: string) => {
        setFormData({
            ...formData,
            title: value,
        });
    };
    const handleStartDateInputChange = (value: string) => {
        setFormData({
            ...formData,
            startTime: value,
            endTime: formData.duration 
                    ? formData.travelDuration 
                    ? moment(value).add((parseInt(`${formData.duration}`) + parseInt(`${formData.travelDuration}`) * 2), 'minutes').format('YYYY-MM-DDTHH:mm')
                    : moment(value).add(formData.duration, 'minutes').format('YYYY-MM-DDTHH:mm')
                    : moment(value).add(20, 'minutes').format('YYYY-MM-DDTHH:mm')
        });
    };
    const handleDurationInputChange = (value: string) => {
        setFormData({
            ...formData,
            duration: parseInt(value),
            endTime: formData.startTime
                    ? formData.travelDuration
                    ? moment(formData.startTime).add((parseInt(value) + parseInt(`${formData.travelDuration}`) * 2), 'minutes').format('YYYY-MM-DDTHH:mm')                    
                    : moment(formData.startTime).add(parseInt(value), 'minutes').format('YYYY-MM-DDTHH:mm')
                    : moment().add(20, 'minutes').format('YYYY-MM-DDTHH:mm')
        });
    };
    const handleNotesInputChange = (value: string) => {
        setFormData({
            ...formData,
            comment: value,
        });
    };
    const onRessourceToggle = (isOpen: boolean) => {
        setIsRessourceFilterDropdownOpen(isOpen);
    };
    const selectRessource = (event: any, selection: any) => {
        setFormData({
            ...formData,
            member: {
                ...formData.member,
                id: parseInt(selection),
            },
        });
        setIsTypeFilterDropdownOpen(false);
    };
    const onProjetToggle = (isOpen: boolean) => {
        setIsProjetFilterDropdownOpen(isOpen);
    };
    const selectProjet = (event: any, selection: any) => {
        setFormData({
            ...formData,
            project: {
                ...formData.project,
                id: parseInt(selection),
            },
        });
        setIsTypeFilterDropdownOpen(false);
    };
    const onTypeToggle = (isOpen: boolean) => {
        setIsTypeFilterDropdownOpen(isOpen);
    };
    const selectType = (event: any, selection: any) => {
        setFormData({
            ...formData,
            type: {
                ...formData.type,
                id: parseInt(selection),
            },
        });
        setIsTypeFilterDropdownOpen(false);
    };
    const onStatusToggle = (isOpen: boolean) => {
        setIsStatusFilterDropdownOpen(isOpen);
    };
    const selectStatus = (event: any, selection: any) => {
        setFormData({
            ...formData,
            status: {
                ...formData.status,
                id: parseInt(selection),
            },
        });
        setIsStatusFilterDropdownOpen(false);
    };

    const handleOriginChange = () => {
        setFormData({
            ...formData,
            origin: originRef.current.value,
        });
    };
    const handleDestinationChange = () => {
        setFormData({
            ...formData,
            destination: destiantionRef.current.value,
        });
    };

    return (
        <React.Fragment>
            <Form id="modal-with-form-form">
                <FormGroup
                    label="Titre"
                    isRequired
                    fieldId="modal-with-form-form-name"
                >
                    <TextInput
                    isRequired
                    type="text"
                    id="modal-with-form-form-title"
                    name="modal-with-form-form-title"
                    value={formData.title}
                    onChange={handleTitleInputChange}
                    />
                </FormGroup>
                <Grid hasGutter>
                    <GridItem span={8}>
                        <FormGroup
                            label="Date et heure"
                            isRequired
                            fieldId="modal-with-form-form-datetime"
                        >
                            <TextInput
                            isRequired
                            type="datetime-local"
                            id="modal-with-form-form-datetime"
                            name="modal-with-form-form-datetime"
                            value={formData.startTime}
                            onChange={handleStartDateInputChange}
                            />
                        </FormGroup>
                    </GridItem>
                    <GridItem span={4}>
                        <FormGroup
                            label="Durée de visite (min)"
                            isRequired
                            fieldId="modal-with-form-form-duration"
                        >
                            <TextInput
                            isRequired
                            type="number"
                            id="modal-with-form-form-duration"
                            name="modal-with-form-form-duration"
                            value={formData.duration}
                            onChange={handleDurationInputChange}
                            />
                        </FormGroup>
                    </GridItem>
                </Grid>
                {isLoaded && (
                    <Grid hasGutter>
                        <GridItem span={6}>
                            <Autocomplete options={options} onPlaceChanged={handleOriginChange} >
                                <TextInput 
                                    type='text' 
                                    id='origin-input' 
                                    value={formData.origin} 
                                    onChange={(newVal) => setFormData({ ...formData, origin: newVal})} 
                                    ref={originRef} />
                            </Autocomplete>
                        </GridItem>
                        <GridItem span={6}>
                            <Autocomplete options={options} onPlaceChanged={handleDestinationChange} >
                                <TextInput
                                    type='text' 
                                    id='destination-input' 
                                    value={formData.destination} 
                                    onChange={(newVal) => setFormData({ ...formData, destination: newVal})} 
                                    ref={destiantionRef} />
                            </Autocomplete>
                        </GridItem>
                    </Grid>
                )}
                
                <FormGroup
                    label="Ressource"
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
                        {ressourcesListItems}
                    </Select>
                </FormGroup>
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
                        {projetsListItems}
                    </Select>
                </FormGroup>
                <FormGroup
                    label="Type"
                    fieldId="modal-with-form-form-type"
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
                        {typeMenuItems}
                    </Select>
                </FormGroup>
                <FormGroup
                    label="Status"
                    fieldId="modal-with-form-form-status"
                >
                        <Select
                        onSelect={selectStatus}
                        selections={formData.status?.id}
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
                    value={formData.comment}
                    onChange={handleNotesInputChange}
                    />
                </FormGroup>
            </Form>
        </React.Fragment>
    );
};
