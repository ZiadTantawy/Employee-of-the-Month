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
        <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Time Off</a></li>
            <li><a href="#">Benefits</a></li>
            <li><a href="#">Compensation</a></li>
            <li><a href="#">Learning</a></li>
            <li><a href="#">Feedback</a></li>
        </ul>

        <!-- Right side: Search, Help, Profile, and Sign Up Icon -->
        <div class="actions">
            <button>
                <i class="fas fa-search"></i>
            </button>
            <button>
                <i class="fa-solid fa-question"></i>
            </button>
            <button id="signup-icon" class="btn">
                <i class="fas fa-user"></i> <!-- Sign Up Icon -->
            </button>
        </div>
    </div>

</body>
<script>
    var $loader = document.querySelector('.loader');
    window.onload = function() {
        $loader.classList.remove('loader--active');
    };
    document.querySelector('.btn').addEventListener('click', function() {
        $loader.classList.add('loader--active');
        setTimeout(function() {
            window.location.href = 'login.php';
        }, 2500); // 2 seconds delay
    });
</script>

</html>