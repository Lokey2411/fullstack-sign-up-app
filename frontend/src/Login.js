import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validataion } from "./LoginValidation";
import axios from "axios";

const Login = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const handleChange = (event) => {
		setValues((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value.trim(),
		}));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		setErrors(validataion(values));
		const validatedValues = validataion(values);
		const isError = validatedValues.email || validatedValues.password;
		if (!isError) {
			axios
				.post(`http://localhost:8081/login`, values)
				.then((res) => {
					if (res.data.message === "success") navigate("/home");
					else console.log("This is not an account that emailed", values);
				})
				.catch(console.log);
		}
	};

	return (
		<div className="d-flex w-100 vh-100 bg-primary justify-content-center align-items-center">
			<div className="bg-white p-3 rounded w-25">
				<h2>Sign-in</h2>
				<form>
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
						Log in
					</button>
					<p>You are agree to our terms and policies</p>
					<Link
						to="/signup"
						className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none "
					>
						Create Account
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
