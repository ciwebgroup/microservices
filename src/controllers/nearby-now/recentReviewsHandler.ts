import { Request, Response } from 'express';
import axios from 'axios';
import getCommonParams from '../../utils/getCommonParams';
import getApiLocation from '../../utils/getApiLocation';

export const recentReviewsHandler = async (req: Request, res: Response) => {
  const { apiKey, ...atts } = req.body;
  try {
    const response = await axios.post(`${getApiLocation()}/nearbyreviews`, {
      ...getCommonParams(req, apiKey),
      ...atts,
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching recent reviews');
  }
};
