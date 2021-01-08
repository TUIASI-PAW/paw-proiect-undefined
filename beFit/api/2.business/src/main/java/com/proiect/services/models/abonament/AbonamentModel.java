package com.proiect.services.models.abonament;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Basic;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Calendar;

public class AbonamentModel {

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
    @JsonIgnore
    private Date addedDate;

    @NotNull(message = "Preţul nu poate fi nul.")
    private int price;

    private byte[] image;

    @Size(min = 3, max = 2000, message
            = "Descrierea trebuie să aibă lungimea între 3 şi 2000 de caractere.")
    @NotNull(message = "Descrierea nu poate fi nulă.")
    private String description;

    private Boolean isActive = true;

    public AbonamentModel() {
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

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        if (active != null)
            isActive = active;
    }
}
