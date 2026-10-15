document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // DONOR REGISTRATION
    // =========================

    const donorForm = document.getElementById("donorForm");

    if (donorForm) {

        donorForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const donor = {

                fullName: document.getElementById("fullName").value,
                age: document.getElementById("age").value,
                gender: document.getElementById("gender").value,
                bloodGroup: document.getElementById("bloodGroup").value,
                mobile: document.getElementById("mobile").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value,
                lastDonationDate: document.getElementById("lastDonationDate").value

            };

            fetch("https://bloodbankmanagement-backend-atwx.onrender.com/api/donors", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(donor)

            })

            .then(response => {

                if (!response.ok) {
                    throw new Error("Donor registration failed");
                }

                return response.json();

            })

            .then(data => {

                alert("Donor registered successfully!");

                donorForm.reset();

                console.log(data);

            })

            .catch(error => {

                console.error(error);

                alert("Error registering donor.");

            });

        });

    }


    // =========================
    // BLOOD AVAILABILITY
    // =========================

    const bloodAvailability =
        document.getElementById("bloodAvailability");

    if (bloodAvailability) {

        fetch("https://bloodbankmanagement-backend-atwx.onrender.com/api/inventory")

            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to load inventory");
                }

                return response.json();

            })

            .then(data => {

                bloodAvailability.innerHTML = "";

                data.forEach(item => {

                    const bloodCard =
                        document.createElement("div");

                    bloodCard.className = "blood-card";

                    bloodCard.innerHTML = `
                        <h3>${item.bloodGroup}</h3>
                        <p>${item.units} Units Available</p>
                    `;

                    bloodAvailability.appendChild(bloodCard);

                });

            })

            .catch(error => {

                console.error(error);

                bloodAvailability.innerHTML =
                    "<p>Unable to load blood availability.</p>";

            });

    }

});


// =========================
// ADMIN LOGOUT
// =========================

function logout() {

    sessionStorage.clear();

    window.location.href = "login.html";

}
