const resultData = JSON.parse(localStorage.getItem("examResult"));

if (resultData) {

    document.getElementById("candidateName").innerText =
        resultData.candidateName;

    document.getElementById("candidateEmail").innerText =
        resultData.candidateEmail;

    document.getElementById("totalQuestions").innerText =
        resultData.totalQuestions;

    document.getElementById("attempted").innerText =
        resultData.attempted;

    document.getElementById("unanswered").innerText =
        resultData.unanswered;

    document.getElementById("correctAnswers").innerText =
        resultData.correctAnswers;

    document.getElementById("wrongAnswers").innerText =
        resultData.wrongAnswers;

    document.getElementById("score").innerText =
        resultData.score + " / " + resultData.totalQuestions;

} else {

    document.querySelector(".result-card").innerHTML =
        "<h2>Result not available.</h2>";
}