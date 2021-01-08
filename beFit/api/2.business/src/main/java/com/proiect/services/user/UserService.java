package com.proiect.services.user;

import com.proiect.entities.User;
import com.proiect.exceptions.UserExceptions.UserEmailAlreadyExistsException;
import com.proiect.exceptions.UserExceptions.UserNotFoundException;
import com.proiect.repositories.IUserRepository;
import com.proiect.services.abonament.IAbonamentService;
import com.proiect.services.models.user.UserPatchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IAbonamentService abonamentService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Utilizatorul nu există."));
    }

    @Override
    public User update(int id, UserPatchModel model) {
        var user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Utilizatorul nu există."));

        if (!passwordEncoder.matches(model.getPassword(), user.getPassword()))
            throw new BadCredentialsException("Email sau parolă greşite.");

        var dbo = userRepository.findByEmail(model.getEmail());
        if (dbo.isPresent())
            if (dbo.get().getId() != id) throw new UserEmailAlreadyExistsException("Email-ul este deja în uz.");

        if (model.getFirstname() != null)
            user.setFirstname(model.getFirstname());

        if (model.getLastname() != null)
            user.setLastname(model.getLastname());

        if (model.getPhone() != null)
            user.setPhone(model.getPhone());

        if (model.getEmail() != null)
            user.setEmail(model.getEmail());

        if (model.getNewPassword() != null)
            user.setPassword(passwordEncoder.encode(model.getNewPassword()));

        return userRepository.save(user);
    }

    @Override
    public void addBalance(int id) {
        var user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Utilizatorul nu există."));
        BigDecimal newBalance = new BigDecimal(Math.random() * 50).setScale(3, RoundingMode.HALF_EVEN);
        user.setBalance(user.getBalance() + newBalance.setScale(3).doubleValue());
        var newUser = userRepository.save(user);
    }

    @Override
    public void delete(int id) {
        userRepository.delete(findById(id));
    }
}
