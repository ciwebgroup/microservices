import crypto from 'crypto';
import base64url from 'base64url';

const API_HASH_DECODER = process.env.API_HASH || '';

if (API_HASH_DECODER.length !== 32) {
  throw new Error('API_HASH must be exactly 32 characters long for AES-256-CBC decryption');
}

export const decodeApiKey = (encodedKey: string): string => {
  // Decode base64 to get back the IV and encrypted data
  const decodedBuffer = base64url.toBuffer(encodedKey);

  // Extract IV (first 16 bytes) and encrypted data
  const iv = decodedBuffer.slice(0, 16);
  const encryptedData = decodedBuffer.slice(16);

  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(API_HASH_DECODER), iv);

  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};