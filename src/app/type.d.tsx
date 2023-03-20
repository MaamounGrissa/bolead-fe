/* eslint-disable @typescript-eslint/no-explicit-any */
//Ressources

// Address
interface IAddress {
    id?: number 
    street: string
    streetLine2: string
    city: string
    postcode: number
    country: string
}

// Contact
interface IContact {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone: string
    address: IAddress
}

// Clients

interface IClientStatus {
    id?: number
    status?: string
}

interface IClient {
    id?: number
    uuid?: string
    status: IClientStatus
    contact: IContact
}

interface IclientsList {
    id: number
    uuid: string
    name: string
}

interface ClientState {
    client: IClient
    clients: IClient[]
    clientStatus: IClientStatus[]
    clientsList: IclientsList[]
    totalCount: number
}

//Ressources

interface IRessourceStatus {
    id?: number,
    status?: string
}

interface IRessourceTeam {
    id?: number,
    name?: string
}

interface IRessource {
    id?: number
    uuid?: string
    contact: IContact
    team: IRessourceTeam
    status: IRessourceStatus
}

interface IRessourcesList {
    id: number,
    uuid: string,
    name: string,
}

interface RessourceState {
    ressource: IRessource
    ressources: IRessource[]
    ressourceStatus: IRessourceStatus[]
    ressourceTypes: IRessourceTeam[]
    ressourcesList: IRessourcesList[]
    totalCount: number
}

//Projets
interface IProjetStatus {
    id?: number
    status?: string
}

interface IProjetType {
    id?: number
    type?: string
}

interface IProjet {
    id?: number
    uuid?: string
    reference: string
    tags: string
    customer: IClient
    referentielProjectTypes: IProjetType[]
    status: IProjetStatus
}

interface IProjetList {
    id: number
    uuid: string
    reference: string
    address: IAddress
}

interface ProjetState {
    projet: IProjet
    projets: IProjet[]
    projetStatus: IProjetStatus[]
    projetTypes: IProjetType[]
    projetsList: IProjetList[]
    totalCount: number
}

//Planifications

// Planification status
interface IPlanificationStatus {
    id: number
    status: string
}

// Planification types
interface IPlanificationType {
    id: number
    type: string
}

// Planification
interface IPlanification {
    id?: number
    uuid?: string
    title: string
    comment: string
    startTime: string
    endTime: string
    duration: number
    origin: string
    destination: string
    travelMode: string
    travelDuration: number
    distance: string
    type: IPlanificationType
    member: IRessource
    project: IProjet
    status: IPlanificationStatus
}

interface PlanificationState {
    planification: IPlanification
    planifications: IPlanification[]
    planificationStatus: IPlanificationStatus[]
    planificationTypes: IPlanificationType[]
    totalCount: number
}

// Dashboard Statistics

interface totalTeamMembersByStatus {
    value: number;
    status: string;
}

interface totalCustomersByStatus {
    value: number;
    status: string;
}

interface totalProjectsByType {
    value: number;
    type: string;
}

interface totalProjectStatusByType {
    type: string;
    active: number;
    total: number;
    nouveau: number;
}

interface percentageByInspectionsType {
    type: string;
    total: number;
    percentage: number;
}

interface tenHighestPlannedWorkers {
    id: number;
    duration: number;
    firstName: string;
    lastName: string;
    total: number;
    travel: number;
}

interface DashboardStatistics {
    totalTeamMembersByStatus: totalTeamMembersByStatus[];
    totalCustomersByStatus: totalCustomersByStatus[];
    totalProjectsByType: totalProjectsByType[];
    totalProjectStatusByType: totalProjectStatusByType[];
    percentageByInspectionsType: percentageByInspectionsType[];
    tenHighestPlannedWorkers: tenHighestPlannedWorkers[];
    nextPlannedInspection: IPlanification;
    inspectionsOfCurrentDay: IPlanification[];
}

// Statistics

interface StatisticsState {
    dashboardStatistics: DashboardStatistics;
}

// Auth Types

interface KeycloakUser {
    name?: string;
    email?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
    roles?: string[];
    [key: string]: any;
}