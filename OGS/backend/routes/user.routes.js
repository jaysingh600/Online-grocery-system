import express from 'express';
import {
  updateUserProfile,
  uploadProfilePhoto,
  changePassword,
  addAddress,
  deleteAddress,
} from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.route('/profile')
  .put(protect, updateUserProfile);

router.route('/profile/photo')
  .post(protect, upload.single('image'), uploadProfilePhoto);

router.route('/password')
  .put(protect, changePassword);

router.route('/addresses')
  .post(protect, addAddress);

router.route('/addresses/:id')
  .delete(protect, deleteAddress);

export default router;
