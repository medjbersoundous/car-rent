import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },

  model: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  pricePerDay: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },

  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

export default Car;
