/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { useAppDispatch } from '@app/store';
import { deleteRessource } from '@app/store/ressources/ressourceSlice';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';

export const DeleteRessource: React.FunctionComponent<{
    isOpen: boolean,
    close: () => void,
    ressource: IRessource
}> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const axiosInstance = useAxios();
  const dispatch = useAppDispatch();
  const { isOpen, close, ressource } = props;

  const deleteRessourceRequest = async () => {
    await axiosInstance?.current?.delete(`members/${ressource.id}`).then(response => {
      enqueueSnackbar('Ressource supprimé avec succès', { variant: 'success' });
      return response;
    }).catch(error => {
      if (error.response?.data?.fieldErrors?.length > 0) {
        error.response?.data?.fieldErrors.map((err: any) => {
            enqueueSnackbar(err.message, {
                variant: 'error',
            });
        });
      } else {
          enqueueSnackbar('Erreur lors de modification!', {
              variant: 'error',
          });
      }
    });
};

    const handleDelete = () => {
        setTimeout(() => {
            deleteRessourceRequest();
            dispatch(deleteRessource(ressource.id || 0));
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
        Vous êtes sur le point de supprimer cette ressource : {ressource.id} - {ressource.contact.firstName} {ressource.contact.lastName}.
      </Modal>
    </React.Fragment>
  );
};
