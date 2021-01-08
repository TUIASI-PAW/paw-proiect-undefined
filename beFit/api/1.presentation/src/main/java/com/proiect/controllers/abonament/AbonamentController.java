package com.proiect.controllers.abonament;

import com.proiect.entities.Abonament;
import com.proiect.security.JwtTokenProvider;
import com.proiect.services.abonament.IAbonamentService;
import com.proiect.services.models.abonament.AbonamentCreateModel;
import com.proiect.services.models.abonament.AbonamentLiteModel;
import com.proiect.services.models.abonament.AbonamentModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

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
        for (var abonament : abonamentService.listAll()) {
            mappedAbs.push(modelMapper.map(abonament, AbonamentLiteModel.class));
        }
        return new ResponseEntity<>(mappedAbs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Abonament> findById(@PathVariable int id) {
        return new ResponseEntity<>(abonamentService.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Abonament> insert(@Validated @RequestPart("model") AbonamentCreateModel model,
                                            @RequestPart(value = "image") MultipartFile image) {
        var abonament = modelMapper.map(model, AbonamentModel.class);

        try {
            abonament.setImage(image.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(abonamentService.insert(abonament), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<Abonament> update(@PathVariable int id,
                                            @Validated @RequestPart(value = "model", required = false) AbonamentCreateModel model,
                                            @RequestPart(value = "image", required = false) Optional<MultipartFile> image) {

        var abonament = modelMapper.map(model, AbonamentModel.class);

        if (!image.isEmpty()) {
            try {
                abonament.setImage(image.get().getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return new ResponseEntity<>(abonamentService.update(id, abonament), HttpStatus.ACCEPTED);
    }

    @PatchMapping("/{id}/activate")
    @ResponseStatus(HttpStatus.OK)
    public void activate(@PathVariable int id) {
        abonamentService.activate(id);
    }

    @PatchMapping("/{id}/deactivate")
    @ResponseStatus(HttpStatus.OK)
    public void deactivate(@PathVariable int id) {
        abonamentService.deactivate(id);
    }

}
