interface DestinationInput {
  name: string;
  description: string;
  country: string;
  type: string;
  image?: string;
}

const destinationApi = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const getAllDestinations = async () => {
    const res = await fetch(`${API_URL}/api/destinations`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to fetch destinations');
    }
    return await res.json();
  };

  const createDestination = async (data: DestinationInput) => {
    const res = await fetch(`${API_URL}/api/destinations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to create destination');
    }
    return await res.json();
  };

   const updateDestination = async (id: string, data: DestinationInput) => {
    const res = await fetch(`${API_URL}/api/destinations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to update destination');
    }
    return await res.json();
  };

  const deleteDestination = async (id: string) => {
    const res = await fetch(`${API_URL}/api/destinations/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to delete destination');
    }
    return await res.json();
  };

  return {
    getAllDestinations,
    createDestination,
    updateDestination,
    deleteDestination,
  };
};

export default destinationApi();
