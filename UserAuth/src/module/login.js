const User = require("../model/user");
const { generateTokens } = require("../tokens/authTokens");

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

    const token = generateTokens(user._id);
    res.json({
      success: true,
      message: "Login successful",
      token: token,
      user: { id: user._id, contactNumber: user.contactNumber, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = loginUsers;
