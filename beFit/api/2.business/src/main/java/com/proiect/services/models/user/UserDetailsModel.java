package com.proiect.services.models.user;

import com.proiect.entities.UserAbonament;

import java.util.Set;

public class UserDetailsModel {
    Set<UserAbonament> abonamente;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private double balance;

    public UserDetailsModel() {
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<UserAbonament> getAbonamente() {
        return abonamente;
    }

    public void setAbonamente(Set<UserAbonament> abonamente) {
        this.abonamente = abonamente;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
