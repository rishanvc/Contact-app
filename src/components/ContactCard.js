import React from "react";
import user1 from "../images/user1.jpeg";
import { Link, useNavigate } from "react-router-dom";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  const navigate = useNavigate();

  return (
    <div
      className="item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "10px 16px", // adds spacing inside the item
      }}
    >
      <img className="ui avatar image" src={user1} alt="user"></img>

      <div className="content" style={{ flexGrow: 1 }}>
        <Link
          to={`/contact/${id}`}
          state={{ contact: { id, name, email } }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>

      <Link
          to={`/edit/${id}`}
          state={{ contact: { id, name, email } }}
          style={{ textDecoration: "none", color: "inherit" }}
        >

      <i
        className="edit alternate outline icon"
        style={{
          color: "blue",
          cursor: "pointer",
          marginLeft: "auto", // 👈 pushes it all the way to the right
        }}
        
      ></i>
      </Link>

      <i
        className="trash alternate outline icon"
        style={{
          color: "red",
          cursor: "pointer",
          marginLeft: "10px", // 👈 pushes it all the way to the right
        }}
        onClick={() =>
          navigate("/delete", {
            state: { id }, // ✅ Only plain data
          })
        }
      ></i>
    </div>
  );
};

export default ContactCard;
