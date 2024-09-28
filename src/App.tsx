import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Home from "./components/Home";
import Signup from "./components/SignUp";
import Login from "./components/LogIn";

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
], {
	basename: '/PeoplePerson'
});

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
