import { useEffect, useState, createContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../functions/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Header } from './Header';

export const AuthContext = createContext(undefined)

const Home = () => {
	const [user, setUser] = useState(undefined);
	const [contacts, setContacts] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
			  setUser(user)
			  
			  // Fetch a list of contacts the user has created
			  const contactsList = await fetchUserContacts(uid)
			  setContacts(contactsList)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
              // Forward user to the login page
              navigate('/login')
            }
          });

    }, [])

	async function fetchUserContacts(uid) {
		const contactsRef = collection(db, 'contacts');
		const q = query(contactsRef, where('creatorID', '==', uid));
	  
		const querySnapshot = await getDocs(q);
		const contacts = [];
	  
		querySnapshot.forEach((doc) => {
		  contacts.push({ id: doc.id, ...doc.data() });
		});
	  
		return contacts;
	}

  return (
	<AuthContext.Provider value={user}>
		<div className='flex flex-col w-full max-h-screen'>
			<Header />
			<div className='flex flex-col overflow-y-scroll'>
				{contacts.length > 0 ?
				contacts.map((contact, index) => {
					return (
						<a onClick={() => navigate('/contact-form?id=' + contact.id)} className='py-3 mx-3 border-b border-gray-400 text-gray-800'>
							{contact.first_name + (contact.last_name ? (' ' + contact.last_name) : '')}
						</a>
					)
				})
				:
				<div>You haven't created any contacts.</div>}
			</div>
			<Fab color="primary" aria-label="add" sx={{position: 'absolute', bottom: '15px', right: '15px'}} href='/contact-form'>
				<AddIcon />
			</Fab>
		</div>
	</AuthContext.Provider>
  )
}

export default Home