/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { ProjetForm } from './ProjetForm';

export const CreateProjet: React.FunctionComponent<{ 
    isOpen: boolean,
    close: () => void
}> = (props) => {
    const [save, setSave] = React.useState<boolean>(false);
    const { isOpen, close } = props;
    const projet: IProjet = {
        id: '',
        name: '',
        client: '',
        adresse: '',
        ressources: [],
        status: 'Nouveau',
        type: 'Construction',
        notes: '',
    }

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Créer projet"
            description="Entrer les informations ci-dessout pour créer un projet."
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
            <ProjetForm projet={projet} save={save} close={() => {setSave(false); close()}} />
        </Modal>
        </React.Fragment>
    );
};
