import {AbonamentListModel} from '../abonament/abonament.user.list.model';

export interface UserDetailsModel{
    firstname:string,
    lastname:string,
    email:string,
    phone:string,
    password:string,
    abonamente: AbonamentListModel[]
}