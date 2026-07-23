import express from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, admin, upload.single('image'), createCategory);

router.route('/:id')
  .delete(protect, admin, deleteCategory);

export default router;
