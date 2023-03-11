/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Wizard } from '@patternfly/react-core';
import { initialPlanification } from '@app/utils/constant';
import { CreateStep1 } from './CreateStep1';
import { CreateStep2 } from './CreateStep2';
import { CreateStep4 } from './CreateStep4';
import { CreateStep3 } from './CreateStep3';
import moment from 'moment-timezone';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';
import { useAppDispatch, useAppSelector } from '@app/store';
import { addPlanification } from '@app/store/planifications/planificationSlice';

export const CreatePlanification: React.FunctionComponent<{ 
    isOpen: boolean,
    close: () => void,
    selectedDate: string,
}> = (props) => {
   // const [save, setSave] = React.useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const dispatch = useAppDispatch();
    const { isOpen, close, selectedDate } = props;
    const title = 'Planification';
    const [formData, setFormData] = React.useState<IPlanification>(initialPlanification);
    const { projetsList } = useAppSelector(state => state.projets);

    React.useEffect(() => {
        if (selectedDate) {
            setFormData({
                ...formData,
                startDate: selectedDate,
            });
        } else {
            setFormData({
                ...formData,
                startDate: new Date().toString(),
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    const handleTitleChange = (value: string) => {
        setFormData({
            ...formData,
            title: value,
        });
    };

    const handleStartDateChange = (value: string) => {
        setFormData({
            ...formData,
            startDate: value,
        });
    };

    const handleDurationChange = (value: string) => {
        setFormData({
            ...formData,
            duration: value,
        });
    };

    const handleNotesChange = (value: string) => {
        setFormData({
            ...formData,
            notes: value,
        });
    };

    const handleSelectType = (value: number) => {
        setFormData({
            ...formData,
            type: value,
        });
    };
    
    const handleSelectProjet = (value: string) => {
        setFormData({
            ...formData,
            projet: value,
            destination: projetsList?.find((projet) => projet.id === value)?.address || '',
        });
    };

    const handleSelectRessource = (value: string) => {
        setFormData({
            ...formData,
            ressource: value,
        });
    };

    const handleSetTrajet = (data: any) => {
        setFormData({
            ...formData,
            origin: data.origin,
            destination: data.destination,
            distance: data.distance,
            trajetDuration: data.trajetDuration,
            trajetDurationText: data.trajetDurationText,
            travelMode: data.travelMode,
        });
    };

    const addPlanificationRequest = async (planificationForm: any) => {
        await axiosInstance?.current?.post('inspections', planificationForm).then((response) => {
            enqueueSnackbar('Rendez-vous planifiée avec succès', {
                variant: 'success',
            });
            console.log(response)
            dispatch(addPlanification(response.data));
            return response;
        }).catch((error) => {
            enqueueSnackbar('Erreur lors de la modification du projet. ' + error.message, {
                variant: 'error',
            });
        });
    };

    const handleSave = () => {
        const payload = {
            title: formData.title,
            origin: formData.origin,
            destination: formData.destination,
            distance: formData.distance,
            startTime: moment(formData.startDate).format('YYYY-MM-DDTHH:mm:ss.083'),
            endTime: moment(formData.startDate).add(formData.duration, 'minutes').add(formData.trajetDuration, 'minutes').format('YYYY-MM-DDTHH:mm:ss.083'),
            duration: parseInt(formData.duration),
            travelMode: formData.travelMode,
            travelDuration: parseInt(formData.trajetDuration),
            comment: formData.notes,
            status: {
                id: 1,
            },
            type: {
                id: formData.type,
            },
            member: {
                uuid: formData.ressource,
            },
            projet: {
                uuid: formData.projet,
            },
            customer: {
                uuid: '',
            },
        };

        addPlanificationRequest(payload);
    };

    const steps = [
        { 
            name: 'Rendez-vous',
            component: <CreateStep1 
                            formData={formData} 
                            handleTitleChange={handleTitleChange}
                            handleStartDateChange={handleStartDateChange}
                            handleDurationChange={handleDurationChange}
                            handleNotesChange={handleNotesChange}
                        />
        },
        { 
            name: 'Participants',
            component: <CreateStep2
                            formData={formData}
                            handleSelectType={handleSelectType}
                            handleSelectProjet={handleSelectProjet}
                            handleSelectRessource={handleSelectRessource}
                        />
        },
        { 
            name: 'Trajet',
            component: <CreateStep3 formData={formData} handleSetFormData={handleSetTrajet} />
        },
        {
            name: 'Aperçu',
            component: <CreateStep4 formData={formData} />,
            nextButtonText: 'Planifier'
        }
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
                onSave={handleSave}
            />
        </React.Fragment>
    );
};
