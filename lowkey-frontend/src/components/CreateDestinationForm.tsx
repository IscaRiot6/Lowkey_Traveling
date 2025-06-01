import { useState } from 'react';
import destinationApi from '../api/destinationApi';

const CreateDestinationForm = () => {
  const [form, setForm] = useState({
    name: '',
    country: '',
    type: '',
    description: '',
    image: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.country || !form.type || !form.description) {
      setError('Please fill in all required fields.');
      return;
    }

    if (form.image && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(form.image)) {
      setError('Image must be a valid URL ending in .jpg, .png, etc.');
      return;
    }

    try {
      await destinationApi.createDestination(form);
      setError('');
      alert('Destination created successfully!');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Destination Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2"
      />

      <input
        type="text"
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2"
      />

      <input
        type="text"
        name="type"
        placeholder="Type (e.g. city, beach)"
        value={form.type}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2"
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="w-full border px-3 py-2"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Destination
      </button>
    </form>
  );
};

export default CreateDestinationForm;
