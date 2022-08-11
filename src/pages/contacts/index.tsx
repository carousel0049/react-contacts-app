import React, { useState, useEffect, useCallback, memo } from "react";
import "./index.scss";

interface ContactsInterface {
  id: string;
  name: string;
  surname: string;
  department: string;
}

function Contacts() {
  const [contacts, setContacts] = useState<ContactsInterface[]>([]);
  const [addContact, setAddContact] = useState(false);
  const [newNameInput, setNewNameInput] = useState<string>("");
  const [newSurnameInput, setNewSurnameInput] = useState<string>("");
  const [newDepartmentInput, setNewDepartmentInput] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const newContactFormHandler = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setAddContact(!addContact);
      fetch("http://localhost:8000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newNameInput,
          surname: newSurnameInput,
          department: newDepartmentInput,
        }),
      })
        .then((res) => res.json())
        .then((data) => setContacts([...contacts, data]));
      setNewNameInput("");
      setNewSurnameInput("");
      setNewDepartmentInput("");
    },
    [addContact, newDepartmentInput, newSurnameInput, newNameInput, contacts]
  );
  const getContacts = () => {
    fetch("http://localhost:8000/contacts", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((contacts: ContactsInterface[]) => setContacts(contacts));
  };
  const deleteData = (id: string) => {
    fetch(`http://localhost:8000/contacts/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    getContacts();
  };
  const filteredList = contacts.filter(
    (contact) =>
      !searchInput.toLowerCase() ||
      contact.name.toLowerCase() === searchInput.toLowerCase() ||
      contact.surname.toLowerCase() === searchInput.toLowerCase() ||
      contact.department.toLowerCase() === searchInput.toLowerCase()
  );

  const editContactsHandler = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Contact Edited");
  }, []);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="contacts">
      {isEditing && (
        <>
          <div className="contacts__editor-modal">
            <form onSubmit={editContactsHandler}>
              <h1>Edit Contact</h1>
              <div
                className="contacts__editor-modal--close"
                onClick={() => setIsEditing(!isEditing)}
              >
                &times;
              </div>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Surname" />
              <input type="text" placeholder="Department" />
              <button type="submit">Update</button>
            </form>
          </div>
          <div
            className="contacts__overflow"
            onClick={() => setIsEditing(!isEditing)}
          ></div>
        </>
      )}
      <h1 className="contacts__title">Contacts Page</h1>
      <div className="contacts__actions">
        <button
          className="contacts__actions--btn"
          onClick={() => setAddContact(!addContact)}
        >
          {!addContact ? "Add New Contact" : "Close"}
        </button>
        <input
          className="contacts__actions--search"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </div>
      {addContact && (
        <form
          className="contacts__addContact--form"
          onSubmit={newContactFormHandler}
        >
          <input
            type="text"
            id="name"
            placeholder="Name"
            onChange={(e) => setNewNameInput(e.target.value)}
            value={newNameInput}
          />
          <input
            type="text"
            id="surname"
            placeholder="Surname"
            onChange={(e) => setNewSurnameInput(e.target.value)}
            value={newSurnameInput}
          />
          <input
            type="text"
            id="department"
            placeholder="Department"
            onChange={(e) => setNewDepartmentInput(e.target.value)}
            value={newDepartmentInput}
          />
          <button type="submit">Add</button>
        </form>
      )}
      <nav>
        {filteredList.map((contacts: ContactsInterface) => (
          <ul key={contacts.id} className="contacts__main-list">
            <li className="contacts__list">{contacts.name}</li>
            <li className="contacts__list">{contacts.surname}</li>
            <li className="contacts__list">{contacts.department}</li>
            <button
              className="contacts__list--btn btn--edit"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </button>
            <button
              className="contacts__list--btn btn--delete"
              onClick={() => deleteData(contacts.id)}
            >
              Delete
            </button>
          </ul>
        ))}
      </nav>
    </div>
  );
}

export default memo(Contacts);
