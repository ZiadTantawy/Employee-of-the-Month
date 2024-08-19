import { useEffect, useState } from "react";
import "./CSS/EmployeeOfTheMonthCSS.css";
import EmployeeCard from "./EmployeeCard";

export default function Employees() {
    const [currentNominees, setCurrentNominees] = useState([]);

    useEffect(() => {
        async function getCurrentNominees() {
            try {
                const response = await fetch("http://localhost:8000/get_all_current_nominees", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();
                console.log("Fetched Data:", data);

                // Set state with the fetched data
                setCurrentNominees(data.length > 0 ? data : []);
            } catch (error) {
                console.error("Error getting nominee data:", error);
                setCurrentNominees([]);
            }
        }

        getCurrentNominees();
    }, []); // Ensure this runs only once on component mount

    return (
        <main className="item">
            <h1>Employee Of the Month</h1>
            <small>Vote for your favorite employee</small>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {currentNominees.length > 0 ? (
                    currentNominees.map((nominee, index) => (
                        <EmployeeCard key={index} nominee={nominee} />
                    ))
                ) : (
                    <p>No nominees available.</p>
                )}
            </div>
        </main>
    );
}
