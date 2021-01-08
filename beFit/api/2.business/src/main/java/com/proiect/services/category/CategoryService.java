package com.proiect.services.category;

import com.proiect.entities.Category;
import com.proiect.exceptions.CategoryExceptions.CategoryAlreadyExistsException;
import com.proiect.exceptions.CategoryExceptions.CategoryNotExistsException;
import com.proiect.repositories.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private final ICategoryRepository categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Iterable<Category> listAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category insert(Category category) {

        var dbo = categoryRepository.findByValue(category.getValue());
        if (dbo.isPresent()) throw new CategoryAlreadyExistsException("Categoria introdusă deja există.");

        return categoryRepository.save(category);
    }

    @Override
    public void delete(String value) {
        var category = categoryRepository.findByValue(value).orElseThrow(() -> new CategoryNotExistsException("Categoria cerută nu există."));
        categoryRepository.delete(category);
    }

    @Override
    public Category findByValue(String value) {
        return categoryRepository.findByValue(value).orElseThrow(() -> new CategoryNotExistsException("Categoria cerută nu există."));
    }

    @Override
    public Category update(String value, Category category) {
        delete(value);
        return insert(category);
    }
}
