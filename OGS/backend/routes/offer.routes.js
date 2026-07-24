import express from 'express';
import {
  getOffers,
  getActiveOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from '../controllers/offer.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.route('/active').get(getActiveOffers);

router.route('/')
  .get(getOffers)
  .post(protect, admin, upload.single('banner'), createOffer);

router.route('/:id')
  .put(protect, admin, upload.single('banner'), updateOffer)
  .delete(protect, admin, deleteOffer);

export default router;
