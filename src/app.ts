import express, { Request, Response } from 'express';
// import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS middleware
import webhookRoutes from './routes/webhookRoutes';
import sitemapRoutes from './routes/sitemapRoutes';
import recaptchaRoutes from './routes/recaptchaRoutes';
import manageWordpressRoutes from './routes/manageWordpressRoutes';
import nearbyNowRoutes from './routes/nearbyNowRoutes'
import validateUrl from './middleware/validateUrl';
import path from 'path';
import apiRoutes from './routes/apiRoutes';
import dnsRoutes from './routes/dnsRoutes';
import authMiddleware from './middleware/authMiddleware';


const app = express();

// Use CORS middleware with no restrictions!
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

// Example route
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware
app.use(express.json());

app.use('/recaptcha', recaptchaRoutes);
app.use('/webhooks', webhookRoutes);
app.use('/fetch-sitemap', validateUrl, sitemapRoutes);
app.use('/manage-wordpress', manageWordpressRoutes);
app.use('/nearby-now', nearbyNowRoutes);
app.use('/api', authMiddleware, apiRoutes);
app.use('/dns', dnsRoutes);

export default app;