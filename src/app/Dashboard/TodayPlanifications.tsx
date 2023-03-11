import { useAxios } from '@app/network';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getPlanificationStatus, getPlanifications } from '@app/store/planifications/planificationSlice';
import { Bullseye, EmptyState, EmptyStateBody, EmptyStateIcon, Label, Title } from '@patternfly/react-core';
import { CalendarAltIcon } from '@patternfly/react-icons';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import moment from 'moment';
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
    const { planifications, planificationStatus } = useAppSelector(state => state.planifications);

    const fetchPlanificationStatus = async () => {
        await axiosInstance?.current?.get(`referentiel-inspection-statuses`).then(response => {
            dispatch(getPlanificationStatus(response.data));
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchPlanifications = async () => {
        await axiosInstance?.current?.get(`inspections`).then(response => {
            dispatch(getPlanifications(response.data));
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchPlanificationStatus();
        fetchPlanifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderLabel = (labelText: number) => {
        switch (labelText) {
        case 1:
            return <Label color="blue">{planificationStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 2:
            return <Label color="green">{planificationStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 3:
            return <Label color="orange">{planificationStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 4:
            return <Label color="red">{planificationStatus?.find(stat => stat.id === labelText)?.name}</Label>;
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
                    {planifications?.length > 0 &&
                        planifications?.filter(plan => moment(plan.startDate).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"))
                        .map(repo => {
                            return (
                            <Tr key={repo.id}>
                                <Td dataLabel={columnNames.projet} modifier="truncate">
                                {repo.projet}
                                </Td>
                                <Td dataLabel={columnNames.ressource} modifier="truncate">
                                {repo.ressource}
                                </Td>
                                <Td dataLabel={columnNames.type} modifier="truncate">
                                {repo.type}
                                </Td>
                                <Td dataLabel={columnNames.status} modifier="truncate">
                                {renderLabel(repo.status)}
                                </Td>
                                <Td dataLabel={columnNames.notes} modifier="truncate">
                                {repo.notes}
                                </Td>
                            </Tr>
                        )})}
                        {planifications?.filter(plan => moment(plan.startDate).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")).length === 0 && (
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