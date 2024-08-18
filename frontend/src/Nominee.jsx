import './CSS/EmployeeNominationCSS.css';
import Profile from './profile';

export default function Nominee({ nominee }) {
  console.log(nominee);

  function handleProfile() {
    window.location.href = "/profile";
  };

  return (
    <div className="nominationContainer" onClick={handleProfile}>
      <img className="photo" alt="Profile Picture" src="PIC/profilePicture.jpg" />
      <div className="info">
        <h4>{nominee.name}</h4>
        <small>{nominee.nomination_reason}</small>
      </div>
    </div>
  );
}
