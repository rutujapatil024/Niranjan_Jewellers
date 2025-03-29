const User = require("../model/user");

const registerUser = async (req, res) => {
  const { firstName, password, email, lastName, contactNumber } = req.body;
  try {
    const isExistingUser = await User.exists({ contactNumber });
    if (isExistingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      contactNumber,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        firstName: user.firstName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userId = req.user.id; // From auth middleware

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();

    res.json({
      success: true,
      message: "User profile updated successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNumber: user.contactNumber
      }
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user address
const updateAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id; // From auth middleware

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update address
    user.address = {
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    };

    await user.save();

    res.json({
      success: true,
      message: "Address updated successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNumber: user.contactNumber,
        address: user.address
      }
    });
  } catch (error) {
    console.error("Update address error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { registerUser, updateUser, updateAddress };
