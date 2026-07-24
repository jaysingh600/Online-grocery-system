import express from 'express';
import { getAnalytics } from '../controllers/analytics.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getAnalytics);

export default router;
