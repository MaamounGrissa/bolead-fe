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
    ressources: string[]
    adresse: string
    type: string
    status: string
    notes: string
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