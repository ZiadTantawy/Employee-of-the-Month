<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Navigation Bar</title>
    <link rel="stylesheet" href="CSS/nav.css">
</head>

<body>
    <div class="navbar">
        <!-- Left side: Logo -->
        <div class="logo">
            <a href="../ITWorx/index.php">
                <img src="../ITWorx/PIC/ITWorx_logo.png" alt="Logo" width="100" height="25">
            </a>
        </div>

        <!-- Center: Navigation links -->
        <ul id="nav-links">
            <li><a href="#">Time Off</a></li>
            <li><a href="#">Benefits</a></li>
            <li><a href="#">Compensation</a></li>
            <li><a href="#">Learning</a></li>
            <li><a href="#">Feedback</a></li>
        </ul>

        <!-- Right side: Search, Help, Profile, and Login/Logout Icon -->
        <div class="actions">
            <button>
                <i class="fas fa-search"></i>
            </button>
            <button>
                <i class="fa-solid fa-question"></i>
            </button>
            <button id="auth-button" class="btn">
                <i class="fas fa-user"></i> <!-- Placeholder for Login/Logout Icon -->
            </button>
        </div>
    </div>

    <script>
        // Function to update the auth button based on login status
        function updateAuthButton() {
            var loggedIn = localStorage.getItem('loggedIn');
            var authButton = document.getElementById('auth-button');

            if (loggedIn === 'true') {
                authButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> ';
                authButton.addEventListener('click', function() {
                    localStorage.removeItem('loggedIn');
                    window.location.reload(); // Reload the page to update the navbar
                });

                // Show the Dashboard link
                var navLinks = document.getElementById('nav-links');
                var dashboardLink = document.createElement('li');
                dashboardLink.innerHTML = '<a href="AdminPage.php">Dashboard</a>';
                navLinks.prepend(dashboardLink);

            } else {
                authButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> ';
                authButton.addEventListener('click', function() {
                    window.location.href = 'login.php';
                });
            }
        }

        // Run the function when the page loads
        document.addEventListener('DOMContentLoaded', updateAuthButton);
    </script>
</body>

</html>
