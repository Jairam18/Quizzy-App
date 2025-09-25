package com.quizzy.quizzy_backend.repository;

import com.quizzy.quizzy_backend.entity.ContactUs;  // updated package
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactUs, Long> {
}
