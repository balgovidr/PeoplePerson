import { useEffect, useState, createContext } from 'react';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from '../functions/firebase';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { collection, getDocs, where, query } from 'firebase/firestore';

const Home = () => {
	const [user, setUser] = useState(undefined);
	const [contacts, setContacts] = useState([]);

	const AuthContext = createContext(undefined)

    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
			  setUser(user)
			  
			  // Fetch a list of contacts the user has created
			  setContacts(fetchUserContacts(uid))
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
		<div className='flex flex-col w-full h-screen'>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						PeoplePerson
					</Typography>
				</Toolbar>
			</AppBar>
			<div className='flex flex-col'>
				{contacts.length > 0 ?
				contacts.map((contact, index) => {
					return (
						<div>
							{contact}
						</div>
					)
				})
				:
				<div>You haven't created any contacts.</div>}
			</div>
		</div>
	</AuthContext.Provider>
  )
}

export default Home