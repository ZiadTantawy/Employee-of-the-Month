import React from 'react';
import "./CSS/EmployeeOfTheMonthCSS.css";

export default function EmployeeCard(){
    async function Profile(event){
        try{
            const emailResponse = await fetch(`http://localhost:8000//get_employee_data}`, {
                method:"GET",
                headers:{
                  "Content-Type": "application/json",
                },
                credentials: "include",
              });
        }catch(error){

        }
        window.location.href = "/profile";
    };
    return (
        <div class="container4" >
            <div class="container4" style={{cursor:"pointer"}} onClick={Profile}>
                <div>
                    <img class=" profilePhoto" alt="Profile Picture" src="PIC/profilePicture.jpg"/>
                </div>
                <div class="info">
                    <h4>Mohamed Tarek 1</h4>
                    <small>Data Scientist - 5 years experience</small>
                </div>
            </div>
            <a class="vote" style={{marginTop:"35px", marginLeft:"600px"}}>vote</a>
        </div>
    )
}