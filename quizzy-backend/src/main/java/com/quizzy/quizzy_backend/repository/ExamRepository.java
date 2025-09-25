package com.quizzy.quizzy_backend.repository;

import com.quizzy.quizzy_backend.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}
