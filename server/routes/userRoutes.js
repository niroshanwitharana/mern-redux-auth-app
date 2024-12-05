import express from 'express';
import { register, login, logout, getUserProfile, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected Route (Requires Authentication)
router.get('/', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
