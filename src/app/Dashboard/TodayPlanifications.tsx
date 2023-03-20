/* eslint-disable @typescript-eslint/no-explicit-any */
import { VisiteTechniqueHTML } from '@app/Planifications/VisiteTechnique';
import { useAxios } from '@app/network';
import { useAppDispatch, useAppSelector } from '@app/store';
import { getPlanificationFile, getPlanificationStatus } from '@app/store/planifications/planificationSlice';
import { Bullseye, EmptyState, EmptyStateBody, EmptyStateIcon, Label, Title } from '@patternfly/react-core';
import { CalendarAltIcon, FilePdfIcon } from '@patternfly/react-icons';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { useSnackbar } from 'notistack';
import React from 'react';
import moment from 'moment';

const columnNames = {
    id: '#',
    time: 'Heure',
    projet: 'Projet',
    ressource: 'Ressource',
    type: 'Type',
    status: 'Status',
    pdf: 'F.Technique',
};

export const TodayPlanifications: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const axiosInstance = useAxios();
    const { planificationStatus } = useAppSelector(state => state.planifications);
    const { dashboardStatistics } = useAppSelector(state => state.statistics);
    const [openPdfFile, setOpenPdfFile] = React.useState<boolean>(false);
    const [pdfFileObject, setPdfFileObject] = React.useState<any>(null);
    const [selectedPlanificationId, setSelectedPlanificationId] = React.useState<string>('');
    const { vtPdfFile } = useAppSelector(state => state.planifications);

    const fetchPlanificationStatus = async () => {
        await axiosInstance?.current?.get(`inspections/api/referentiel-inspection-statuses`).then(response => {
            dispatch(getPlanificationStatus(response.data));
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    const fetchPlanificationFile = async () => {
        await axiosInstance?.current?.get(`documents/api/inspection-documents/${selectedPlanificationId}`).then(response => {
            dispatch(getPlanificationFile(response.data));
            return;
        }).catch(error => {
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    };

    React.useEffect(() => {
        fetchPlanificationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (openPdfFile) {
            fetchPlanificationFile();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openPdfFile]);

    React.useEffect(() => {
        if (vtPdfFile) {
            setPdfFileObject(vtPdfFile);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vtPdfFile]);

    const renderLabel = (labelText: number) => {
        switch (labelText) {
        case 1:
            return <Label color="blue">{planificationStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        case 2:
            return <Label color="green">{planificationStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        case 3:
            return <Label color="orange">{planificationStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        case 4:
            return <Label color="red">{planificationStatus?.find(stat => stat.id === labelText)?.status}</Label>;
        default:
            return <Label color="orange">Indéfinie</Label>;
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
                <TableComposable variant='compact' aria-label="today-table">
                    <Thead>
                    <Tr>
                        <Th width={10}>{columnNames.id}</Th>
                        <Th width={10}>{columnNames.time}</Th>
                        <Th width={15}>{columnNames.projet}</Th>
                        <Th width={15}>{columnNames.ressource}</Th>
                        <Th width={15} textCenter>{columnNames.status}</Th>
                        <Th width={20} textCenter>{columnNames.type}</Th>
                        <Th width={10} textCenter>{columnNames.pdf}</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {dashboardStatistics?.inspectionsOfCurrentDay?.length > 0 ? (
                        dashboardStatistics?.inspectionsOfCurrentDay?.map(repo => {
                            return (
                            <Tr key={repo.id}>
                                <Td dataLabel={columnNames.id} modifier="truncate">
                                    {repo.id}
                                </Td>
                                <Td dataLabel={columnNames.time} modifier="truncate">
                                    {moment(repo.startTime).format('HH:mm')}
                                </Td>
                                <Td dataLabel={columnNames.projet} modifier="truncate">
                                    {repo.project?.reference}
                                </Td>
                                <Td dataLabel={columnNames.ressource} modifier="truncate">
                                    {repo.member?.contact?.firstName} {repo.member?.contact?.lastName}
                                </Td>
                                <Td dataLabel={columnNames.status} modifier="truncate" textCenter>
                                    {renderLabel(repo.status?.id)}
                                </Td>
                                <Td dataLabel={columnNames.type} modifier="truncate" textCenter>
                                    {repo.type?.type}
                                </Td>
                                <Td dataLabel={columnNames.pdf} modifier="truncate" textCenter>
                                    {
                                        repo.status?.id === 4 && (
                                            <FilePdfIcon 
                                                size='md'
                                                color='Tomato'
                                                onClick={() => {setSelectedPlanificationId(repo.uuid || ''); setOpenPdfFile(true);}}
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        )
                                    }
                                </Td>
                            </Tr>
                        )})
                    ) :  (
                         <Tr>
                            <Td colSpan={8}>
                                <Bullseye>{emptyState}</Bullseye>
                            </Td>
                        </Tr>
                    )}
                    </Tbody>
                    { openPdfFile && <VisiteTechniqueHTML isOpen={openPdfFile} close={() => setOpenPdfFile(false)} pdfObject={pdfFileObject} />}
                </TableComposable>
            </React.Fragment>
    );
};