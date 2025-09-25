package com.quizzy.quizzy_backend.service;

import com.quizzy.quizzy_backend.entity.User;        // updated package
import com.quizzy.quizzy_backend.repository.UserRepository;  // updated package
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register new user
    public User register(User user) {
        return userRepository.save(user);
    }

    // Login method
    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }
}
