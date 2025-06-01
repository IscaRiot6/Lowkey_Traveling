import type { Destination } from '../types/destinationTypes';

interface Props {
  destination: Destination;
}

const DestinationCard = ({ destination }: Props) => {
  return (
    <div className='border rounded-lg overflow-hidden shadow-sm bg-white'>
      <img
        src={destination.image}
        alt={destination.name}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h2 className='text-xl font-semibold'>{destination.name}</h2>
        <p className='text-gray-500'>
          {destination.country} - {destination.type}
        </p>
        <p className='text-sm mt-2'>
          {destination.description.slice(0, 80)}...
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
