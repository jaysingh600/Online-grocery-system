import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
      unique: true,
    },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
    icon: {
      type: String, // Can be a react-icon class or similar
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
