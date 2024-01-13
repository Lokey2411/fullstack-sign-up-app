var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validateEmail = (email) => email.match(validEmailRegex);
const validPasswordRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validatePassword = (password) => password.match(validPasswordRegex);
export const validataion = (values) => {
	let error = {};
	const { email, password } = values;
	if (!email) {
		error.email = "Email shouldn't be empty";
	} else if (!validateEmail(email)) {
		error.email = "Email wrong format";
	} else {
		error.email = "";
	}

	if (!password) {
		error.password = "Password shouldn't be empty";
	} else if (validatePassword(password)) {
		error.password = "Password wrong format";
	} else error.password = "";
	return error;
};
