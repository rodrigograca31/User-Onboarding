import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserFormWithFormik from "./components/UserForm";

function App() {
	const [users, setUsers] = useState([
		{
			id: 1,
			email: "rodrigo@mail.com",
			name: "rodrigo"
		}
	]);

	return (
		<div className="App">
			<UserFormWithFormik
				users={users}
				setUsers={setUsers}
			></UserFormWithFormik>
			<hr />
			{users.map(user => {
				return (
					<div>
						<p>
							{user.name} - {user.email} - {user.id}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export default App;
