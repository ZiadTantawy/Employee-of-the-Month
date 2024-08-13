import React from 'react';
import './CSS/Profile.css';

const Profile = () => {
  return (
    <main>
      <div className="profile-container">
        <div className="profile">
          <img src="./PIC/profilePic.jpg" className='card-img' alt="John Smith" />
          <div className='profile-info'>
            <h3 className='name'>John Smith</h3>
            <p className='role'>Software Engineer</p>
          </div>
        </div>
      </div>
      <div className="details-container">
        <div className='reason'>
          <h3>Nomination Reason</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum vestibulum auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut non lacinia mauris, ut viverra ligula. In non ligula sodales, pellentesque mi sit amet, vehicula leo. Donec vel libero ornare, ultricies arcu eget, semper augue. Curabitur pulvinar commodo lectus sit amet placerat. Vivamus sed diam vitae lectus porta viverra nec quis dui. Maecenas sagittis augue vel urna mollis gravida. Mauris sit amet laoreet turpis. Vestibulum varius tincidunt placerat.</p>
        </div>
        <div className='achievements'>
          <h3>Achievements</h3>
          <ol>
            <li>Employee of the Month - June 2023</li>
            <li>Employee of the Month - March 2023</li>
            <li>Employee of the Month - December 2022</li>
          </ol>
        </div>
      </div>
    </main>
  );
};

export default Profile;
