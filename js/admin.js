document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // DONOR MANAGEMENT
    // =========================

    fetch("http://localhost:8081/api/donors", {
        credentials: "include"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load donors");
            }
            return response.json();
        })
        .then(data => {

            document.getElementById("donorCount").textContent =
                data.length + " Donors";

            let html = `
                <table border="1" width="100%" cellpadding="10">
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Blood Group</th>
                        <th>Mobile</th>
                        <th>Email</th>
                    </tr>
            `;

            data.forEach(donor => {

                html += `
                    <tr>
                        <td>${donor.fullName || ""}</td>
                        <td>${donor.age || ""}</td>
                        <td>${donor.gender || ""}</td>
                        <td>${donor.bloodGroup || ""}</td>
                        <td>${donor.mobile || ""}</td>
                        <td>${donor.email || ""}</td>
                    </tr>
                `;

            });

            html += "</table>";

            document.getElementById("donorTable").innerHTML = html;

        })
        .catch(error => {

            console.error(error);

            document.getElementById("donorTable").innerHTML =
                "<p>Unable to load donor details.</p>";

        });


    // =========================
    // BLOOD INVENTORY
    // =========================

    fetch("http://localhost:8081/api/inventory", {
        credentials: "include"
    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load inventory");
            }

            return response.json();

        })
        .then(data => {

            document.getElementById("inventoryCount").textContent =
                data.length + " Blood Groups";

            let html = `
                <table border="1" width="100%" cellpadding="10">
                    <tr>
                        <th>Blood Group</th>
                        <th>Available Units</th>
                    </tr>
            `;

            data.forEach(item => {

                html += `
                    <tr>
                        <td>${item.bloodGroup}</td>
                        <td>${item.units}</td>
                    </tr>
                `;

            });

            html += "</table>";

            document.getElementById("inventoryTable").innerHTML = html;

        })
        .catch(error => {

            console.error(error);

            document.getElementById("inventoryTable").innerHTML =
                "<p>Unable to load blood inventory.</p>";

        });


    // =========================
    // ADD BLOOD INVENTORY
    // =========================

    const inventoryForm =
        document.getElementById("inventoryForm");

    if (inventoryForm) {

        inventoryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const inventory = {

                bloodGroup:
                    document.getElementById(
                        "inventoryBloodGroup"
                    ).value,

                units:
                    Number(
                        document.getElementById(
                            "inventoryUnits"
                        ).value
                    )

            };

            fetch("http://localhost:8081/api/inventory", {

                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(inventory)

            })
                .then(response => {

                    if (!response.ok) {
                        throw new Error(
                            "Unable to add inventory"
                        );
                    }

                    return response.json();

                })
                .then(data => {

                    alert(
                        "Blood inventory added successfully!"
                    );

                    inventoryForm.reset();

                    location.reload();

                })
                .catch(error => {

                    console.error(error);

                    alert(
                        "Unable to add blood inventory."
                    );

                });

        });

    }


    // =========================
    // BLOOD REQUEST MANAGEMENT
    // =========================

    fetch("http://localhost:8081/api/requests", {
        credentials: "include"
    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load requests");
            }

            return response.json();

        })
        .then(data => {

            document.getElementById("requestCount").textContent =
                data.length + " Requests";

            let html = `
                <table border="1" width="100%" cellpadding="10">
                    <tr>
                        <th>Patient Name</th>
                        <th>Blood Group</th>
                        <th>Required Units</th>
                        <th>Hospital</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Required Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
            `;

            data.forEach(request => {

                const status =
                    request.status &&
                    request.status.trim() !== ""
                        ? request.status.trim()
                        : "Pending";

                let actionButton = "";

                if (
                    status.toLowerCase() === "pending"
                ) {

                    actionButton = `
                        <button
                            onclick="approveRequest(${request.id})">
                            Approve
                        </button>
                    `;

                } else {

                    actionButton = "Completed";

                }

                html += `
                    <tr>
                        <td>${request.patientName || ""}</td>
                        <td>${request.bloodGroup || ""}</td>
                        <td>${request.requiredUnits || ""}</td>
                        <td>${request.hospitalName || ""}</td>
                        <td>${request.contactNumber || ""}</td>
                        <td>${request.email || ""}</td>
                        <td>${request.requiredDate || ""}</td>
                        <td>${status}</td>
                        <td>${actionButton}</td>
                    </tr>
                `;

            });

            html += "</table>";

            document.getElementById("requestTable").innerHTML =
                html;

        })
        .catch(error => {

            console.error(error);

            document.getElementById("requestTable").innerHTML =
                "<p>Unable to load blood requests.</p>";

        });


    // =========================
    // REGISTERED USERS
    // =========================

    fetch("http://localhost:8081/api/users", {
        credentials: "include"
    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load users");
            }

            return response.json();

        })
        .then(data => {

            document.getElementById("userCount").textContent =
                data.length + " Users";

        })
        .catch(error => {

            console.error(error);

            document.getElementById("userCount").textContent =
                "Unable to load";

        });


    // =========================
    // DONATION MANAGEMENT
    // =========================

    fetch("http://localhost:8081/api/donations", {
        credentials: "include"
    })
        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Unable to load donations"
                );
            }

            return response.json();

        })
        .then(data => {

            const donationTable =
                document.getElementById(
                    "donationTable"
                );

            if (data.length === 0) {

                donationTable.innerHTML =
                    "<p>No donation records found.</p>";

                return;

            }

            let html = `
                <table border="1" width="100%" cellpadding="10">
                    <tr>
                        <th>Donor Name</th>
                        <th>Blood Group</th>
                        <th>Units Donated</th>
                        <th>Donation Date</th>
                    </tr>
            `;

            data.forEach(donation => {

                html += `
                    <tr>
                        <td>${donation.donorName || ""}</td>
                        <td>${donation.bloodGroup || ""}</td>
                        <td>${donation.unitsDonated || ""}</td>
                        <td>${donation.donationDate || ""}</td>
                    </tr>
                `;

            });

            html += "</table>";

            donationTable.innerHTML = html;

        })
        .catch(error => {

            console.error(error);

            document.getElementById(
                "donationTable"
            ).innerHTML =
                "<p>Unable to load donation records.</p>";

        });

});


// =========================
// APPROVE BLOOD REQUEST
// =========================

function approveRequest(id) {

    if (
        !confirm(
            "Are you sure you want to approve this request?"
        )
    ) {
        return;
    }

    fetch(
        `http://localhost:8081/api/requests/${id}/approve`,
        {
            method: "PUT",
            credentials: "include"
        }
    )
        .then(response => {

            if (!response.ok) {

                return response.text()
                    .then(message => {

                        throw new Error(message);

                    });

            }

            return response.json();

        })
        .then(data => {

            alert(
                "Blood request approved successfully!"
            );

            location.reload();

        })
        .catch(error => {

            console.error(error);

            alert(
                "Unable to approve request. " +
                error.message
            );

        });

}