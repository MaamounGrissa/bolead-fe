import { useAppDispatch, useAppSelector } from '@app/store';
import { getPlanifications } from '@app/store/planifications/planificationSlice';
import { Bullseye, EmptyState, EmptyStateBody, EmptyStateIcon, Label, Title } from '@patternfly/react-core';
import { CalendarAltIcon } from '@patternfly/react-icons';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import moment from 'moment';
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
    const { planifications } = useAppSelector(state => state.planifications)

    React.useEffect(() => {
        dispatch(getPlanifications());
    }, [dispatch]);

    const renderLabel = (labelText: string) => {
        switch (labelText) {
        case 'Nouveau':
            return <Label color="blue">{labelText}</Label>;
        case 'En cours':
            return <Label color="green">{labelText}</Label>;
        case 'En pause':
            return <Label color="orange">{labelText}</Label>;
        case 'Terminé':
            return <Label color="purple">{labelText}</Label>;
        case 'Annulé':
            return <Label color="red">{labelText}</Label>;
        case 'Supprimé':
            return <Label color="grey">{labelText}</Label>;
        default:
            return <Label color="grey" 
                            style={{ marginRight: "5px", marginLeft: "5px"}}
                    >{labelText}</Label>;
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
                <TableComposable aria-label="today-table">
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
                    {planifications.length > 0 &&
                        planifications.filter(plan => moment(plan.startDate).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"))
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