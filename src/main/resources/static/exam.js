/* =========================================
   EXAM VARIABLES
   ========================================= */

let questions = [];

let currentQuestionIndex = 0;

let answers = {};


/* =========================================
   EXAM TIMER
   ========================================= */

const EXAM_DURATION =
    40 * 60 * 1000;

let timeLeft = 0;

let timerInterval = null;


/* =========================================
   CHECK EXAM ACCESS
   ========================================= */

const candidateEmail =
    localStorage.getItem(
        "candidateEmail"
    );

const examStarted =
    localStorage.getItem(
        "examStarted"
    );


if (
    !candidateEmail ||
    examStarted !== "true"
) {

    window.location.replace(
        "candidate.html"
    );

}


/* =========================================
   DISPLAY CANDIDATE NAME
   ========================================= */

document
    .getElementById("candidateName")
    .innerText =
    localStorage.getItem(
        "candidateName"
    ) || "Candidate";


/* =========================================
   FETCH QUESTIONS
   ========================================= */

fetch("/api/questions")

    .then(function(response) {

        if (!response.ok) {

            throw new Error(
                "Unable to load questions"
            );

        }

        return response.json();

    })

    .then(function(data) {

        questions = data;


        showQuestion();


        createQuestionNumbers();


        updateQuestionNumbers();


        startTimer();

    })

    .catch(function(error) {

        console.error(
            "Error loading questions:",
            error
        );


        document
            .getElementById(
                "questionContainer"
            )
            .innerHTML =
            "<h3>Unable to load questions.</h3>";

    });


/* =========================================
   SHOW QUESTION
   ========================================= */

function showQuestion() {

    if (
        questions.length === 0
    ) {

        return;

    }


    const question =
        questions[
            currentQuestionIndex
        ];


    const selectedAnswer =
        answers[
            question.id
        ] || "";


    document
        .getElementById(
            "questionContainer"
        )
        .innerHTML = `

        <div class="question-card">

            <h3>
                Question
                ${currentQuestionIndex + 1}
                of
                ${questions.length}
            </h3>

            <h2>
                ${question.question}
            </h2>


            <label class="option">

                <input
                    type="radio"
                    name="answer"
                    value="A"
                    ${
                        selectedAnswer === "A"
                        ? "checked"
                        : ""
                    }
                >

                A. ${question.optionA}

            </label>


            <label class="option">

                <input
                    type="radio"
                    name="answer"
                    value="B"
                    ${
                        selectedAnswer === "B"
                        ? "checked"
                        : ""
                    }
                >

                B. ${question.optionB}

            </label>


            <label class="option">

                <input
                    type="radio"
                    name="answer"
                    value="C"
                    ${
                        selectedAnswer === "C"
                        ? "checked"
                        : ""
                    }
                >

                C. ${question.optionC}

            </label>


            <label class="option">

                <input
                    type="radio"
                    name="answer"
                    value="D"
                    ${
                        selectedAnswer === "D"
                        ? "checked"
                        : ""
                    }
                >

                D. ${question.optionD}

            </label>

        </div>

    `;


    /* =========================================
       ANSWER CHANGE
       ========================================= */

    document
        .querySelectorAll(
            'input[name="answer"]'
        )
        .forEach(function(option) {

            option.addEventListener(
                "change",
                function() {

                    answers[
                        question.id
                    ] =
                        this.value;


                    updateQuestionNumbers();

                }
            );

        });


    /* =========================================
       PREVIOUS BUTTON
       ========================================= */

    document
        .getElementById(
            "previousButton"
        )
        .disabled =
        currentQuestionIndex === 0;


    /* =========================================
       NEXT BUTTON
       ========================================= */

    document
        .getElementById(
            "nextButton"
        )
        .disabled =
        currentQuestionIndex ===
        questions.length - 1;

}


/* =========================================
   PREVIOUS QUESTION
   ========================================= */

document
    .getElementById(
        "previousButton"
    )
    .addEventListener(
        "click",
        function() {

            if (
                currentQuestionIndex > 0
            ) {

                currentQuestionIndex--;

                showQuestion();

            }

        }
    );


/* =========================================
   NEXT QUESTION
   ========================================= */

document
    .getElementById(
        "nextButton"
    )
    .addEventListener(
        "click",
        function() {

            if (
                currentQuestionIndex <
                questions.length - 1
            ) {

                currentQuestionIndex++;

                showQuestion();

            }

        }
    );


/* =========================================
   QUESTION NUMBER BUTTONS
   ========================================= */

