import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import UserFormWithFormik from "./components/UserForm";
import { Container, Row, Col } from "reactstrap";

function App() {
	const [users, setUsers] = useState([
		{
			id: 1,
			email: "rodrigo@mail.com",
			name: "rodrigo",
			role: "admin"
		}
	]);

	return (
		<div className="App">
			<Container>
				<Row>
					<Col md={{ size: 8, offset: 2 }}>
						<UserFormWithFormik
							users={users}
							setUsers={setUsers}
						></UserFormWithFormik>
						<hr />
						<h1>USERS:</h1>
						{/* <hr /> */}
						<div className="users">
							{users.map(user => {
								return (
									<p>
										{user.name} - {user.email} - {user.id} -{" "}
										{user.role}
									</p>
								);
							})}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
