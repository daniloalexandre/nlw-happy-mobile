export default interface OrphanageType {
    id : number
    name:  string
    latitude : number
    longitude: number
    about : string
    instructions : string
    opening_hours : string
    open_on_weekend: boolean
    images : {
        id:  number
        path: string
    }[]

}