/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Bullseye, FormGroup, Grid, GridItem, TextInput } from '@patternfly/react-core';
import { GoogleMapsContainer } from './GoogleMapsContainer';

export const CreateStep3: React.FunctionComponent<{ 
    formData: {
        origin: string,
        destination: string,
        distance: string,
        trajetDuration: string,
        trajetDurationText: string,
        travelMode: string,
    },
    handleSetFormData: (data: any) => void,
}> = (props) => {
    const { formData, handleSetFormData } = props;
 
    return (
        <React.Fragment>
            <Bullseye>
                <div className='step-container-map'>
                    <Grid hasGutter style={{ marginTop: '20px', marginBottom: '25px' }}>
                        <GridItem span={12}>
                                <GoogleMapsContainer formData={formData} handleSetFormData={(data) => handleSetFormData(data) }  />
                        </GridItem>
                    </Grid>
                    <Grid hasGutter style={{ marginTop: '20px', marginBottom: '25px' }}>
                        <GridItem span={4}>
                            <FormGroup
                                label="Distance de trajet"
                                fieldId="modal-with-form-form-distance"
                                >
                                <TextInput
                                    type="text"
                                    id="modal-with-form-form-distance"
                                    name="modal-with-form-form-distance"
                                    value={formData.distance}
                                    readOnly
                                />
                            </FormGroup>
                        </GridItem>
                        <GridItem span={4}>
                            <FormGroup
                                label="Durée de trajet"
                                fieldId="modal-with-form-form-trajetDurationText"
                                >
                                <TextInput
                                    type="text"
                                    id="modal-with-form-form-trajetDurationText"
                                    name="modal-with-form-form-trajetDurationText"
                                    value={formData.trajetDurationText}
                                    readOnly
                                />
                            </FormGroup>
                        </GridItem>
                    </Grid>
                </div>
            </Bullseye>
        </React.Fragment>
    );
};
