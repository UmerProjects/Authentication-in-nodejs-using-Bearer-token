import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function Register(req, res) {
  const { first_name, last_name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
    // create an instance of a user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
    });

    const savedUser = await newUser.save(); // save new user into the database
    const { role, ...user_data } = savedUser._doc;
    res.status(200).json({
      status: "success",
      data: [user_data],
      message:
        "Thank you for registering with us. Your account has been successfully created.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
  res.end();
}

export async function Login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        status: "failed",
        data: [],
        message: "Invalid email or password. Please try again.",
      });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(
      `${req.body.password}`,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        data: [],
        message: "Invalid email or password. Please try again.",
      });
    }

    // Generate JWT token
    const token = user.generateAccessJWT();
    console.log(token);

    // Remove password from the user data before sending response
    const { password: pwd, ...userData } = user._doc;

    // Send the token and user data in the response
    res.status(200).json({
      status: "success",
      message: "You have successfully logged in.",
      token: `Bearer ${token}`,
      user: userData,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
}
