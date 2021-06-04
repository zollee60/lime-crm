import crypto from 'crypto';
export function genImgFileName(filename) {
    return crypto.createHash('md5').update(filename).digest('hex');
}
