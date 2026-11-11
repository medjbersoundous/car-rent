import Customer from "../models/Customer.js";
async function getMyProfile(req, res) {
  try {
    const customer = await Customer.findById(req.user.id).select("-password");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function updateMyProfile(req, res) {
  try {
    const { name, email, phone } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      req.user.id,
      { name, email, phone },
      { new: true, runValidators: true },
    ).select("-password");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getMyProfile, updateMyProfile };
