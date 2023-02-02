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
import { CreateProjet } from './CreateProjet';
import { UpdateProjet } from './UpdateProjet';
import { DeleteProjet } from './DeleteProjet';
import { ProjetsFilter } from './ProjetsFilter';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getProjets } from '@app/store/projets/projetSlice';
import { ProjectsGrid } from './ProjectsGrid';

const columnNames = {
  name: 'Nom et Prénom',
  client: 'Client',
  ressources: 'Ressources',
  type: 'Type',
  status: 'Status',
  notes: 'Notes',
};

export const ProjetsTable: React.FunctionComponent<{
    openCreateProjet: boolean, 
    setOpenCreateProjet: () => void,
    view: string,
}> = (props) => {
    const dispatch = useAppDispatch();
    const { projets } = useAppSelector(state => state.projets)
    const [filtredData, setFiltredData] = React.useState<IProjet[]>([]);
    const {view, openCreateProjet, setOpenCreateProjet} = props;
    const [openUpdateProjet, setOpenUpdateProjet] = React.useState(false);
    const [openDeleteProjet, setOpenDeleteProjet] = React.useState(false);
    const [selectedProjet, setSelectedProjet] = React.useState<IProjet>({
        id: '',
        name: '',
        client: '',
        adresse: '',
        ressources: [],
        status: 'Nouveau',
        type: 'Construction',
        notes: '',
    });

    React.useEffect(() => {
        dispatch(getProjets());
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

    const actions = (repo: IProjet): IAction[] => [
        {
            title: <span key="action1"><UserEditIcon />&nbsp;Modifier</span>,
            onClick: () => {
                setSelectedProjet(repo);
                setOpenUpdateProjet(true);
            }
        },
        {
            title: <span  key="action2"><TrashAltIcon />&nbsp;Supprimer</span>,
            onClick: () => {
                setSelectedProjet(repo);
                setOpenDeleteProjet(true);
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
            <ProjetsFilter 
                projets={projets} 
                filterData={(data: IProjet[]) => setFiltredData(data)} 
            />
            {
                view === 'TABLE' ? (
                    <TableComposable aria-label="Selectable table">
                    <Thead>
                    <Tr>
                        <Th width={20}>{columnNames.name}</Th>
                        <Th width={15}>{columnNames.client}</Th>
                        <Th width={25}>{columnNames.ressources}</Th>
                        <Th width={15}>{columnNames.type}</Th>
                        <Th width={15}>{columnNames.status}</Th>
                        <Th width={15}>{columnNames.notes}</Th>
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
                                <Td dataLabel={columnNames.client} modifier="truncate">
                                {repo.client}
                                </Td>
                                <Td dataLabel={columnNames.ressources} modifier="truncate">
                                {repo.ressources?.map((ressource, index) => {
                                    return <span key={index}>
                                        {renderLabel(ressource)}
                                    </span>
                                })}
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
                </TableComposable>) : (
                    <ProjectsGrid 
                        filtredData={filtredData} 
                        setOpenCreateProjet={setOpenCreateProjet} 
                        setOpenUpdateProjet={(data) => {setSelectedProjet(data); setOpenUpdateProjet(true)}}
                        setOpenDeleteProjet={(data) => {setSelectedProjet(data); setOpenDeleteProjet(true)}}
                    />
                )
            }
            {openCreateProjet && <CreateProjet isOpen={openCreateProjet} close={setOpenCreateProjet} />}
            {openUpdateProjet && <UpdateProjet isOpen={openUpdateProjet} close={() => setOpenUpdateProjet(false)} projet={selectedProjet} />}
            {openDeleteProjet && <DeleteProjet isOpen={openDeleteProjet} close={() => setOpenDeleteProjet(false)} projet={selectedProjet} />}
        </React.Fragment>
    );
};
