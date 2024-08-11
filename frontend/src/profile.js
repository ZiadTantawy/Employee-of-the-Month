import React from 'react';
import './CSS/Profile.css';

const Profile = () => {
  return (
    <main>
      <div className="content container6">
        <div className="profile-container">
          <div className="profile-row">
            <div className="profile-col">
              <div className="info-card">
                <img src="../ITWorx/PIC/2.jpg" className="card-img-top" alt="profile Picture" />
                <div className="text">
                  <h3 className="name">John Smith</h3>
                  <p className="position">Software Product Designer @ ITWorx</p>
                  <p className="followers">1.3k followers | 3.2k following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-text-container">
          <h3>Nomination Reason</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </div>
        <div className="profile-text-container">
          <h3>Achievements</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
