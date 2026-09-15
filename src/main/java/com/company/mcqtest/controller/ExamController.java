package com.company.mcqtest.controller;

import com.company.mcqtest.model.Question;
import com.company.mcqtest.model.QuestionResponse;
import com.company.mcqtest.model.Result;
import com.company.mcqtest.model.SubmitRequest;
import com.company.mcqtest.service.QuestionService;
import com.company.mcqtest.service.ExamAttemptService;
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
    @Autowired
    private ExamAttemptService examAttemptService;

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
    @GetMapping("/check-email")
public boolean checkEmail(@RequestParam String email) {

    return !examAttemptService.hasAlreadySubmitted(email);
}

    @PostMapping("/submit")
public Result submitExam(@RequestBody SubmitRequest request) {

    String email = request.getCandidateEmail();

    // Check whether this email has already submitted
    if (examAttemptService.hasAlreadySubmitted(email)) {

        throw new RuntimeException(
                "This email has already completed the examination."
        );
    }

    List<Question> questions =
            questionService.getAllQuestions();

    Map<Integer, String> answers =
            request.getAnswers();

    int attempted = 0;
    int correctAnswers = 0;

    for (Question question : questions) {

        String selectedAnswer =
                answers.get(question.getId());

        if (selectedAnswer != null &&
                !selectedAnswer.isEmpty()) {

            attempted++;

            if (selectedAnswer.equals(
                    question.getCorrectAnswer())) {

                correctAnswers++;
            }
        }
    }

    int totalQuestions =
            questions.size();

    int unanswered =
            totalQuestions - attempted;

    int wrongAnswers =
            attempted - correctAnswers;

    int score =
            correctAnswers;

    // Mark email as submitted
    examAttemptService.markAsSubmitted(email);

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