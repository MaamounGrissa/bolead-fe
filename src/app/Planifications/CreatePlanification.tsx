/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Wizard } from '@patternfly/react-core';

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

    const Step1 = () => (
        <React.Fragment>
            <p>Step 1 content</p>
        </React.Fragment>
    );

    const Step2 = () => (
        <React.Fragment>
            <p>Step 2 content</p>
        </React.Fragment>
    );

    const Step3 = () => (
        <React.Fragment>
            <p>Step 3 content</p>
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
