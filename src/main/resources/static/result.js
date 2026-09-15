/* =========================================
   PREVENT GOING BACK TO EXAM
   ========================================= */

// Replace the current history entry
// so browser Back cannot easily return
// to the examination page.

history.replaceState(
    null,
    "",
    location.href
);


// If the user presses browser Back,
// keep them on the result page.

window.addEventListener(
    "popstate",
    function() {

        history.pushState(
            null,
            "",
            location.href
        );

    }
);


/* =========================================
   GET EXAM RESULT
   ========================================= */

const resultData =
    JSON.parse(
        localStorage.getItem(
            "examResult"
        )
    );


/* =========================================
   DISPLAY RESULT
   ========================================= */

if (resultData) {

    document
        .getElementById("candidateName")
        .innerText =
        resultData.candidateName || "Candidate";


    document
        .getElementById("candidateEmail")
        .innerText =
        resultData.candidateEmail || "";


    document
        .getElementById("totalQuestions")
        .innerText =
        resultData.totalQuestions;


    document
        .getElementById("attempted")
        .innerText =
        resultData.attempted;


    document
        .getElementById("unanswered")
        .innerText =
        resultData.unanswered;


    document
        .getElementById("correctAnswers")
        .innerText =
        resultData.correctAnswers;


    document
        .getElementById("wrongAnswers")
        .innerText =
        resultData.wrongAnswers;


    document
        .getElementById("score")
        .innerText =
        resultData.score
        + " / "
        + resultData.totalQuestions;


} else {

    const resultCard =
        document.querySelector(
            ".result-card"
        );


    if (resultCard) {

        resultCard.innerHTML = `
        
            <h2>Result not available.</h2>

            <p>
                The examination result could not be found.
            </p>

        `;

    }

}