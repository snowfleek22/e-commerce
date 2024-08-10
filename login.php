<?php
session_start(); // Start the session

$host = 'localhost';
$user = 'MyAdmin';
$pass = '$Dickhead5023!!';
$dbase = 'e-commerce';

// Check if the user is already logged in, redirect to the dashboard if true
if (isset($_SESSION["username"])) {
    header("Location: index.html");
    exit;
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Connect to the database
    $conn = new mysqli($host, $user, $pass, $dbase);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get the form data
    $username = $_POST['username'];
    $password = $_POST['password'];
    $password = md5($password);

    // Validate the form data
    if (empty($username) || empty($password)) {
        echo 'Please fill in both fields';
        exit;
    }

    // Prepare and execute the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT password FROM sign_up WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Bind the result to a variable
        $stmt->bind_result($storedPassword);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $storedPassword)) {
            // Password is correct, set session variables and redirect
            $_SESSION["username"] = $username;
            header('Location: index.html');
            exit;
        } else {
            // Login failed, display an error message
            echo 'Invalid username or password';
        }
    } else {
        // User does not exist, display an error message
        echo 'User does not exist';
    }

    // Close the statement and the database connection
    $stmt->close();
    $conn->close();
}
?>
