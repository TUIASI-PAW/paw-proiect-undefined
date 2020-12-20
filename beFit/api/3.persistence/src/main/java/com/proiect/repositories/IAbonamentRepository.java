package com.proiect.repositories;

import com.proiect.entities.Abonament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAbonamentRepository extends CrudRepository<Abonament, Integer>, PagingAndSortingRepository<Abonament, Integer> {
    Page<Abonament> findByCategory(String category, Pageable pageable);
    Long countByCategory(String category);
}
