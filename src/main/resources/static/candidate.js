document
    .getElementById("candidateForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        localStorage.setItem("candidateName", name);
        localStorage.setItem("candidateEmail", email);

        window.location.href = "exam.html";

    });