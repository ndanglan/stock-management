import express from 'express';
import OrderController from '../app/controllers/OrderController';

const router = express.Router();

// authController.index
router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);
router.delete('/', OrderController.deleteOrder);
export default router;
