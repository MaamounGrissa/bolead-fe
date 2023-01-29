import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';

export const DeleteRessource: React.FunctionComponent<{
    isOpen: boolean,
    close: () => void,
    ressource: IRessource
}> = (props) => {
    const { isOpen, close, ressource } = props;


  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.small}
        title="Suppimer ressource !"
        isOpen={isOpen}
        onClose={close}
        actions={[
          <Button key="confirm" variant="danger" onClick={close}>
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
