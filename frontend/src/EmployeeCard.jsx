import React from 'react';
import "./CSS/EmployeeOfTheMonthCSS.css";

export default function EmployeeCard(){
    async function Profile(event){
        try{
            const container = event.target.closest('.container4');

            // Find the h4 element within this container
            const nameElement = container.querySelector('h4');
            
            // Extract the text content from the h4 element
            const nomineeName = nameElement.textContent;
            const nomineeData = await fetch(`http://localhost:8000/get_employee_data/${encodeURIComponent(nomineeName)}`, {
                method:"GET",
                headers:{
                  "Content-Type": "application/json",
                },
                credentials: "include",
            });
            console.log(nomineeName);
            const nomineeDataJson = await nomineeData.json()

            sessionStorage.setItem('employeeData', JSON.stringify(nomineeDataJson));

            window.location.href = `/profile`;

        }catch(error){
            console.error("Error getting nominee data:", error);
        }
        // window.location.href = "/profile";
    };
    return (
        <div className="container4" >
            <div className="container4" style={{cursor:"pointer"}} onClick={Profile}>
                <div>
                    <img className=" profilePhoto" alt="Profile Picture" src="PIC/profilePicture.jpg"/>
                </div>
                <div className="info">
                    <h4>Mohamed Tarek 1</h4>
                    <small>Data Scientist - 5 years experience</small>
                </div>
            </div>
            <a className="vote" style={{marginTop:"35px", marginLeft:"600px"}}>vote</a>
        </div>
    )
}