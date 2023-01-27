/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ModalVariant, Button, Form, FormGroup, TextInput, Select, SelectOption, DropdownPosition } from '@patternfly/react-core';

export const CreateRessource: React.FunctionComponent<{ isOpen: boolean, close: () => void}> = ({isOpen, close}) => {
    
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);
    const [nameValue, setNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [addressValue, setAddressValue] = React.useState('');
    const [statusValue, setStatusValue] = React.useState('Actif');
    const [typeValue, setTypeValue] = React.useState('Technicien');

    const statusList = [
        "Actif",
        "Inactif",
        "Supprimé",
    ];

    const typeList= [
        "Technicien",
        "Commercial",
        "Comptable",
        "Administrateur",
    ]

    const typeMenuItems = typeList.map((type) => (
        <SelectOption key={type} value={type} />
    ));

    const statusMenuItems = statusList.map((status) => (
        <SelectOption key={status} value={status} />
    ));

    const handleModalToggle = () => {
        close();
    };

    const handleNameInputChange = (value: string) => {
        setNameValue(value);
    };

    const handleEmailInputChange = (value: string) => {
        setEmailValue(value);
    };
    const handleAddressInputChange = (value: string) => {
        setAddressValue(value);
    };
    const onTypeToggle = (isOpen: boolean) => {
        setIsTypeFilterDropdownOpen(isOpen);
    };
    const selectType = (event: any) => {
        setTypeValue(event.target.innerText);
        setIsTypeFilterDropdownOpen(false);
    };
    const onStatusToggle = (isOpen: boolean) => {
        setIsStatusFilterDropdownOpen(isOpen);
    };
    const selectStatus = (event: any) => {
        setStatusValue(event.target.innerText);
        setIsStatusFilterDropdownOpen(false);
    };

    return (
        <React.Fragment>
        <Modal
            variant={ModalVariant.small}
            title="Créer ressource"
            description="Entrer les informations ci-dessout pour créer un ressource."
            isOpen={isOpen}
            onClose={handleModalToggle}
            actions={[
            <Button key="create" variant="primary" form="modal-with-form-form" onClick={handleModalToggle}>
                Confirmer
            </Button>,
            <Button key="cancel" variant="link" onClick={handleModalToggle}>
                Annuler
            </Button>
            ]}
        >
            <Form id="modal-with-form-form">
            <FormGroup
                label="Nom et prénom"
                isRequired
                fieldId="modal-with-form-form-name"
            >
                <TextInput
                isRequired
                type="text"
                id="modal-with-form-form-name"
                name="modal-with-form-form-name"
                value={nameValue}
                onChange={handleNameInputChange}
                />
            </FormGroup>
            <FormGroup
                label="Email"
                isRequired
                fieldId="modal-with-form-form-email"
            >
                <TextInput
                isRequired
                type="email"
                id="modal-with-form-form-email"
                name="modal-with-form-form-email"
                value={emailValue}
                onChange={handleEmailInputChange}
                />
            </FormGroup>
            <FormGroup
                label="Téléphone"
                isRequired
                fieldId="modal-with-form-form-address"
            >
                <TextInput
                isRequired
                type="tel"
                id="modal-with-form-form-address"
                name="modal-with-form-form-address"
                value={addressValue}
                onChange={handleAddressInputChange}
                />
            </FormGroup>
            <FormGroup
                label="Type"
                isRequired
                fieldId="modal-with-form-form-type"
            >
                 <Select
                    onSelect={selectType}
                    selections={typeValue}
                    position={DropdownPosition.left}
                    onToggle={onTypeToggle}
                    isOpen={isTypeFilterDropdownOpen}
                    style={{ width: '100%' }}
                    >
                    {typeMenuItems}
                </Select>
            </FormGroup>
            <FormGroup
                label="Status"
                isRequired
                fieldId="modal-with-form-form-status"
            >
                    <Select
                    onSelect={selectStatus}
                    selections={statusValue}
                    position={DropdownPosition.left}
                    onToggle={onStatusToggle}
                    isOpen={isStatusFilterDropdownOpen}
                    style={{ width: '100%' }}
                    >
                    {statusMenuItems}
                </Select>
            </FormGroup>
            </Form>
        </Modal>
        </React.Fragment>
    );
};
