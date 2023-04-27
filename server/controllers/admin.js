import Task from "../models/Task.js";

export const getTasksByUserId = async (req, res, next) => {
	const userId = req.params.userId;
	try {
		const tasks = await Task.find({ user: userId });
		// console.log(tasks);
		return res.status(200).json(tasks);
	} catch (err) {
		return next(err);
	}
};

export const isAdmin = async (req, res, next) => {};
