import "./CSS/login.css";
function Login() {
  return (
    <div>
        <div class="content">
            <div class="wrapper">
                <h2>Login</h2>
                <form id="loginForm">
                    <div class="input-box">
                        <input type="text" placeholder="Enter your email" name="email" id="email" required/>
                        <small class="error" id="emailError"></small>
                    </div>
                    <div class="input-box">
                        <input type="password" placeholder="Enter your password" name="password" id="password" required/>
                        <small class="error" id="passwordError"></small>
                    </div>
                    <div class="input-box button">
                        <input type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Login;