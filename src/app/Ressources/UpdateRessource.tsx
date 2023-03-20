/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { RessourceForm } from './RessourceForm';

export const UpdateRessource: React.FunctionComponent<{ 
        isOpen: boolean, 
        close: () => void, 
        ressource: IRessource
    }> = (props) => {
        const [save, setSave] = React.useState<boolean>(false);
        const { isOpen, close, ressource } = props;

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Modifier ressource"
            description="Mêtre à jour les informations ci-dessous pour modifier une ressource."
            isOpen={isOpen}
            onClose={close}
            actions={[
            <Button key="edit" variant="primary" onClick={() => {
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
