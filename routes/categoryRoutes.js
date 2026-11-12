import express from "express";

import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/", getCategories);
router.post("/", verifyToken, verifyAdmin, addCategory);

router.put("/:id", verifyToken, verifyAdmin, updateCategory);

router.delete("/:id", verifyToken, verifyAdmin, deleteCategory);

export default router;
