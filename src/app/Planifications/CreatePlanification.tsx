/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Bullseye, DropdownPosition, FormGroup, Grid, GridItem, Select, SelectOption, TextArea, TextInput, Wizard } from '@patternfly/react-core';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getProjets } from '@app/store/projets/projetSlice';
import { getRessources } from '@app/store/ressources/ressourceSlice';
import { addPlanification, updatePlanification } from '@app/store/planifications/planificationSlice';
import moment from 'moment';
import { AutoCompleteInput } from '@app/Components/AutoCompleteInput';
import { GoogleMapsContainer } from './GoogleMapsContainer';

export const CreatePlanification: React.FunctionComponent<{ 
    isOpen: boolean,
    close: () => void
}> = (props) => {
   // const [save, setSave] = React.useState<boolean>(false);
    const { isOpen, close } = props;
   /*  const planification: IPlanification = {
        id: '',
        title: '',
        startDate: moment().format('YYYY-MM-DDTHH:mm'),
        endDate: moment().format('YYYY-MM-DDTHH:mm'),
        duration: 0,
        ressource: '',
        projet: '',
        type: '',
        status: '',
        notes: '',
    } */
    const title = 'Planification';

    const dispatch = useAppDispatch();
    const [isProjetFilterDropdownOpen, setIsProjetFilterDropdownOpen] = React.useState(false);
    const [isRessourceFilterDropdownOpen, setIsRessourceFilterDropdownOpen] = React.useState(false);
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);
    const { projets } = useAppSelector(state => state.projets);
    const { ressources } = useAppSelector(state => state.ressources);

    const [formData, setFormData] = React.useState<IPlanification>({
        id: '',
        title: '',
        startDate: '',
        endDate: '',
        duration: 20,
        ressource: '',
        projet: '',
        type: 'Visite Technique',
        status: 'Nouveau',
        notes: '',
    });

    const clearForm = () => {
        setFormData({
            id: '',
            title: '',
            startDate: '',
            endDate: '',
            duration: 20,
            ressource: '',
            projet: '',
            type: 'Visite Technique',
            status: 'Nouveau',
            notes: '',
        });
    };

    React.useEffect(() => {
        dispatch(getProjets());
        dispatch(getRessources());
    }, [dispatch]);

    const savePlanification = () => {
        setTimeout(() => {
            dispatch(addPlanification(formData));
            close()
        }, 500);
    };

    const statusList = [
        "Nouveau",
        "En cours",
        "Terminé",
        "Annulé",
    ];

    const typeList= [
        "Visite Technique",
        "Visite Commercial",
        "Audit",
    ]

    const typeMenuItems = typeList.map((type) => (
        <SelectOption key={type} value={type} />
    ));

    const statusMenuItems = statusList.map((status) => (
        <SelectOption key={status} value={status} />
    ));

    const ressourcesListItems = ressources.map((ressource) => (
        <SelectOption key={ressource.id} value={ressource.id}>
            {ressource.name}
        </SelectOption>
    ));

    const projetsListItems = projets.map((projet) => (
        <SelectOption key={projet.id} value={projet.id}>
            {projet.name}
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
            startDate: value,
            endDate: formData.duration ? moment(value).add(formData.duration, 'minutes').format('YYYY-MM-DDTHH:mm') : moment(value).add(20, 'minutes').format('YYYY-MM-DDTHH:mm')
        });
    };
    const handleDurationInputChange = (value: string) => {
        setFormData({
            ...formData,
            duration: parseInt(value),
            endDate: formData.startDate ? moment(formData.startDate).add(parseInt(value), 'minutes').format('YYYY-MM-DDTHH:mm') : moment().add(parseInt(value), 'minutes').format('YYYY-MM-DDTHH:mm')
        });
    };
    const handleNotesInputChange = (value: string) => {
        setFormData({
            ...formData,
            notes: value,
        });
    };
    const onRessourceToggle = (isOpen: boolean) => {
        setIsRessourceFilterDropdownOpen(isOpen);
    };
    const selectRessource = (event: any) => {
        setFormData({
            ...formData,
            ressource: event.target.innerText,
        });
        setIsTypeFilterDropdownOpen(false);
    };
    const onProjetToggle = (isOpen: boolean) => {
        setIsProjetFilterDropdownOpen(isOpen);
    };
    const selectProjet = (event: any) => {
        setFormData({
            ...formData,
            projet: event.target.innerText,
        });
        setIsTypeFilterDropdownOpen(false);
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

    const Step1 = () => (
        <React.Fragment>
            <Bullseye>
                <div className='step-container'>
                    <Grid hasGutter style={{ marginTop: '20px', marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Titre"
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
                        </GridItem>
                    </Grid>
                    <Grid hasGutter style={{ marginBottom: '25px' }}>
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
                                value={formData.startDate}
                                onChange={handleStartDateInputChange}
                                />
                            </FormGroup>
                        </GridItem>
                        <GridItem span={4}>
                            <FormGroup
                                label="Duration"
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
                    <Grid hasGutter style={{ marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Notes"
                                fieldId="modal-with-form-form-name"
                            >
                                <TextArea
                                id="modal-with-form-form-notes"
                                name="modal-with-form-form-notes"
                                value={formData.notes}
                                onChange={handleNotesInputChange}
                                />
                            </FormGroup>
                        </GridItem>
                    </Grid>
                </div>
            </Bullseye>
        </React.Fragment>
    );

    const Step2 = () => (
        <React.Fragment>
            <Bullseye>
                <div className='step-container'>
                    <Grid hasGutter style={{ marginTop: '20px', marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Client"
                                isRequired
                                fieldId="modal-with-form-form-client"
                            >
                                <AutoCompleteInput optionsData={ressources} setSelectedId={(id: string) => setFormData({ ...formData, ressource: id })} />
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
                                    selections={formData.projet}
                                    position={DropdownPosition.left}
                                    onToggle={onProjetToggle}
                                    isOpen={isProjetFilterDropdownOpen}
                                    style={{ width: '100%' }}
                                    menuAppendTo={() => document.body}
                                    >
                                    {projetsListItems}
                                </Select>
                            </FormGroup>
                        </GridItem>
                    </Grid>
                </div>
            </Bullseye>
        </React.Fragment>
    );

    const Step3 = () => (
        <React.Fragment>
            <Bullseye>
                <div className='step-container'>
                    <Grid hasGutter style={{ marginTop: '20px', marginBottom: '25px' }}>
                        <GridItem span={12}>
                                <GoogleMapsContainer />
                        </GridItem>
                    </Grid>
                </div>
            </Bullseye>
        </React.Fragment>
    );

    const ReviewStep = () => (
        <React.Fragment>
            <p>Review step content</p>
        </React.Fragment>
    );

    const steps = [
        { name: 'Rendez-vous', component: <Step1 />},
        { name: 'Participants', component: <Step2 />},
        { name: 'Trajet', component: <Step3 />},
        { name: 'Aperçu', component: <ReviewStep />, nextButtonText: 'Planifier'}
    ];
    return (
        <React.Fragment>
            <Wizard
                title={title}
                description="Programmer un rendez-vous"
                descriptionComponent="div"
                steps={steps}
                onClose={close}
                isOpen={isOpen}
                nextButtonText='Suivant'
                backButtonText='Précédent'
                cancelButtonText='Annuler'
            />
        {/* <Modal
            variant={ModalVariant.small}
            title="Créer planification"
            description="Entrer les informations ci-dessout pour créer un planification."
            isOpen={isOpen}
            onClose={close}
            actions={[
            <Button key="create" variant="primary" onClick={() => {
                setSave(true);
            }}>
                Enregistrer
            </Button>,
            <Button key="cancel" variant="link" onClick={close}>
                Annuler
            </Button>
            ]}
        >
            <PlanificationForm planification={planification} save={save} close={() => {setSave(false); close()}} />
        </Modal> */}
        </React.Fragment>
    );
};
