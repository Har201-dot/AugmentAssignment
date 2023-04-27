import express from "express";
import { getTasksByUserId } from "../controllers/admin.js";

const router = express.Router();

// router.get("/is_admin",get)
router.get("/:userId", getTasksByUserId);

export default router;
