import express from "express";
import {
	createTask,
	deleteTask,
	getAllTasks,
	getCurrentUserTasks,
	updateTask,
} from "../controllers/tasks.js";

const router = express.Router();

router.post("/", createTask);
router.get("/all", getAllTasks);
router.get("/user", getCurrentUserTasks);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
// router.get("/allusers",checkAdmin,getAllUsersTasks);

export default router;
