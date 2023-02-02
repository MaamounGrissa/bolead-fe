import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { useAppDispatch } from '@app/store';
import { deleteClient } from '@app/store/clients/clientSlice';

export const DeleteClient: React.FunctionComponent<{
    isOpen: boolean,
    close: () => void,
    client: IClient
}> = (props) => {
    const dispatch = useAppDispatch();
    const { isOpen, close, client } = props;

    const handleDelete = () => {
        setTimeout(() => {
            dispatch(deleteClient(client.id));
            close();
        }, 500);
    };


  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.small}
        title="Suppimer client !"
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
        Vous êtes sur le point de supprimer cet client : {client.id} - {client.name}.
      </Modal>
    </React.Fragment>
  );
};
