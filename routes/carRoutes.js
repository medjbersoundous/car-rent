import express from "express";

import {
  addCar,
  getCars,
  getAvailableCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";

import { verifyToken, verifyRole } from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/available", verifyToken, verifyRole("customer"), getAvailableCars);
router.get("/", verifyToken, verifyRole("admin"), getCars);
router.get("/:id", getCarById);
router.post("/", verifyToken, verifyRole("admin"), addCar);
router.put("/:id", verifyToken, verifyRole("admin"), updateCar);
router.delete("/:id", verifyToken, verifyRole("admin"), deleteCar);

export default router;
