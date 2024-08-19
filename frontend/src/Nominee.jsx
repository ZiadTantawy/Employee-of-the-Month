import './CSS/EmployeeNominationCSS.css';
import Profile from './profile';

export default function Nominee({ nominee }) {
  async function Profile(){
    try{
        const nomineeData = await fetch(`http://localhost:8000/get_employee_data/${encodeURIComponent(nominee.name)}`, {
            method:"GET",
            headers:{
              "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const nomineeDataJson = await nomineeData.json()
        sessionStorage.setItem('employeeData', JSON.stringify(nomineeDataJson));

        window.location.href = `/profile`;

        console.log(nomineeDataJson);
    }catch(error){
        console.error("Error getting nominee data:", error);
    }
};

  return (
    <div className="nominationContainer" onClick={Profile}>
      <img className="photo" alt="Profile Picture" src={`data:image/jpeg;base64,${nominee.image}`} />
      <div className="info">
        <h4>{nominee.name}</h4>
        <small>{nominee.nomination_reason}</small>
      </div>
    </div>
  );
}
