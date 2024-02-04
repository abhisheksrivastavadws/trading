import React from "react";
import { auth } from "./Components/Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
	const [user] = useAuthState(auth);
	return user ? <Dashboard /> : <Login />;
}

export default App;
