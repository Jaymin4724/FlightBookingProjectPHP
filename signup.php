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

// Define the new database name
$newDatabaseName = "flight_booking_project"; // Replace with your desired database name

// Create a new database  //you can also create table like this way
$sqlCreateDatabase = "CREATE DATABASE IF NOT EXISTS $newDatabaseName";

if ($conn->query($sqlCreateDatabase) === false) {
    echo "Error creating database: " . $conn->error . "<br>";
}

// Close the connection to the MySQL server
$conn->close();

// Now, create a connection to the new database
$conn = new mysqli($servername, $username, $password, $newDatabaseName);

// Check connection
if ($conn->connect_error) {
    die("Connection to the new database failed: " . $conn->connect_error);
}

// Check if the 'users' table exists, if not, create it 
// you can also create table like above code
$tableName = "users"; // Adjust to your table name
$tableExists = $conn->query("SHOW TABLES LIKE '$tableName'")->num_rows > 0;

if (!$tableExists) {
    $createTableSQL = "CREATE TABLE $tableName (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        phoneno VARCHAR(10) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )";

    if ($conn->query($createTableSQL) === false) {
        echo "Error creating table: " . $conn->error . "<br>";
    }
}

// Handle form submission and sign-up process

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $phoneno = $_POST["phoneno"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    // $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    // Check if the email already exists in the database
    $checkEmailQuery = "SELECT * FROM $tableName WHERE email = '$email'";
    $result = $conn->query($checkEmailQuery);

    if ($result->num_rows > 0) {
        echo "Email already exists. Please use a different email address.<br>";
        // Use JavaScript to delay the redirection
        echo "<script>
            setTimeout(function() {
                window.location.href = 'index.html'; // Replace with the actual login page URL
            }, 2000); // 2000 milliseconds (2 seconds) delay
          </script>";
    } else {
        // Insert user data into the database
        $insertQuery = "INSERT INTO $tableName (firstname, lastname, phoneno, email, password)
                        VALUES ('$firstname', '$lastname', '$phoneno', '$email', '$password')";

        if ($conn->query($insertQuery) === TRUE) {
            echo "<script>
                window.location.href = 'ticket_booking.html'; // Replace with the actual ticket booking page URL
            </script>";
            exit; // Terminate the script to prevent further output
        } else {
            echo "Error: " . $insertQuery . "<br>" . $conn->error . "<br>";
        }
    }
}

// Close the connection to the new database
$conn->close();
