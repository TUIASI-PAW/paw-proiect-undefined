package com.proiect.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.proiect.services.service;

@RestController
public class Controller {
    @GetMapping("/test")
    public String test(){
        return service.doSomething() + " PRESENTATION LAYER";
    }
}
