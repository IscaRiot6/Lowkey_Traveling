import { useEffect, useState } from 'react';
import destinationApi from '../api/destinationApi';
import DestinationCard from '../components/DestinationCard';
import CreateDestinationForm from '../components/CreateDestinationForm'; // ✅ import
import type { Destination } from '../types/destinationTypes';
import '../styles/HomePage.css';

const HomePage = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationApi.getAllDestinations();
        setDestinations(data);
      } catch (error) {
        console.error('Failed to load destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search destinations...'
          className='mb-4 p-2 border rounded w-full max-w-md'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ✅ Form Section */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className='mb-4 px-4 py-2 bg-blue-600 text-white rounded'
      >
        {showForm ? 'Hide Form' : 'Create New Destination'}
      </button>

      {showForm && <CreateDestinationForm />}

      <main className='destination-wrapper'>
        <section className='destination-header'>
          <h1 className='text-3xl font-bold'>Explore Destinations</h1>
        </section>

        {loading ? (
          <p className='destination-loading'>Loading...</p>
        ) : (
          <section className='destination-grid'>
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest._id} destination={dest} />
            ))}
          </section>
        )}
      </main>
    </>
  );
};

export default HomePage;
