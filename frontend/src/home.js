import React, { useEffect, useState } from 'react';
import './CSS/home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  const [winners, setWinners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/winners")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched winners:', data);
        setWinners(data.winners || []);
      })
      .catch(error => {
        console.error('Error fetching winners:', error);
        setError(`Failed to load recent winners. ${error.message}`);
      });
  }, []);

  function nominationScreen() {
    window.location.href = "/nomination";
  }

  function voteScreen() {
    window.location.href = "/vote";
  }

  function profilePage() {
    window.location.href = "/profile";
  }

  return (
    <div className="wrapper">
      <div className="header">
        <h1>Employee of the Month</h1>
        <p>Recognize your peers. Vote for your favorite. Celebrate the winners.</p>
        <div className="buttons">
          <button className="btnn" onClick={nominationScreen}>
            Nominate
          </button>
          <button onClick={voteScreen}>
            Vote
          </button> 
        </div>
      </div>

      <div className="recent-winners-container">
        <h2>Recent Winners</h2>
      </div>

      <div className="winners">
        {error && <p className="error">{error}</p>}
        {winners.map((winner, index) => (
          <button key={index} className={`btn${index + 2}`} onClick={profilePage}>
            <div className="winner">
              <img src={winner.image} alt={winner.name} />
              <h3>{winner.name}</h3>
              <p>{winner.email}</p>
              <p>{new Date(winner.month_year).toLocaleDateString()}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
