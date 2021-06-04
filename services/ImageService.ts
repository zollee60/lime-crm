import { Transaction } from 'sequelize/types';
import { seq } from '../config/db_conf';
import { ImageData } from '../models/ImageData';
import { IImageAttributes } from '../models/IImageAttributes';
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
    /**
     * Service method which returns all image data from the databse
     * @returns {Promise<Array<ImageData>>} - Promise which resolves into an array of ImageData objects
     */
    getAll: async ():Promise<Array<ImageData>> => await (await ImageData.findAll()).sort((iPrev, iNext) => {
        const prevDate = new Date(iPrev.createdAt);
        const nextDate = new Date(iNext.createdAt);
        if(prevDate < nextDate) return 1;
        if(nextDate < prevDate) return -1;
        return 0;
    }),

    /** Service method which returns an ImageData object based on the primary key
     * @param  {number} pk - Primary key of the image data 
     */
    getByPk: async (pk:number):Promise<ImageData | null> => await ImageData.findByPk(pk),

    /**
     * Service method which handles the saving of images onto the server & the database
     * @param  {IImageAttributes} imgData - Information about the image coming from the client
     * @param  {Express.Multer.File} file - The image
     * @returns {Promise<ImageData | undefined>} - Promise which resolves into an ImageData object, if the saving of file fails for some reason, than undefined is returned
     */
    createNewImageData: async (imgData: IImageAttributes, file: Express.Multer.File):Promise<ImageData | undefined> => {
        const pipelineAsync = promisify(pipeline);
        if(file.detectedFileExtension === ".jpg" || file.detectedFileExtension === ".png"){
            const fileName = `${genImgFileName(file.originalName)}${file.detectedFileExtension}`;
            const path = `${__dirname}/../public/images/${fileName}`;
            if(!fs.existsSync(path)){
                await pipelineAsync(file.stream, fs.createWriteStream(path));
                try {
                    const result = await seq.transaction( async (t: Transaction) => {
                        const dimensions = sizeOf(path);
                        const newImageData: ImageData = await ImageData.create({
                            ...imgData,
                            url: `${process.env.IMAGE_SRC}/uploads/${fileName}`,
                            name: fileName,
                            size: file.size / 1024 / 1024,
                            dimensions: `${dimensions.width} x ${dimensions.height}`
                        },{ transaction: t });
                        return newImageData;
                    })
                    return result;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
}