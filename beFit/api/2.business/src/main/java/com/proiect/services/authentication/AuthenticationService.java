package com.proiect.services.authentication;

import com.proiect.entities.User;
import com.proiect.exceptions.UserExceptions.UserEmailAlreadyExistsException;
import com.proiect.repositories.IUserRepository;
import com.proiect.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    public String signin(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        final var user = userRepository
                .findByEmail(username)
                .orElseThrow(()-> new UsernameNotFoundException("Requested user could not be found."));

        return jwtTokenProvider.createToken(username, user.getId(), user.getRoles());

    }

    public String signup(User user) {
        if (!userRepository.existsByEmail(user.getEmail())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return jwtTokenProvider.createToken(user.getEmail(), user.getId(), user.getRoles());
        } else {
            throw new UserEmailAlreadyExistsException("Email is already in use");
        }
    }

}
