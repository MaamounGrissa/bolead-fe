
export const mapCenter = { lat: 48.7215803, lng: 2.2839578 }

export const defaultAdress = "15 Rue du Buisson aux Fraises batiment b3, 91300 Massy, France";

export const initialPlanification: IPlanification = {
    id: '',
    title: '',
    startDate: '',
    endDate: '',
    duration: '20',
    type: 2,
    status: 1,
    ressource: '',
    projet: '',
    notes: '',
    origin: defaultAdress,
    destination: '',
    distance: '',
    trajetDuration: '0',
    trajetDurationText: '',
    travelMode: 'CAR',
}

export const initialClient: IClient = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 1,
    notes: '',
    address: '',
}

export const initialProjet: IProjet = {
    id: '',
    name: '',
    clientName: '',
    clientId: '',
    adresse: '',
    type: 1,
    status: 1,
    notes: '',
}

export const initialRessource: IRessource = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 1,
    type: 1,
    notes: '',
}
