/* eslint-disable @typescript-eslint/no-explicit-any */
//Ressources
interface IRessource {
    id: string
    name: string
    email: string
    phone: string
    status: string
    type: string
    notes: string
}

// Clients
interface IClient {
    id: string
    name: string
    email: string
    phone: string
    status: string
    notes: string
}

//Projets
interface IProjet {
    id: string
    name: string
    client: string
    ressource: string
    adresse: string
    type: string
    status: string
    notes: string
}

//Planifications
interface IPlanification {
    id: string
    title: string
    startDate: string
    endDate: string
    duration: number
    type: string
    ressource: string
    projet: string
    status: string
    notes: string
    origin: string
    destination: string
    distance: string
    trajetDuration: number
    trajetDurationText: string
}

//Store
interface RessourceState {
    ressource: IRessource
    ressources: IRessource[]
}
interface ClientState {
    client: IClient
    clients: IClient[]
}
interface ProjetState {
    projet: IProjet
    projets: IProjet[]
}
interface PlanificationState {
    planification: IPlanification
    planifications: IPlanification[]
}

interface KeycloakUser {
    name?: string;
    email?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
    roles?: string[];
    [key: string]: any;
}