import { seq } from '../config/db_conf';
import { ImageData } from '../models/ImageData';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { genImgFileName } from '../utils/utils';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sizeOf from 'image-size';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const ImageService = {
    getAll: async () => await (await ImageData.findAll()).sort((iPrev, iNext) => {
        const prevDate = new Date(iPrev.createdAt);
        const nextDate = new Date(iNext.createdAt);
        if (prevDate < nextDate)
            return 1;
        if (nextDate < prevDate)
            return -1;
        return 0;
    }),
    getByPk: async (pk) => await ImageData.findByPk(pk),
    createNewImageData: async (imgData, file) => {
        const pipelineAsync = promisify(pipeline);
        if (file.detectedFileExtension === ".jpg" || file.detectedFileExtension === ".png") {
            const fileName = `${genImgFileName(file.originalName)}${file.detectedFileExtension}`;
            const path = `${__dirname}/../public/images/${fileName}`;
            if (!fs.existsSync(path)) {
                await pipelineAsync(file.stream, fs.createWriteStream(path));
                try {
                    const result = await seq.transaction(async (t) => {
                        const dimensions = sizeOf(path);
                        const newImageData = await ImageData.create(Object.assign(Object.assign({}, imgData), { url: `${process.env.IMAGE_SRC}/uploads/${fileName}`, name: fileName, size: file.size / 1024 / 1024, dimensions: `${dimensions.width} x ${dimensions.height}` }), { transaction: t });
                        return newImageData;
                    });
                    return result;
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    },
};
