import express from "express";

import {
  addCar,
  getCars,
  getAvailableCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";

import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/available", getAvailableCars);
router.get("/", verifyToken, verifyAdmin, getCars);
router.get("/:id", getCarById);
router.post("/", verifyToken, verifyAdmin, addCar);
router.put("/:id", verifyToken, verifyAdmin, updateCar);
router.delete("/:id", verifyToken, verifyAdmin, deleteCar);

export default router;
