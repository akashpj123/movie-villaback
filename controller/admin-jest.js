import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/admin.js'; // Assuming the model is named User
import dotenv from 'dotenv';

dotenv.config();

// Signup admin
export const sign = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log('User registered successfully.');
    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login admin

// Login admin
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist.' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Passwords match, authentication successful
    console.log('Passwords match! User authenticated.');
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Authentication successful.', token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Logout admin
export const logout = (req, res) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).json({ message: 'Unauthorized' });
  }else{
      res.status(200).json({ message: 'Logged out successfully' });
  }
};