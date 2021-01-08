package com.proiect.entities;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserAbonamentSK implements Serializable {
    @Column(name = "user_id")
    int userId;

    @Column(name = "abonament_id")
    int abonamentId;

    public UserAbonamentSK() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAbonamentId() {
        return abonamentId;
    }

    public void setAbonamentId(int abonamentId) {
        this.abonamentId = abonamentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserAbonamentSK)) return false;
        UserAbonamentSK that = (UserAbonamentSK) o;
        return getUserId() == that.getUserId() &&
                getAbonamentId() == that.getAbonamentId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserId(), getAbonamentId());
    }

}
