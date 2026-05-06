import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, password } = req.body;

        // 1. Backend Validation: Ensure at least one identifier exists
        if (!email && !phone) {
            res.status(400).json({ error: 'Either email or phone must be provided.' });
            return;
        }

        // 2. Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    ...(email ? [{ email }] : []),
                    ...(phone ? [{ phone }] : [])
                ]
            }
        });

        if (existingUser) {
            res.status(400).json({ error: 'User already exists with this email or phone.' });
            return;
        }

        // 3. Hash password & save user
        const password_hash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email: email || null, // Explicitly set to null if empty
                phone: phone || null,
                password_hash
            }
        });

        res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { identifier, password } = req.body;

        // 1. Find user by checking BOTH the email and phone columns
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { phone: identifier }
                ]
            }
        });

        if (!user) {
            res.status(401).json({ error: 'Invalid credentials.' });
            return;
        }

        // 2. Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials.' });
            return;
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        // 4. Send response
        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login.' });
    }
};