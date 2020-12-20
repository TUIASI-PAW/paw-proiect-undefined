import {AbonamentUserListModel} from '../abonament/abonament.user.list.model';

export interface UserDetailsModel{
    firstname:string,
    lastname:string,
    email:string,
    phone:string,
    balance:number,
    abonamente: AbonamentUserListModel[]
}