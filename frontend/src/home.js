import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import './CSS/1.css';
import './CSS/loader.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    updateAuthButton();
  }, []);

  const updateAuthButton = () => {
    const loggedIn = localStorage.getItem('loggedIn');
    const authButton = document.getElementById('auth-button');

    if (loggedIn === 'true') {
      authButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> ';
      authButton.onclick = () => {
        localStorage.removeItem('loggedIn');
        window.location.reload(); // Reload the page to update the navbar
      };

      // Show the Dashboard link
      const navLinks = document.getElementById('nav-links');
      const dashboardLink = document.createElement('li');
      dashboardLink.innerHTML = '<a href="/AdminPage">Dashboard</a>';
      navLinks.prepend(dashboardLink);
    } else {
      authButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> ';
      authButton.onclick = () => {
        navigate('/login'); // Use navigate instead of history.push
      };
    }
  };

  const handleNavigation = (path) => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader--active');
    setTimeout(() => {
      navigate(path); // Use navigate instead of history.push
    }, 2500); // 2.5 seconds delay
  };

  return (
    <div>
      {/* Loader (Initially Hidden) */}
      <div className="loader loader--active">
        <div className="loader__icon"></div>
        <div className="loader__tiles">
          <div className="loader__tile"></div>
          <div className="loader__tile"></div>
          <div className="loader__tile"></div>
          <div className="loader__tile"></div>
          <div className="loader__tile"></div>
        </div>
      </div>

      <div className="container wrapper">
        <div className="header">
          <h1>Employee of the Month</h1>
          <p>Recognize your peers. Vote for your favorite. Celebrate the winners.</p>
          <div className="buttons">
            <button className="btnn" onClick={() => handleNavigation('/EmployeeNomination')}>
              Nominate
            </button>
            <button onClick={() => handleNavigation('/VotingPage')}>Vote</button>
          </div>
        </div>

        <div className="recent-winners-container">
          <h2>Recent Winners</h2>
        </div>

        <div className="winners">
          <button className="btn2" onClick={() => handleNavigation('/NomineeProfile')}>
            <div className="winner">
              <img src="../Test/PIC/2.jpg" alt="John Smith" />
              <h3>John Smith</h3>
              <p>Software Engineer</p>
              <p>June 2023</p>
            </div>
          </button>
          <button className="btn3" onClick={() => handleNavigation('/NomineeProfile')}>
            <div className="winner">
              <img src="../Test/PIC/3.jpg" alt="Jane Doe" />
              <h3>Jane Doe</h3>
              <p>Product Manager</p>
              <p>May 2023</p>
            </div>
          </button>
          <button className="btn4" onClick={() => handleNavigation('/NomineeProfile')}>
            <div className="winner">
              <img src="../Test/PIC/4.jpg" alt="Sam Johnson" />
              <h3>Sam Johnson</h3>
              <p>UX Designer</p>
              <p>April 2023</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
