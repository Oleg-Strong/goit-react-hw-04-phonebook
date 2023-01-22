import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import css from './App.module.css';
import Section from './Section';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Natification from './Natification';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const initialContacts = JSON.parse(localStorage.getItem('contacts'));
  const [contacts, setContacts] = useState(initialContacts ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkContactBeforeAdding = contact => {
    const { name, number } = contact;
    const normalazetName = name.toLowerCase().split(' ').join('');
    const normalazetNumber = number.split('-').join('');
    const existingName = contacts.some(
      ({ name }) => name.toLowerCase().split(' ').join('') === normalazetName
    );
    const existingNumber = contacts.some(
      ({ number }) => number.split('-').join('') === normalazetNumber
    );
    if (existingName || existingNumber) {
      toast.warn(
        `${existingNumber ? number : name} is already in contacts!!!`,
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        }
      );
      return;
    }
    addContact(contact);
  };

  const addContact = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    setContacts(contacts => (contacts = [newContact, ...contacts]));
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  const changeFilter = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts
      .filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
      .sort((firstContact, secondContact) =>
        firstContact.name.localeCompare(secondContact.name)
      );
  };

  return (
    <div className={css.appConteiner}>
      <Section title="Phonebook">
        <ContactForm onSubmit={checkContactBeforeAdding}></ContactForm>
      </Section>
      <Section title="Contacts">
        <Filter name={filter} onFilterChange={changeFilter}></Filter>
        {getFilteredContacts().length === 0 ? (
          <Natification title={filter}></Natification>
        ) : (
          <ContactList
            phonebook={getFilteredContacts()}
            onDeleteContact={deleteContact}
          ></ContactList>
        )}
      </Section>
      <ToastContainer />
    </div>
  );
};
export default App;
