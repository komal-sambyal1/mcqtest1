package com.company.mcqtest.service;

import com.company.mcqtest.model.Question;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    public List<Question> getAllQuestions() {

        List<Question> questions = new ArrayList<>();

        // =========================
        // SECTION A - QUANTITATIVE APTITUDE
        // =========================

        questions.add(new Question(
                1,
                "If 30% of a number is 90, the number is:",
                "200",
                "250",
                "300",
                "350",
                "C"
        ));

        questions.add(new Question(
                2,
                "A shirt marked at ₹2,000 is sold at a 15% discount. What is the selling price?",
                "₹1,600",
                "₹1,650",
                "₹1,700",
                "₹1,750",
                "C"
        ));

        questions.add(new Question(
                3,
                "The average of 10 numbers is 45. Their total is:",
                "400",
                "450",
                "500",
                "550",
                "B"
        ));

        questions.add(new Question(
                4,
                "A car travels at 60 km/h. How far will it travel in 45 minutes?",
                "30 km",
                "40 km",
                "45 km",
                "50 km",
                "C"
        ));

        questions.add(new Question(
                5,
                "The ratio 24:36 in its simplest form is:",
                "2:3",
                "3:4",
                "4:5",
                "5:6",
                "A"
        ));

        questions.add(new Question(
                6,
                "If the cost price is ₹500 and selling price is ₹575, the profit is:",
                "10%",
                "12%",
                "15%",
                "18%",
                "C"
        ));

        questions.add(new Question(
                7,
                "What is the next prime number after 29?",
                "30",
                "31",
                "33",
                "35",
                "B"
        ));

        questions.add(new Question(
                8,
                "A sum doubles in 5 years under simple interest. The annual interest rate is:",
                "10%",
                "15%",
                "20%",
                "25%",
                "C"
        ));

        questions.add(new Question(
                9,
                "If 3x = 45, then x + 5 =",
                "15",
                "18",
                "20",
                "25",
                "B"
        ));

        questions.add(new Question(
                10,
                "A and B can complete a work in 10 and 15 days respectively. Together they take:",
                "5 days",
                "6 days",
                "7 days",
                "8 days",
                "B"
        ));


        // =========================
        // SECTION B - REASONING
        // =========================

        questions.add(new Question(
                11,
                "Find the next number: 5, 10, 20, 40, ?",
                "60",
                "70",
                "80",
                "100",
                "C"
        ));

        questions.add(new Question(
                12,
                "If PEN is coded as QFO, how is BOOK coded?",
                "CPPL",
                "CQQM",
                "APPL",
                "CPOK",
                "A"
        ));

        questions.add(new Question(
                13,
                "Find the odd one out:",
                "Square",
                "Triangle",
                "Circle",
                "Cube",
                "D"
        ));

        questions.add(new Question(
                14,
                "A is the brother of B. B is the sister of C. What is A’s relationship with C?",
                "Father",
                "Brother",
                "Uncle",
                "Cousin",
                "B"
        ));

        questions.add(new Question(
                15,
                "Find the missing number: 4, 8, 16, 32, ?",
                "48",
                "56",
                "64",
                "72",
                "C"
        ));

        questions.add(new Question(
                16,
                "If SOUTH is written as HTUOS, how is NORTH written?",
                "HTRON",
                "HTRNO",
                "HORTN",
                "HNORT",
                "A"
        ));

        questions.add(new Question(
                17,
                "A man faces east. He turns left, then right, then right again. Which direction is he facing?",
                "North",
                "South",
                "East",
                "West",
                "B"
        ));

        questions.add(new Question(
                18,
                "Statement: Some students are athletes. All athletes are disciplined. Which conclusion follows?",
                "Some students are disciplined",
                "All students are disciplined",
                "No students are disciplined",
                "All disciplined people are athletes",
                "A"
        ));

        questions.add(new Question(
                19,
                "Find the next pair: AZ, BY, CX, DW, ?",
                "EV",
                "FU",
                "EX",
                "EW",
                "A"
        ));

        questions.add(new Question(
                20,
                "Complete the analogy: Doctor : Hospital :: Teacher : ?",
                "Court",
                "School",
                "Bank",
                "Factory",
                "B"
        ));


        // =========================
        // SECTION C - READING COMPREHENSION
        // =========================

        questions.add(new Question(
                21,
                "What is the passage mainly about?",
                "Employee salaries",
                "Effective leadership",
                "Business competition",
                "Recruitment procedures",
                "B"
        ));

        questions.add(new Question(
                22,
                "A good leader should:",
                "Only give instructions",
                "Avoid employees",
                "Communicate and listen",
                "Make all decisions alone",
                "C"
        ));

        questions.add(new Question(
                23,
                "Leaders can improve productivity by:",
                "Ignoring strengths",
                "Assigning responsibilities according to abilities",
                "Reducing teamwork",
                "Avoiding communication",
                "B"
        ));

        questions.add(new Question(
                24,
                "The passage suggests that people:",
                "Have identical strengths",
                "Have different strengths",
                "Should perform the same tasks",
                "Cannot learn new skills",
                "B"
        ));

        questions.add(new Question(
                25,
                "The word “responsibility” most nearly means:",
                "Duty",
                "Reward",
                "Complaint",
                "Vacation",
                "A"
        ));


        // =========================
        // SECTION D - VOCABULARY
        // =========================

        questions.add(new Question(
                26,
                "Synonym of DILIGENT:",
                "Lazy",
                "Hardworking",
                "Careless",
                "Weak",
                "B"
        ));

        questions.add(new Question(
                27,
                "Antonym of TRANSPARENT:",
                "Clear",
                "Visible",
                "Opaque",
                "Bright",
                "C"
        ));

        questions.add(new Question(
                28,
                "Synonym of EVALUATE:",
                "Assess",
                "Ignore",
                "Reject",
                "Delay",
                "A"
        ));

        questions.add(new Question(
                29,
                "Antonym of GENEROUS:",
                "Kind",
                "Helpful",
                "Selfish",
                "Charitable",
                "C"
        ));

        questions.add(new Question(
                30,
                "“The proposal was feasible.” Feasible means:",
                "Impossible",
                "Practical",
                "Expensive",
                "Uncertain",
                "B"
        ));

        questions.add(new Question(
                31,
                "Choose the correctly spelled word:",
                "Privilege",
                "Privelege",
                "Priviledge",
                "Privilage",
                "A"
        ));

        questions.add(new Question(
                32,
                "Synonym of ABOLISH:",
                "Establish",
                "Eliminate",
                "Continue",
                "Support",
                "B"
        ));

        questions.add(new Question(
                33,
                "Antonym of FREQUENT:",
                "Regular",
                "Common",
                "Rare",
                "Repeated",
                "C"
        ));

        questions.add(new Question(
                34,
                "“The candidate was articulate.” Articulate means:",
                "Able to express ideas clearly",
                "Unable to speak",
                "Nervous",
                "Confused",
                "A"
        ));

        questions.add(new Question(
                35,
                "Synonym of RESILIENT:",
                "Fragile",
                "Adaptable",
                "Weak",
                "Passive",
                "B"
        ));

        questions.add(new Question(
                36,
                "Choose the synonym of PRUDENT:",
                "Careless",
                "Wise",
                "Reckless",
                "Impulsive",
                "B"
        ));

        questions.add(new Question(
                37,
                "Choose the antonym of SCARCE:",
                "Rare",
                "Limited",
                "Abundant",
                "Insufficient",
                "C"
        ));

        questions.add(new Question(
                38,
                "The word “AMBIGUOUS” means:",
                "Very clear",
                "Having more than one possible meaning",
                "Extremely simple",
                "Completely accurate",
                "B"
        ));

        questions.add(new Question(
                39,
                "Choose the synonym of ENHANCE:",
                "Improve",
                "Reduce",
                "Damage",
                "Remove",
                "A"
        ));

        questions.add(new Question(
                40,
                "Choose the antonym of CONCISE:",
                "Brief",
                "Precise",
                "Lengthy",
                "Clear",
                "C"
        ));


        return questions;
    }
}