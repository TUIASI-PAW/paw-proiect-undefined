package com.proiect.repositories;

import com.proiect.entities.UserAbonament;
import com.proiect.entities.UserAbonamentSK;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserAbonamnetRepository extends CrudRepository<UserAbonament, UserAbonamentSK> {
    boolean existsByUserIdAndAbonamentId(int userId, int abonamentId);
}
