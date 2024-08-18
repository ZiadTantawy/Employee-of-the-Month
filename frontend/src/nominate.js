import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CSS/nominate.css";
import "./CSS/nominate2.css";

const Nominate = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailExists, setEmailExists] = useState(null);
  const [users, setUsers] = useState([]);
  const [nomineeEmail, setNomineeEmail] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_non_nominated_users", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_current_user", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, []);

  const handleNomineeChange = async (event) => {
    const nomineeName = event.target.value;
    if (nomineeName) {
      try {
        const response = await fetch(`http://localhost:8000/get_nominee_email/${encodeURIComponent(nomineeName)}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setNomineeEmail(data.email);
      } catch (error) {
        console.error("Error fetching nominee email:", error);
      }
    } else {
      setNomineeEmail("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nomineeName = event.target['nominee-name'].value;
    const nominationReason = event.target['nomination-reason'].value;

    try {
      const emailResponse = await fetch(`http://localhost:8000/check_email/${encodeURIComponent(nomineeEmail)}`, {
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
      const response = await fetch("http://localhost:8000/nominate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nominee_name: nomineeName,
          nominee_email: nomineeEmail,
          nomination_reason: nominationReason,
          your_name: currentUser.name,
          your_email: currentUser.email,
        }),
        credentials: "include",
      });

      if (response.status === 200) {
        setSuccess("Nomination submitted successfully!");
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
        <h2>Nominate a Colleague</h2>
        <form id="nominate-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nominee-name">Nominee's name*</label>
            <select id="nominee-name" name="nominee-name" onChange={handleNomineeChange} required>
              <option value="">Select a nominee</option>
              {users.map(user => (
                <option key={user.email} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nominee-email">Nominee's email*</label>
            <input type="email" id="nominee-email" name="nominee-email" value={nomineeEmail} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="nomination-reason">Reason for nomination*</label>
            <textarea id="nomination-reason" name="nomination-reason" rows="4" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="your-name">Your name*</label>
            <input type="text" id="your-name" name="your-name" value={currentUser.name} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="your-email">Your email*</label>
            <input type="email" id="your-email" name="your-email" value={currentUser.email} readOnly />
          </div>
          <div className="cont">
            <button type="submit" className="btny">
              <span>Submit</span>
              <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" alt="Submit Icon"/>
            </button>
          </div>
          {emailExists && <p className="error" style={{color: "red"}}>Email already exists</p>}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </section>
    </div>
  );
};

export default Nominate;
