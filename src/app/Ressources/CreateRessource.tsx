/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { RessourceForm } from './RessourceForm';

export const CreateRessource: React.FunctionComponent<{ 
    isOpen: boolean,
    close: () => void
}> = (props) => {
    const [save, setSave] = React.useState<boolean>(false);
    const { isOpen, close } = props;
    const ressource: IRessource = {
        id: '',
        name: '',
        email: '',
        phone: '',
        status: 'Actif',
        type: 'Technicien',
        notes: '',
    }

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Créer ressource"
            description="Entrer les informations ci-dessout pour créer un ressource."
            isOpen={isOpen}
            onClose={close}
            actions={[
            <Button key="create" variant="primary" form="modal-with-form-form" onClick={() => {
                setSave(true);
            }}>
                Enregistrer
            </Button>,
            <Button key="cancel" variant="link" onClick={close}>
                Annuler
            </Button>
            ]}
        >
            <RessourceForm ressource={ressource} save={save} close={() => {setSave(false); close()}} />
        </Modal>
        </React.Fragment>
    );
};
