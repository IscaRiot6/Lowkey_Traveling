import { Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel';
import { AuthRequest } from '../types';

const getFavorites = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).populate('favorites');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch favorites', error });
  }
};


const addToFavorites = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { destinationId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (!user.favorites) user.favorites = [];

    if (!user.favorites.some(fav => fav.toString() === destinationId)) {
      user.favorites.push(new mongoose.Types.ObjectId(destinationId));
      await user.save();
    }

    res.status(200).json({ message: 'Destination added to favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to favorites', error });
  }
};

const removeFromFavorites = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { destinationId } = req.params;


    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.favorites = user.favorites?.filter(fav => fav.toString() !== destinationId) || [];
    await user.save();

    res.status(200).json({ message: 'Destination removed from favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from favorites', error });
  }
};

export { addToFavorites, removeFromFavorites, getFavorites } ;
