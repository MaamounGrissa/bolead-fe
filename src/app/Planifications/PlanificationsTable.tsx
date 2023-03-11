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
import { getPlanificationStatus, getPlanificationTypes, getPlanifications, setPlanificationsTotalCount } from '@app/store/planifications/planificationSlice';
import moment from 'moment';
import { initialPlanification } from '@app/utils/constant';
import { useAxios } from '@app/network';
import { useSnackbar } from 'notistack';
import { getRessourcesList } from '@app/store/ressources/ressourceSlice';
import { getProjetsList } from '@app/store/projets/projetSlice';

const columnNames = {
    id: '#',
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
    const axiosInstance = useAxios();
    const { enqueueSnackbar } = useSnackbar();
    const { planifications, planificationStatus, planificationTypes } = useAppSelector(state => state.planifications)
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(100);
    const [filtredData, setFiltredData] = React.useState<IPlanification[]>([]);
    const {view, openCreatePlanification, setOpenCreatePlanification, closeModal} = props;
    const [selectedDate, setSelectedDate] = React.useState<string>(moment().format('YYYY-MM-DD'));
    const [openUpdatePlanification, setOpenUpdatePlanification] = React.useState(false);
    const [openDeletePlanification, setOpenDeletePlanification] = React.useState(false);
    const [selectedPlanification, setSelectedPlanification] = React.useState<IPlanification>(initialPlanification);

    const fetchPlanificationStatus = async () => {
        await axiosInstance?.current?.get(`referentiel-inspection-statuses`).then(response => {
            dispatch(getPlanificationStatus(response.data));
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchPlanificationTypes = async () => {
        await axiosInstance?.current?.get(`referentiel-inspection-types`).then(response => {
            dispatch(getPlanificationTypes(response.data));
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchRessourcesList = async () => {
        await axiosInstance?.current?.get(`members`).then(response => {
            dispatch(getRessourcesList(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchProjetList = async () => {
        await axiosInstance?.current?.get(`projects`).then(response => {
            dispatch(getProjetsList(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };


    const fetchPlanifications = async () => {
        await axiosInstance?.current?.get(`inspections`, {
            params: {
                page: page,
                size: size,
                sort: 'startTime,desc',
            }
        }).then(response => {
            dispatch(getPlanifications(response.data));
            dispatch(setPlanificationsTotalCount(parseInt(response.headers['x-total-count'])));
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchPlanificationStatus();
        fetchPlanificationTypes();
        fetchRessourcesList();
        fetchProjetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        fetchPlanifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, size]);


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
                            page={page}
                            handleSetPage={(page: number) => setPage(page)}
                            size={size}
                            handleSetSize={(size: number) => setSize(size)}
                        />
                        <TableComposable aria-label="Selectable table">
                            <Thead>
                            <Tr>
                                <Th width={10}>{columnNames.id}</Th>
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
                                        <Td dataLabel={columnNames.id} modifier="truncate">
                                        {repo.id}
                                        </Td>
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
                                        {planificationTypes?.find(type => type.id === repo.type)?.name}
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
