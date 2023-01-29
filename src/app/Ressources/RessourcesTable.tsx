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
import { getRessources } from '@app/store/ressources/ressourceSlice';

const columnNames = {
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
    const dispatch = useAppDispatch();
    const { ressources } = useAppSelector(state => state.ressources)
    const [filtredData, setFiltredData] = React.useState<IRessource[]>([]);
    const {openCreateRessource, setOpenCreateRessource} = props;
    const [openUpdateRessource, setOpenUpdateRessource] = React.useState(false);
    const [openDeleteRessource, setOpenDeleteRessource] = React.useState(false);
    const [selectedRessource, setSelectedRessource] = React.useState<IRessource>({
        id: '',
        name: '',
        email: '',
        phone: '',
        notes: '',
        status: '',
        type: ''
    });

    React.useEffect(() => {
        dispatch(getRessources());
    }, [dispatch]);


    const renderLabel = (labelText: string) => {
        switch (labelText) {
        case 'Actif':
            return <Label color="green">{labelText}</Label>;
        case 'Inactif':
            return <Label color="orange">{labelText}</Label>;
        case 'Supprimer':
            return <Label color="red">{labelText}</Label>;
        default:
            return <Label color="orange">{labelText}</Label>;
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
            />
            <TableComposable aria-label="Selectable table">
                <Thead>
                <Tr>
                    <Th width={20}>{columnNames.name}</Th>
                    <Th width={10}>{columnNames.email}</Th>
                    <Th width={10}>{columnNames.phone}</Th>
                    <Th width={15}>{columnNames.type}</Th>
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
            {openCreateRessource && <CreateRessource isOpen={openCreateRessource} close={setOpenCreateRessource} />}
            {openUpdateRessource && <UpdateRessource isOpen={openUpdateRessource} close={() => setOpenUpdateRessource(false)} ressource={selectedRessource} />}
            {openDeleteRessource && <DeleteRessource isOpen={openDeleteRessource} close={() => setOpenDeleteRessource(false)} ressource={selectedRessource} />}
        </React.Fragment>
    );
};
