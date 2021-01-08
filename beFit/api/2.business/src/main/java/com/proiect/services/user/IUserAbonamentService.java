package com.proiect.services.user;

public interface IUserAbonamentService {
    void add(int userId, int abId);

    void remove(int userId, int abId);
}
