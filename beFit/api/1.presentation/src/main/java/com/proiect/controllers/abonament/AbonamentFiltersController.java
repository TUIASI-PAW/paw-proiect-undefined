package com.proiect.controllers.abonament;

import com.proiect.services.abonament.IAbonamentFiltersService;
import com.proiect.services.models.abonament.AbonamentFiltersModel;
import com.proiect.services.models.pagination.PaginationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/abonament/filters")
public class AbonamentFiltersController {

    @Autowired
    private final IAbonamentFiltersService abonamentFiltersService;

    public AbonamentFiltersController(IAbonamentFiltersService abonamentFiltersService) {
        this.abonamentFiltersService = abonamentFiltersService;
    }

    @PostMapping("/pagination")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<PaginationModel> getAllAbs(@RequestBody AbonamentFiltersModel abonamentFiltersModel) {
        var page = abonamentFiltersService.getAllAbs(abonamentFiltersModel);
        return new ResponseEntity<PaginationModel>(page, HttpStatus.OK);
    }

}
