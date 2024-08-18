import React, { useState, useEffect } from 'react';
import './CSS/EmployeeNominationCSS.css';
import Nominee from './Nominee';

export default function Nominate() {
    const [nominees, setNominees] = useState([]);
    const [loading, setLoading] = useState(true);
    const storedData = sessionStorage.getItem('email');
    const userEmail = storedData ? JSON.parse(storedData) : null;

    useEffect(() => {
        async function fetchNominees() {
            if (!userEmail) {
                console.error("User email is not available.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8000/get_nominees/${userEmail}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();
                console.log("Fetched data:", data);

                // Ensure data is an array
                if (Array.isArray(data)) {
                    setNominees(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setNominees([]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error getting nominee data:", error);
                setNominees([]); // Default to empty array on error
                setLoading(false);
            }
        }

        fetchNominees();
    }, [userEmail]); // Added userEmail to the dependency array

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
                {Array.isArray(nominees) && nominees.length > 0 ? (
                    nominees.map((nominee, index) => (
                        <Nominee key={index} nominee={nominee} />
                    ))
                ) : (
                    <p>No nominees available.</p>
                )}
                <div>
                    <br />
                    <button className="redButton">Save</button>
                    <button className="cancelButton">Cancel</button>
                    <br /><br />
                </div>
                <h4>Previous Nomination</h4>
                {/* Uncomment and add real data here if needed */}
                {/* <Nominee />
                <Nominee />
                <Nominee /> */}
            </main>
        </>
    );
}
