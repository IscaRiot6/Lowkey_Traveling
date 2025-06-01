import { useEffect, useState } from 'react';
import destinationApi from '../api/destinationApi';
import DestinationCard from '../components/DestinationCard';

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <main className="destination-wrapper p-4">
      <section className="destination-header mb-6">
        <h1 className="text-3xl font-bold">Explore Destinations</h1>
      </section>

      {loading ? (
        <p className="destination-loading">Loading...</p>
      ) : (
        <section className="destination-grid grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <DestinationCard key={dest._id} destination={dest} />
          ))}
        </section>
      )}
    </main>
  );
};

export default HomePage;
