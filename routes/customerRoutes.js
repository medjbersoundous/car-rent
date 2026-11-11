import express from "express";

import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/customerController.js";

import { verifyToken, verifyRole } from "../middlewares/verifyToken.js";

const router = express.Router();
router.use(verifyToken, verifyRole("customer"));

router.get("/profile", getMyProfile);

router.put("/profile", updateMyProfile);

export default router;
