package com.proiect.services.abonament;

import com.proiect.services.models.abonament.AbonamentFiltersModel;
import com.proiect.services.models.pagination.PaginationModel;

public interface IAbonamentFiltersService {
    PaginationModel getAllAbs(AbonamentFiltersModel abonamentFiltersModel);
}
