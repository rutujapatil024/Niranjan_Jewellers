const User = require("../model/user");

const loginUsers = async (req, res) => {
  const { contactNumber, password } = req.body;

  try {
    const user = await User.findOne({ contactNumber });

    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      token: "sample_token", // Replace with JWT token if used
      user: { id: user._id, contactNumber: user.contactNumber, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = loginUsers;
