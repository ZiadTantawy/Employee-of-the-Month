import React from 'react';
import "./CSS/EmployeeOfTheMonthCSS.css";

export default function EmployeeCard({ nominee }){
    async function Profile(){
        try{
            const nomineeData = await fetch(`http://localhost:8000/get_employee_data/${encodeURIComponent(nominee.name)}`, {
                method:"GET",
                headers:{
                  "Content-Type": "application/json",
                },
                credentials: "include",
            });
            console.log(nominee.name);
            const nomineeDataJson = await nomineeData.json()

            sessionStorage.setItem('employeeData', JSON.stringify(nomineeDataJson));

            window.location.href = `/profile`;

        }catch(error){
            console.error("Error getting nominee data:", error);
        }
        window.location.href = "/profile";
    };

    async function handleVote(){
        try{
            const response = await fetch(`http://localhost:8000/vote/${encodeURIComponent(nominee.name)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if(response.status === 200){
                alert("Vote cast successfully!");
                window.location.reload();
            }else{
                alert("Failed to cast vote. Please try again.");
            }
        }catch(error){
            console.error("Error casting vote:", error);
            alert("Failed to cast vote. Please try again.");
        }
    }
    return (
        <div className="container4" >
            <div className="container4" style={{cursor:"pointer"}} onClick={Profile}>
                <div>
                    <img className=" profilePhoto" alt="Profile Picture" src={`data:image/jpeg;base64,${nominee.image}`}/>
                </div>
                <div className="info">
                    <h4>{nominee.name}</h4>
                </div>
            </div>
            <a className="vote" style={{marginTop:"35px", marginLeft:"600px"}} onClick={handleVote}>vote</a>
        </div>
    )
}