import { Router, Request, Response } from 'express';
import { handleWebhook } from '../controllers/webhookController';

const router = Router();

// router.get('/', (req: Request, res: Response) => res.send('This service expects to receive an an authorized webhook POST from an authorized source.  You are neither.'));
router.get('/', handleWebhook);
router.post('/', handleWebhook);

export default router;
