<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nominate a Colleague</title>
    <link rel="stylesheet" href="../ITWorx/CSS/nominate.css">
    <link rel="stylesheet" href="../ITWorx/CSS/nominate2.css">
    <link rel="stylesheet" href="CSS/loader.css">

    <style>
        /* Include the CSS changes from the previous response here */
    </style>
</head>
<body>
    <?php include '../ITWorx/navbar.php'; ?>
    <?php include '../ITWorx/loader.php'; ?>


    <div class="container">
        <section class="form-section">
            <h2>Nominate a Colleague</h2>
            <form id="nominate-form" action="#" method="post">
                <div class="form-group">
                    <label for="nominee-name">Nominee's name*</label>
                    <input type="text" id="nominee-name" name="nominee-name" >
                </div>
                <div class="form-group">
                    <label for="nominee-email">Nominee's email*</label>
                    <input type="email" id="nominee-email" name="nominee-email" >
                </div>
                <div class="form-group">
                    <label for="nomination-reason">Reason for nomination*</label>
                    <textarea id="nomination-reason" name="nomination-reason" rows="4" ></textarea>
                </div>
                <div class="form-group">
                    <label for="your-name">Your name*</label>
                    <input type="text" id="your-name" name="your-name" >
                </div>
                <div class="form-group">
                    <label for="your-email">Your email*</label>
                    <input type="email" id="your-email" name="your-email" >
                </div>
                <div class="cont">
                    <button type="submit" class="btny">
                        <span>Submit</span>
                        <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" alt="Submit Icon">
                    </button>
                </div>
            </form>
        </section>
    </div>
    
    <script>
        var $loader = document.querySelector('.loader');
        window.onload = function() {
            $loader.classList.remove('loader--active');
        };
        document.querySelector('.photo').addEventListener('click', function() {
            $loader.classList.add('loader--active');
            setTimeout(function() {
                window.location.href = 'nominate.php';
            }, 2500); // 2 seconds delay
        });
    </script>

    <script>
        document.getElementById('nominate-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            
            // Trigger the animation by focusing the button
            const button = document.querySelector('.btny');
            button.focus();
            
            // Wait for the animation to complete (1s duration)
            setTimeout(function() {
                // Now submit the form
                event.target.submit();
            }, 2500);
        });
    </script>
</body>
</html>
