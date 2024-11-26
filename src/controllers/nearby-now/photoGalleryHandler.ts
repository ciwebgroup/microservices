import { Request, Response } from 'express';
import axios from 'axios';
import getApiLocation from '../../utils/getApiLocation';
import getCommonParams from '../../utils/getCommonParams';

export const photoGalleryHandler = async (req: Request, res: Response) => {
  const { apiKey, start, count, tags, labels } = req.body;
  try {
    const response = await axios.get(`${getApiLocation()}/photogallery`, {
      params: {
        storefronttoken: apiKey,
        start,
        count,
        tags,
        labels,
        agent: encodeURIComponent(req.get('User-Agent') || ''),
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching photo gallery');
  }
};