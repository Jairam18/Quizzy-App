package com.quizzy.quizzy_backend.controller;

import com.quizzy.quizzy_backend.entity.User;      // updated package
import com.quizzy.quizzy_backend.service.UserService; // updated package
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")  // allows all origins, useful for React frontend
public class AuthController {

    @Autowired
    private UserService userService;

    // Signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> loggedInUser = userService.login(user.getEmail(), user.getPassword());
        if (loggedInUser.isPresent()) {
            return ResponseEntity.ok(loggedInUser.get());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
