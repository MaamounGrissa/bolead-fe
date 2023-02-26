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
import { getClients } from '@app/store/clients/clientSlice';
import axios from 'axios';

const columnNames = {
  name: 'Nom et Prénom',
  email: 'Email',
  phone: 'Téléphone',
  notes: 'Notes',
  status: 'Status',
};

export const ClientsTable: React.FunctionComponent<{
    openCreateClient: boolean, 
    setOpenCreateClient: () => void
}> = (props) => {
    const dispatch = useAppDispatch();
    const { clients } = useAppSelector(state => state.clients)
    const [filtredData, setFiltredData] = React.useState<IClient[]>([]);
    const {openCreateClient, setOpenCreateClient} = props;
    const [openUpdateClient, setOpenUpdateClient] = React.useState(false);
    const [openDeleteClient, setOpenDeleteClient] = React.useState(false);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [selectedClient, setSelectedClient] = React.useState<IClient>({
        id: '',
        name: '',
        email: '',
        phone: '',
        notes: '',
        status: '',
    });

    const fetchData = async () => {
        const data = await axios.get(`${BASE_URL}api/customer-statuses`);
        console.log(data);
    };

    React.useEffect(() => {
        fetchData();
        dispatch(getClients());
    }, [dispatch]);


    const renderLabel = (labelText: string) => {
        switch (labelText) {
        case 'Actif':
            return <Label color="green">{labelText}</Label>;
        case 'Prospet':
            return <Label color="blue">{labelText}</Label>;
        case 'Expire':
            return <Label color="orange">{labelText}</Label>;
        case 'Supprimer':
            return <Label color="red">{labelText}</Label>;
        default:
            return <Label color="orange">{labelText}</Label>;
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
            />
            <TableComposable aria-label="Selectable table">
                <Thead>
                <Tr>
                    <Th width={20}>{columnNames.name}</Th>
                    <Th width={10}>{columnNames.email}</Th>
                    <Th width={10}>{columnNames.phone}</Th>
                    <Th width={15}>{columnNames.status}</Th>
                    <Th width={20}>{columnNames.notes}</Th>
                </Tr>
                </Thead>
                <Tbody>
                {filtredData.length > 0 &&
                    filtredData.map(repo => {
                        const actionsRow: IAction[] | null = actions(repo);
                        return (
                        <Tr key={repo.name}>
                            <Td dataLabel={columnNames.name} modifier="truncate">
                            {repo.name}
                            </Td>
                            <Td dataLabel={columnNames.email} modifier="truncate">
                            {repo.email}
                            </Td>
                            <Td dataLabel={columnNames.phone} modifier="truncate">
                            {repo.phone}
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
                                isDisabled={repo.name === '4'} // Also arbitrary for the example
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
