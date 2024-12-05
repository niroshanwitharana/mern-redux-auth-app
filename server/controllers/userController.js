import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected Route (Requires Authentication)
router.get('/profile', protect, getUserProfile);

export default router;
