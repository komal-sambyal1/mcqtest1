package com.company.mcqtest.model;

public class Result {

    private String candidateName;
    private String candidateEmail;
    private int totalQuestions;
    private int attempted;
    private int unanswered;
    private int correctAnswers;
    private int wrongAnswers;
    private int score;

    public Result() {
    }

    public Result(String candidateName, String candidateEmail,
                  int totalQuestions, int attempted, int unanswered,
                  int correctAnswers, int wrongAnswers, int score) {

        this.candidateName = candidateName;
        this.candidateEmail = candidateEmail;
        this.totalQuestions = totalQuestions;
        this.attempted = attempted;
        this.unanswered = unanswered;
        this.correctAnswers = correctAnswers;
        this.wrongAnswers = wrongAnswers;
        this.score = score;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getCandidateEmail() {
        return candidateEmail;
    }

    public void setCandidateEmail(String candidateEmail) {
        this.candidateEmail = candidateEmail;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getAttempted() {
        return attempted;
    }

    public void setAttempted(int attempted) {
        this.attempted = attempted;
    }

    public int getUnanswered() {
        return unanswered;
    }

    public void setUnanswered(int unanswered) {
        this.unanswered = unanswered;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getWrongAnswers() {
        return wrongAnswers;
    }

    public void setWrongAnswers(int wrongAnswers) {
        this.wrongAnswers = wrongAnswers;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}