package com.proiect.services.abonament;

import com.proiect.entities.Abonament;
import com.proiect.services.models.abonament.AbonamentFiltersModel;

import java.util.List;

public interface IAbonamentFiltersService {
    List<Abonament> getAllAbs(AbonamentFiltersModel abonamentFiltersModel);
}
