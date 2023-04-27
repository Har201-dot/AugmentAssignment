import express from "express";
import taskRoutes from "./tasks.js";
import authRoutes from "./auth.js";
import usersRoutes from "./users.js";
import adminRoutes from "./admin.js";
import checkAuth from "../utils/checkAuth.js";
// import tasksRoutes from './tasks.js';

const router = express.Router();

// router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);
router.use("/users", checkAuth, usersRoutes);
router.use("/tasks", checkAuth, taskRoutes);

export default router;
