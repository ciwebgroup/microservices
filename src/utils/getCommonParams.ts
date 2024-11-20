import { Request } from 'express';

const getCommonParams = (req: Request, apiKey: string) => {
  const agent = encodeURIComponent(req.get('User-Agent') || '');
  const referrer = req.get('Referrer') || '';
  const hostUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  return {
    agent,
    referrer,
    hosturl: hostUrl,
    storefronttoken: apiKey,
  };
};

export default getCommonParams;