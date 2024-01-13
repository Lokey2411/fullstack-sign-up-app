const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "signup_example",
});

db.connect((err) => {
	if (err) console.log(err);
	else console.log("DB Connect successfully");
});

app.use("/signup", (req, res) => {
	try {
		const { name, email, password } = req.body;
		const selectEmailSQL = "Select * from login where email=?";
		// check if the user's email is already in use
		db.query(selectEmailSQL, [email], (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).json({ ...err, message: "Failure" });
				return;
			}
			// console.log(data.length);
			if (data.length > 0) {
				res.status(500).json({ message: "Email already in use" });
				return;
			} else {
				const sql = `INSERT INTO login (\`name\`, \`email\`, \`password\`) values(?,?,?)`;

				db.query(sql, [name, email, password], (err, data) => {
					if (err) {
						console.log(err);
						return res.status(500).json({ ...err, message: "Failure" });
					}
					// console.log(data);
					return res.status(200).json({ ...data, message: "success" });
				});
			}
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

app.use(`/login`, (req, res) => {
	try {
		const { email, password } = req.body;
		const sql = `SELECT * FROM login where email=?`;
		db.query(sql, [email, password], (err, data) => {
			if (err) {
				// console.log(err);
				console.log(err);
				res.status(500).json(err);
				return;
			}
			if (data.length > 0) {
				res.status(200).json({ message: "success" });
				return;
			} else {
				res.status(404).json({ message: "Fail" });
				return;
			}
		});
	} catch (error) {
		res.status(500).json(error);
		return;
	}
});

app.listen(8081, () => {
	console.log("Listening");
});
