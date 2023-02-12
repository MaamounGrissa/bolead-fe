/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { PlanificationForm } from './PlanificationForm';

export const UpdatePlanification: React.FunctionComponent<{ 
        isOpen: boolean, 
        close: () => void, 
        planification: IPlanification
    }> = (props) => {
        const [save, setSave] = React.useState<boolean>(false);
        const { isOpen, close, planification } = props;

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Modifier planification"
            description="Mêtre à jour les informations ci-dessout pour modifier un planification."
            isOpen={isOpen}
            onClose={close}
            actions={[
            <Button key="edit" variant="primary" onClick={() => {
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
