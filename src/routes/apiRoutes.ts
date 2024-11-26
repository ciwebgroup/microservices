// apiRouter.ts
import express, {Request, Response} from 'express';
import { generateEncodedApiKey } from '../utils/apiEncoder';
import { decodeApiKey } from '../utils/apiDecoder';

const apiRouter = express.Router();

// Route to encode API key
apiRouter.get('/encode-api-key/:realApiKey', (req: Request, res: Response) => {
  const { realApiKey } = req.params;
  if (!realApiKey) {
    return res.status(400).json({ error: 'Missing realApiKey in request parameters' });
  }

  try {
    const encodedKey = generateEncodedApiKey(realApiKey);
    res.status(200).json({ encodedKey });
  } catch (error) {
    res.status(500).json({ error: 'Failed to encode API key' });
  }
});

// Route to decode API key
apiRouter.get('/decode-api-key/:encodedKey', (req: Request, res: Response) => {
  const { encodedKey } = req.params;
  if (!encodedKey) {
    return res.status(400).json({ error: 'Missing encodedKey in request parameters' });
  }

  try {
    const realApiKey = decodeApiKey(encodedKey);
    res.status(200).json({ realApiKey });
  } catch (error) {
    res.status(500).json({ error: 'Failed to decode API key' });
  }
});

export default apiRouter;