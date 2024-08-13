import './CSS/EmployeeNominationCSS.css'
import Profile from './profile';

export default function Nominee (){
  function Profile(){
        window.location.href = "/profile";
  };
    return (
        <div class="nominationContainer" onClick={Profile}>
        <img class="photo" alt="Profile Picture" src="PIC/profilePicture.jpg" />
        <div class="info">
          <h4>Mohamed Tarek 1</h4>
          <small>Nominated by: Mohamed Tarek</small>
        </div>
      </div>
    );
}