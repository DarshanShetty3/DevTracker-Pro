import { Router, Request, Response } from 'express';

const router = Router();

// A quick health check route to ensure the API is running
router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'success', message: 'DevTracker API is running! 🚀' });
});

// Later, you will plug in your feature routes here like this:
// import authRoutes from './auth.routes';
// router.use('/auth', authRoutes);

export default router;