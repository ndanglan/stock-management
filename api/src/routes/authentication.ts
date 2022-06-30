import express from 'express'
import authController from '../app/controllers/AuthController';

const router = express.Router();

// authController.index
router.post('/signup',authController.signUp);
router.post('/login',authController.login);

export default router;