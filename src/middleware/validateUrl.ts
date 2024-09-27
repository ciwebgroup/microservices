import { body } from 'express-validator';

const validateUrl = [
  body('url')
    .notEmpty().withMessage('URL is required')
    .custom((value) => {
      const domainRegex = new RegExp(/^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)$/);
      if (!domainRegex.test(value)) {
        throw new Error('Invalid URL format. Must be a top-level domain or subdomain, without URI path.');
      }
      return true;
    })
];

export default validateUrl