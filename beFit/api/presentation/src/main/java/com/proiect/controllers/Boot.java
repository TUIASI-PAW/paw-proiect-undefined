package com.proiect.controllers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@EntityScan(basePackages = "com.proiect")
@ComponentScan(basePackages = "com.proiect")
public class Boot {
    public static void main(String[] args){
        SpringApplication.run(Boot.class, args);
    }
}