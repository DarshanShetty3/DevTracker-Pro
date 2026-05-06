import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'success', message: 'DevTracker API is running! 🚀' });
});

// Mount the auth routes
router.use('/auth', authRoutes); // <-- Add this

export default router;