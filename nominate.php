<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nominate a Colleague</title>
    <link rel="stylesheet" href="../ITWorx/CSS/nominate.css">
</head>

<body>
    <?php include '../ITWorx/navbar.php'; ?>
    <div class="container">

        <section class="form-section">
            <h2>Nominate a Colleague</h2>
            <form action="#" method="post">
                <div class="form-group">
                    <label for="nominee-name">Nominee's name*</label>
                    <input type="text" id="nominee-name" name="nominee-name" required>
                </div>
                <div class="form-group">
                    <label for="nominee-email">Nominee's email*</label>
                    <input type="email" id="nominee-email" name="nominee-email" required>
                </div>
                <div class="form-group">
                    <label for="nomination-reason">Reason for nomination*</label>
                    <textarea id="nomination-reason" name="nomination-reason" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="your-name">Your name*</label>
                    <input type="text" id="your-name" name="your-name" required>
                </div>
                <div class="form-group">
                    <label for="your-email">Your email*</label>
                    <input type="email" id="your-email" name="your-email" required>
                </div>
                <center><button type="submit">Submit Nomination</button></center>
            </form>
        </section>
    </div>
</body>
<?php include '../ITWorx/footer.php'; ?>

</html>