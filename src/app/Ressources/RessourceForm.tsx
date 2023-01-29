/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, FormGroup, TextInput, Select, SelectOption, DropdownPosition, TextArea } from '@patternfly/react-core';

export const RessourceForm: React.FunctionComponent<{ ressource: IRessource}> = ({ressource}) => {
    
    const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] = React.useState(false);
    const [isStatusFilterDropdownOpen, setIsStatusFilterDropdownOpen] = React.useState(false);

    const [formData, setFormData] = React.useState<IRessource>({
        id: '',
        name: '',
        email: '',
        phone: '',
        status: 'Actif',
        type: 'Technicien',
        notes: '',
    });

    const clearForm = () => {
        setFormData({
            id: '',
            name: '',
            email: '',
            phone: '',
            status: 'Actif',
            type: 'Technicien',
            notes: '',
        });
    };

    React.useEffect(() => {
        if (ressource) {
            setFormData(ressource);
        } else {
            clearForm();
        }
    }, [ressource]);

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

    const handleNameInputChange = (value: string) => {
        setFormData({
            ...formData,
            name: value,
        });
    };

    const handleEmailInputChange = (value: string) => {
        setFormData({
            ...formData,
            email: value,
        });
    };
    const handlePhoneInputChange = (value: string) => {
        setFormData({
            ...formData,
            phone: value,
        });
    };
    const handleNotesInputChange = (value: string) => {
        setFormData({
            ...formData,
            notes: value,
        });
    };
    const onTypeToggle = (isOpen: boolean) => {
        setIsTypeFilterDropdownOpen(isOpen);
    };
    const selectType = (event: any) => {
        setFormData({
            ...formData,
            type: event.target.innerText,
        });
        setIsTypeFilterDropdownOpen(false);
    };
    const onStatusToggle = (isOpen: boolean) => {
        setIsStatusFilterDropdownOpen(isOpen);
    };
    const selectStatus = (event: any) => {
        setFormData({
            ...formData,
            status: event.target.innerText,
        });
        setIsStatusFilterDropdownOpen(false);
    };

    return (
        <React.Fragment>
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
                    value={formData.name}
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
                    value={formData.email}
                    onChange={handleEmailInputChange}
                    />
                </FormGroup>
                <FormGroup
                    label="Téléphone"
                    isRequired
                    fieldId="modal-with-form-form-phone"
                >
                    <TextInput
                    isRequired
                    type="tel"
                    id="modal-with-form-form-phone"
                    name="modal-with-form-form-phone"
                    value={formData.phone}
                    onChange={handlePhoneInputChange}
                    />
                </FormGroup>
                <FormGroup
                    label="Type"
                    fieldId="modal-with-form-form-type"
                >
                    <Select
                        onSelect={selectType}
                        selections={formData.type}
                        position={DropdownPosition.left}
                        onToggle={onTypeToggle}
                        isOpen={isTypeFilterDropdownOpen}
                        style={{ width: '100%' }}
                        menuAppendTo={() => document.body}
                        >
                        {typeMenuItems}
                    </Select>
                </FormGroup>
                <FormGroup
                    label="Status"
                    fieldId="modal-with-form-form-status"
                >
                        <Select
                        onSelect={selectStatus}
                        selections={formData.status}
                        position={DropdownPosition.left}
                        onToggle={onStatusToggle}
                        isOpen={isStatusFilterDropdownOpen}
                        style={{ width: '100%' }}
                        menuAppendTo={() => document.body}
                        >
                        {statusMenuItems}
                    </Select>
                </FormGroup>
                <FormGroup
                    label="Notes"
                    fieldId="modal-with-form-form-notes"
                >
                    <TextArea
                    type="text"
                    id="modal-with-form-form-notes"
                    name="modal-with-form-form-notes"
                    value={formData.notes}
                    onChange={handleNotesInputChange}
                    />
                </FormGroup>
            </Form>
        </React.Fragment>
    );
};
