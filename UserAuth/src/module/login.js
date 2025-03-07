const user = require("../model/user");
const User = require("../model/user")


const loginUsers = async (req,res) => {

    const { contactNumber, password } = req.body;
    
    const userExists = await User.exists({ contactNumber })

    if (!userExists) {
      return res.status(400).json({ message: 'User does not exists' });
    }

    const user = await User.findOne({ contactNumber });
    const succ = user.matchPassword(password); 
    if (succ) {
        return res.json({
          success: true, // ✅ Ensure success is included
          message: "Login successful",
          token: "sample_token", // Replace with JWT if using
          user: { id: user._id, contactNumber: user.contactNumber, email: user.email }, // ✅ Ensure user object is sent
        });
      }
      
    console.log("Received Data:", req.body);


}

module.exports = loginUsers;