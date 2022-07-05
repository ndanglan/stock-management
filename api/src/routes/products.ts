import express from 'express';

import ProductController from '../app/controllers/ProductController';

const router = express.Router();

// authController.index
router.get('/', ProductController.getProducts);
router.get('/:productId', ProductController.getSingleProducts);
router.post('/', ProductController.createProduct);
router.put('/', ProductController.updateProduct);
router.delete('/', ProductController.deleteProduct);
export default router;
