import userModel from "../models/userModel.js"
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

// Route for user login
const loginUser = async (req, res) => {
  try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // ✅ Await password check
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        // if(!user) return res.status(400).json({ success: false, message: 'User does not exist' });

        res.json({
            success: true,
            message: 'Logged in successfully',
            user: { id: user._id, name: user.name, email: user.email },
            token: createToken(user._id)
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

// Route for user register
const registerUser = async (req, res) => {
   try {
        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user) return res.json({ success: false, message: 'User already exists' });
        if(password.length < 8) return res.json({ success: false, message: 'Password must be at least 8 characters' });

        user = new userModel({ name, email, password});
        await user.save();

        res.json({
            success: true,
            message: 'User registered successfully',
            user: { id: user._id, name: user.name, email: user.email },
            token: createToken(user._id)
        });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = createToken(process.env.ADMIN_PASSWORD)
      return res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export { loginUser, registerUser, adminLogin };