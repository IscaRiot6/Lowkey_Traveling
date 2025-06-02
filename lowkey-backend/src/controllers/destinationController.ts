import { Request, Response } from 'express';
import Destination from '../models/destinationModel';
import { AuthRequest } from '../types';

const getAllDestinations = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve destinations', error });
  }
};

const createDestination = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, country, type, description, image, region, tags } = req.body;

    // This assumes you have user info set by an auth middleware (like req.user.id)
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const newDestination = new Destination({
      name,
      country,
      type,
      description,
      image,
      region,
      tags,
      createdBy: userId, // <--- set from token
    });

    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (error: any) {
    console.error('CREATE DESTINATION ERROR:', error);
    res
      .status(500)
      .json({ message: 'Failed to create destination', error: error.message });
  }
};

const updateDestination = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, country, type, description, image, region, tags } = req.body;

    const updated = await Destination.findByIdAndUpdate(
      id,
      { name, country, type, description, image, region, tags },
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(404).json({ message: 'Destination not found' });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update destination', error });
  }
};

const deleteDestination = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Destination.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: 'Destination not found' });
      return;
    }

    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete destination', error });
  }
};

export {
  createDestination,
  getAllDestinations,
  updateDestination,
  deleteDestination,
};
