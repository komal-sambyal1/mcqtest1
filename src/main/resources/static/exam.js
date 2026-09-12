let questions = [];
let currentQuestionIndex = 0;
let answers = {};

document.getElementById("candidateName").innerText =
    localStorage.getItem("candidateName") || "Candidate";


// FETCH QUESTIONS FROM JAVA BACKEND

fetch("/api/questions")
    .then(response => response.json())
    .then(data => {

        questions = data;

        showQuestion();

        createQuestionNumbers();

    })
    .catch(error => {

        console.error("Error loading questions:", error);

        document.getElementById("questionContainer").innerHTML =
            "<h3>Unable to load questions.</h3>";

    });


// SHOW QUESTION

function showQuestion() {

    const question = questions[currentQuestionIndex];

    let selectedAnswer =
        answers[question.id] || "";

    document.getElementById("questionContainer").innerHTML = `

        <div class="question-card">

            <h3>
                Question ${question.id} of 40
            </h3>

            <h2>
                ${question.question}
            </h2>

            <label class="option">

                <input
                    type="radio"
                    name="answer"
                    value="A"
                    ${selectedAnswer === "A" ? "checked" : ""}
                >

                A. ${question.optionA}

            </label>


            <label class="option">

                <input
                    type="radio"
                    name="answer"
                    value="B"
                    ${selectedAnswer === "B" ? "checked" : ""}
                >

                B. ${question.optionB}

            </label>


            <label class="option">

                <input
                    type="radio"
                    name="answer"
                    value="C"
                    ${selectedAnswer === "C" ? "checked" : ""}
                >

                C. ${question.optionC}

            </label>


            <label class="option">

                <input
                    type="radio"
                    name="answer"
                    value="D"
                    ${selectedAnswer === "D" ? "checked" : ""}
                >

                D. ${question.optionD}

            </label>

        </div>
    `;


    document
        .querySelectorAll('input[name="answer"]')
        .forEach(option => {

            option.addEventListener("change", function() {

                answers[question.id] = this.value;

                updateQuestionNumbers();

            });

        });


    document.getElementById("previousButton").disabled =
        currentQuestionIndex === 0;


    document.getElementById("nextButton").disabled =
        currentQuestionIndex === questions.length - 1;
}


// PREVIOUS

document
    .getElementById("previousButton")
    .addEventListener("click", function() {

        if (currentQuestionIndex > 0) {

            currentQuestionIndex--;

            showQuestion();

        }

    });


// NEXT

document
    .getElementById("nextButton")
    .addEventListener("click", function() {

        if (currentQuestionIndex < questions.length - 1) {

            currentQuestionIndex++;

            showQuestion();

        }

    });


// QUESTION NUMBER BUTTONS

function createQuestionNumbers() {

    const container =
        document.getElementById("questionNumbers");

    container.innerHTML = "";

    questions.forEach((question, index) => {

        const button =
            document.createElement("button");

        button.innerText = question.id;

        button.classList.add("question-number");

        button.onclick = function() {

            currentQuestionIndex = index;

            showQuestion();

        };

        container.appendChild(button);

    });

}


// UPDATE ANSWER STATUS

function updateQuestionNumbers() {

    const buttons =
        document.querySelectorAll(".question-number");

    buttons.forEach((button, index) => {

        const questionId =
            questions[index].id;

        button.classList.remove("answered");

        if (answers[questionId]) {

            button.classList.add("answered");

        }

    });

}


// TIMER

let timeLeft = 40 * 60;

const timerInterval =
    setInterval(function() {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;

        document.getElementById("timer").innerText =
            String(minutes).padStart(2, "0")
            +
            ":"
            +
            String(seconds).padStart(2, "0");


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            alert("Time is over. Your examination will now be submitted.");

            submitExam();

        }

        timeLeft--;

    }, 1000);


// SUBMIT BUTTON

document
    .getElementById("submitExam")
    .addEventListener("click", function() {

        const confirmSubmit =
            confirm(
                "Are you sure you want to submit the examination?"
            );

        if (confirmSubmit) {

            submitExam();

        }

    });


// CAMERA

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
})
.then(function(stream) {

    document
        .getElementById("examCamera")
        .srcObject = stream;

})
.catch(function(error) {

    console.error("Camera error:", error);

    alert(
        "Camera access is required for this examination."
    );

});


// SUBMIT EXAM

async function submitExam() {

    clearInterval(timerInterval);

    const candidateName = localStorage.getItem("candidateName");
    const candidateEmail = localStorage.getItem("candidateEmail");

    const submitData = {
        candidateName: candidateName,
        candidateEmail: candidateEmail,
        answers: answers
    };

    try {

        const response = await fetch("/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submitData)
        });

        if (!response.ok) {
            throw new Error("Failed to submit examination");
        }

        const result = await response.json();

        console.log("Result received:", result);

        localStorage.setItem(
            "examResult",
            JSON.stringify(result)
        );

        window.location.href = "result.html";

    } catch (error) {

        console.error("Submission error:", error);

        alert(
            "There was an error submitting the examination. Please try again."
        );
    }
}