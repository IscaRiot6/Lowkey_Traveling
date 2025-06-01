import express from 'express';
import authMiddleware from '../middleware/authMiddleware'
import { addToFavorites, removeFromFavorites, getFavorites } from '../controllers/favoriteController';


const router = express.Router();

router.get('/', authMiddleware, getFavorites); 
router.put('/:destinationId', authMiddleware, addToFavorites);
router.delete('/:destinationId', authMiddleware, removeFromFavorites);




export default router;