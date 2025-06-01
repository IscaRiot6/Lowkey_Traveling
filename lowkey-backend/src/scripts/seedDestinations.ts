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
    image: 'https://images.pexels.com/photos/2675268/pexels-photo-2675268.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    {
    name: 'Barcelona',
    country: 'Spain',
    description: 'Vibrant city known for Gaudí architecture and lively streets.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    tags: ['culture', 'beach', 'europe'],
    type: 'city'
  },
  {
    name: 'Maui',
    country: 'USA',
    description: 'Tropical paradise with stunning beaches and volcanic landscapes.',
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    tags: ['beach', 'nature', 'adventure'],
    type: 'island'
  },
  {
    name: 'Rome',
    country: 'Italy',
    description: 'Historic city filled with ancient ruins and delicious food.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    tags: ['history', 'culture', 'europe'],
    type: 'city'
  },
  {
    name: 'Banff',
    country: 'Canada',
    description: 'Stunning turquoise lakes and mountain scenery.',
    imageUrl: 'https://images.unsplash.com/photo-1506898665064-f72a3ec2e3c7',
    tags: ['nature', 'mountains', 'america'],
    type: 'national park'
  },
  {
    name: 'Reykjavik',
    country: 'Iceland',
    description: 'Northern lights, glaciers, and hot springs.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    tags: ['cold', 'nature', 'europe'],
    type: 'city'
  },
  {
    name: 'Queenstown',
    country: 'New Zealand',
    description: 'Adventure capital surrounded by natural beauty.',
    imageUrl: 'https://images.unsplash.com/photo-1589984661676-3b5be0e84326',
    tags: ['adventure', 'oceania', 'mountains'],
    type: 'town'
  },
  {
    name: 'Cusco',
    country: 'Peru',
    description: 'Gateway to Machu Picchu and Incan heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1559589689-577aabd1f090',
    tags: ['history', 'mountains', 'south america'],
    type: 'city'
  },
  {
    name: 'Petra',
    country: 'Jordan',
    description: 'Ancient rock-carved city in the desert.',
    imageUrl: 'https://images.unsplash.com/photo-1584396829101-99a6e58d89c8',
    tags: ['desert', 'history', 'middle east'],
    type: 'archaeological site'
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    description: 'Lush rice terraces and serene beaches.',
    imageUrl: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca',
    tags: ['tropical', 'asia', 'spiritual'],
    type: 'island'
  },
  {
    name: 'Amsterdam',
    country: 'Netherlands',
    description: 'Canals, bicycles, and vibrant culture.',
    imageUrl: 'https://images.unsplash.com/photo-1543968996-c54f2588c419',
    tags: ['europe', 'urban', 'culture'],
    type: 'city'
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    description: 'Where east meets west with rich history.',
    imageUrl: 'https://images.unsplash.com/photo-1596633602445-e0f4f5b87c7c',
    tags: ['culture', 'asia', 'europe'],
    type: 'city'
  },
  {
    name: 'Dubrovnik',
    country: 'Croatia',
    description: 'Walled city by the Adriatic Sea.',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
    tags: ['europe', 'beach', 'historic'],
    type: 'city'
  },
  {
    name: 'Hạ Long Bay',
    country: 'Vietnam',
    description: 'Emerald waters with limestone islands.',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b67c5edc3fd',
    tags: ['asia', 'nature', 'boat'],
    type: 'bay'
  },
  {
    name: 'Marrakech',
    country: 'Morocco',
    description: 'Colorful souks and ancient medinas.',
    imageUrl: 'https://images.unsplash.com/photo-1562176552-129d7f70f3e2',
    tags: ['africa', 'culture', 'desert'],
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
