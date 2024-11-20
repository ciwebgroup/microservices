import { Request, Response } from 'express';
import axios from 'axios';
import getApiLocation from '../../utils/getApiLocation';

export const testimonialsHandler = async (req: Request, res: Response) => {
  const { apiKey, start, count, playlist, showtranscription } = req.body;
  try {
    const response = await axios.get(`${getApiLocation()}/testimonials`, {
      params: {
        storefronttoken: apiKey,
        start,
        count,
        playlist,
        showtranscription,
        agent: encodeURIComponent(req.get('User-Agent') || ''),
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching testimonials');
  }
};