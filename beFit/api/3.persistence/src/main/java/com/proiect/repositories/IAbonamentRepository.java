package com.proiect.repositories;

import com.proiect.entities.Abonament;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAbonamentRepository extends CrudRepository<Abonament, Integer> {
    List<Abonament> findByCategory(String category);
}
