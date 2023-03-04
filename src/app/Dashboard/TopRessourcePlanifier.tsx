import { useAxios } from '@app/network';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getRessourceTypes, getRessources } from '@app/store/ressources/ressourceSlice';
import { Bullseye, EmptyState, EmptyStateBody, EmptyStateIcon, Label, Title } from '@patternfly/react-core';
import { CalendarAltIcon } from '@patternfly/react-icons';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { useSnackbar } from 'notistack';
import React from 'react';

const columnNames = {
    ressource: 'Ressource',
    type: 'Type',
    occupation: 'Occupation',
};

export const TopRessourcePlanifier: React.FunctionComponent = () => {
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const dispatch = useAppDispatch();
    const { ressourcesList, ressourceTypes } = useAppSelector(state => state.ressources)
    
    const fetchRessourceTypes = async () => {
        await axiosInstance?.current?.get(`teams`).then(response => {
            dispatch(getRessourceTypes(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchRessourcesList = async () => {
        await axiosInstance?.current?.get(`members`).then(response => {
            dispatch(getRessources(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchRessourceTypes();
        fetchRessourcesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const renderLabel = (labelText: string) => {
        if (parseInt(labelText) < 30) {
            return <Label color="green">{labelText} Heures</Label>;
        } else if (parseInt(labelText) < 40 && parseInt(labelText) > 30) {
            return <Label color="orange">{labelText} Heures</Label>;
        } else if (parseInt(labelText) > 40) {
            return <Label color="red">{labelText} Heures</Label>;
        } else {
            return <Label color="grey"
                            style={{ marginRight: "5px", marginLeft: "5px"}}
                    >{labelText} Heures</Label>;
        }
    };

    const emptyState = (
        <EmptyState>
        <EmptyStateIcon icon={CalendarAltIcon} />
        <Title size="lg" headingLevel="h4">
            Aucun résultat trouvé
        </Title>
            <EmptyStateBody>Il n&apos;y a pas de rendez-vous prévu pour aujourd&apos;hui.</EmptyStateBody>
        </EmptyState>
    );

    return (
        <React.Fragment>
                <TableComposable variant='compact' aria-label="today-table">
                    <Thead>
                    <Tr>
                        <Th width={15}>{columnNames.ressource}</Th>
                        <Th width={20}>{columnNames.type}</Th>
                        <Th width={15}>{columnNames.occupation}</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {ressourcesList?.length > 0 &&
                        ressourcesList?.filter((ress, i) => i < 5)
                        .map((repo, index) => {
                            return (
                            <Tr key={repo.id}>
                                <Td dataLabel={columnNames.ressource} modifier="truncate">
                                {repo.name}
                                </Td>
                                <Td dataLabel={columnNames.type} modifier="truncate">
                                {ressourceTypes?.find(type => type.id === repo.type)?.name || '-'}
                                </Td>
                                <Td dataLabel={columnNames.occupation} modifier="truncate">
                                {renderLabel(index === 0 ? '52' : index === 1 ? '43' : index === 2 ? '38' : index === 3 ? '33' : '20')}
                                </Td>
                            </Tr>
                        )})}
                        {ressourcesList?.length === 0 && (
                            <Tr>
                            <Td colSpan={8}>
                                <Bullseye>{emptyState}</Bullseye>
                            </Td>
                            </Tr>
                        )}
                    </Tbody>
                </TableComposable>
            </React.Fragment>
    );
};