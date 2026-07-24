import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const addressSchema = new mongoose.Schema({
  receiverName: { type: String, required: true },
  phone: { type: String, required: true },
  houseNo: { type: String, required: true },
  buildingName: { type: String },
  street: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String },
  state: { type: String, required: true },
  country: { type: String, required: true, default: 'India' },
  pinCode: { type: String, required: true },
  landmark: { type: String },
  addressType: { type: String, enum: ['Home', 'Office', 'Other'], default: 'Home' },
  isDefault: { type: Boolean, default: false }
});

const loginHistorySchema = new mongoose.Schema({
  loginAt: { type: Date, default: Date.now },
  device: { type: String },
  ip: { type: String }
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
    },
    alternativePhone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
    },
    dob: {
      type: Date,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    language: {
      type: String,
      default: 'English',
    },
    timeZone: {
      type: String,
      default: 'UTC',
    },
    rewardPoints: {
      type: Number,
      default: 0,
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    membershipLevel: {
      type: String,
      enum: ['Standard', 'Silver', 'Gold', 'Platinum'],
      default: 'Standard',
    },
    referralCode: {
      type: String,
    },
    profileImage: {
      url: { type: String, default: 'https://via.placeholder.com/150' },
      public_id: { type: String }
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'delivery'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    loginHistory: [loginHistorySchema],
    addresses: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  { timestamps: true }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
