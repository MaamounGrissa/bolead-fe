/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { ClientForm } from './ClientForm';

export const UpdateClient: React.FunctionComponent<{ 
        isOpen: boolean, 
        close: () => void, 
        client: IClient
    }> = (props) => {
        const [save, setSave] = React.useState<boolean>(false);
        const { isOpen, close, client } = props;

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Créer client"
            description="Mêtre à jour les informations ci-dessout pour modifier un client."
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
            <ClientForm client={client} save={save} close={() => {setSave(false); close()}} />
        </Modal>
        </React.Fragment>
    );
};
