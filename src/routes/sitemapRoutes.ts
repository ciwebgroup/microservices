import { Router, Request, Response } from 'express';
import { handleSitemap } from '../controllers/sitemapController';

const router = Router();

router.post('/', handleSitemap);

export default router;
