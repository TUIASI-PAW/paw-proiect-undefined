package com.proiect.testing.abonament.service;

import com.proiect.controllers.Boot;
import com.proiect.entities.Abonament;
import com.proiect.repositories.IAbonamentRepository;
import com.proiect.services.abonament.IAbonamentService;
import com.proiect.services.models.abonament.AbonamentModel;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(classes = Boot.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AbonamentServiceTests {
    @Autowired
    private IAbonamentService abonamentService;

    @Autowired
    private IAbonamentRepository abonamentRepository;

    @Test
    @Order(1)
    public void listAllTest() {
        List<Abonament> abonamentListExpected = (List<Abonament>) abonamentRepository.findAllByOrderByIsActive();
        List<Abonament> serviceAbonamentList = abonamentService.listAll();

        int abonamentListExpectedCount = abonamentListExpected.size();
        int serviceAbonamentListCount = serviceAbonamentList.size();

        Assertions.assertEquals(abonamentListExpectedCount, serviceAbonamentListCount);
    }

    @Test
    @Order(2)
    public void findByIdTest() {
        var expectedAb = abonamentRepository.findById(0).get().getId();
        var serviceAb = abonamentService.findById(0).getId();

        Assertions.assertEquals(expectedAb, serviceAb);
    }

    @Test
    @Order(3)
    public void insertTest() {
        var calendar = Calendar.getInstance();
        calendar.setTime(new java.util.Date());
        var testAb = new AbonamentModel();

        testAb.setTitle("insertTestAb");
        testAb.setCategory("test");
        testAb.setValability(20);

        testAb.setAddedDate(new Date(calendar.getTimeInMillis()));
        calendar.set(2021, Calendar.FEBRUARY,20);
        testAb.setExpirationDate(new Date(calendar.getTimeInMillis()));

        testAb.setPrice(99);
        testAb.setImage(null);
        testAb.setDescription("description");
        testAb.setActive(true);

        var insertedAb = abonamentService.insert(testAb);
        var dao = abonamentRepository.findById(insertedAb.getId());

        dao.ifPresent(abonament -> assertThat(insertedAb.getId()).isSameAs(abonament.getId()));
    }

    @Test
    @Order(4)
    public void updateTest() {
        var abonamentModel = new AbonamentModel();
        var calendar = Calendar.getInstance();
        calendar.setTime(new java.util.Date());

        var newTitle = "updateTestAb";
        abonamentModel.setTitle(newTitle);
        abonamentModel.setCategory("test");
        abonamentModel.setValability(10);

        abonamentModel.setAddedDate(new Date(calendar.getTimeInMillis()));
        calendar.set(2021, Calendar.JUNE, 28);
        abonamentModel.setExpirationDate(new Date(calendar.getTimeInMillis()));

        abonamentModel.setPrice(10);
        abonamentModel.setImage(null);
        abonamentModel.setDescription("description");
        abonamentModel.setActive(false);

        var updatedAb = abonamentService.update(0, abonamentModel);
        var updatedTitle = abonamentRepository.findById(updatedAb.getId()).get().getTitle();

        Assertions.assertEquals(newTitle, updatedTitle);
    }

    @Test
    @Order(5)
    public void activateTest() {
        abonamentService.activate(0);
        boolean activated = abonamentRepository.findById(0).get().isActive();
        Assertions.assertTrue(activated);
    }

    @Test
    @Order(6)
    public void deactivateTest() {
        abonamentService.deactivate(0);
        boolean deactivated = abonamentRepository.findById(0).get().isActive();
        Assertions.assertFalse(deactivated);
    }

    @Test
    @Order(7)
    public void findAllByIsActiveTest() {
        List<Abonament> activeAbs = (List<Abonament>) abonamentRepository.findAllByIsActive(true);
        List<Abonament> serviceActiveAbs = (List<Abonament>) abonamentService.findAllByIsActive(true);

        int activeAbsCount = activeAbs.size();
        int serviceActiveAbsCount = serviceActiveAbs.size();

        Assertions.assertEquals(activeAbsCount, serviceActiveAbsCount);
    }

    @Test
    @Order(8)
    public void deleteTest() {
        abonamentService.delete(0);
        var smthing = abonamentRepository.findById(0);
        Assertions.assertTrue(smthing.isEmpty());
    }
}
