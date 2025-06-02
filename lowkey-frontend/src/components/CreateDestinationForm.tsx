import { useState } from 'react';
import destinationApi from '../api/destinationApi';
import toast from 'react-hot-toast';

const initialFormState = {
  name: '',
  country: '',
  type: '',
  description: '',
  image: '',
  region: '',
  tags: '',
};

const CreateDestinationForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedForm = {
      ...form,
      name: form.name.trim(),
      country: form.country.trim(),
      type: form.type.trim(),
      description: form.description.trim(),
      image: form.image.trim() || undefined,
      region: form.region.trim(),
      tags: form.tags.trim(),
    };

    if (
      !trimmedForm.name ||
      !trimmedForm.country ||
      !trimmedForm.type ||
      !trimmedForm.description
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (trimmedForm.image && !/^https?:\/\/.+/i.test(trimmedForm.image)) {
      setError('Image must be a valid URL.');
      return;
    }

    const { image, ...rest } = trimmedForm;
    const payload = {
      ...rest,
      ...(image ? { image } : {}),
      tags: rest.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      await destinationApi.createDestination(payload);
      setForm(initialFormState);
      toast.success('Destination created successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message || 'Something went wrong.');
      } else {
        setError('Something went wrong.');
        toast.error('Something went wrong.');
      }
    }
  };

  return (
    <div className='form-container'>
      <h2 className='text-xl font-semibold mb-4'>Create New Destination</h2>
      <form onSubmit={handleSubmit} className='form-box'>
        {error && <p className='text-red-600 mb-2'>{error}</p>}

        <input
          type='text'
          name='name'
          placeholder='Name'
          value={form.name}
          onChange={handleChange}
          required
          className='form-input'
        />
        <input
          type='text'
          name='country'
          placeholder='Country'
          value={form.country}
          onChange={handleChange}
          required
          className='form-input'
        />
        <input
          type='text'
          name='type'
          placeholder='Type (e.g. city, beach)'
          value={form.type}
          onChange={handleChange}
          required
          className='form-input'
        />
        <input
          type='text'
          name='image'
          placeholder='Image URL'
          value={form.image}
          onChange={handleChange}
          className='form-input'
        />
        <input
          type='text'
          name='region'
          placeholder='Region'
          value={form.region}
          onChange={handleChange}
          className='form-input'
        />
        <input
          type='text'
          name='tags'
          placeholder='Tags (comma-separated)'
          value={form.tags}
          onChange={handleChange}
          className='form-input'
        />
        <textarea
          name='description'
          placeholder='Description'
          value={form.description}
          onChange={handleChange}
          required
          className='form-textarea'
        />

        <button type='submit' className='form-button'>
          Create Destination
        </button>
      </form>
    </div>
  );
};

export default CreateDestinationForm;
