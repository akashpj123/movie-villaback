import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import{user} from '../model/user.js';
import dotenv from 'dotenv';
dotenv.config();

//signup user
export const sign = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await user.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use.' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new user({
        name: name,
        email: email,
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
  
  
  
  //logingust,
 // Login admin
export const login = async (req, res) => {
  console.log('JWT_SECRETR:', process.env.JWT_SECRETR); // Debugging line
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const existingUser = await user.findOne({ email: email });
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
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_USER, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Authentication successful.', token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

  
  
  
  //logoutuser
  export const logout = (req, res) => {
   var token = req.headers.authorization;
    if(!token){
      return res.status(401).json({ message: 'Unauthorized' });
    }else{
        res.status(200).json({ message: 'Logged out successfully' });
    }
   
  };
  
  
  