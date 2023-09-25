const signupbutton = document.querySelector("#btn1");
const loginbutton = document.querySelector("#btn2");
const heading = document.querySelector("#heading");
const signupForm = document.getElementById("signupForm");
const signupfields = document.querySelectorAll(".signupfields");
const main = document.querySelector(".main");
const submitbutton = document.querySelector("#submitbutton");
const switches = document.querySelectorAll(".switch");

// window.onload = function () {
//   // Function to hide the welcome message and show the main container
//   function showMain() {
//     const welcomeMessage = document.querySelector(".welcome-message");
//     const main = document.querySelector(".main");

//     welcomeMessage.style.opacity = 0; // Hide the welcome message
//     main.style.display = "block"; // Show the main container
//   }

//   // Create a dynamic welcome message element
//   const welcomeMessage = document.createElement("div");
//   welcomeMessage.className = "welcome-message";
//   welcomeMessage.innerHTML = "<h1>Welcome to our flight booking project</h1>";

//   // Append the welcome message to the body
//   document.body.appendChild(welcomeMessage);

//   // Use setTimeout to trigger the showMain function after 5 seconds
//   setTimeout(showMain, 1000);
// };




// SIGN-UP AND LOGIN BUTTON

function switchForm(formType) {
  if (formType === "signup") {
    // Handle Sign-Up form display
    document.getElementById("heading").textContent = "Sign-Up";
    signupfields.forEach(function (field) {
      field.style.display = "flex";
    });
    main.style.height = "380px";
    main.style.width = "350px";
    submitbutton.value = "Sign-Up";
    signupForm.action = "signup.php"; // Set the form action for Sign-Up
    signupForm.reset(); // Clear form inputs if needed
  } else if (formType === "login") {
    // Handle Login form display
    document.getElementById("heading").textContent = "Login";
    signupfields.forEach(function (field) {
      field.style.display = "none";
    });
    main.style.height = "290px";
    main.style.width = "380px";
    main.style.padding = "3px 5px";
    submitbutton.value = "Login";
    signupForm.action = "login.php"; // Set the form action for Login
    signupForm.reset(); // Clear form inputs if needed
  }
  switches.forEach((button) => {
    button.style.backgroundColor =
      button.id === `btn${formType === "signup" ? "1" : "2"}`
        ? "rgb(243, 159, 90)"
        : "white";
  });
}

// JAVASCRIPT FOR EYE BUTTON IN PASSWORD
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const showHideButton = document.getElementById("showHide");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showHideButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'; // Change to hide icon
  } else {
    passwordInput.type = "password";
    showHideButton.innerHTML = '<i class="fa-solid fa-eye"></i>'; // Change to show icon
  }
}

// VALIDATION FOR FIELDS
function isValidName(name) {
  // Use a regular expression to validate that the name contains only letters and is not empty
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(name);
}

function isValidPhoneNumber(phoneNumber) {
  // Use a regular expression to validate that the phone number contains only digits and is exactly 10 characters long
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

function isValidEmail(email) {
  // Use a regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Define your password validation criteria here
  // For example, require at least 8 characters
  return password.length >= 8;
}

// SUBMISSION OF FORM
signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting
  const flag = heading.textContent === "Sign-Up" ? 1 : 0;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const phoneno = document.getElementById("phoneno").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // VALIDATION WHILE SIGN-UP
  if (flag === 1) {
    if (!isValidName(firstname)) {
      alert("Please enter a valid first name.");
      return;
    }

    if (!isValidName(lastname)) {
      alert("Please enter a valid last name.");
      return;
    }

    if (!isValidPhoneNumber(phoneno)) {
      alert("Please enter a valid phone number (10 digits).");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    signupForm.submit();
  }

  // VALIDATION WHILE LOGIN
  else {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    signupForm.submit();
  }

  // Allow the form to submit if validation passes
  signupForm.submit();
});
