import express from "express";

import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/customerController.js";

import { verifyToken, verifyCustomer } from "../middlewares/verifyToken.js";

const router = express.Router();
router.use(verifyToken, verifyCustomer);

router.get("/profile", getMyProfile);

router.put("/profile", updateMyProfile);

export default router;
