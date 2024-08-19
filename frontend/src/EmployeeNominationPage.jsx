import React, { useState, useEffect } from 'react';
import './CSS/EmployeeNominationCSS.css';
import Nominee from './Nominee';

export default function Nominate() {
    const [nominees, setNominees] = useState([]);
    const [previousNominees, setPreviousNominees] = useState([]);
    const [loadingNominees, setLoadingNominees] = useState(true);
    const [loadingPreviousNominees, setLoadingPreviousNominees] = useState(true);

    useEffect(() => {
        async function fetchNominees() {
            try {
                // to fetch current nominees
                const response = await fetch("http://localhost:8000/get_nominees", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const currentNominees = await response.json();
                console.log("Current Nominees:", currentNominees);
                setNominees(currentNominees.length > 0 ? currentNominees : []);

                //to fetch the previous nominees
                const response1 = await fetch("http://localhost:8000/get_previous_nominees", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const previousNominees = await response1.json();
                console.log("Previous Nominees:", previousNominees);
                setPreviousNominees(previousNominees.length > 0 ? previousNominees : []);
            } catch (error) {
                console.error("Error getting nominee data:", error);
                setNominees([]);
                setPreviousNominees([]);
            } finally {
                setLoadingNominees(false);
                setLoadingPreviousNominees(false);
            }
        }

        fetchNominees();
    }, []);

    function handleNominate() {
        window.location.href = "/nominate";
    }

    if (loadingNominees || loadingPreviousNominees) {
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
                {nominees.length > 0 ? (
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
                {previousNominees.length > 0 ? (
                    previousNominees.map((nominee, index) => (
                        <Nominee key={index} nominee={nominee} />
                    ))
                ) : (
                    <p>No nominees available.</p>
                )}
            </main>
        </>
    );
}
