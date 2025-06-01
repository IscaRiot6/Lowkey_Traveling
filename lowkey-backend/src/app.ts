import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './models/db'; 
import userRoutes from './routes/userRoutes';
import destinationRoutes from './routes/destinationRoutes';
import favoriteRoutes from './routes/favoriteRoutes';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/destinations', destinationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes)

export default app;
