// apiRouter.ts
import express, {Request, Response} from 'express';
import { generateEncodedApiKey } from '../utils/apiEncoder';
import { decodeApiKey } from '../utils/apiDecoder';
import { Resolver, MxRecord } from 'dns';

const apiRouter = express.Router();

interface DnsResponse {
  ns: string[];
  a: string[];
  cname?: string[];
  txt?: string[][];
  mx?: MxRecord[];
}

// Route to encode API key
apiRouter.get('/check/:domain', async (req: Request, res: Response) => {
  const { domain } = req.params;
  if (!domain) {
    return res.status(400).json({ error: 'Missing domain in request parameters' });
  }

  const resolver = new Resolver();

  try {
    // @TODO get the A Record, CNAME, MX, and NS records for the domain
    const dnsResponse: DnsResponse = {
      ns: await resolver.resolveNs.__promisify__(domain),
      a: await resolver.resolve4.__promisify__(domain),
      txt: await resolver.resolveTxt.__promisify__(domain),
      mx: await resolver.resolveMx.__promisify__(domain),
    };
    res.status(200).json( dnsResponse );
  } catch (error) {
    res.status(500).json({ error: 'Failed to encode API key' });
  }
});

export default apiRouter;