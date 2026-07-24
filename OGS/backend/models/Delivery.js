import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order',
    },
    deliveryPerson: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    deliveryDate: {
      type: Date,
    },
    deliveryStatus: {
      type: String,
      enum: ['Pending', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
      default: 'Pending',
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;
