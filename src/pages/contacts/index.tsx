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

  useEffect(() => {
    fetch("http://localhost:8000/contacts", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((contacts: ContactsInterface[]) => setContacts(contacts));
  }, []);

  return (
    <div className="contacts">
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
        {contacts?.map((contacts: ContactsInterface) => (
          <ul key={contacts.id} className="contacts__main-list">
            <li className="contacts__list">{contacts.name}</li>
            <li className="contacts__list">{contacts.surname}</li>
            <li className="contacts__list">{contacts.department}</li>
            <button className="contacts__list--btn btn--edit">Edit</button>
            <button className="contacts__list--btn btn--delete">Delete</button>
          </ul>
        ))}
      </nav>
    </div>
  );
}

export default memo(Contacts);
