import React from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { Button, Label, Input, FormGroup, Alert } from "reactstrap";

const UserForm = props => {
	console.log(props);
	const { values, errors, touched } = props;

	return (
		<Form>
			<FormGroup>
				<Label>Name:</Label>
				<Field
					name="name"
					render={({ field, form: { touched, errors } }) => (
						<>
							<Input
								{...field}
								type="text"
								placeholder="Name please?"
							/>
							{touched[field.name] && errors[field.name] && (
								<Alert color="danger">
									{errors[field.name]}
								</Alert>
							)}
						</>
					)}
				/>
				{/* {touched.name && errors.name} */}
			</FormGroup>
			<FormGroup>
				<Label>Last name:</Label>
				<Field
					name="lname"
					render={({ field, form: { touched, errors } }) => (
						<>
							<Input
								{...field}
								type="text"
								placeholder="Last Name please?"
							/>
							{touched[field.name] && errors[field.name] && (
								<Alert color="danger">
									{errors[field.name]}
								</Alert>
							)}
						</>
					)}
				/>
				{/* {touched.name && errors.name} */}
			</FormGroup>
			<FormGroup>
				<Label>Age:</Label>
				<Field
					name="age"
					render={({ field, form: { touched, errors } }) => (
						<>
							<Input
								{...field}
								type="number"
								placeholder="Age please?"
							/>
							{touched[field.name] && errors[field.name] && (
								<Alert color="danger">
									{errors[field.name]}
								</Alert>
							)}
						</>
					)}
				/>
				{/* {touched.name && errors.name} */}
			</FormGroup>
			<FormGroup>
				<Label>Email:</Label>
				<Field
					name="email"
					render={({ field, form: { touched, errors } }) => (
						<>
							<Input
								{...field}
								type="email"
								placeholder="Email please?"
							/>
							{touched[field.name] && errors[field.name] && (
								<Alert color="danger">
									{errors[field.name]}
								</Alert>
							)}
						</>
					)}
				/>
				{/* {touched.email && errors.email} */}
			</FormGroup>
			<FormGroup>
				<Label>Password:</Label>
				<Field
					name="password"
					render={({ field, form: { touched, errors } }) => (
						<>
							<Input {...field} type="password" />
							{touched[field.name] && errors[field.name] && (
								<Alert color="danger">
									{errors[field.name]}
								</Alert>
							)}
						</>
					)}
				/>
				{/* {touched.password && errors.password} */}
			</FormGroup>
			<FormGroup>
				<Label>Terms:</Label>
				<Field
					name="terms"
					render={({ field, form: { touched, errors } }) => (
						<>
							<input
								{...field}
								type="checkbox"
								checked={field.value}
							/>
							{touched[field.name] && errors[field.name] && (
								<Alert color="danger">
									{errors[field.name]}
								</Alert>
							)}
						</>
					)}
				/>
				{/* {touched.terms && errors.terms} */}
			</FormGroup>
			<FormGroup>
				<Label>Role:</Label>
				<Field
					name="role"
					render={({ field, form: { touched, errors } }) => (
						<>
							<Input type="select" {...field}>
								<option value="choose">Choose One</option>
								<option value="admin">Admin</option>
								<option value="user">User</option>
							</Input>
							{touched[field.name] && errors[field.name] && (
								<Alert color="danger">
									{errors[field.name]}
								</Alert>
							)}
						</>
					)}
				/>
				{/* {touched.terms && errors.terms} */}
			</FormGroup>
			<Button type="submit" value="Send" color="success">
				Save User!
			</Button>
		</Form>
	);
};

const UserFormWithFormik = withFormik({
	mapPropsToValues() {
		return {
			name: "",
			lname: "",
			age: "",
			email: "",
			password: "",
			terms: false,
			role: ""
		};
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Please enter your first name"),
		lname: Yup.string().required("Please enter your last name"),
		age: Yup.number()
			.min(18, "You must be older than 18")
			.max(99, "You must be younger than 99")
			.required("Please enter your age"),
		email: Yup.string()
			.email()
			.required("Please enter your email")
			.notOneOf(["waffle@syrup.com"], "That email is already taken"),
		password: Yup.string()
			.min(8, "At least 8 chars")
			.required("Please enter your password"),
		terms: Yup.boolean().oneOf([true], "Must Accept Terms"),
		role: Yup.string()
			.oneOf(["admin", "user"], "Please choose a role")
			.required("Please choose a role")
	}),

	handleSubmit(values, tools) {
		console.log("submited");
		console.log(values, tools);

		axios
			.post("https://reqres.in/api/users", values)
			.then(res => {
				console.log(res.data);
				tools.props.setUsers([...tools.props.users, res.data]);
				tools.resetForm();
			})
			.catch(err => {
				console.log(err);
			});
	}
})(UserForm);

export default UserFormWithFormik;
