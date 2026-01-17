import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteConfirm = ({ getContactId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {}; // only id, no function

  if (!id) {
    navigate("/");
    return null;
  }

  const handleConfirm = () => {
    getContactId(id); // ✅ directly call from props
    navigate("/"); // go back to contact list
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Are you sure you want to delete this contact?</h2>
      <div style={{ marginTop: "20px" }}>
        <button className="ui button red" onClick={handleConfirm}>
          Yes, Delete
        </button>
        <button className="ui button blue" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
