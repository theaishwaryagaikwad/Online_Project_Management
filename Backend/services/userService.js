import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || "Aish@123";

class UserService {
    async registerUser(email, password) {
        try {

            let user = await User.findOne({ email });
            if (user) {
                throw new Error('User already exists');
            }

            user = new User({ 
                email, 
                password 
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = { user: { id: user.id } };

            const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

            return token;
        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

async loginUser (req, res) {
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
}

export default new UserService();