/* eslint-disable @typescript-eslint/no-explicit-any */
//Ressources
interface IRessource {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    status: number
    type: number
    notes: string
}

// Clients
interface IClient {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    status: number
    notes: string
    address: string
}

//Projets
interface IProjet {
    id: string
    name: string
    clientName: string
    clientId: string
    adresse: string
    type: number
    status: number
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

// API

interface IClientAPI {
    id: number,
    uuid: string,
    createdAt: string,
    updatedAt: string,
    isDeleted: boolean,
    deletedAt: string,
    status: {
        id: number,
        status: string
    },
    contact: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        address: {
            id: 0,
            street: string,
            streetLine2: string,
            city: string,
            postcode: number,
            country: string
        }
    }
}

/* Projet API Json
{
  "id": 0,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reference": "string",
  "tags": "string",
  "createdAt": "2023-03-01T21:44:18.635Z",
  "updatedAt": "2023-03-01T21:44:18.635Z",
  "isDeleted": true,
  "deletedAt": "2023-03-01T21:44:18.635Z",
  "status": {
    "id": 0,
    "status": "string"
  },
  "referentielProjectTypes": [
    {
      "id": 0,
      "type": "string"
    }
  ],
  "customer": {
    "id": 0,
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "createdAt": "2023-03-01T21:44:18.635Z",
    "updatedAt": "2023-03-01T21:44:18.635Z",
    "isDeleted": true,
    "deletedAt": "2023-03-01T21:44:18.635Z",
    "status": {
      "id": 0,
      "status": "string"
    },
    "contact": {
      "id": 0,
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": 0,
      "address": {
        "id": 0,
        "street": "string",
        "streetLine2": "string",
        "city": "string",
        "postcode": 0,
        "country": "string"
      }
    }
  }
}
*/

interface IProjetAPI {
    id: number,
    uuid: string,
    reference: string,
    tags: string,
    createdAt: string,
    updatedAt: string,
    isDeleted: boolean,
    deletedAt: string,
    status: {
        id: number,
        status: string
    },
    referentielProjectTypes: {
        id: number,
        type: string
    }[],
    customer: {
        id: number,
        uuid: string,
        createdAt: string,
        updatedAt: string,
        isDeleted: boolean,
        deletedAt: string,
        status: {
            id: number,
            status: string
        },
        contact: {
            id: number,
            firstName: string,
            lastName: string,
            email: string,
            phone: string,
            address: {
                id: 0,
                street: string,
                streetLine2: string,
                city: string,
                postcode: number,
                country: string
            },
        }
    }
}

//Ressource API Json
/*
{
    "id": 0,
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "createdAt": "2023-03-01T23:08:22.573Z",
    "updatedAt": "2023-03-01T23:08:22.573Z",
    "isDeleted": true,
    "deletedAt": "2023-03-01T23:08:22.573Z",
    "contact": {
      "id": 0,
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": 0,
      "address": {
        "id": 0,
        "street": "string",
        "streetLine2": "string",
        "city": "string",
        "postcode": 0,
        "country": "string"
      }
    },
    "team": {
      "id": 0,
      "name": "string"
    },
    "status": {
      "id": 0,
      "status": "string"
    }
  }
*/

interface IRessourceAPI {
    id: number,
    uuid: string,
    createdAt: string,
    updatedAt: string,
    isDeleted: boolean,
    deletedAt: string,
    contact: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        address: {
            id: 0,
            street: string,
            streetLine2: string,
            city: string,
            postcode: number,
            country: string
        }
    },
    team: {
        id: number,
        name: string
    },
    status: {
        id: number,
        status: string
    }
}

interface IRessourcesList {
    id: string,
    name: string,
    type: number,
    status: number,

}

interface IRessourceStatus {
    id: number,
    name: string
}

interface IRessourceStatusAPI {
    id: number,
    status: string
}

interface IRessourceTeam {
    id: number,
    name: string
}

interface IclientsList {
    id: string
    name: string
}

interface IClientStatus {
    id: number
    name: string
}

interface IClientStatusAPI {
    id: number
    status: string
}


interface IProjetStatusAPI {
    id: number
    status: string
}

interface IProjetStatus {
    id: number
    name: string
}

interface IProjetTypes {
    id: number
    name: string
}

interface IProjetTypesAPI {
    id: number
    type: string
}

//Store
interface RessourceState {
    ressource: IRessource
    ressources: IRessource[]
    ressourceStatus: IRessourceStatus[]
    ressourceTypes: IRessourceTeam[]
    ressourcesList: IRessourcesList[]
}
interface ClientState {
    client: IClient
    clients: IClient[]
    clientStatus: IClientStatus[]
    clientsList: IclientsList[]
}
interface ProjetState {
    projet: IProjet
    projets: IProjet[]
    projetStatus: IProjetStatus[]
    projetTypes: IProjetTypes[]
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