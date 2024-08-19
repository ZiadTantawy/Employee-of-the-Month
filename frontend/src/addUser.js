import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CSS/nominate.css";
import "./CSS/nominate2.css";

const AddUser = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [emailExists, setEmailExists] = useState(null);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "", 
    });
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await fetch("http://localhost:8000/is_admin", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.isAdmin) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                        navigate("/");
                    }
                } else {
                    throw new Error("Failed to fetch admin status");
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                setError("An error occurred. Redirecting to home page.");
                setIsAdmin(false);
                navigate("/");
            }
        };

        checkAdminStatus();
    }, [navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setNewUser(prevState => {
            const updatedUser = { ...prevState, [name]: value };
    
            if (name === "name") {
                const email = value.toLowerCase().replace(/ /g, '.') + "@e.com";
                updatedUser.email = email;
            }
    
            return updatedUser;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const emailResponse = await fetch(`http://localhost:8000/check_email/${encodeURIComponent(newUser.email)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const emailData = await emailResponse.json();

            if (emailData.exists) {
                setEmailExists(true);
                setSuccess("");
                return;
            } else {
                setEmailExists(false);
            }
        } catch (error) {
            console.error("Error checking email:", error);
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
                credentials: "include",
            });

            if (response.status === 200) {
                setSuccess("User added successfully!");
                setError("");
                navigate('/');
            } else {
                const result = await response.json();
                setError(result.message);
                setSuccess("");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="container">
            <section className="form-section">
                <h2>Add a New User</h2>
                <form id="add-user-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name*</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newUser.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            required
                            readOnly // Make the email field read-only
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="cont">
                        <button type="submit" className="btny">
                            <span>Submit</span>
                            <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" alt="Submit Icon" />
                        </button>
                    </div>
                    {emailExists && <p className="error" style={{ color: "red" }}>Email already exists</p>}
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                </form>
            </section>
        </div>
    );
};

export default AddUser;
