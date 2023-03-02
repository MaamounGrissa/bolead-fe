import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { useAppDispatch } from '@app/store';
import { deleteProjet } from '@app/store/projets/projetSlice';
import { axiosInstance } from '@app/network';
import { useSnackbar } from 'notistack';

export const DeleteProjet: React.FunctionComponent<{
    isOpen: boolean,
    close: () => void,
    projet: IProjet
}> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { isOpen, close, projet } = props;

  const deleteProjetRequest = async () => {
      await axiosInstance.delete(`projects/${projet.id}`).then(response => {
        enqueueSnackbar('Projet supprimé avec succès', { variant: 'success' });
        return response;
      }).catch(error => {
        enqueueSnackbar('Erreur lors de la suppression du projet', { variant: 'error' });
        return error;
      });
  };

  const handleDelete = () => {
      setTimeout(() => {
          deleteProjetRequest();
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
