import express from 'express';
import authMiddleware from '../middleware/authMiddleware'
import { addToFavorites, removeFromFavorites, getFavorites } from '../controllers/favoritesController';


const router = express.Router();

router.get('/:userId', authMiddleware, getFavorites);
router.put('/:userId/:destinationId', authMiddleware, addToFavorites);
router.delete('/:userId/:destinationId', authMiddleware, removeFromFavorites);



export default router;