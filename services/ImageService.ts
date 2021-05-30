import { Transaction } from 'sequelize/types';
import { seq } from '../config/db_conf';
import { ImageData } from '../models/ImageData';
import { IImageAttributes } from '../models/IImageAttributes';
import multer, { Multer } from 'multer';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { genImgFileName } from '../utils/utils';
import fs from 'fs';

const upload: multer.Multer = multer();

export const ImageService = {
    getAll: async ():Promise<Array<ImageData>> => await ImageData.findAll(),

    getByPk: async (pk:number):Promise<ImageData | null> => await ImageData.findByPk(pk),

    createNewImageData: async (imgData: IImageAttributes, file: Express.Multer.File):Promise<ImageData | undefined> => {
        const pipelineAsync = promisify(pipeline);
        if(file.detectedFileExtension === ".jpg"){
            const fileName = `${genImgFileName(file.originalname)}${file.detectedFileExtension}`;
            const path = `${__dirname}/../public/images/${fileName}`;
            if(!fs.existsSync(path)){
                await pipelineAsync(file.stream, fs.createWriteStream(path));
                try {
                    const result = await seq.transaction( async (t: Transaction) => {
                        const newImageData: ImageData = await ImageData.create({
                            ...imgData,
                            url: `https://tothmark.hu/uploads/${fileName}`,
                            name: fileName
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