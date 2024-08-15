import React, { useState } from 'react';
import "./CSS/nominate.css";
import "./CSS/nominate2.css";

const Nominate = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailExists, setEmailExists] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const nomineeName = event.target['nominee-name'].value;
    const nomineeEmail = event.target['nominee-email'].value;
    const nominationReason = event.target['nomination-reason'].value;
    const yourName = event.target['your-name'].value;
    const yourEmail = event.target['your-email'].value;
    try {
        const emailResponse = await fetch(`/check_email/${nomineeEmail}`);
        const emailData = await emailResponse.json();
        if (emailData.exists) {
          setEmailExists(true);
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
          your_name: yourName,
          your_email: yourEmail
        }),
        credentials: "include",
      });

      if (response.status === 200) {
        
        setSuccess("Nomination submitted successfully!");
        setError("");
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
            <input type="text" id="nominee-name" name="nominee-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="nominee-email">Nominee's email*</label>
            <input type="email" id="nominee-email" name="nominee-email" required />
          </div>
          <div className="form-group">
            <label htmlFor="nomination-reason">Reason for nomination*</label>
            <textarea id="nomination-reason" name="nomination-reason" rows="4" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="your-name">Your name*</label>
            <input type="text" id="your-name" name="your-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="your-email">Your email*</label>
            <input type="email" id="your-email" name="your-email" required />
          </div>
          <div className="cont">
            <button type="submit" className="btny">
              <span>Submit</span>
              <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" alt="Submit Icon"/>
            </button>
          </div>
          {emailExists && <p className="error">Email already exists</p>}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </section>
    </div>
  );
};

export default Nominate;
