import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import prisma from './config/db';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. GLOBAL MIDDLEWARE
// ==========================================
// Allow cross-origin requests from your frontend
app.use(cors());

// Parse incoming JSON payloads automatically
app.use(express.json());

// ==========================================
// 2. ROUTES
// ==========================================
// Prefix all API routes with /api
app.use('/api', apiRoutes);

// ==========================================
// 3. SERVER INITIALIZATION
// ==========================================
const startServer = async () => {
    try {
        // Test the database connection before starting the server
        await prisma.$connect();
        console.log('📦 Successfully connected to the MySQL database.');

        // Start listening for requests
        app.listen(PORT, () => {
            console.log(`🚀 Server is sprinting at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to connect to the database:', error);
        process.exit(1);
    }
};

startServer();