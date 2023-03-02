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
import { getProjetStatus, getProjetTypes, getProjets } from '@app/store/projets/projetSlice';
import { ProjectsGrid } from './ProjectsGrid';
import { axiosInstance } from '@app/network';
import { initialProjet } from '@app/utils/constant';
import { useSnackbar } from 'notistack';

const columnNames = {
  name: 'Référence',
  client: 'Client',
  type: 'Type',
  status: 'Status',
  notes: 'Notes',
};

export const ProjetsTable: React.FunctionComponent<{
    openCreateProjet: boolean, 
    setOpenCreateProjet: () => void,
    view: string,
}> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const { projets, projetStatus, projetTypes } = useAppSelector(state => state.projets)
    const [filtredData, setFiltredData] = React.useState<IProjet[]>([]);
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(100);
    const {view, openCreateProjet, setOpenCreateProjet} = props;
    const [openUpdateProjet, setOpenUpdateProjet] = React.useState(false);
    const [openDeleteProjet, setOpenDeleteProjet] = React.useState(false);
    const [selectedProjet, setSelectedProjet] = React.useState<IProjet>(initialProjet);

    const fetchProjetStatus = async () => {
        await axiosInstance.get(`referentiel-project-statuses`).then(response => {
            dispatch(getProjetStatus(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchProjetTypes = async () => {
        await axiosInstance.get(`referentiel-project-types`).then(response => {
            dispatch(getProjetTypes(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchProjetList = async () => {
        await axiosInstance.get(`projects`, {
            params: {
                page: page,
                size: size,
                sort: 'createdAt,desc',
            },
        }).then(response => {
            dispatch(getProjets(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchProjetStatus();
        fetchProjetTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    React.useEffect(() => {
        fetchProjetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, size]);


    const renderLabel = (labelText: number) => {
        switch (labelText) {
        case 1:
            return <Label color="blue">{projetStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 2:
            return <Label color="green">{projetStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 3:
            return <Label color="orange">{projetStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        case 4:
            return <Label color="red">{projetStatus?.find(stat => stat.id === labelText)?.name}</Label>;
        default:
            return <Label color="orange">Indéfinie</Label>;
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
                page={page}
                handleSetPage={(page: number) => setPage(page)}
                size={size}
                handleSetSize={(size: number) => setSize(size)}
            />
            {
                view === 'TABLE' ? (
                    <TableComposable aria-label="Selectable table">
                    <Thead>
                    <Tr>
                        <Th width={20}>{columnNames.name}</Th>
                        <Th width={15}>{columnNames.client}</Th>
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
                                <Td dataLabel={columnNames.type} modifier="truncate">
                                    {projetTypes?.find(type => type.id === repo.type)?.name}
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
