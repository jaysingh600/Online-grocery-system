import express from 'express';
import {
  updateUserProfile,
  uploadProfilePhoto,
  changePassword,
  addAddress,
  updateAddress,
  deleteAddress,
  getUsers,
  updateUserRole,
  deleteUser,
  addToWishlist,
  removeFromWishlist,
} from '../controllers/user.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getUsers);

router.route('/profile')
  .put(protect, updateUserProfile);

router.route('/profile/photo')
  .post(protect, upload.single('image'), uploadProfilePhoto);

router.route('/password')
  .put(protect, changePassword);

router.route('/addresses')
  .post(protect, addAddress);

router.route('/addresses/:id')
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

router.route('/wishlist')
  .post(protect, addToWishlist);

router.route('/wishlist/:productId')
  .delete(protect, removeFromWishlist);

router.route('/:id')
  .delete(protect, admin, deleteUser);

router.route('/:id/role')
  .put(protect, admin, updateUserRole);

export default router;
