// src/controllers/destinationController.ts
import { Request, Response } from 'express';
import Destination from '../models/destinationModel';

const createDestination = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, country, type, description, image, region } = req.body;

    const newDestination = new Destination({ name, country, type, description, image, region });
    await newDestination.save();

    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create destination', error });
  }
};

const getAllDestinations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve destinations', error });
  }
};

export { createDestination, getAllDestinations };
