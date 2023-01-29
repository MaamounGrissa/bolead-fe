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

//Store
interface RessourceState {
    ressource: IRessource
    ressources: IRessource[]
}