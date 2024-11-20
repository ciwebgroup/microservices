import express, { Request, Response, NextFunction } from 'express';

const AUTH_PASSWORD = process.env.AUTH_PASSWORD || 'password';

// Middleware for authentication
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader === `Bearer ${AUTH_PASSWORD}`) {
    return next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware