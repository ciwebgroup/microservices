const ENDPOINT = process.env.ENDPOINT_URL || '/';

const getApiLocation = (): string => {
  return ENDPOINT;
};

export default getApiLocation