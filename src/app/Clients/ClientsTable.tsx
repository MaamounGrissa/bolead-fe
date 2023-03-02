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
import { getClients, getClientStatus } from '@app/store/clients/clientSlice';
import { axiosInstance } from '@app/network';
import { initialClient } from '@app/utils/constant';
import { useSnackbar } from 'notistack';

const columnNames = {
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
    const dispatch = useAppDispatch();
    const { clients, clientStatus } = useAppSelector(state => state.clients)
    const [filtredData, setFiltredData] = React.useState<IClient[]>([]);
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(100);
    const {openCreateClient, setOpenCreateClient} = props;
    const [openUpdateClient, setOpenUpdateClient] = React.useState(false);
    const [openDeleteClient, setOpenDeleteClient] = React.useState(false);
    const [selectedClient, setSelectedClient] = React.useState<IClient>(initialClient);

    const fetchClientStatus = async () => {
        await axiosInstance.get(`referentiel-customer-statuses`).then(response => {
            dispatch(getClientStatus(response.data));
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchClientList = async () => {
        await axiosInstance.get(`customers`, {
            params: {
                page: page,
                size: size,
                sort: 'createdAt,desc',
            },
        }).then(response => {
            dispatch(getClients(response.data));
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

    const renderLabel = (labelText: number) => {
        switch (labelText) {
        case 1:
            return <Label color="blue">{clientStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 2:
            return <Label color="green">{clientStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 3:
            return <Label color="orange">{clientStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 4:
            return <Label color="red">{clientStatus?.find(stat => stat.id === labelText)?.name}</Label>;
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
            <ClientsFilter 
                clients={clients} 
                filterData={(data: IClient[]) => setFiltredData(data)}
                page={page}
                handleSetPage={(page: number) => setPage(page)}
                size={size}
                handleSetSize={(size: number) => setSize(size)}

            />
            <TableComposable aria-label="Selectable table">
                <Thead>
                <Tr>
                    <Th width={20}>{columnNames.name}</Th>
                    <Th width={10}>{columnNames.email}</Th>
                    <Th width={10}>{columnNames.phone}</Th>
                    <Th width={15} textCenter>{columnNames.status}</Th>
                    <Th width={20}>{columnNames.address}</Th>
                </Tr>
                </Thead>
                <Tbody>
                {filtredData.length > 0 &&
                    filtredData.map(repo => {
                        const actionsRow: IAction[] | null = actions(repo);
                        return (
                        <Tr key={repo.firstName}>
                            <Td dataLabel={columnNames.name} modifier="truncate">
                            {repo.firstName} {repo.lastName}
                            </Td>
                            <Td dataLabel={columnNames.email} modifier="truncate">
                            {repo.email}
                            </Td>
                            <Td dataLabel={columnNames.phone} modifier="truncate">
                            {repo.phone}
                            </Td>
                            <Td dataLabel={columnNames.status} modifier="truncate" textCenter>
                            {renderLabel(repo.status)}
                            </Td>
                            <Td dataLabel={columnNames.address} modifier="truncate">
                            {repo.address}
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
