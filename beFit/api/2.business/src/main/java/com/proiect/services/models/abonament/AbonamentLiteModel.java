package com.proiect.services.models.abonament;

public class AbonamentLiteModel {
    private int id;
    private String title;
    private Boolean isActive;

    public AbonamentLiteModel() {
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

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
