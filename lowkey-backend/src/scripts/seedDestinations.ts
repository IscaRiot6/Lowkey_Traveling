import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from '../models/destinationModel';

dotenv.config();

const mongoURI = process.env.MONGO_URI;
console.log('Mongo URI:', mongoURI);

const seedData = [
  {
    name: 'Paris',
    country: 'France',
    description: 'City of lights with rich culture and architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1499510318565-0c7f6abf12c9',
    tags: ['romantic', 'culture', 'europe'],
    type: 'city'
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    description: 'Historic temples and peaceful gardens.',
    imageUrl: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c',
    tags: ['temples', 'asia', 'culture'],
    type: 'city'
  },
  {
    name: 'New York City',
    country: 'USA',
    description: 'The city that never sleeps. Skyscrapers and dreams.',
    imageUrl: 'https://images.unsplash.com/photo-1522098543979-ffc7f79d8ce3',
    tags: ['city', 'america', 'urban'],
    type: 'city'
  },
  {
    name: 'Santorini',
    country: 'Greece',
    description: 'White-washed houses on a cliff with a view of the Aegean Sea.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    tags: ['beach', 'romantic', 'europe'],
    type: 'island'
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    description: 'Mountains meet ocean in this vibrant city.',
    imageUrl: 'https://images.unsplash.com/photo-1579027982231-4e98a3b5d5c0',
    tags: ['nature', 'africa', 'adventure'],
    type: 'city'
  },
];

const seedDestinations = async () => {
  console.log('🌱 Starting seed script...');
  try {
    await mongoose.connect(mongoURI as string);
    await Destination.deleteMany({});
    const created = await Destination.insertMany(seedData);
    console.log('✅ Seeded destinations:', created.length);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed data:', error);
    process.exit(1);
  }
};

seedDestinations();
