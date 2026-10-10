document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            const user = {

                name: document.getElementById("name").value,

                email: document.getElementById("email").value,

                mobile: document.getElementById("mobile").value,

                password: password
            };


            fetch("http://localhost:8081/api/users/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            })

            .then(response => {

                if (!response.ok) {
                    throw new Error("Registration failed");
                }

                return response.json();

            })

            .then(data => {

                alert("Registration successful!");

                registerForm.reset();

                console.log(data);

            })

            .catch(error => {

                console.error(error);

                alert("Error during registration.");

            });

        });

    }

});