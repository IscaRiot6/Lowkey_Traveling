import mongoose, { Document, Model } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  country: string;
  type: string; // e.g., beach, city, mountain
  description: string;
  image: string;
  region?: string;
  createdBy?: string;
  likes?: number;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
}

interface IDestinationModel extends Model<IDestination> {}

const destinationSchema = new mongoose.Schema<IDestination>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: false,
    validate: {
      validator: function (v: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(v);
        },
        message: 'Image must be a valid URL ending in .jpg, .png, etc.'
    }
  },
  region: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  tags: [{ type: String }],
},
{ timestamps: true }
);

const Destination = mongoose.models.Destination as IDestinationModel || mongoose.model<IDestination, IDestinationModel>('Destination', destinationSchema)
export default Destination;
