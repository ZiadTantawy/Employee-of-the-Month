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
          <img src={`data:image/jpeg;base64,${employeeData.image}`} className='card-img' alt="John Smith" />
          <div className='profile-info'>
            <h3 className='name'>{employeeData.nominee_name}</h3>
            <p className='role'>{employeeData.job_title}</p>
          </div>
        </div>
      </div>
      <div className="details-container">
        <div className='reason'>
          <h3>Nomination Reason</h3>
          <p>{employeeData.nomination_reason}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
