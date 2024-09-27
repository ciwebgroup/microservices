import { Router } from 'express';
import { handleVerify } from '../controllers/recaptchaController';

const router = Router();

router.post('/verify', handleVerify);

export default router;
