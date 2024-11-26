import { Request, Response } from 'express';
import axios from 'axios';
import getApiLocation from '../../utils/getApiLocation';
import getCommonParams from '../../utils/getCommonParams';

export const serviceAreaMapHandler = async (req: Request, res: Response) => {
  const { apiKey, ...atts } = req.body;
  try {
    const response = await axios.post(`${getApiLocation()}/nearbyservicearea`, {
      ...getCommonParams(req, apiKey),
      ...atts,
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching service area map');
  }
};