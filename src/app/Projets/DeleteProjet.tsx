import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { useAppDispatch } from '@app/store';
import { deleteProjet } from '@app/store/projets/projetSlice';

export const DeleteProjet: React.FunctionComponent<{
    isOpen: boolean,
    close: () => void,
    projet: IProjet
}> = (props) => {
    const dispatch = useAppDispatch();
    const { isOpen, close, projet } = props;

    const handleDelete = () => {
        setTimeout(() => {
            dispatch(deleteProjet(projet.id));
            close();
        }, 500);
    };


  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.small}
        title="Suppimer projet !"
        isOpen={isOpen}
        onClose={close}
        actions={[
          <Button key="confirm" variant="danger" onClick={handleDelete}>
            Supprimer
          </Button>,
          <Button key="cancel" variant="link" onClick={close}>
            Cancel
          </Button>
        ]}
      >
        Vous êtes sur le point de supprimer cet projet : {projet.id} - {projet.name}.
      </Modal>
    </React.Fragment>
  );
};