function createQuestionNumbers() {

    const container =
        document.getElementById(
            "questionNumbers"
        );


    container.innerHTML = "";


    questions.forEach(
        function(question, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.innerText =
                question.id;


            button.classList.add(
                "question-number"
            );


            button.type =
                "button";


            button.onclick =
                function() {

                    currentQuestionIndex =
                        index;


                    showQuestion();

                };


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================
   UPDATE ANSWER STATUS
   ========================================= */

function updateQuestionNumbers() {

    const buttons =
        document.querySelectorAll(
            ".question-number"
        );


    buttons.forEach(
        function(button, index) {

            const questionId =
                questions[index].id;


            button.classList.remove(
                "answered"
            );


            if (
                answers[questionId]
            ) {

                button.classList.add(
                    "answered"
                );

            }

        }
    );

}


/* =========================================
   CALCULATE REMAINING TIME
   ========================================= */

function calculateRemainingTime() {

    const startTime =
        parseInt(
            localStorage.getItem(
                "examStartTime"
            )
        );


    if (
        !startTime
    ) {

        return 0;

    }


    const currentTime =
        Date.now();


    const elapsedTime =
        currentTime - startTime;


    const remainingTime =
        EXAM_DURATION -
        elapsedTime;


    return Math.max(
        0,
        Math.floor(
            remainingTime / 1000
        )
    );

}


/* =========================================
   UPDATE TIMER DISPLAY
   ========================================= */

function updateTimer() {

    const minutes =
        Math.floor(
            timeLeft / 60
        );


    const seconds =
        timeLeft % 60;


    document
        .getElementById(
            "timer"
        )
        .innerText =

        String(minutes)
            .padStart(2, "0")

        +

        ":"

        +

        String(seconds)
            .padStart(2, "0");

}


/* =========================================
   START TIMER
   ========================================= */

function startTimer() {

    timeLeft =
        calculateRemainingTime();


    updateTimer();


    /*
     * If timer has already expired
     * because of page refresh, submit.
     */

    if (
        timeLeft <= 0
    ) {

        submitExam();

        return;

    }


    timerInterval =
        setInterval(
            function() {

                timeLeft--;

                updateTimer();


                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );


                    timerInterval =
                        null;


                    alert(
                        "Time is over. Your examination will now be submitted."
                    );


                    submitExam();

                }

            },
            1000
        );

}


/* =========================================
   SUBMIT BUTTON
   ========================================= */

document
    .getElementById(
        "submitExam"
    )
    .addEventListener(
        "click",
        function() {

            const confirmSubmit =
                confirm(
                    "Are you sure you want to submit the examination?"
                );


            if (
                confirmSubmit
            ) {

                submitExam();

            }

        }
    );


/* =========================================
   CAMERA
   ========================================= */

navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: false
    })

    .then(function(stream) {

        document
            .getElementById(
                "examCamera"
            )
            .srcObject =
            stream;

    })

    .catch(function(error) {

        console.error(
            "Camera error:",
            error
        );


        

    });


/* =========================================
   SUBMIT EXAMINATION
   ========================================= */

async function submitExam() {

    /*
     * Prevent duplicate submission
     */

    if (
        window.examSubmitting === true
    ) {

        return;

    }


    window.examSubmitting =
        true;


    /* =========================================
       STOP TIMER
       ========================================= */

    if (
        timerInterval
    ) {

        clearInterval(
            timerInterval
        );


        timerInterval =
            null;

    }


    /* =========================================
       STOP CAMERA
       ========================================= */

    const camera =
        document.getElementById(
            "examCamera"
        );


    if (
        camera &&
        camera.srcObject
    ) {

        camera.srcObject
            .getTracks()
            .forEach(
                function(track) {

                    track.stop();

                }
            );


        camera.srcObject =
            null;

    }


    /* =========================================
       GET CANDIDATE DETAILS
       ========================================= */

    const candidateName =
        localStorage.getItem(
            "candidateName"
        );


    const candidateEmail =
        localStorage.getItem(
            "candidateEmail"
        );


    /* =========================================
       PREPARE SUBMISSION
       ========================================= */

    const submitData = {

        candidateName:
            candidateName,

        candidateEmail:
            candidateEmail,

        answers:
            answers

    };


    /* =========================================
       SEND TO BACKEND
       ========================================= */

    try {

        const response =
            await fetch(
                "/api/submit",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            submitData
                        )
                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Failed to submit examination"
            );

        }


        const result =
            await response.json();


        console.log(
            "Result received:",
            result
        );


        /* =========================================
           SAVE RESULT
           ========================================= */

        localStorage.setItem(
            "examResult",
            JSON.stringify(result)
        );


        /* =========================================
           REMOVE ACTIVE EXAM DATA
           ========================================= */

        localStorage.removeItem(
            "examStarted"
        );


        localStorage.removeItem(
            "examStartTime"
        );


        localStorage.removeItem(
            "permissionsCompleted"
        );


        /* =========================================
           GO TO RESULT PAGE
           ========================================= */

        window.location.replace(
            "result.html"
        );

    }

    catch (error) {

        console.error(
            "Submission error:",
            error
        );


        /*
         * Allow another submission attempt
         * if server request failed.
         */

        window.examSubmitting =
            false;


        alert(
            "There was an error submitting the examination. Please try again."
        );

    }

}