import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../functions/firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
              // Forward user to the login page
              navigate('/login')
            }
          });

    }, [])

  return (
    <section>        
        Home
    </section>
  )
}

export default Home