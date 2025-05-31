import { Request, Response } from 'express';
import Destination from '../models/destinationModel';

const getAllDestinations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve destinations', error });
  }
};

const createDestination = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, country, type, description, image, region, createdBy } = req.body;

    const newDestination = new Destination({ name, country, type, description, image, region, createdBy });
    await newDestination.save();

    res.status(201).json(newDestination);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create destination', error });
  }
};

const updateDestination = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, country, type, description, image, region } = req.body;

    const updated = await Destination.findByIdAndUpdate(
      id,
      { name, country, type, description, image, region },
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


const deleteDestination = async (req: Request, res: Response): Promise<void> => {
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


export { createDestination, getAllDestinations, updateDestination, deleteDestination };
