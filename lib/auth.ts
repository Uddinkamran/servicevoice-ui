import crypto from 'crypto';

export function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  const newHash = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha512').toString('hex');
  return newHash === hash;
}
