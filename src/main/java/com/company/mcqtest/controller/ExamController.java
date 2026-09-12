package com.company.mcqtest.controller;

import com.company.mcqtest.model.Question;
import com.company.mcqtest.model.QuestionResponse;
import com.company.mcqtest.model.Result;
import com.company.mcqtest.model.SubmitRequest;
import com.company.mcqtest.service.QuestionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ExamController {

    @Autowired
    private QuestionService questionService;


    @GetMapping("/questions")
    public List<QuestionResponse> getQuestions() {

        List<Question> questions = questionService.getAllQuestions();

        List<QuestionResponse> response = new ArrayList<>();

        for (Question q : questions) {

            QuestionResponse questionResponse =
                    new QuestionResponse(
                            q.getId(),
                            q.getQuestion(),
                            q.getOptionA(),
                            q.getOptionB(),
                            q.getOptionC(),
                            q.getOptionD()
                    );

            response.add(questionResponse);
        }

        return response;
    }


    @PostMapping("/submit")
    public Result submitExam(@RequestBody SubmitRequest request) {

        List<Question> questions = questionService.getAllQuestions();

        Map<Integer, String> answers = request.getAnswers();

        int attempted = 0;
        int correctAnswers = 0;

        for (Question question : questions) {

            String selectedAnswer = answers.get(question.getId());

            if (selectedAnswer != null && !selectedAnswer.isEmpty()) {

                attempted++;

                if (selectedAnswer.equals(question.getCorrectAnswer())) {
                    correctAnswers++;
                }
            }
        }

        int totalQuestions = questions.size();
        int unanswered = totalQuestions - attempted;
        int wrongAnswers = attempted - correctAnswers;

        // No negative marking
        int score = correctAnswers;

        return new Result(
                request.getCandidateName(),
                request.getCandidateEmail(),
                totalQuestions,
                attempted,
                unanswered,
                correctAnswers,
                wrongAnswers,
                score
        );
    }
}