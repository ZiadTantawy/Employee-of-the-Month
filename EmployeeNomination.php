<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Employee Nomination</title>
    <link rel="stylesheet" href="CSS/EmployeeNominationCSS.css">
    <link rel="stylesheet" href="CSS/loader.css">
</head>

<body>
    <?php include '../ITWorx/navbar.php'; ?>
    <?php include '../ITWorx/loader.php'; ?>

    <section class="leftSide">
        <ul class="navigation">
            <li style="background-color: rgb(231, 231, 231);">
                <a>Nominations</a>
            </li>
            <li>
                <a>Voting</a>
            </li>
            <li>
                <a>Results</a>
            </li>
            <li>
                <a>Settings</a>
            </li>
        </ul>
        <button class="redButton" style="bottom: 40px; position: fixed;">
            <a>New employee of the month</a>
        </button>
    </section>

    <main class="nomination">
        <h1>Nomination</h1>
        <small>Employees can nominate their colleagues for employee of the month. Nominations are anonymous. You can also nominate employees yourself.</small>
        
        <div class="container" style="margin-top: 20px; margin-bottom: 10px;">
            <button class="photo" style="border-radius: 8px; background-color: rgb(231, 231, 231);">
                +
            </button>
            <div class="info">
                <h4>Nominate employees</h4>
                <small>You can nominate up to 3 employees this month</small>
            </div>
        </div>

        <h4>Current Nomination</h4>
        <div class="container">
            <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg">
            <div class="info">
                <h4>Mohamed Tarek 1</h4>
                <small>Nominated by: Mohamed Tarek</small>
            </div>
        </div>
        <div class="container">
            <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg">
            <div class="info">
                <h4>Mohamed Tarek 2</h4>
                <small>Nominated by: Mohamed Tarek</small>
            </div>
        </div>
        <div class="container">
            <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg">
            <div class="info">
                <h4>Mohamed Tarek 3</h4>
                <small>Nominated by: Mohamed Tarek</small>
            </div>
        </div>

        <div>
            <br>
            <button class="redButton" style="width: 100px;">Save</button>
            <button class="redButton" style="width: 100px; color: black; background-color: rgb(231, 231, 231);">Cancel</button>
            <br><br>
        </div>

        <h4>Previous Nomination</h4>
        <div class="current">
            <div class="container">
                <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg">
                <div class="info">
                    <h4>Mohamed Tarek</h4>
                    <small>Nominated by: Mohamed Tarek</small>
                </div>
            </div>
            <div class="container">
                <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg">
                <div class="info">
                    <h4>Mohamed Tarek</h4>
                    <small>Nominated by: Mohamed Tarek</small>
                </div>
            </div>
            <div class="container">
                <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg">
                <div class="info">
                    <h4>Mohamed Tarek</h4>
                    <small>Nominated by: Mohamed Tarek</small>
                </div>
            </div>
            <div class="container">
                <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg">
                <div class="info">
                    <h4>Mohamed Tarek</h4>
                    <small>Nominated by: Mohamed Tarek</small>
                </div>
            </div>
            <div class="container">
                <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg">
                <div class="info">
                    <h4>Mohamed Tarek</h4>
                    <small>Nominated by: Mohamed Tarek</small>
                </div>
            </div>
            <div class="container">
                <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg">
                <div class="info">
                    <h4>Mohamed Tarek</h4>
                    <small>Nominated by: Mohamed Tarek</small>
                </div>
            </div>
        </div>
    </main>

    <script>
        var loader = document.querySelector('.loader');
        window.onload = function() {
            loader.classList.remove('loader--active');
        };
        document.querySelector('.photo').addEventListener('click', function() {
            loader.classList.add('loader--active');
            setTimeout(function() {
                window.location.href = 'nominate.php';
            }, 2500);
        });
    </script>
</body>
</html>
