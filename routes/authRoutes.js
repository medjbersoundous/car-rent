import express from "express";
import { register, login, registerAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/admin", registerAdmin)
router.post("/login", login);

export default router;
