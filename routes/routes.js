import express from "express";

import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import customerRoutes from "./customerRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import carRoutes from "./carRoutes.js";
import rentalRoutes from "./rentalRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/categories", categoryRoutes);
router.use("/cars", carRoutes);
router.use("/rentals", rentalRoutes);

export default router;
