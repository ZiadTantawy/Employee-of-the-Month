<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee of the Month</title>
    <link rel="stylesheet" href="CSS/1.css">


</head>

<body>
<?php include '../Test/navbar.php'; ?>

    <div class="container" ba>
        <div class="header">
            <h1>Employee of the Month</h1>
            <p>Recognize your peers. Vote for your favorite. Celebrate the winners.</p>
            <div class="buttons">
                <button>Nominate</button>
                <button class="vote">Vote</button>
            </div>
        </div>
        <div class="recent-winners-container">
            <h2>Recent Winners</h2>
        </div>

        <div class="winners">
            <div class="winner">
                <img src='../Test/PIC/2.jpg' alt="John Smith">
                <h3>John Smith</h3>
                <p>Software Engineer</p>
                <p>June 2023</p>
            </div>
            <div class="winner">
                <img src='../Test/PIC/3.jpg' alt="Jane Doe">
                <h3>Jane Doe</h3>
                <p>Product Manager</p>
                <p>May 2023</p>
            </div>
            <div class="winner">
                <img src='../Test/PIC/4.jpg' alt="Sam Johnson">
                <h3>Sam Johnson</h3>
                <p>UX Designer</p>
                <p>April 2023</p>
            </div>
        </div>
    </div>

</body>

</html>