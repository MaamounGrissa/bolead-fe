/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { ProjetForm } from './ProjetForm';

export const UpdateProjet: React.FunctionComponent<{ 
        isOpen: boolean, 
        close: () => void, 
        projet: IProjet
    }> = (props) => {
        const [save, setSave] = React.useState<boolean>(false);
        const { isOpen, close, projet } = props;

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Modifier projet"
            description="Mêtre à jour les informations ci-dessout pour modifier un projet."
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
            <ProjetForm projet={projet} save={save} close={() => {setSave(false); close()}} />
        </Modal>
        </React.Fragment>
    );
};
