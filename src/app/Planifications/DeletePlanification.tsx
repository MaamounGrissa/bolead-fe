import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import { useAppDispatch } from '@app/store';
import { deletePlanification } from '@app/store/planifications/planificationSlice';

export const DeletePlanification: React.FunctionComponent<{
    isOpen: boolean,
    close: () => void,
    planification: IPlanification
}> = (props) => {
    const dispatch = useAppDispatch();
    const { isOpen, close, planification } = props;

    const handleDelete = () => {
        setTimeout(() => {
            dispatch(deletePlanification(planification.id || 0));
            close();
        }, 500);
    };


  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.small}
        title="Suppimer planification !"
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
        Vous êtes sur le point de supprimer cet planification : {planification.id} - {planification.title}.
      </Modal>
    </React.Fragment>
  );
};
