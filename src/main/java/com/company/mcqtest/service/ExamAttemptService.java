package com.company.mcqtest.service;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ExamAttemptService {

    private final Set<String> submittedEmails = new HashSet<>();

    public boolean hasAlreadySubmitted(String email) {

        if (email == null) {
            return false;
        }

        return submittedEmails.contains(
                email.trim().toLowerCase()
        );
    }

    public void markAsSubmitted(String email) {

        if (email != null && !email.trim().isEmpty()) {

            submittedEmails.add(
                    email.trim().toLowerCase()
            );
        }
    }
}