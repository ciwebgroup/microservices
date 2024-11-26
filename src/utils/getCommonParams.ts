import { Request } from 'express';
import { decodeApiKey } from './apiDecoder';

const getCommonParams = (req: Request, apiKey: string) => {
  const agent = encodeURIComponent(req.get('User-Agent') || '');
  const referrer = req.get('Referrer') || '';
  const hostUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  return {
    agent,
    referrer,
    hosturl: hostUrl,
    storefronttoken: decodeApiKey(apiKey),
  };
};

export default getCommonParams;