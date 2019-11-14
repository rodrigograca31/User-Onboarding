import React from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = props => {
	console.log(props);
	const { values, errors, touched } = props;

	return (
		<Form>
			<label>
				Name:
				<Field type="text" name="name" placeholder="Name please?" />
			</label>
			{touched.name && errors.name}
			<br />
			<label>
				Email:
				<Field type="email" name="email" placeholder="Email please?" />
			</label>
			{touched.email && errors.email}
			<br />
			<label>
				Password:
				<Field type="password" name="password" />
			</label>
			{touched.password && errors.password}
			<br />
			<label>
				Terms:
				<Field type="checkbox" name="terms" />
			</label>
			{touched.terms && errors.terms}
			<br />
			<input type="submit" value="Send" />
		</Form>
	);
};

const UserFormWithFormik = withFormik({
	mapPropsToValues() {
		return {
			name: "",
			email: "",
			password: "",
			terms: false
		};
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Please enter your first name"),
		email: Yup.string()
			.email()
			.required("Please enter your email"),
		password: Yup.string()
			.min(8, "At least 8 chars")
			.required("Please enter your password"),
		terms: Yup.boolean().oneOf([true], "Must Accept Terms")
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
