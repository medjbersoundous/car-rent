import Category from "../models/Category.js";
import Car from "../models/Car.js";

async function addCategory(req, res) {
  try {
    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
    });

    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function updateCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true },
    );
    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function deleteCategory(req, res) {
  try {
    const car = await Car.findOne({
      category_id: req.params.id,
    });
    if (car) {
      return res.status(400).json({
        message: "Cannot delete category because cars use it",
      });
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { addCategory, getCategories, updateCategory, deleteCategory };
