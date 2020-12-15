package com.proiect.entities;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.util.List;
import java.util.Set;


@Entity
@Table(name="USERS")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Size(min = 3, max = 30, message
            = "First name must be between 3 and 30 characters.")
    @NotNull(message = "First name cannot be null.")
    private String firstname;

    @Size(min = 3, max = 30, message
            = "Last name must be between 3 and 30 characters.")
    @NotNull(message = "Last name cannot be null.")
    private String lastname;

    @Email(message = "Email should be valid.")
    @NotNull(message = "Email cannot be null.")
    private String email;

    @Size(min = 10, max = 10,
            message = "Phone number must have 10 characters.")
    @NotNull(message = "Phone number cannot be null.")
    private String phone;

    @Size(min = 3, max = 150, message
            = "Password must be between 3 and 50 characters.")
    @NotNull(message = "Password cannot be null.")
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Role> roles;

    @OneToMany(mappedBy = "user")
    Set<UserAbonament> abonamente;

    public User() { }

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
}
