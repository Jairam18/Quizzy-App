package com.quizzy.quizzy_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String examTitle;
    private String openDate;
    private String openTime;
    private String timer; // e.g. "10:00"
    private boolean completed = false; // NEW

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Question> questions;

    // Getters and Setters
    public Long getId() { return id; }
    public String getExamTitle() { return examTitle; }
    public void setExamTitle(String examTitle) { this.examTitle = examTitle; }
    public String getOpenDate() { return openDate; }
    public void setOpenDate(String openDate) { this.openDate = openDate; }
    public String getOpenTime() { return openTime; }
    public void setOpenTime(String openTime) { this.openTime = openTime; }
    public String getTimer() { return timer; }
    public void setTimer(String timer) { this.timer = timer; }
    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) {
        this.questions = questions;
        if (questions != null) {
            questions.forEach(q -> q.setExam(this));
        }
    }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}
