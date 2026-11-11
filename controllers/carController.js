import Car from "../models/Car.js";
import Rental from "../models/Rental.js";
async function addCar(req, res) {
  try {
    const { brand, model, year, pricePerDay, category_id } = req.body;

    const car = await Car.create({
      brand,
      model,
      year,
      pricePerDay,
      category_id,
    });

    res.status(201).json({
      message: "Car added successfully",
      car,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getCars(req, res) {
  try {
    const cars = await Car.find().populate("category_id");

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getAvailableCars(req, res) {
  try {
    const cars = await Car.find({
      status: "available",
    }).populate("category_id");

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getCarById(req, res) {
  try {
    const car = await Car.findById(req.params.id).populate("category_id");

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function updateCar(req, res) {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json({
      message: "Car updated successfully",
      car,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function deleteCar(req, res) {
  try {
    const rental = await Rental.findOne({
      car_id: req.params.id,
      status: "confirmed",
    });

    if (rental) {
      return res.status(400).json({
        message: "Cannot delete a car with a confirmed rental",
      });
    }

    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json({
      message: "Car deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { addCar, getCars, getAvailableCars, getCarById, updateCar, deleteCar };
