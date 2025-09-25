package com.quizzy.quizzy_backend.repository;

import com.quizzy.quizzy_backend.entity.User;  // updated package
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
