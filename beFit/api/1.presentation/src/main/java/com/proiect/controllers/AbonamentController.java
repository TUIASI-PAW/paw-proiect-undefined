package com.proiect.controllers;

import com.proiect.entities.Abonament;
import com.proiect.services.abonament.IAbonamentService;
import com.proiect.services.models.abonament.AbonamentModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/abonament")
public class AbonamentController {

    private final IAbonamentService abonamentService;

    public AbonamentController(IAbonamentService abonamentService) {
        this.abonamentService = abonamentService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Abonament>> listAll() {
        return new ResponseEntity<>(abonamentService.listAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Abonament> findById(@PathVariable int id) {
        return new ResponseEntity<>(abonamentService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/findByCategory/{category}")
    public ResponseEntity<List<Abonament>> findByCategory(@PathVariable String category) {
        return new ResponseEntity<>(abonamentService.findByCategory(category), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Abonament> insert(@Validated @RequestBody AbonamentModel abonamentModel){
        return new ResponseEntity<>(abonamentService.insert(abonamentModel), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Abonament> update(@PathVariable int id, @Validated @RequestBody
            AbonamentModel abonamentModel) {
        return new ResponseEntity<>(abonamentService.update(id, abonamentModel), HttpStatus.OK);
    }

    @DeleteMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public void delete(int id) {
        abonamentService.delete(id);
    }

}
