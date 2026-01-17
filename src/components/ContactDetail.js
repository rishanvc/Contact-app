import React from "react";
import user2 from "../images/user2.jpg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ContactDetail = () => {
  const location = useLocation();
  const contact = location.state?.contact; // use optional chaining

  // fallback (if contact data missing)
  if (!contact) {
    return (
      <div className="main" style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No contact details available</h2>
        <Link to="/">
          <button className="ui button blue">Back to Contact List</button>
        </Link>
      </div>
    );
  }

  const { name, email } = contact;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user2} alt="user"></img>
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
