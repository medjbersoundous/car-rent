import Rental from "../models/Rental.js";
import Car from "../models/Car.js";
async function createRental(req, res) {
  try {
    const { car_id, startDate, endDate } = req.body;
    const car = await Car.findById(car_id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }
    if (car.status !== "available") {
      return res.status(400).json({
        message: "This car is unavailable",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      return res.status(400).json({
        message: "End date must be after start date",
      });
    }
    const existingRental = await Rental.findOne({
      car_id,
      status: "confirmed",
      startDate: { $lt: end },
      endDate: { $gt: start },
    });

    if (existingRental) {
      return res.status(400).json({
        message: "Car is already reserved for these dates",
      });
    }
    const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = numberOfDays * car.pricePerDay;

    const rental = await Rental.create({
      customer_id: req.user.id,
      car_id,
      startDate: start,
      endDate: end,
      totalPrice,
      status: "pending",
    });

    res.status(201).json({
      message: "Rental request created successfully",
      rental,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getMyRentals(req, res) {
  try {
    const rentals = await Rental.find({
      customer_id: req.user.id,
    })
      .populate("car_id")
      .sort({ createdAt: -1 });

    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function cancelMyRental(req, res) {
  try {
    const rental = await Rental.findOne({
      _id: req.params.id,
      customer_id: req.user.id,
    });

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
      });
    }

    if (rental.status !== "pending") {
      return res.status(400).json({
        message: "Only pending rentals can be cancelled",
      });
    }

    rental.status = "cancelled";
    await rental.save();

    res.status(200).json({
      message: "Rental cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function confirmRental(req, res) {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
      });
    }

    if (rental.status !== "pending") {
      return res.status(400).json({
        message: "Only pending rentals can be confirmed",
      });
    }

    const car = await Car.findById(rental.car_id);

    if (!car || car.status !== "available") {
      return res.status(400).json({
        message: "Car is unavailable",
      });
    }
    const conflict = await Rental.findOne({
      _id: { $ne: rental._id },
      car_id: rental.car_id,
      status: "confirmed",
      startDate: { $lt: rental.endDate },
      endDate: { $gt: rental.startDate },
    });

    if (conflict) {
      return res.status(400).json({
        message: "Another confirmed rental exists for these dates",
      });
    }

    rental.status = "confirmed";
    await rental.save();
    car.status = "unavailable";
    await car.save();

    res.status(200).json({
      message: "Rental confirmed successfully",
      rental,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function rejectRental(req, res) {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
      });
    }

    if (rental.status !== "pending") {
      return res.status(400).json({
        message: "Only pending rentals can be rejected",
      });
    }

    rental.status = "rejected";
    await rental.save();

    res.status(200).json({
      message: "Rental rejected successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  createRental,
  getMyRentals,
  cancelMyRental,
  confirmRental,
  rejectRental,
};
