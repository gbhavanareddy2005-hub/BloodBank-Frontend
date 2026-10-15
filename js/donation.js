document.addEventListener("DOMContentLoaded", function () {

    const donationForm = document.getElementById("donationForm");

    donationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const donation = {

            donorName: document.getElementById("donorName").value,

            bloodGroup: document.getElementById("bloodGroup").value,

            unitsDonated: document.getElementById("unitsDonated").value,

            donationDate: document.getElementById("donationDate").value

        };

        fetch("https://bloodbankmanagement-backend-atwx.onrender.com/api/donations", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(donation)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Donation registration failed");
            }

            return response.json();

        })

        .then(data => {

            alert("Donation recorded successfully!");

            donationForm.reset();

            console.log(data);

        })

        .catch(error => {

            console.error(error);

            alert("Error recording donation.");

        });

    });

});
