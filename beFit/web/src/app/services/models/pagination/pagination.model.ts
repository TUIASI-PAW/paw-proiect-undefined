import { AbonamentListModel } from './../abonament/abonament.list.model';

export interface PaginationModel {
    abonamentList: AbonamentListModel[],
    dbAbsCount :number
}