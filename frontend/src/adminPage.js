import React, { useEffect, useState } from "react";
import './CSS/AdminPage.css';
import { useNavigate, Link } from "react-router-dom";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(null); // Use null to indicate loading
  const [error, setError] = useState(null); // For error handling
  const [nominees, setNominees] = useState([]);
  const navigate = useNavigate();

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), 1);
  const formattedStartDate = startDate.toDateString(); // Convert to a string
  
  const endDate = new Date();
  endDate.setFullYear(startDate.getFullYear(), startDate.getMonth() + 1, 0);
  const formattedEndDate = endDate.toDateString(); // Convert to a string
  
  const handleProfileClick = async (nominee) => {
    try {
      const nomineeData = await fetch(`http://localhost:8000/get_employee_data/${encodeURIComponent(nominee.name)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const nomineeDataJson = await nomineeData.json();

      // Store nominee data in session storage
      sessionStorage.setItem('employeeData', JSON.stringify(nomineeDataJson));

      // Redirect to the profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error getting nominee data:", error);
    }
  };

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
            navigate("/"); // Redirect to home page if not an admin
          }
        } else {
          throw new Error("Failed to fetch admin status");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setError("An error occurred. Redirecting to home page.");
        setIsAdmin(false); // Set isAdmin to false to trigger redirect
        navigate("/"); // Redirect to home page on error
      }
    };

    checkAdminStatus();
  }, [navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetch("http://localhost:8000/nominees", {
        method: "GET",
        credentials: "include",
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setNominees(data.nominees || []);
        })
        .catch(error => {
          console.error('Error fetching nominees:', error);
          setError(`Failed to load nominees. ${error.message}`);
        });
    }
  }, [isAdmin]);

  if (isAdmin === null) {
    return <p>Loading...</p>; // Display loading message while checking
  }

  if (isAdmin === false) {
    return <p>Access Denied</p>; // Optionally handle non-admin access denial
  }

  return (
    <div>
      <div className="admin-side-bar" id="sidebar">
        <ul>
          <li className="admin-side-link"><a href="#">Voting</a></li>
          <li className="admin-side-link"><a href="#">Nominees</a></li>
          <li className="admin-side-link"><a href="#">Winner</a></li>
          <li className="admin-side-link"><a href="#">Settings</a></li>
          <li className="admin-side-link"><Link to="/addUser">Add User</Link></li>
        </ul>
        <div className="admin-dates">
          <div className="admin-date">
            <p className="admin-subtitle">Vote Started on</p>
            <p className="admin-pdate">{formattedStartDate}</p>
          </div>
          <div className="admin-date">
            <p className="admin-subtitle">Vote ends on</p>
            <p className="admin-pdate">{formattedEndDate}</p>
          </div>
        </div>
      </div>
      <div className="admin-employee-votes">
        <h2>Employee of the Month</h2>
        <h4>Current Voting</h4>
        {error && <p className="error">{error}</p>}
        {nominees.map((nominee, index) => (
          <div key={index} className="admin-nominee" onClick={() => handleProfileClick(nominee)}>
            <img src={require("./PIC/profilePic.jpg")} alt="Profile Picture" />
            <div className="admin-text">
              <p className="admin-name">{nominee.name}</p>
              <p className="admin-votes">Votes: {nominee.vote_count} <span className="admin-percent">{nominee.percentage.toFixed(2)}%</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
