import crypto from 'crypto';
import base64url from 'base64url';

const API_HASH = process.env.API_HASH || '';
const API_HASH_OFFSET = parseInt(process.env.API_HASH_OFFSET || '0', 10);

if (API_HASH.length !== 32) {
  throw new Error('API_HASH must be exactly 32 characters long for AES-256-CBC encryption');
}

export const generateEncodedApiKey = (realApiKey: string): string => {
  // Generate a random IV to add randomness to the encryption
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(API_HASH), iv);

  let encrypted = cipher.update(realApiKey);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Combine IV with encrypted data for transport, then encode in base64
  const encodedKey = base64url.encode(Buffer.concat([iv, encrypted]));

  return encodedKey;
};