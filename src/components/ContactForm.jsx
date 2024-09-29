import React, { useContext, useEffect, useState } from 'react';
import { collection, addDoc, doc } from 'firebase/firestore';
import { AuthContext } from './Home';
import { Header } from './Header';
import {FormField} from './FormField'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../functions/firebase';

function ContactForm(contactID = undefined) {
  const [fields, setFields] = useState({});
  const [user, setUser] = useState(undefined);

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
          // Forward user to the login page
          navigate('/login')
        }
      });

}, [])

  useEffect(() => {
    if (contactID) {
        fetchContactDetails(contactID)
    }
  }, [])

  async function fetchContactDetails(contactID) {
    const contactsRef = doc(db, 'contacts', contactID);

    const docSnap = await getDoc(contactsRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        setFields(data)
    } else {
        console.log('No such document!');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactsRef = collection(db, 'contacts');

    const response = await addDoc(contactsRef, {...fields, 'creatorID': user.uid});

    debugger;
    if (response) {

    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <Header />
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-3'>
        <FormField fields={fields} setFields={setFields} fieldName='first_name' type='text' required={true} />

        <FormField fields={fields} setFields={setFields} fieldName='last_name' type='text' />

        <FormField fields={fields} setFields={setFields} fieldName='date_last_met' type='date' />

        <FormField fields={fields} setFields={setFields} fieldName='met_where' type='text' />

        <FormField fields={fields} setFields={setFields} fieldName='what_do_they_want_from_life' type='textarea' />

        <FormField fields={fields} setFields={setFields} fieldName='what_do_they_want_from_you' type='textarea' />

        <FormField fields={fields} setFields={setFields} fieldName='additional_notes' type='textarea' />

        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default ContactForm;