import express from "express";
import { getUserInfo, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/user", getUserInfo);
router.put("/user", updateUser);

export default router;
