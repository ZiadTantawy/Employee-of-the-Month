import React, { useState, useEffect } from 'react';
import './CSS/EmployeeNominationCSS.css';
import Nominee from './Nominee';
import Profile from './profile';

export default function Nominate() {
    const [nominees, setNominees] = useState([]);
    const [loading, setLoading] = useState(true);
    const storedData = sessionStorage.getItem('email');
    const userEmail = storedData ? JSON.parse(storedData) : null;
    useEffect(() => {
        async function fetchNominees() {
            try {
                const nomineesData = await fetch(`http://localhost:8000/get_nominees/${userEmail}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await nomineesData.json();
                console.log(data);
                setNominees(data);
                setLoading(false);
            } catch (error) {
                console.error("Error getting nominee data:", error);
                setLoading(false);
            }
        }

        fetchNominees();
        console.log(nominees);
    }, []);

    function handleNominate() {
        window.location.href = "/nominate";
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main className="nomination">
                <h1>Nomination</h1>
                <small>
                    Employees can nominate their colleagues for employee of the month.
                    Nominations are anonymous. You can also nominate employees
                    yourself.
                </small>
                <div className="nominationContainer" style={{ marginTop: "20px", marginBottom: "10px" }}>
                    <button
                        className="photo"
                        style={{ borderRadius: "8px", backgroundColor: "rgb(231, 231, 231)", width: "40px", height: "40px", fontSize: "16px" }}
                        onClick={handleNominate}
                    >
                        +
                    </button>
                    <div className="info">
                        <h4>Nominate employees</h4>
                        <small>You can nominate up to 3 employees this month</small>
                    </div>
                </div>
                {nominees.map((nominee, index) => (
                    <Nominee key={index} nominee={nominee} />
                ))}
                <div>
                    <br />
                    <button className="redButton">Save</button>
                    <button className="cancelButton">Cancel</button>
                    <br /><br />
                </div>
                <h4>Previous Nomination</h4>
                {/* Assuming you'd want to display previous nominations here */}
                {/* <Nominee />
                <Nominee />
                <Nominee /> */}
            </main>
        </>
    );
}
