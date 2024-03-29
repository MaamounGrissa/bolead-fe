import { useAxios } from '@app/network';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getRessources } from '@app/store/ressources/ressourceSlice';
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
    const { ressources } = useAppSelector(state => state.ressources)
    const { dashboardStatistics } = useAppSelector(state => state.statistics);
    
    const fetchRessourcesList = async () => {
        await axiosInstance?.current?.get(`services/inspections/api/members`).then(response => {
            dispatch(getRessources(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchRessourcesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const renderLabel = (hours: number) => {
        if (hours < 30) {
            return <Label color="green">{hours} Heures</Label>;
        } else if (hours < 40 && hours > 30) {
            return <Label color="orange">{hours} Heures</Label>;
        } else if (hours > 40) {
            return <Label color="red">{hours} Heures</Label>;
        } else {
            return <Label color="grey"
                            style={{ marginRight: "5px", marginLeft: "5px"}}
                    >{hours} Heures</Label>;
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
                        {/* <Th width={20}>{columnNames.type}</Th> */}
                        <Th width={15}>{columnNames.occupation}</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {dashboardStatistics?.tenHighestPlannedWorkers?.length > 0 &&
                        dashboardStatistics?.tenHighestPlannedWorkers?.filter((ress, i) => i < 5)
                        .map((repo) => {
                            return (
                            <Tr key={repo.id}>
                                <Td dataLabel={columnNames.ressource} modifier="truncate">
                                {repo.firstName} {repo.lastName}
                                </Td>
                                {/* <Td dataLabel={columnNames.type} modifier="truncate">
                                {repo.team.name || '-'}
                                </Td> */}
                                <Td dataLabel={columnNames.occupation} modifier="truncate">
                                {renderLabel(repo.total)}
                                </Td>
                            </Tr>
                        )})}
                        {ressources?.length === 0 && (
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