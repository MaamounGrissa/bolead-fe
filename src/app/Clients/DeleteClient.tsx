import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { useAppDispatch } from '@app/store';
import { deleteClient } from '@app/store/clients/clientSlice';
import { useAxios } from '@app/network';
import { useSnackbar } from 'notistack';

export const DeleteClient: React.FunctionComponent<{
    isOpen: boolean,
    close: () => void,
    client: IClient
}> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const dispatch = useAppDispatch();
    const { isOpen, close, client } = props;

    const deleteClientRequest = async () => {
        await axiosInstance?.current?.delete(`customers/${client.id}`).then(response => {
          enqueueSnackbar('Client supprimé avec succès', { variant: 'success' });
          return response;
        }).catch(error => {
          enqueueSnackbar('Erreur lors de la suppression du client', { variant: 'error' });
          return error;
        });
    };

    const handleDelete = () => {
        setTimeout(() => {
            client.id && deleteClientRequest();
            client.id && dispatch(deleteClient(client.id));
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
        Vous êtes sur le point de supprimer cet client : {client.id} - {client.contact?.firstName} {client.contact?.lastName}.
      </Modal>
    </React.Fragment>
  );
};
