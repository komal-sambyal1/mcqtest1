document
    .getElementById("candidateForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        // GET CANDIDATE DETAILS

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();


        // CHECK EMPTY FIELDS

        if (name === "" || email === "") {

            alert(
                "Please enter your name and email."
            );

            return;
        }


        // BASIC EMAIL VALIDATION

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }


        try {

            // CHECK EMAIL WITH BACKEND

            const response = await fetch(
                "/api/check-email?email=" +
                encodeURIComponent(email)
            );


            if (!response.ok) {

                throw new Error(
                    "Unable to check email"
                );
            }


            const available =
                await response.json();


            // EMAIL ALREADY USED

            if (!available) {

                alert(
                    "This email ID has already completed the examination. You cannot take the exam again."
                );

                return;
            }


            // SAVE CANDIDATE DETAILS

            localStorage.setItem(
                "candidateName",
                name
            );

            localStorage.setItem(
                "candidateEmail",
                email
            );


            // MARK EXAM AS STARTED

            localStorage.setItem(
                "examStarted",
                "true"
            );


            // SAVE EXACT EXAM START TIME

            localStorage.setItem(
                "examStartTime",
                Date.now().toString()
            );


            // GO TO EXAM

            window.location.href =
                "exam.html";


        } catch (error) {

            console.error(
                "Email verification error:",
                error
            );

            alert(
                "Unable to verify email. Please try again."
            );

        }

    });