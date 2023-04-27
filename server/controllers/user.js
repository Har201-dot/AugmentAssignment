import User from "../models/User.js";
import bcryptjs from "bcryptjs";

export const getUserInfo = async (req, res, next) => {
	try {
		const data = await User.findById(req.user.id).select(
			"name email tasks phone role"
		);

		return res.status(200).json(data);
	} catch (err) {
		return next(err);
	}
};

export const updateUser = async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.user.id);
		if (foundUser) {
			const salt = await bcryptjs.genSalt(10);
			const hashedPassword = await bcryptjs.hash(req.body.password, salt);
			if (req.body.name) foundUser.name = req.body.name;
			if (req.body.password) foundUser.password = hashedPassword;
			if (req.body.phone) foundUser.phone = req.body.phone;
			if (req.body.email) foundUser.email = req.body.email;
			await foundUser.save();
			return res.status(200).json({
				updateUserName: foundUser.name,
				updateUserPhone: foundUser.phone,
			});
		} else {
			return res
				.status(401)
				.json({ message: "Ran into error while updating user" });
		}
	} catch (err) {
		return next(err);
	}
};
