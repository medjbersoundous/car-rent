import express from "express";
import {
  createRental,
  getMyRentals,
  cancelMyRental,
  confirmRental,
  rejectRental,
} from "../controllers/rentalController.js";
import { verifyToken, verifyRole } from "../middlewares/verifyToken.js";
const router = express.Router();
router.post("/", verifyToken, verifyRole("customer"), createRental);
router.get("/my-rentals", verifyToken, verifyRole("customer"), getMyRentals);
router.patch("/my-rentals/:id/cancel",verifyToken,verifyRole("customer"),cancelMyRental);
router.patch("/:id/confirm", verifyToken, verifyRole("admin"), confirmRental);
router.patch("/:id/reject", verifyToken, verifyRole("admin"), rejectRental);

export default router;
