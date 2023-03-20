import { useAxios } from '@app/network';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getPlanificationStatus } from '@app/store/planifications/planificationSlice';
import { Bullseye, EmptyState, EmptyStateBody, EmptyStateIcon, Label, Title } from '@patternfly/react-core';
import { CalendarAltIcon } from '@patternfly/react-icons';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { useSnackbar } from 'notistack';
import React from 'react';

const columnNames = {
    projet: 'Projet',
    ressource: 'Ressource',
    type: 'Type',
    status: 'Status',
    notes: 'Notes',
};

export const TodayPlanifications: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const { planificationStatus } = useAppSelector(state => state.planifications);
    const { dashboardStatistics } = useAppSelector(state => state.statistics);

    const fetchPlanificationStatus = async () => {
        await axiosInstance?.current?.get(`inspections/api/referentiel-inspection-statuses`).then(response => {
            dispatch(getPlanificationStatus(response.data));
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchPlanificationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderLabel = (labelText: number) => {
        switch (labelText) {
        case 1:
            return <Label color="blue">{planificationStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        case 2:
            return <Label color="green">{planificationStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        case 3:
            return <Label color="orange">{planificationStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        case 4:
            return <Label color="red">{planificationStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        default:
            return <Label color="orange">Indéfinie</Label>;
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
                        <Th width={15}>{columnNames.projet}</Th>
                        <Th width={15}>{columnNames.ressource}</Th>
                        <Th width={20}>{columnNames.type}</Th>
                        <Th width={15}>{columnNames.status}</Th>
                        <Th width={20}>{columnNames.notes}</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {dashboardStatistics?.inspectionsOfCurrentDay?.length > 0 ? (
                        dashboardStatistics?.inspectionsOfCurrentDay?.map(repo => {
                            return (
                            <Tr key={repo.id}>
                                <Td dataLabel={columnNames.projet} modifier="truncate">
                                {repo.project?.reference}
                                </Td>
                                <Td dataLabel={columnNames.ressource} modifier="truncate">
                                {repo.member?.contact?.firstName} {repo.member?.contact?.lastName}
                                </Td>
                                <Td dataLabel={columnNames.type} modifier="truncate">
                                {repo.type?.type}
                                </Td>
                                <Td dataLabel={columnNames.status} modifier="truncate">
                                {renderLabel(repo.status?.id)}
                                </Td>
                                <Td dataLabel={columnNames.notes} modifier="truncate">
                                {repo.comment}
                                </Td>
                            </Tr>
                        )})
                    ) :  (
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