package com.proiect.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class UserAbonament {
    @EmbeddedId
    private UserAbonamentSK id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @MapsId("abonamentId")
    @JoinColumn(name = "abonament_id")
    private Abonament abonament;

    private int valability;

    public UserAbonament() { }

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

    public int getValability() {
        return valability;
    }

    public void setValability(int valability) {
        this.valability = valability;
    }
}
