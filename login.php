<?php
// Connect to MySQL server
$servername = "localhost";
$username = "root";
$password = "";

// Create a connection to MySQL
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define the database name
$databaseName = "flight_booking_project"; // Replace with your database name

// Check if the database exists
$checkDatabaseQuery = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$databaseName'";

$result = $conn->query($checkDatabaseQuery);

if ($result->num_rows > 0) {
    // Database exists, create a connection to it
    $conn = new mysqli($servername, $username, $password, $databaseName);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the form has been submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST["email"];
        $password = $_POST["password"];

        // Check if the user is trying to log in as an admin
        if ($email == "admin123@gmail.com" && $password == "00000000") {
            // Admin login successful
            // Redirect to the ticket booking page for admin
            header("Location: ticket_booking.html"); // Replace with your admin ticket booking page URL
            exit();
        } else {
            // User login attempt
            // Validate user credentials against the database
            $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                // User login successful
                // Redirect to the ticket booking page for users
                header("Location: ticket_booking.html"); // Replace with your user ticket booking page URL
                exit();
            } else {
                // Login failed, display an error message
                echo "Invalid email or password. Please try again.";
                echo "<script>
                setTimeout(function() {
                    window.location.href = 'index.html'; // Replace with the actual login page URL
                }, 2000); // 2000 milliseconds (2 seconds) delay
              </script>";
            }
        }
    }

    // Close the database connection
    $conn->close();
} else {
    echo "Invalid email or password. Please try again.";
    echo "<script>
                setTimeout(function() {
                    window.location.href = 'index.html'; // Replace with the actual login page URL
                }, 2000); // 2000 milliseconds (2 seconds) delay
              </script>";
}
