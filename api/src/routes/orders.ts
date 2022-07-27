import express from 'express';
import OrderController from '../app/controllers/OrderController';

const router = express.Router();

// authController.index
router.post('/get', OrderController.getOrders);
router.get('/:orderId', OrderController.getSingleOrder);
router.post('/', OrderController.createOrder);
router.delete('/', OrderController.deleteOrder);
export default router;
