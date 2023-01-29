/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { RessourceForm } from './RessourceForm';

export const UpdateRessource: React.FunctionComponent<{ 
        isOpen: boolean, 
        close: () => void, 
        ressource: IRessource
    }> = (props) => {
    const { isOpen, close, ressource } = props;

    const handleModalToggle = () => {
        close();
    };

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Créer ressource"
            description="Entrer les informations ci-dessout pour créer un ressource."
            isOpen={isOpen}
            onClose={handleModalToggle}
            actions={[
            <Button key="create" variant="primary" form="modal-with-form-form" onClick={handleModalToggle}>
                Confirmer
            </Button>,
            <Button key="cancel" variant="link" onClick={handleModalToggle}>
                Annuler
            </Button>
            ]}
        >
            <RessourceForm ressource={ressource} />
        </Modal>
        </React.Fragment>
    );
};
