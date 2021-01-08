package com.proiect.testing;

import com.proiect.services.models.abonament.AbonamentModel;

import java.sql.Date;
import java.util.Calendar;

public class TestAbonamenteProvider {
    public static AbonamentModel getAbonamentModel() {
        var c = Calendar.getInstance();
        c.set(22, 10, 10);
        var abonament = new AbonamentModel();
        abonament.setValability(30);
        abonament.setCategory("test");
        abonament.setDescription("abonament de test");
        abonament.setPrice(30);
        abonament.setTitle("abonament de test");
        abonament.setExpirationDate(new Date(c.getTimeInMillis()));
        return abonament;
    }
}
