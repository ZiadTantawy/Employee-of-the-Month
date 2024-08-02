<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="CSS/loader.css">


    <style>
        /* Reset some default styles */
        body,
        h2,
        form {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }



        /* Adjust .content to fit below the fixed navbar */
        .content {
            margin-top: 60px;
            /* Adjust this to fit the height of your navbar */
            margin-left: 500px;
            width: 100%;
            max-width: 400px;
        }

        /* Wrapper Styling */
        .wrapper {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        /* Other styling */
        h2 {
            margin-bottom: 20px;
            text-align: center;
            color: #333;
        }

        .input-box {
            margin-bottom: 15px;
            position: relative;
        }

        .input-box input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }

        .input-box .error {
            color: red;
            font-size: 0.875em;
            position: absolute;
            bottom: -20px;
            left: 10px;
        }

        .policy {
            margin: 10px 0;
        }

        .policy h3 {
            display: inline;
            margin-left: 8px;
            color: #333;
        }

        .button input {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 4px;
            background-color: #e74c3c;
            color: #fff;
            font-size: 1em;
            cursor: pointer;
        }

        .button input:hover {
            background-color: #c0392b;
        }
    </style>
</head>

<body>
    <?php include('../ITWorx/navbar.php'); ?>
    <?php include '../ITWorx/loader.php'; ?>

    <div class="content">
        <div class="wrapper">
            <h2>Login</h2>
            <form>
                <div class="input-box">
                    <input type="email" placeholder="Enter your email" name="email" id="email" required>
                    <small class="error" id="emailError"></small>
                </div>
                <div class="input-box">
                    <input type="password" placeholder="Enter your password" name="password" id="password" required>
                    <small class="error" id="passwordError"></small>
                </div>
                <div class="input-box button">
                    <input type="submit" value="Login">
                </div>
            </form>
        </div>
    </div>
</body>
<script>
    var $loader = document.querySelector('.loader');
    window.onload = function() {
        $loader.classList.remove('loader--active');
    };
</script>

</html>