import Customer from "../models/Customer.js";
import Rental from "../models/Rental.js";
import Car from "../models/Car.js";

async function getCustomers(req, res) {
  try {
    const customers = await Customer.find();

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getAllRentals(req, res) {
  try {
    const rentals = await Rental.find()
      .populate("customer_id")
      .populate("car_id");

    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function cancelRental(req, res) {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
      });
    }
    if (rental.status === "cancelled" || rental.status === "rejected") {
      return res.status(400).json({
        message: "This rental cannot be cancelled",
      });
    }
    await Rental.findByIdAndUpdate(req.params.id, {
      status: "cancelled",
    });
    await Car.findByIdAndUpdate(rental.car_id, {
      status: "available",
    });
    res.status(200).json({
      message: "Rental cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export { getCustomers, getAllRentals, cancelRental };