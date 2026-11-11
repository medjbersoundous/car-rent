import express from "express";

import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { verifyToken, verifyRole } from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/", getCategories);
router.post("/", verifyToken, verifyRole("admin"), addCategory);

router.put("/:id", verifyToken, verifyRole("admin"), updateCategory);

router.delete("/:id", verifyToken, verifyRole("admin"), deleteCategory);

export default router;
