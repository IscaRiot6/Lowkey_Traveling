import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { createDestination, getAllDestinations, updateDestination, deleteDestination} from '../controllers/destinationController';


const router = express.Router();

router.get('/', getAllDestinations); 
router.post('/', authMiddleware, createDestination); 
router.put('/:id', authMiddleware, updateDestination);
router.delete('/:id', authMiddleware, deleteDestination)

export default router;
