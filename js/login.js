document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const loginUser = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            };

            fetch("https://bloodbankmanagement-backend-atwx.onrender.com/api/users/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify(loginUser)

            })
            .then(response => {

                if (!response.ok) {
                    throw new Error("Invalid email or password");
                }

                return response.json();

            })
            .then(data => {

                alert("Login successful!");

                console.log(data);

                // Save the user's role
                sessionStorage.setItem("userRole", data.role);
                sessionStorage.setItem("userName", data.name);
                sessionStorage.setItem("userEmail", data.email);

                // Go to admin dashboard if ADMIN
                if (data.role === "ADMIN") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "index.html";
                }

            })
            .catch(error => {

                console.error(error);

                alert(error.message);

            });

        });

    }

});
