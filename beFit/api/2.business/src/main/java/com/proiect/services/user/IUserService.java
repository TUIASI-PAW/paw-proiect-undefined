package com.proiect.services.user;

import com.proiect.entities.User;
import com.proiect.services.models.user.UserPatchModel;

public interface IUserService {
    Iterable<User> findAll();

    User findById(int id);

    User update(int id, UserPatchModel model);

    void addBalance(int id);

    void delete(int id);
}
