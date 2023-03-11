/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Bullseye, FormGroup, Grid, GridItem, TextArea, TextInput } from '@patternfly/react-core';
import { useAppSelector } from '@app/store';

export const CreateStep4: React.FunctionComponent<{ 
    formData: {
        title: string,
        startDate: string,
        duration: string,
        trajetDuration: string,
        notes: string,
        ressource: string,
        projet: string,
    }
}> = (props) => {
    const { formData } = props;
    const { ressourcesList } = useAppSelector((state) => state.ressources);
    const { projetsList } = useAppSelector((state) => state.projets);
    const [totalDuration, setTotalDuration] = React.useState<number>(0);

    React.useEffect(() => {
        if (formData.trajetDuration && formData.duration) {
            setTotalDuration(parseInt(formData.trajetDuration) + parseInt(formData.duration))
        }
    }, [formData.trajetDuration, formData.duration]);
 
    return (
        <React.Fragment>
            <Bullseye>
                <div className='step-container'>
                    <Grid hasGutter style={{ marginTop: '20px', marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Titre"
                                fieldId="modal-with-form-form-preview-name"
                            >
                                <TextInput
                                isRequired
                                type="text"
                                id="modal-with-form-form-preview-title"
                                name="modal-with-form-form-preview-title"
                                value={formData.title}
                                readOnly
                                />
                            </FormGroup>
                        </GridItem>
                    </Grid>
                    <Grid hasGutter style={{ marginBottom: '25px' }}>
                        <GridItem span={8}>
                            <FormGroup
                                label="Date et heure"
                                isRequired
                                fieldId="modal-with-form-form-preview-datetime"
                            >
                                <TextInput
                                isRequired
                                type="datetime-local"
                                id="modal-with-form-form-preview-datetime"
                                name="modal-with-form-form-preview-datetime"
                                value={formData.startDate}
                                readOnly
                                />
                            </FormGroup>
                        </GridItem>
                        <GridItem span={4}>
                            <FormGroup
                                label="Total Durée (min)"
                                isRequired
                                fieldId="modal-with-form-form-preview-duration"
                            >
                                <TextInput
                                isRequired
                                type="number"
                                id="modal-with-form-form-preview-duration"
                                name="modal-with-form-form-preview-duration"
                                value={totalDuration}
                                readOnly
                                />
                            </FormGroup>
                        </GridItem>
                    </Grid>
                    <Grid hasGutter style={{ marginBottom: '25px' }}>
                        <GridItem span={6}>
                            <FormGroup
                                label="Ressource"
                                isRequired
                                fieldId="modal-with-form-form-preview-resource"
                            >
                                <TextInput
                                isRequired
                                type="text"
                                id="modal-with-form-form-preview-resource"
                                name="modal-with-form-form-preview-resource"
                                value={ressourcesList?.find(ress => ress.id === formData.ressource)?.name}
                                readOnly
                                />
                            </FormGroup>
                        </GridItem>
                        <GridItem span={6}>
                            <FormGroup
                                label="Projet"
                                fieldId="modal-with-form-form-preview-projet"
                            >
                                <TextInput
                                type="text"
                                id="modal-with-form-form-preview-projet"
                                name="modal-with-form-form-preview-projet"
                                value={projetsList?.find(proj => proj.id === formData.projet)?.name}
                                readOnly
                                />
                            </FormGroup>
                        </GridItem>
                    </Grid>
                    <Grid hasGutter style={{ marginBottom: '25px' }}>
                        <GridItem span={12}>
                            <FormGroup
                                label="Notes"
                                fieldId="modal-with-form-form-preview-notes"
                            >
                                <TextArea
                                type="text"
                                id="modal-with-form-form-preview-notes"
                                name="modal-with-form-form-preview-notes"
                                value={formData.notes}
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
