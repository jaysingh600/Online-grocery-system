import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an offer title'],
    },
    banner: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    flashSale: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
