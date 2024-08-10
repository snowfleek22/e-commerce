

<?php
// sign-up.php
session_start(); //start the session
$session;

$host = 'localhost';
$user ='MyAdmin';
$pass = '$Dickhead5023!!';
$dbase = 'e-commerce';


// Connect to the database
$conn = mysqli_connect($host, $user, $pass, $dbase);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get the form data
$first = $_POST['first'];
$last = $_POST['last'];
$date = $_POST['birthday'];
$username = $_POST['username'];
$email = $_POST['email'];
$local_address = $_POST['local-address'];
$city = $_POST['city'];
$mobile = $_POST['mobile-number'];
$password = $_POST['password'];
$password = md5($password);
$confirmPassword = $_POST['confirm-password'];

// Validate the form data
if (empty($first) || empty($last) ||  empty($date) || empty($username) || empty($email) || empty($local_address) || empty($city)|| empty($mobile) || empty($password) || empty($confirmPassword)) {
    echo 'Please fill in all fields';
    exit;
}

// Check if the username, email or mobile already exists in the database
$query = "SELECT * FROM sign_up WHERE username = '$username' or email = '$email' or mobile = '$mobile'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    // Username or email already exists, display an error message
    echo 'Username, email or mobile number already exists';
} else {
    // Insert the new user into the database
    $query = "INSERT INTO sign_up (first, last, birthDay, username, email, local_address, city, mobile, password) VALUES ('$first', '$last', '$date', '$username', '$email', '$local_address', '$city', '$mobile', '$password')";
    mysqli_query($conn, $query);

    // Sign up successful, redirect to a confirmation page
    header('Location: login.html');
    exit;
}

// Close the database connection
mysqli_close($conn);
?>
