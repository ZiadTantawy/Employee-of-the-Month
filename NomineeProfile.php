<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../ITWorx/CSS/NomineeProfile.css   ">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <title>Nominee profile</title>
    <link rel="stylesheet" href="CSS/loader.css">


</head>

<body>

    <?php include '../ITWorx/navbar.php'; ?>
    <?php include '../ITWorx/loader.php'; ?>


    <main>
        <div class="content container">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="info-card mt-4 d-flex align-items-center">
                            <img src="../ITWorx/PIC/2.jpg" class="card-img-top" alt="profile Picture">
                            <div class="text">
                                <h3 class="name ml-3">John Smith</h3>
                                <p class="position ml-3">Software Product Designer @ ITWorx</p>
                                <p class="followers ml-3">1.3k followers | 3.2k following</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-text container mt-4">
                <h3>Nomination Reason</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis turpis ut sapien vestibulum iaculis. Vestibulum hendrerit lorem vel dolor accumsan sagittis dictum in ante. Cras sed aliquet nisi. Curabitur pretium lobortis erat in fermentum. Ut eu sapien a eros tincidunt dictum. Nam molestie lorem in libero congue commodo. Donec volutpat dapibus sapien a commodo. Aliquam vel purus a elit ornare imperdiet sodales laoreet dui. Fusce et consectetur mauris. Proin et erat ultrices, semper enim ac, consectetur eros.</p>
            </div>
            <div class="profile-text container mt-4r">
                <h3>Achievements</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis turpis ut sapien vestibulum iaculis. Vestibulum hendrerit lorem vel dolor accumsan sagittis dictum in ante. Cras sed aliquet nisi. Curabitur pretium lobortis erat in fermentum. Ut eu sapien a eros tincidunt dictum. Nam molestie lorem in libero congue commodo. Donec volutpat dapibus sapien a commodo. Aliquam vel purus a elit ornare imperdiet sodales laoreet dui. Fusce et consectetur mauris. Proin et erat ultrices, semper enim ac, consectetur eros.</p>
            </div>
        </div>
    </main>
</body>
<script>
    var $loader = document.querySelector('.loader');
    window.onload = function() {
        $loader.classList.remove('loader--active');
    };
</script>

</html>