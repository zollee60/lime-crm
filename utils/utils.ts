import crypto from 'crypto';

export function genImgFileName(filename: string): string {
    return crypto.createHash('md5').update(filename).digest('hex');
}