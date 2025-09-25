package com.quizzy.quizzy_backend.service;

import com.quizzy.quizzy_backend.entity.ContactUs;           // updated package
import com.quizzy.quizzy_backend.repository.ContactRepository; // updated package
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    // Save contact message
    public ContactUs saveMessage(ContactUs message) {
        return contactRepository.save(message);
    }
}
