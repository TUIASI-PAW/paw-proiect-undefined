package com.proiect.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Calendar;
import java.util.Set;

@Entity
@Table(name = "ABONAMENTE")
public class Abonament {
    @OneToMany(mappedBy = "abonament",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonIgnore
    Set<UserAbonament> users;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Size(min = 5, max = 100, message
            = "Titlul trebuie să aibă lungimea între 5 şi 100 de caractere.")
    @NotNull(message = "Titlul nu poate fi null.")
    private String title;
    @Size(min = 3, max = 50, message
            = "Categoria trebuie să aibă lungimea între 3 şi 50 de caractere.")
    @NotNull(message = "Categoria nu poate fi nulă.")
    private String category;
    @NotNull(message = "Valabilitatea nu poate fi nulă.")
    private int valability;
    @Basic
    @NotNull(message = "Data expirării nu poate fi nulă.")
    private Date expirationDate;
    @Basic
    @NotNull(message = "")
    private Date addedDate;
    @NotNull(message = "Preţul nu poate fi nul.")
    private int price;
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
    @Size(min = 3, max = 2000, message
            = "Descrierea trebuie să aibă lungimea între 3 şi 2000 de caractere.")
    @NotNull(message = "Descrierea nu poate fi nulă.")
    private String description;
    @Column(columnDefinition = "boolean default true")
    private boolean isActive;
    @Basic
    private Date deletionDate;

    public Abonament() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getValability() {
        return valability;
    }

    public void setValability(int valability) {
        this.valability = valability;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Date getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(Date addedDate) {
        this.addedDate = new Date(Calendar.getInstance().getTime().getTime());
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<UserAbonament> getUsers() {
        return users;
    }

    public void setUsers(Set<UserAbonament> users) {
        this.users = users;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Date getDeletionDate() {
        return deletionDate;
    }

    public void setDeletionDate(Date deletionDate) {
        this.deletionDate = deletionDate;
    }
}
