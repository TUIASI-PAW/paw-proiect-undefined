package com.proiect.controllers;

import com.proiect.entities.Category;
import com.proiect.services.category.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Iterable<Category>> listAll() {
        return new ResponseEntity<>(categoryService.listAll(), HttpStatus.OK);
    }

    @GetMapping("/{value}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Category> getByValue(@PathVariable String value) {
        return new ResponseEntity<>(categoryService.findByValue(value), HttpStatus.OK);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Category> insert(@RequestBody Category category) {
        return new ResponseEntity<>(categoryService.insert(category), HttpStatus.CREATED);
    }

    @PutMapping("/{value}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<Category> update(@PathVariable String value, @RequestBody Category category) {
        return new ResponseEntity<>(categoryService.update(value, category), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{value}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String value) {
        categoryService.delete(value);
    }
}
