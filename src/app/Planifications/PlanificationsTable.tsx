/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStatePrimary,
  Button,
  Bullseye,
  Label
} from '@patternfly/react-core';
import { TableComposable, Thead, Tr, Th, Tbody, Td, ActionsColumn, IAction } from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import TrashAltIcon from '@patternfly/react-icons/dist/esm/icons/trash-alt-icon';
import UserEditIcon from '@patternfly/react-icons/dist/esm/icons/user-edit-icon';
import { CreatePlanification } from './CreatePlanification';
import { UpdatePlanification } from './UpdatePlanification';
import { DeletePlanification } from './DeletePlanification';
import { PlanificationsFilter } from './PlanificationsFilter';
import { useAppDispatch, useAppSelector } from '@app/store';
import { PlanificationsScheduler } from './PlanificationsScheduler';
import { getPlanifications } from '@app/store/planifications/planificationSlice';
import moment from 'moment';
import { initialPlanification } from '@app/utils/constant';

const columnNames = {
  startDate: 'Date',
  ressource: 'Ressource',
  projet: 'Projet',
  type: 'Type',
  status: 'Status',
  notes: 'Notes',
};

export const PlanificationsTable: React.FunctionComponent<{
    openCreatePlanification: boolean, 
    setOpenCreatePlanification: () => void,
    closeModal: () => void,
    view: string,
}> = (props) => {
    const dispatch = useAppDispatch();
    const { planifications } = useAppSelector(state => state.planifications)
    const [filtredData, setFiltredData] = React.useState<IPlanification[]>([]);
    const {view, openCreatePlanification, setOpenCreatePlanification, closeModal} = props;
    const [selectedDate, setSelectedDate] = React.useState<string>(moment().format('YYYY-MM-DD'));
    const [openUpdatePlanification, setOpenUpdatePlanification] = React.useState(false);
    const [openDeletePlanification, setOpenDeletePlanification] = React.useState(false);
    const [selectedPlanification, setSelectedPlanification] = React.useState<IPlanification>(initialPlanification);

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

    const actions = (repo: IPlanification): IAction[] => [
        {
            title: <span key="action1"><UserEditIcon />&nbsp;Modifier</span>,
            onClick: () => {
                setSelectedPlanification(repo);
                setOpenUpdatePlanification(true);
            }
        },
        {
            title: <span  key="action2"><TrashAltIcon />&nbsp;Supprimer</span>,
            onClick: () => {
                setSelectedPlanification(repo);
                setOpenDeletePlanification(true);
            }
        },
    ];

    const emptyState = (
        <EmptyState>
        <EmptyStateIcon icon={SearchIcon} />
        <Title size="lg" headingLevel="h4">
            Aucun résultat trouvé
        </Title>
        <EmptyStateBody>Aucun résultat ne correspond aux critères du filtre. Effacez tous les filtres et réessayez.</EmptyStateBody>
        <EmptyStatePrimary>
            <Button
            variant="link"
            onClick={() => {
                console.log('Clear all filters')
            }}
            >
            Effacer tous les filtres
            </Button>
        </EmptyStatePrimary>
        </EmptyState>
    );

    return (
        <React.Fragment>
            {
                view === 'TABLE' ? (
                    <>
                        <PlanificationsFilter 
                            planifications={planifications} 
                            filterData={(data: IPlanification[]) => setFiltredData(data)} 
                        />
                        <TableComposable aria-label="Selectable table">
                            <Thead>
                            <Tr>
                                <Th width={20}>{columnNames.startDate}</Th>
                                <Th width={15}>{columnNames.ressource}</Th>
                                <Th width={15}>{columnNames.projet}</Th>
                                <Th width={20}>{columnNames.type}</Th>
                                <Th width={15}>{columnNames.status}</Th>
                                <Th width={20}>{columnNames.notes}</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {filtredData.length > 0 &&
                                filtredData.map(repo => {
                                    const actionsRow: IAction[] | null = actions(repo);
                                    return (
                                    <Tr key={repo.id}>
                                        <Td dataLabel={columnNames.startDate} modifier="truncate">
                                        {moment(repo.startDate).format("DD/MM/YYYY HH:mm")}
                                        </Td>
                                        <Td dataLabel={columnNames.ressource} modifier="truncate">
                                        {repo.ressource}
                                        </Td>
                                        <Td dataLabel={columnNames.projet} modifier="truncate">
                                        {repo.projet}
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
                                        <Td isActionCell>
                                            <ActionsColumn
                                            items={actionsRow}
                                            //isDisabled={repo.name === '4'} // Also arbitrary for the example
                                            //actionsToggle={exampleChoice === 'customToggle' ? customActionsToggle : undefined}
                                            />
                                        </Td>
                                    </Tr>
                                )})}
                            {filtredData.length === 0 && (
                                <Tr>
                                <Td colSpan={8}>
                                    <Bullseye>{emptyState}</Bullseye>
                                </Td>
                                </Tr>
                            )}
                            </Tbody>
                        </TableComposable>
                    </>
                    ) : (
                    <PlanificationsScheduler
                        setOpenCreatePlanification={(data) => {setSelectedDate(data); setOpenCreatePlanification()}} 
                        setOpenUpdatePlanification={(data) => {setSelectedPlanification(data); setOpenUpdatePlanification(true)}}
                        setOpenDeletePlanification={(data) => {setSelectedPlanification(data); setOpenDeletePlanification(true)}}
                    />
                )
            }
            {openCreatePlanification && <CreatePlanification isOpen={openCreatePlanification} close={closeModal} selectedDate={selectedDate} />}
            {openUpdatePlanification && <UpdatePlanification isOpen={openUpdatePlanification} close={() => setOpenUpdatePlanification(false)} planification={selectedPlanification} />}
            {openDeletePlanification && <DeletePlanification isOpen={openDeletePlanification} close={() => setOpenDeletePlanification(false)} planification={selectedPlanification} />}
        </React.Fragment>
    );
};
