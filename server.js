import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";
dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("Car Rental Agency API is running");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
