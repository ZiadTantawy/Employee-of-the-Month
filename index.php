<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee of the Month</title>
    <link rel="stylesheet" href="CSS/1.css">
    <link rel="stylesheet" href="CSS/loader.css">

</head>

<body>
    <?php include '../ITWorx/navbar.php'; ?>
    <?php include '../ITWorx/loader.php'; ?>

    <!-- Loader (Initially Hidden) -->

    <div class="container wrapper">
        <div class="header">
            <h1>Employee of the Month</h1>
            <p>Recognize your peers. Vote for your favorite. Celebrate the winners.</p>
            <div class="buttons">
                <button class="btnn">Nominate</button>
                <button>Vote</button>
            </div>
        </div>
        <div class="recent-winners-container">
            <h2>Recent Winners</h2>
        </div>

        <div class="winners">
            <button class="btn2">
                <div class="winner">
                    <img src='../Test/PIC/2.jpg' alt="John Smith">
                    <h3>John Smith</h3>
                    <p>Software Engineer</p>
                    <p>June 2023</p>
                </div>
            </button>
            <button class="btn3">
                <div class="winner">
                    <img src='../Test/PIC/3.jpg' alt="Jane Doe">
                    <h3>Jane Doe</h3>
                    <p>Product Manager</p>
                    <p>May 2023</p>
                </div>
            </button>
            <button class="btn4">
                <div class="winner">
                    <img src='../Test/PIC/4.jpg' alt="Sam Johnson">
                    <h3>Sam Johnson</h3>
                    <p>UX Designer</p>
                    <p>April 2023</p>
                </div>
            </button>
        </div>
    </div>

    <script>
        var $loader = document.querySelector('.loader');
        window.onload = function() {
            $loader.classList.remove('loader--active');
        };

        document.querySelector('.btn2').addEventListener('click', function() {
            $loader.classList.add('loader--active');
            setTimeout(function() {
                window.location.href = 'NomineeProfile.php';
            }, 2500); // 2 seconds delay
        });
        document.querySelector('.btn3').addEventListener('click', function() {
            $loader.classList.add('loader--active');
            setTimeout(function() {
                window.location.href = 'NomineeProfile.php';
            }, 2500); // 2 seconds delay
        });
        document.querySelector('.btn4').addEventListener('click', function() {
            $loader.classList.add('loader--active');
            setTimeout(function() {
                window.location.href = 'NomineeProfile.php';
            }, 2500); // 2 seconds delay
        });
        document.querySelector('.btnn').addEventListener('click', function() {
            $loader.classList.add('loader--active');
            setTimeout(function() {
                window.location.href = 'EmployeeNomination.php';
            }, 2500); // 2 seconds delay
        });
    </script>

</body>

</html>