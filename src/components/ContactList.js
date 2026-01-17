import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputEl = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  const renderContactlist = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });

  return (
    <div className="main">
      <div
        className="ui flex header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Contact List</h2>
        <Link to="/add">
          <button className="ui button blue">Add Contact</button>
        </Link>
      </div>
      <div className="ui search">
        <div className="ui icon input" style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="search contacts"
            ref={inputEl}
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list">{renderContactlist.length > 0 ? renderContactlist : "No Contacts Available"}</div>
    </div>
  );
};

export default ContactList;
