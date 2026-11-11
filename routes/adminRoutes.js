import express from "express";

import {
  getCustomers,
  getAllRentals,
  cancelRental,
} from "../controllers/adminController.js";

import { verifyToken, verifyRole } from "../middlewares/verifyToken.js";

const router = express.Router();
router.use(verifyToken, verifyRole("admin"));

router.get("/customers", getCustomers);
router.get("/rentals", getAllRentals);
router.patch("/rentals/:id/cancel", cancelRental);

export default router;
