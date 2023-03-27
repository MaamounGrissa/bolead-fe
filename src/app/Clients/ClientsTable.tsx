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
import { CreateClient } from './CreateClient';
import { UpdateClient } from './UpdateClient';
import { DeleteClient } from './DeleteClient';
import { ClientsFilter } from './ClientsFilter';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getClients, getClientStatus, setClientsTotalCount } from '@app/store/clients/clientSlice';
import { initialClient } from '@app/utils/constant';
import { useSnackbar } from 'notistack';
import { useAxios } from '@app/network';

const columnNames = {
    id: '#',
    name: 'Nom et Prénom',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    status: 'Status',
};

export const ClientsTable: React.FunctionComponent<{
    openCreateClient: boolean, 
    setOpenCreateClient: () => void
}> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const dispatch = useAppDispatch();
    const { clients, clientStatus } = useAppSelector(state => state.clients)
    const [filtredData, setFiltredData] = React.useState<IClient[]>([]);
    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(20);
    const {openCreateClient, setOpenCreateClient} = props;
    const [openUpdateClient, setOpenUpdateClient] = React.useState(false);
    const [openDeleteClient, setOpenDeleteClient] = React.useState(false);
    const [selectedClient, setSelectedClient] = React.useState<IClient>(initialClient);
    const [resetFilter, setResetFilter] = React.useState(false);

    const fetchClientStatus = async () => {
        await axiosInstance?.current?.get(`services/inspections/api/referentiel-customer-statuses`).then(response => {
            dispatch(getClientStatus(response.data));
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchClientList = async () => {
        await axiosInstance?.current?.get(`services/inspections/api/customers`, {
            params: {
                page: page - 1,
                size: size,
                //sort: 'createdAt,desc',
            },
        }).then(response => {
            dispatch(getClients(response.data));
            dispatch(setClientsTotalCount(parseInt(response.headers['x-total-count'])));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchClientStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    React.useEffect(() => {
        fetchClientList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, size]);

    const renderLabel = (labelText: number | null) => {
        switch (labelText) {
        case 1:
            return <Label color="blue">{clientStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        case 2:
            return <Label color="green">{clientStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        case 3:
            return <Label color="orange">{clientStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        case 4:
            return <Label color="red">{clientStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        default:
            return <Label color="orange">Indéfinie</Label>;
        }
    };

    const actions = (repo: IClient): IAction[] => [
        {
            title: <span key="action1"><UserEditIcon />&nbsp;Modifier</span>,
            onClick: () => {
                setSelectedClient(repo);
                setOpenUpdateClient(true);
            }
        },
        {
            title: <span  key="action2"><TrashAltIcon />&nbsp;Supprimer</span>,
            onClick: () => {
                setSelectedClient(repo);
                setOpenDeleteClient(true);
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
                setResetFilter(true);
                setTimeout(() => {
                    setResetFilter(false);
                }
                , 800);
            }}
            >
            Effacer tous les filtres
            </Button>
        </EmptyStatePrimary>
        </EmptyState>
    );

    return (
        <React.Fragment>
            <ClientsFilter 
                clients={clients} 
                filterData={(data: IClient[]) => setFiltredData(data)}
                page={page}
                handleSetPage={(page: number) => setPage(page)}
                size={size}
                handleSetSize={(size: number) => setSize(size)}
                resetFilter={resetFilter}
            />
            <TableComposable aria-label="Selectable table">
                <Thead>
                <Tr>
                    <Th width={10}>{columnNames.id}</Th>
                    <Th width={15}>{columnNames.name}</Th>
                    <Th width={15}>{columnNames.email}</Th>
                    <Th width={15}>{columnNames.phone}</Th>
                    <Th width={20}>{columnNames.address}</Th>
                    <Th width={10} textCenter>{columnNames.status}</Th>
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
                            {repo.contact?.firstName} {repo.contact?.lastName}
                            </Td>
                            <Td dataLabel={columnNames.email} modifier="truncate">
                            {repo.contact?.email}
                            </Td>
                            <Td dataLabel={columnNames.phone} modifier="truncate">
                            {repo.contact?.phone}
                            </Td>
                            <Td dataLabel={columnNames.address} modifier="truncate">
                                {repo.contact?.address?.street},
                                {repo.contact?.address?.city},
                            </Td>
                            <Td dataLabel={columnNames.status} modifier="truncate" textCenter>
                                {renderLabel(repo.status?.id || 0)}
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
            {openCreateClient && <CreateClient isOpen={openCreateClient} close={setOpenCreateClient} />}
            {openUpdateClient && <UpdateClient isOpen={openUpdateClient} close={() => setOpenUpdateClient(false)} client={selectedClient} />}
            {openDeleteClient && <DeleteClient isOpen={openDeleteClient} close={() => setOpenDeleteClient(false)} client={selectedClient} />}
        </React.Fragment>
    );
};
