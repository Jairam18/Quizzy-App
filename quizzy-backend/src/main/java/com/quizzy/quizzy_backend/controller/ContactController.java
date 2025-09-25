package com.quizzy.quizzy_backend.controller;

import com.quizzy.quizzy_backend.entity.ContactUs;        // updated package
import com.quizzy.quizzy_backend.service.ContactService;  // updated package
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")  // allows requests from React frontend
public class ContactController {

    @Autowired
    private ContactService contactService;

    // Submit contact form
    @PostMapping("/submit")
    public ResponseEntity<?> sendMessage(@RequestBody ContactUs message) {
        return ResponseEntity.ok(contactService.saveMessage(message));
    }
}
