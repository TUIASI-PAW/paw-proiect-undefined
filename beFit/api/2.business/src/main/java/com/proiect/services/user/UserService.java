package com.proiect.services.user;

import com.proiect.entities.User;
import com.proiect.exceptions.UserExceptions.UserEmailAlreadyExistsException;
import com.proiect.exceptions.UserExceptions.UserNotFoundException;
import com.proiect.repositories.IUserRepository;
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
    private final IUserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findById(int id) {
        return userRepository.findById(id).orElseThrow(()-> new UserNotFoundException("Requested user does not exist."));
    }

    @Override
    public User update(int id, UserPatchModel model) {
        var user = userRepository.findById(id).orElseThrow(()-> new UserNotFoundException("Requested user does not exist."));

        if(!passwordEncoder.matches(model.getPassword(),user.getPassword()))
            throw new BadCredentialsException("Credentials don't match.");

        var dbo= userRepository.findByEmail(model.getEmail());
        if(dbo.isPresent())
            if(dbo.get().getId()!=id) throw new UserEmailAlreadyExistsException("This email already exists.");

        if(model.getFirstname()!=null)
            user.setFirstname(model.getFirstname());

        if(model.getLastname()!=null)
            user.setLastname(model.getLastname());

        if(model.getPhone()!=null)
            user.setPhone(model.getPhone());

        if(model.getEmail()!=null)
            user.setEmail(model.getEmail());

        if(model.getNewPassword()!=null)
            user.setPassword(passwordEncoder.encode(model.getNewPassword()));

        return userRepository.save(user);
    }
    @Override
    public void addBalance(int id){
        var user = userRepository.findById(id).orElseThrow(()-> new UserNotFoundException("Requested user does not exist."));
        BigDecimal newBalance= new BigDecimal(Math.random() * 50).setScale(3, RoundingMode.HALF_EVEN);
        user.setBalance(user.getBalance()+ newBalance.setScale(3).doubleValue());
        var newUser = userRepository.save(user);
    }
}
