import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import createErr from "../utils/createError.js";

export const register = async (req, res, next) => {
	if (!req.body.name || !req.body.email || !req.body.password) {
		return next(
			createErr({ status: 400, message: "Name email password is required" })
		);
	}

	try {
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(req.body.password, salt);

		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			phone: req.body.phone,
			role: req.body.role === "admin" ? "admin" : "user",
		});
		await newUser.save();
		return res.status(200).json("New User Created");
	} catch (err) {
		console.log("couldnt create user", err);
		return next(err);
	}
};

export const login = async (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		return next(
			createErr({ statusCode: 400, message: "email or password is missing" })
		);
	}

	try {
		const user = await User.findOne({ email: req.body.email }).select(
			"name email password"
		);
		if (!user) {
			return next(createErr({ status: 404, message: "No user found" }));
		}
		const isPasswordCorrect = await bcryptjs.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordCorrect) {
			return next(createErr({ status: 404, message: "Password is incorrect" }));
		}

		//cookie payload
		const payload = {
			id: user._id,
			name: user.name,
			role: user.role,
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		console.log("logged in");
		return res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json({ message: "logged in successfully" });
	} catch (err) {
		console.log("couldnt log you in", err);
		return next(err);
	}
};

export const logout = (req, res) => {
	res.clearCookie("access_token");
	return res.status(200).json({ message: "logout successfull" });
};

export const isLoggedIn = (req, res) => {
	const token = req.cookies.access_token;
	console.log(token);
	if (!token) {
		return res.json(false);
	}

	return jwt.verify(token, process.env.JWT_SECRET, (err) => {
		if (err) {
			return res.json(false);
		}
		return res.json(true);
	});
};
