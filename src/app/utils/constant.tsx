
export const mapCenter = { lat: 48.7215803, lng: 2.2839578 }

export const defaultAdress = "15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France";

// Initial address state
export const initialAddress: IAddress = {
    street: '',
    streetLine2: '',
    city: 'Paris',
    postcode: 75000,
    country: 'France',
}

// Initial contact state
export const initialContact: IContact = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: initialAddress,
}

export const initialClientStatus: IClientStatus = {
    id: 1,
    status: 'Prospet',
}

// Initial client state
export const initialClient: IClient = {
    contact: initialContact,
    status: initialClientStatus,
}

// Initial ressource status state
export const initialRessourceStatus: IRessourceStatus = {
    id: 1,
    status: 'Disponible',
}

// Initial ressource team state
export const initialRessourceTeam: IRessourceTeam = {
    id: 1,
    name: 'Technicien',
}

// Initial ressource state
export const initialRessource: IRessource = {
    contact: initialContact,
    team: initialRessourceTeam,
    status: initialRessourceStatus,
}

//Initial projet status state
export const initialProjetStatus: IProjetStatus = {
    id: 1,
    status: 'Nouveau',
}

// Initial projet type state
export const initialProjetType: IProjetType[] = [{
    id: 1,
}]

// Initial projet state
export const initialProjet: IProjet = {
    status: initialProjetStatus,
    referentielProjectTypes: initialProjetType,
    reference: '',
    tags: '',
    customer: initialClient,
}

// Initial planification status state
export const initialPlanificationStatus: IPlanificationStatus = {
    id: 1,
    status: 'Planifier',
}

// Initial planification type state
export const initialPlanificationType: IPlanificationType = {
    id: 2,
    type: 'Visite technique',
}
    
// Initial planification state
export const initialPlanification: IPlanification = {
    title: '',
    comment: '',
    startTime: new Date().toDateString(),
    endTime: '',
    duration: 30,
    origin: defaultAdress,
    destination: '',
    travelMode: 'CAR',
    travelDuration: 0,
    distance: '',
    type: initialPlanificationType,
    member: initialRessource,
    project: initialProjet,
    status: initialPlanificationStatus,
}
