/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { ClientForm } from './ClientForm';
import { initialClient } from '@app/utils/constant';

export const CreateClient: React.FunctionComponent<{ 
    isOpen: boolean,
    close: () => void
}> = (props) => {
    const [save, setSave] = React.useState<boolean>(false);
    const { isOpen, close } = props;
    const client: IClient = initialClient;

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Créer client"
            description="Entrer les informations ci-dessout pour créer un client."
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
            <ClientForm client={client} save={save} close={() => {setSave(false); close()}} />
        </Modal>
        </React.Fragment>
    );
};
