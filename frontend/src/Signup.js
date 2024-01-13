import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validataion } from "./SignUpValidation";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const handleChange = (event) => {
		setValues((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		setErrors(validataion(values));
		const validatedValues = validataion(values);
		const isError = validatedValues.email || validatedValues.name || validatedValues.password;
		if (!isError)
			axios
				.post("http://localhost:8081/signup", values)
				.then((res) => {
					console.log(res.data);
					if (res.data.message === "success") navigate("/");
					else alert("sign up fail");
				})
				.catch(() => {
					alert("Sign up fail");
				});
	};
	return (
		<div className="d-flex w-100 vh-100 bg-primary justify-content-center align-items-center">
			<div className="bg-white p-3 rounded w-25">
				<h2>Sign-up</h2>
				<form>
					<div className="mb-3">
						<label htmlFor="name">
							<strong>Name</strong>
						</label>
						<input
							type="text"
							placeholder="Enter Name"
							name="name"
							className="form-control rounded-0"
							onChange={handleChange}
						/>
						{errors.name && <span className="text-danger">{errors.name}</span>}
					</div>
					<div className="mb-3">
						<label htmlFor="email">
							<strong>Email</strong>
						</label>
						<input
							type="text"
							placeholder="Enter Email"
							name="email"
							className="form-control rounded-0"
							onChange={handleChange}
						/>
						{errors.email && <span className="text-danger">{errors.email}</span>}
					</div>
					<div className="mb-3">
						<label htmlFor="password">
							<strong>Password</strong>
						</label>
						<input
							type="password"
							placeholder="Enter Password"
							name="password"
							className="form-control rounded-0"
							onChange={handleChange}
							autoComplete={values.password}
						/>
						{errors.password && <span className="text-danger">{errors.password}</span>}
					</div>
					<button
						type="button"
						className="btn btn-success w-100 rounded-0"
						onClick={handleSubmit}
					>
						Sign up
					</button>
					<p>You are agree to our terms and policies</p>
					<Link
						to="/"
						className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none "
					>
						Log in
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Signup;
