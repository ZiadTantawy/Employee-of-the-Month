<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee of the Month</title>
    <link rel="stylesheet" href="CSS/1.css">


</head>

<body>
    <?php include '../ITWorx/navbar.php'; ?>

    <div class="container" ba>
        <div class="header">
            <h1>Employee of the Month</h1>
            <p>Recognize your peers. Vote for your favorite. Celebrate the winners.</p>
            <div class="buttons">
                <button onclick="window.location.href='EmployeeNomination.php'">Nominate</button>
                <button>Vote</button>
            </div>
        </div>
        <div class="recent-winners-container">
            <h2>Recent Winners</h2>
        </div>

        <div class="winners">
            <a href="../ITWorx/NomineeProfile.php">
                <div class="winner">
                    <img src='../Test/PIC/2.jpg' alt="John Smith">
                    <h3>John Smith</h3>
                    <p>Software Engineer</p>
                    <p>June 2023</p>
                </div>
            </a>
            <a href="../ITWorx/NomineeProfile.php">
            <div class="winner">
                <img src='../Test/PIC/3.jpg' alt="Jane Doe">
                <h3>Jane Doe</h3>
                <p>Product Manager</p>
                <p>May 2023</p>
            </div>
            </a>
            <a href="../ITWorx/NomineeProfile.php">
            <div class="winner">
                <img src='../Test/PIC/4.jpg' alt="Sam Johnson">
                <h3>Sam Johnson</h3>
                <p>UX Designer</p>
                <p>April 2023</p>
            </div>
            </a>
        </div>
    </div>

</body>
<?php include '../ITWorx/footer.php'; ?>


</html>