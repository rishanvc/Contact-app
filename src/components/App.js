import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import DeleteConfirmation from "./DeleteConfirmation";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    setContacts(
      contacts.map((c) => {
        return c.id === contact.id ? { ...response.data } : c;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }else{
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    // const retrieveContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (retrieveContacts) setContacts(retrieveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    // if (contacts.length > 0) {
    //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    // }
  }, [contacts]);

  return (
    <div className="ui container" style={{ marginTop: "90px" }}>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route path="/contact/:id" element={<ContactDetail />} />

          <Route
            path="/delete"
            element={<DeleteConfirmation getContactId={removeContactHandler} />}
          />

          <Route
            path="/edit/:id"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//hi hello 
