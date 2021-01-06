package com.proiect.testing.abonamente.service;

import com.proiect.controllers.Boot;
import com.proiect.repositories.IAbonamentRepository;
import com.proiect.services.abonament.IAbonamentService;
import com.proiect.services.models.abonament.AbonamentModel;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;


@SpringBootTest(classes = Boot.class)
public class AbonamentServiceTests {
    @Autowired
    private IAbonamentService abonamentService;

    @Autowired
    private IAbonamentRepository abonamentRepository;

    @Test
    public void testInsertAb() {
        var testAb = new AbonamentModel();
        testAb.setTitle("testAb");
        testAb.setCategory("aerobic");
        testAb.setValability(20);
        testAb.setExpirationDate(new Date(2021, 1, 6));
        testAb.setAddedDate(new Date(2021, 0, 6));
        testAb.setPrice(99);
        testAb.setImage(null);
        testAb.setDescription("testtest");
        testAb.setActive(true);

        var insertedAb = abonamentService.insert(testAb);
        var dao = abonamentRepository.findById(insertedAb.getId());

        Assertions.assertThat(insertedAb.getId()).isSameAs(dao.get().getId());
    }
}
