import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const validatePassword = (password: string): boolean => {
  const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
  return strongPasswordRegex.test(password);
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    if (!validatePassword(password)) {
      res.status(400).json({
        message:
          'Password must be 6–16 characters, include at least one number, one lowercase, and one uppercase letter',
      });
      return;
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const newUser = new User({ username, email: normalizedEmail, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: '10d',
    });

    res.status(201).json({ token, username: newUser.username });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '10d',
    });

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

export { registerUser, loginUser, getAllUsers };
