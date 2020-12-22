package com.proiect.controllers.abonament;

import com.proiect.entities.Abonament;
import com.proiect.entities.Role;
import com.proiect.exceptions.UserOperationNotAllowedException;
import com.proiect.security.JwtTokenProvider;
import com.proiect.services.abonament.IAbonamentService;
import com.proiect.services.models.abonament.AbonamentLiteModel;
import com.proiect.services.models.abonament.AbonamentModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/abonament")
public class AbonamentController {

    @Autowired
    private final IAbonamentService abonamentService;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;
    @Autowired
    private final ModelMapper modelMapper;

    public AbonamentController(IAbonamentService abonamentService, JwtTokenProvider jwtTokenProvider, ModelMapper modelMapper) {
        this.abonamentService = abonamentService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<AbonamentLiteModel>> listAll(@RequestHeader(value = "Authorization") String Authorization) {
        var mappedAbs = new LinkedList<AbonamentLiteModel>();
        for (var abonament:abonamentService.listAll()) {
                mappedAbs.push(modelMapper.map(abonament, AbonamentLiteModel.class));
            }
        return new ResponseEntity<>(mappedAbs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Abonament> findById(@PathVariable int id) {
        return new ResponseEntity<>(abonamentService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Abonament> insert(@Validated @RequestBody AbonamentModel abonamentModel){
        return new ResponseEntity<>(abonamentService.insert(abonamentModel), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<Abonament> update(@PathVariable int id,
                                            @Validated @RequestBody AbonamentModel abonamentModel) {
        return new ResponseEntity<>(abonamentService.update(id, abonamentModel), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable int id){
        abonamentService.delete(id);
    }

}
