/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Wizard } from '@patternfly/react-core';
import { initialPlanification } from '@app/utils/constant';
import { CreateStep1 } from './CreateStep1';
import { CreateStep2 } from './CreateStep2';
import { CreateStep4 } from './CreateStep4';
import { CreateStep3 } from './CreateStep3';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';
import { useAppDispatch, useAppSelector } from '@app/store';
import { addPlanification } from '@app/store/planifications/planificationSlice';
import moment from 'moment';

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
                startTime: selectedDate,
            });
        } else {
            setFormData({
                ...formData,
                startTime: new Date().toString(),
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
            startTime: value,
            endTime: formData.duration 
                    ? formData.travelDuration 
                    ? moment(value).add((formData.duration + formData.travelDuration * 2), 'minutes').format('YYYY-MM-DDTHH:mm')
                    : moment(value).add(formData.duration, 'minutes').format('YYYY-MM-DDTHH:mm')
                    : moment(value).add(20, 'minutes').format('YYYY-MM-DDTHH:mm')
        });
    };

    const handleDurationChange = (value: string) => {
        setFormData({
            ...formData,
            duration: parseInt(value),
            endTime: formData.duration 
                    ? formData.travelDuration 
                    ? moment(value).add((formData.duration + formData.travelDuration * 2), 'minutes').format('YYYY-MM-DDTHH:mm')
                    : moment(value).add(formData.duration, 'minutes').format('YYYY-MM-DDTHH:mm')
                    : moment(value).add(20, 'minutes').format('YYYY-MM-DDTHH:mm')
        });
    };

    const handleNotesChange = (value: string) => {
        setFormData({
            ...formData,
            comment: value,
        });
    };

    const handleSelectType = (value: number) => {
        setFormData({
            ...formData,
            type: {
                ...formData.type,
                id: value,
            },
        });
    };
    
    const handleSelectProjet = (value: string) => {
        setFormData({
            ...formData,
            project: {
                ...formData.project,
                uuid: value,
            },
            destination: projetsList?.find((project) => project.uuid === value)?.address?.street || '',
        });
    };

    const handleSelectRessource = (value: string) => {
        setFormData({
            ...formData,
            member: {
                ...formData.member,
                uuid: value,
            },
        });
    };

    const handleSetTrajet = (data: any) => {
        setFormData({
            ...formData,
            origin: data.origin,
            destination: data.destination,
            distance: data.distance,
            travelDuration: data.travelDuration,
            travelMode: data.travelMode,
            endTime: formData.duration 
                    ? formData.travelDuration 
                    ? moment(formData.startTime).add((formData.duration + formData.travelDuration * 2), 'minutes').format('YYYY-MM-DDTHH:mm')
                    : moment(formData.startTime).add(formData.duration, 'minutes').format('YYYY-MM-DDTHH:mm')
                    : moment(formData.startTime).add(20, 'minutes').format('YYYY-MM-DDTHH:mm')
        });
    };

    console.log(formData)

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
        addPlanificationRequest(formData);
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
