// src/routes/destinationRoutes.ts
import express from 'express';
import { createDestination, getAllDestinations } from '../controllers/destinationController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createDestination); 
router.get('/', getAllDestinations); 

export default router;
