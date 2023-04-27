import jwt from "jsonwebtoken";
import createErr from "./createError.js";
import User from "../models/User.js";

export default (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) {
		return next(createErr({ status: 401, message: "Unauthorized" }));
	}

	return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return next(createErr({ status: 401, message: "Invalid Token" }));
		} else {
			const user = await User.findOne({ _id: decoded.id });
			if (user.role === "admin") {
				return res.status(200).json({ role: "admin" });
			}
			console.log(user);
			req.user = decoded;

			return next();
		}
	});
};
