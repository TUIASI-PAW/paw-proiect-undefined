package com.proiect.services.abonament;

import com.proiect.entities.Abonament;
import com.proiect.services.models.abonament.AbonamentModel;

import java.util.List;

public interface IAbonamentService {
    List<Abonament> listAll();

    Abonament findById(int id);

    Abonament insert(AbonamentModel abonamentModel);

    Abonament update(int id, AbonamentModel abonamentModel);

    void delete(int id);

    void activate(int id);

    void deactivate(int id);

    Iterable<Abonament> findAllByIsActive(Boolean isActive);
}
