/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { RessourceForm } from './RessourceForm';
import { initialRessource } from '@app/utils/constant';

export const CreateRessource: React.FunctionComponent<{ 
    isOpen: boolean,
    close: () => void
}> = (props) => {
    const [save, setSave] = React.useState<boolean>(false);
    const { isOpen, close } = props;
    const ressource: IRessource = initialRessource;

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Créer ressource"
            description="Entrer les informations ci-dessous pour créer une ressource."
            isOpen={isOpen}
            onClose={close}
            actions={[
            <Button key="create" variant="primary" onClick={() => {
                setSave(true);
                setTimeout(() => {
                    setSave(false);
                }, 800);
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
