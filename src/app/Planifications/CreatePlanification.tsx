/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { PlanificationForm } from './PlanificationForm';
import moment from 'moment';

export const CreatePlanification: React.FunctionComponent<{ 
    isOpen: boolean,
    close: () => void
}> = (props) => {
    const [save, setSave] = React.useState<boolean>(false);
    const { isOpen, close } = props;
    const planification: IPlanification = {
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
    }

    return (
        <React.Fragment>
        <Modal
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
        </Modal>
        </React.Fragment>
    );
};
