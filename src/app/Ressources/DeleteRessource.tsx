import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { useAppDispatch } from '@app/store';
import { deleteRessource } from '@app/store/ressources/ressourceSlice';

export const DeleteRessource: React.FunctionComponent<{
    isOpen: boolean,
    close: () => void,
    ressource: IRessource
}> = (props) => {
    const dispatch = useAppDispatch();
    const { isOpen, close, ressource } = props;

    const handleDelete = () => {
        setTimeout(() => {
            dispatch(deleteRessource(ressource.id));
            close();
        }, 500);
    };


  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.small}
        title="Suppimer ressource !"
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
        Vous êtes sur le point de supprimer cette ressource : {ressource.id} - {ressource.name}.
      </Modal>
    </React.Fragment>
  );
};
