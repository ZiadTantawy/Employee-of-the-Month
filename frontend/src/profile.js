import React from 'react';
import './CSS/Profile.css';

const Profile = () => {
  const storedData = sessionStorage.getItem('employeeData');
  const employeeData = storedData ? JSON.parse(storedData) : null;
  console.log(employeeData)
  return (
    <main>
      <div className="profile-container">
        <div className="profile">
          <img src="./PIC/profilePic.jpg" className='card-img' alt="John Smith" />
          <div className='profile-info'>
            <h3 className='name'>{employeeData.nominee_name}</h3>
            <p className='role'>Software Engineer</p>
          </div>
        </div>
      </div>
      <div className="details-container">
        <div className='reason'>
          <h3>Nomination Reason</h3>
          <p>{employeeData.nomination_reason}</p>
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
