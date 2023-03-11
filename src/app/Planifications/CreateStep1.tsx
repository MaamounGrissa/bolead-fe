/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Bullseye, FormGroup, Grid, GridItem, TextArea, TextInput } from '@patternfly/react-core';

export const CreateStep1: React.FunctionComponent<{ 
    formData: {
        title: string,
        startDate: string,
        duration: string,
        notes: string,
    },
    handleTitleChange: (value: string) => void,
    handleStartDateChange: (value: string) => void,
    handleDurationChange: (value: string) => void,
    handleNotesChange: (value: string) => void,
}> = (props) => {
    const { formData, handleTitleChange, handleStartDateChange, handleDurationChange, handleNotesChange } = props;
 
    return (
        <React.Fragment>
           <Bullseye>
                <div className='step-container'>
                    <Grid hasGutter style={{ marginTop: '20px', marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Titre"
                                fieldId="modal-with-form-form-name"
                            >
                                <TextInput
                                isRequired
                                type="text"
                                id="modal-with-form-form-title"
                                name="modal-with-form-form-title"
                                value={formData.title}
                                onChange={handleTitleChange}
                                />
                            </FormGroup>
                        </GridItem>
                    </Grid>
                    <Grid hasGutter style={{ marginBottom: '25px' }}>
                        <GridItem span={8}>
                            <FormGroup
                                label="Date et heure"
                                isRequired
                                fieldId="modal-with-form-form-datetime"
                            >
                                <TextInput
                                isRequired
                                type="datetime-local"
                                id="modal-with-form-form-datetime"
                                name="modal-with-form-form-datetime"
                                value={formData.startDate}
                                onChange={handleStartDateChange}
                                />
                            </FormGroup>
                        </GridItem>
                        <GridItem span={4}>
                            <FormGroup
                                label="Duration"
                                isRequired
                                fieldId="modal-with-form-form-duration"
                            >
                                <TextInput
                                isRequired
                                type="number"
                                id="modal-with-form-form-duration"
                                name="modal-with-form-form-duration"
                                value={formData.duration}
                                onChange={handleDurationChange}
                                />
                            </FormGroup>
                        </GridItem>
                    </Grid>
                    <Grid hasGutter style={{ marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Notes"
                                fieldId="modal-with-form-form-name"
                            >
                                <TextArea
                                id="modal-with-form-form-notes"
                                name="modal-with-form-form-notes"
                                value={formData.notes}
                                onChange={handleNotesChange}
                                />
                            </FormGroup>
                        </GridItem>
                    </Grid>
                </div>
            </Bullseye>
        </React.Fragment>
    );
};
