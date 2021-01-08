package com.proiect.entities;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "USERS")
public class User {

    @OneToMany(mappedBy = "user",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    Set<UserAbonament> abonamente;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Size(min = 3, max = 30, message
            = "Prenumele trebuie să aibă lungimea între 3 şi 30 de caractere")
    @NotNull(message = "Prenumele nu poate fi nul.")
    private String firstname;
    @Size(min = 3, max = 30, message
            = "Numele trebuie să aibă lungimea între 3 şi 30 de caractere")
    @NotNull(message = "Numele nu poate fi nul.")
    private String lastname;
    @Email(message = "Email-ul nu este valid.")
    @NotNull(message = "Email-ul nu poate fi nul.")
    private String email;
    @Size(min = 10, max = 10,
            message = "Numărul de telefon trebuie să conţină 10 caractere.")
    @NotNull(message = "Numărul de telefon nu poate fi nul.")
    private String phone;
    @Size(min = 5, max = 150, message
            = "Parola trebuie să aibă lungimea între 5 şi 150 de caractere.")
    @NotNull(message = "Parola nu poate fi nulă.")
    private String password;
    @Column(columnDefinition = "FLOAT DEFAULT 0.0")
    private double balance;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Role> roles;

    public User() {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
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
