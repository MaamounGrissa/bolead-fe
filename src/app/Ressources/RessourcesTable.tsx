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
import { CreateRessource } from './CreateRessource';
import { UpdateRessource } from './UpdateRessource';
import { DeleteRessource } from './DeleteRessource';
import { RessourcesFilter } from './RessourcesFilter';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getRessourceStatus, getRessourceTypes, getRessources, setRessourcesTotalCount } from '@app/store/ressources/ressourceSlice';
import { initialRessource } from '@app/utils/constant';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';

const columnNames = {
  id: '#',
  name: 'Nom et Prénom',
  email: 'Email',
  phone: 'Téléphone',
  notes: 'Notes',
  status: 'Status',
  type: 'Type'
};

export const RessourcesTable: React.FunctionComponent<{
    openCreateRessource: boolean, 
    setOpenCreateRessource: () => void
}> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const dispatch = useAppDispatch();
    const { ressources, ressourceStatus, ressourceTypes } = useAppSelector(state => state.ressources)
    const [filtredData, setFiltredData] = React.useState<IRessource[]>([]);
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(100);
    const {openCreateRessource, setOpenCreateRessource} = props;
    const [openUpdateRessource, setOpenUpdateRessource] = React.useState(false);
    const [openDeleteRessource, setOpenDeleteRessource] = React.useState(false);
    const [selectedRessource, setSelectedRessource] = React.useState<IRessource>(initialRessource);

    const fetchRessourceStatus = async () => {
        await axiosInstance?.current?.get(`referentiel-member-statuses`).then(response => {
            dispatch(getRessourceStatus(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchRessourceTypes = async () => {
        await axiosInstance?.current?.get(`teams`).then(response => {
            dispatch(getRessourceTypes(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchRessourcesList = async () => {
        await axiosInstance?.current?.get(`members`, {
            params: {
                page: page,
                size: size,
                sort: 'createdAt,desc',
            },
        }).then(response => {
            dispatch(getRessources(response.data));
            dispatch(setRessourcesTotalCount(parseInt(response.headers['x-total-count'] || '0')))
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchRessourceStatus();
        fetchRessourceTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    React.useEffect(() => {
        fetchRessourcesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, size]);


    const renderLabel = (labelText: number) => {
        switch (labelText) {
        case 1:
            return <Label color="blue">{ressourceStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 2:
            return <Label color="green">{ressourceStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 3:
            return <Label color="orange">{ressourceStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 4:
            return <Label color="red">{ressourceStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        default:
            return <Label color="orange">Indéfinie</Label>;
        }
    };

    const actions = (repo: IRessource): IAction[] => [
        {
            title: <span key="action1"><UserEditIcon />&nbsp;Modifier</span>,
            onClick: () => {
                setSelectedRessource(repo);
                setOpenUpdateRessource(true);
            }
        },
        {
            title: <span  key="action2"><TrashAltIcon />&nbsp;Supprimer</span>,
            onClick: () => {
                setSelectedRessource(repo);
                setOpenDeleteRessource(true);
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
            <RessourcesFilter 
                ressources={ressources} 
                filterData={(data: IRessource[]) => setFiltredData(data)} 
                page={page}
                handleSetPage={(page: number) => setPage(page)}
                size={size}
                handleSetSize={(size: number) => setSize(size)}
            />
            <TableComposable aria-label="Selectable table">
                <Thead>
                <Tr>
                    <Th width={10}>{columnNames.id}</Th>
                    <Th width={20}>{columnNames.name}</Th>
                    <Th width={20}>{columnNames.email}</Th>
                    <Th width={15}>{columnNames.phone}</Th>
                    <Th width={10}>{columnNames.type}</Th>
                    <Th width={10}>{columnNames.status}</Th>
                    {/* <Th width={25}>{columnNames.notes}</Th> */}
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
                            <Td dataLabel={columnNames.name} modifier="truncate">
                            {repo.firstName} {repo.lastName}
                            </Td>
                            <Td dataLabel={columnNames.email} modifier="truncate">
                            {repo.email}
                            </Td>
                            <Td dataLabel={columnNames.phone} modifier="truncate">
                            {repo.phone}
                            </Td>
                            <Td dataLabel={columnNames.type} modifier="truncate">
                            {ressourceTypes?.find(type => type.id === repo.type)?.name}
                            </Td>
                            <Td dataLabel={columnNames.status} modifier="truncate">
                            {renderLabel(repo.status)}
                            </Td>
                            {/* <Td dataLabel={columnNames.notes} modifier="truncate">
                            {repo.notes}
                            </Td> */}
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
            {openCreateRessource && <CreateRessource isOpen={openCreateRessource} close={setOpenCreateRessource} />}
            {openUpdateRessource && <UpdateRessource isOpen={openUpdateRessource} close={() => setOpenUpdateRessource(false)} ressource={selectedRessource} />}
            {openDeleteRessource && <DeleteRessource isOpen={openDeleteRessource} close={() => setOpenDeleteRessource(false)} ressource={selectedRessource} />}
        </React.Fragment>
    );
};
