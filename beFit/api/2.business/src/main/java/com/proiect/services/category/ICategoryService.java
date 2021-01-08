package com.proiect.services.category;

import com.proiect.entities.Category;


public interface ICategoryService {
    Iterable<Category> listAll();

    Category insert(Category category);

    void delete(String value);

    Category findByValue(String value);

    Category update(String value, Category category);
}
