package com.proiect.services.user;

import com.proiect.entities.UserAbonament;
import com.proiect.exceptions.UserExceptions.UserAlreadyOwnProductException;
import com.proiect.exceptions.UserExceptions.UserInsufficientFoundsException;
import com.proiect.repositories.IUserAbonamnetRepository;
import com.proiect.services.abonament.IAbonamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAbonamentService implements IUserAbonamentService{
    @Autowired
    private final IUserService userService;
    @Autowired
    private final IAbonamentService abonamentService;
    @Autowired
    private IUserAbonamnetRepository repository;

    public UserAbonamentService(IUserService userService, IAbonamentService abonamentService) {
        this.userService = userService;
        this.abonamentService = abonamentService;
    }

    @Override
    public void add(int userId, int abId) {
        var user = this.userService.findById(userId);
        var ab = this.abonamentService.findById(abId);
        if(repository.existsByUserIdAndAbonamentId(userId, abId)) throw new UserAlreadyOwnProductException("You already have that.");
        if(user.getBalance()>=ab.getPrice())
        {
            user.setBalance(user.getBalance()-ab.getPrice());
            var ua = new UserAbonament(user, ab, ab.getValability());
            repository.save(ua);
        }
        else throw new UserInsufficientFoundsException("Your can't activate this. Your balance is not sufficient.");

    }

    @Override
    public void remove(int userId, int abId) {
        var user = this.userService.findById(userId);
        var ab = this.abonamentService.findById(abId);

        var ua = new UserAbonament(user, ab, ab.getValability());
        repository.delete(ua);
    }
}
