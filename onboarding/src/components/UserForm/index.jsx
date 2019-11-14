import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = props => {
	console.log(props);

	return (
		<Form>
			<label>
				Name:
				<Field type="text" name="name" placeholder="Name please?" />
			</label>
			<br />
			<label>
				Name:
				<Field type="email" name="email" placeholder="Email please?" />
			</label>
			<br />
			<label>
				Password:
				<Field type="password" name="password" />
			</label>
			<br />
			<label>
				Terms:
				<Field type="checkbox" name="terms" />
			</label>
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
		email: Yup.string().required("Please enter your email"),
		password: Yup.string().required("Please enter your password"),
		terms: Yup.boolean().oneOf([true], "Must Accept Terms")
	})
})(UserForm);

export default UserFormWithFormik;
