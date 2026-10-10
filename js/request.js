document.addEventListener("DOMContentLoaded", function () {

    const requestForm = document.getElementById("requestForm");

    if (requestForm) {

        requestForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const bloodRequest = {

                patientName: document.getElementById("patientName").value,

                bloodGroup: document.getElementById("bloodGroup").value,

                requiredUnits: document.getElementById("requiredUnits").value,

                hospitalName: document.getElementById("hospitalName").value,

                contactNumber: document.getElementById("contactNumber").value,

                email: document.getElementById("email").value,

                requiredDate: document.getElementById("requiredDate").value,

                reason: document.getElementById("reason").value
            };


            fetch("http://localhost:8081/api/requests", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(bloodRequest)

            })

            .then(response => {

                if (!response.ok) {
                    throw new Error("Request failed");
                }

                return response.json();

            })

            .then(data => {

                alert("Blood request submitted successfully!");

                requestForm.reset();

                console.log(data);

            })

            .catch(error => {

                console.error(error);

                alert("Error submitting blood request.");

            });

        });

    }

});