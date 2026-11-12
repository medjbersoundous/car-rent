import express from "express";
import {
  createRental,
  getMyRentals,
  cancelMyRental,
  confirmRental,
  rejectRental,
} from "../controllers/rentalController.js";
import { verifyToken, verifyAdmin, verifyCustomer } from "../middlewares/verifyToken.js";
const router = express.Router();
router.post("/", verifyToken, verifyCustomer, createRental);
router.get("/my-rentals", verifyToken, verifyCustomer, getMyRentals);
router.patch("/my-rentals/:id/cancel",verifyToken,verifyCustomer,cancelMyRental);
router.patch("/:id/confirm", verifyToken, verifyAdmin, confirmRental);
router.patch("/:id/reject", verifyToken, verifyAdmin, rejectRental);

export default router;
