import React from 'react';
import "./CSS/EmployeeOfTheMonthCSS.css";

export default function EmployeeCard(){
    return (
        <div class="container">
                    <div>
                        <img class=" profilePhoto" alt="Profile Picture" src="PIC/profilePicture.jpg"/>
                    </div>
                    <div class="info">
                        <h4>Mohamed Tarek 1</h4>
                        <small>Data Scientist - 5 years experience</small>
                    </div>
                    <a class="vote" style={{marginTop:"35px", marginLeft:"600px"}}>vote</a>
        </div>
    )
}