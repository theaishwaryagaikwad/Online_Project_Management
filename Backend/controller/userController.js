import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userService from '../services/userService.js';

const secretKey = process.env.JWT_SECRET || "Aish@123";

async function registerUser (req, res){
  const { email, password } = req.body;
  console.log(" Registering user with:", req.body);
  
    try {
      const user = await user.findOne({ email });      
        if (!user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ msg: `Registration failed: ${error.message}` });
    }
};

async function loginUser (req, res) {
    const { email, password } = req.body;
    console.log('User:', User);
  console.log("**user details**", req.body);
  
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ msg: `Login failed: ${error.message}` });
    }
};

export default { registerUser, loginUser };