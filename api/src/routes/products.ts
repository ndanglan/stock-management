import express from 'express';

import ProductController from '../app/controllers/ProductController';

const router = express.Router();

// authController.index
router.post('/', ProductController.getProducts);
router.get('/categories', ProductController.getCategories);
router.get('/:productId', ProductController.getSingleProducts);
router.post('/create', ProductController.createProduct);
router.put('/', ProductController.updateProduct);
router.delete('/', ProductController.deleteProduct);
export default router;
