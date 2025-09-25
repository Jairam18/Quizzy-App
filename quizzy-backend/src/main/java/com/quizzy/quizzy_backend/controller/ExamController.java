package com.quizzy.quizzy_backend.controller;

import com.quizzy.quizzy_backend.entity.Exam;
import com.quizzy.quizzy_backend.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exams")
// Allow multiple origins for dev and Docker frontend
@CrossOrigin(origins = {
        "http://localhost:5173", // React dev server
        "http://localhost",      // Docker frontend mapped to port 80
        "http://localhost:3000"  // Docker frontend mapped to port 3000
})
public class ExamController {

    @Autowired
    private ExamRepository examRepository;

    // Create new exam
    @PostMapping
    public Exam createExam(@RequestBody Exam exam) {
        return examRepository.save(exam);
    }

    // Fetch only incomplete exams
    @GetMapping
    public List<Exam> getAllExams() {
        return examRepository.findAll().stream()
                .filter(exam -> !exam.isCompleted())
                .collect(Collectors.toList());
    }

    // Fetch exam by ID
    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examRepository.findById(id).orElse(null);
    }

    // Mark exam as completed
    @PutMapping("/complete/{id}")
    public Exam markExamCompleted(@PathVariable Long id) {
        Exam exam = examRepository.findById(id).orElse(null);
        if (exam != null) {
            exam.setCompleted(true);
            return examRepository.save(exam);
        }
        return null;
    }
}
