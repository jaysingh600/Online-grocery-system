import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, upload.array('images', 5), createProduct);

router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct);

export default router;
