package com.proiect.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.sql.Date;
import java.util.Calendar;

@Entity
public class UserAbonament {
    @EmbeddedId
    @Nullable
    private UserAbonamentSK id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @Basic
    private Date expirationDate;
    private String title;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("abonamentId")
    @JoinColumn(name = "abonament_id", nullable = true)
    @Nullable
    private Abonament abonament;


    public UserAbonament() {
    }

    public UserAbonament(User user, Abonament abonament, String title) {
        this.id = new UserAbonamentSK();
        this.id.setUserId(user.getId());

        var calendar = java.util.Calendar.getInstance();
        calendar.setTime(new java.util.Date());
        calendar.add(Calendar.DATE, abonament.getValability());

        this.id.setAbonamentId(abonament.getId());
        this.user = user;
        this.abonament = abonament;
        this.title = title;
        this.expirationDate = new Date(calendar.getTimeInMillis());

    }

    public UserAbonamentSK getId() {
        return id;
    }

    public void setId(UserAbonamentSK id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Abonament getAbonament() {
        return abonament;
    }

    public void setAbonament(Abonament abonament) {
        this.abonament = abonament;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }
}
