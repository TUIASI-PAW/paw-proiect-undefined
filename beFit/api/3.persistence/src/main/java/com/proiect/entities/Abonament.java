package com.proiect.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Calendar;
import java.util.Set;

@Entity
@Table(name="ABONAMENTE")
public class Abonament {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Size(min = 5, max = 100, message
            = "Abonament title must contain between 5 and 100 characters.")
    @NotNull(message = "Abonament title cannot be null.")
    private String title;

    @Size(min = 3, max = 50, message
            = "Category must contain between 3 and 50 characters.")
    @NotNull(message = "Category cannot be null.")
    private String category;

    @NotNull(message = "Valability cannot be null.")
    private int valability;

    @Basic
    @NotNull(message = "Expiration date cannot be null.")
    private Date expirationDate;

    @Basic
    @NotNull(message = "Added date cannot be null.")
    private Date addedDate;

    @NotNull(message = "Price cannot be null.")
    private int price;

    private byte[] image;

    @Size(min = 3, max = 2000, message
            = "Description must contain between 3 and 2000 characters.")
    @NotNull(message = "Description cannot be null.")
    private String description;

    @OneToMany(mappedBy = "user")
    Set<UserAbonament> users;

    public Abonament() { }

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
}
