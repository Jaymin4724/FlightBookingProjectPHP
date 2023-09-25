// Function to validate the form
function validateForm() {
    // Personal Details Validation
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    // Booking Details Validation
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;

    // Regular expressions for email and phone validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validation checks
    if (!firstname) {
        alert("Please enter first name");
        return;
    }
    if (!lastname) {
        alert("Please enter last name");
        return;
    }
    if (!age) {
        alert("Please enter age");
        return;
    }
    if (!gender) {
        alert("Please enter gender");
        return;
    }
    if (!phone) {
        alert("Please enter phone number");
        return;
    }
    if (!email) {
        alert("Please enter email");
        return;
    }
    if (!from) {
        alert("Please enter source");
        return;
    }
    if (!to) {
        alert("Please enter destination");
        return;
    }
    if (!date) {
        alert("Please enter date");
        return;
    }

    if (!/^[a-zA-Z]+$/.test(firstname) || !/^[a-zA-Z]+$/.test(lastname)) {
        alert("First name and last name should contain only letters");
        return;
    }

    if (!/^\d+$/.test(age)) {
        alert("Age should contain only numbers");
        return;
    }

    if (age < 10 || age > 70) {
        alert("Age must be between 10 and 70!");
        return;
    }


    if (gender === "gender") {
        alert("Please select a gender");
        return;
    }

    if (!phone.match(phoneRegex)) {
        alert("Phone number must be 10 digits");
        return;
    }

    if (!email.match(emailRegex)) {
        alert("Invalid email format");
        return;
    }

    if (from === to) {
        alert("From and To destinations must be different");
        return;
    }

    const selectedDate = new Date(date);
    if (selectedDate <= today) {
        alert("Date must be greater than today's date");
        return;
    }

    var confirmation = confirm("Are you sure you want to submit?");
    if (confirmation) {
        alert("Your ticket has been booked successfully!");
        window.location.href = "index.html";
    }
}
