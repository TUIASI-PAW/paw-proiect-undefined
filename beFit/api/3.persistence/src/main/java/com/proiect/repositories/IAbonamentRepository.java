package com.proiect.repositories;

import com.proiect.entities.Abonament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAbonamentRepository extends CrudRepository<Abonament, Integer>, PagingAndSortingRepository<Abonament, Integer> {
    Page<Abonament> findByCategoryAndIsActive(String category, Boolean isActive, Pageable pageable);

    Long countByCategoryAndIsActive(String category, Boolean isActive);

    Page<Abonament> findAllByIsActive(Boolean isActive, Pageable pageable);

    Long countByIsActive(Boolean isActive);

    Iterable<Abonament> findAllByIsActive(Boolean isActive);

    Iterable<Abonament> findAllByOrderByIsActive();

    Optional<Abonament> findByTitle(String title);
}
