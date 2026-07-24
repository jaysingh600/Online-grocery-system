import express from 'express';
import {
  assignDelivery,
  getMyDeliveries,
  updateDeliveryStatus,
  getDeliveries,
} from '../controllers/delivery.controller.js';
import { protect, admin, delivery } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, assignDelivery)
  .get(protect, admin, getDeliveries);

router.route('/my-deliveries')
  .get(protect, delivery, getMyDeliveries);

router.route('/:id/status')
  .put(protect, delivery, updateDeliveryStatus);

export default router;
