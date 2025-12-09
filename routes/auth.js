const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.json({ message: "User registered" });
	}
	res.status(400).json({ error.message });
	}
});

router.post("/login", async (req, res) => {
	console.log("Login request received:", req.body);
		const user = await User.findOne({ email });
		console.log("MongoDB query result: ", user);

		if (!user) return res.status(404),json({ message: "User not found"

		const match = await user.comparePassword(password);
		if (!match) return res.status(400).json({ message: "Incorrect password" });
		
		res.json({ message: "Login successful" });
		} catch (err) {
		res.status(500).json({ error: err.message });
		}
});

module.exports = router;
