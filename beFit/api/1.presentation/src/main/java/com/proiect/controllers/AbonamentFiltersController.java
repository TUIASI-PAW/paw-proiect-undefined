package com.proiect.controllers;

import com.proiect.entities.Abonament;
import com.proiect.services.abonament.IAbonamentFiltersService;
import com.proiect.services.abonament.IAbonamentService;
import com.proiect.services.models.abonament.AbonamentFiltersModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/abonament")
public class AbonamentFiltersController {

    @Autowired
    private final IAbonamentFiltersService abonamentFiltersService;

    public AbonamentFiltersController(IAbonamentService abonamentService,
                                      IAbonamentFiltersService abonamentFiltersService) {
        this.abonamentFiltersService = abonamentFiltersService;
    }

    @PostMapping("/pagination")
    public ResponseEntity<List<Abonament>> getAllAbs(@RequestBody AbonamentFiltersModel abonamentFiltersModel)
    {
        List<Abonament> list = abonamentFiltersService.getAllAbs(abonamentFiltersModel);

        return new ResponseEntity<List<Abonament>>(list, new HttpHeaders(), HttpStatus.OK);
    }

}
