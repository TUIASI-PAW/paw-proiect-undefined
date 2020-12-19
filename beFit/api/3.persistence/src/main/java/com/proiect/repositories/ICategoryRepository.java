package com.proiect.repositories;

import com.proiect.entities.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICategoryRepository extends CrudRepository<Category, String> {
    Optional<Category> findByValue(String value);
}
