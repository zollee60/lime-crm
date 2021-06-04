import express from 'express';
import { ImageService } from '../services/ImageService';
import { ImageData } from '../models/ImageData';
import { IImageAttributes } from '../models/IImageAttributes';
import multer from 'multer';

const upload: multer.Multer = multer();

const router:express.Router = express.Router();

router.get("/all", async (req:express.Request, res:express.Response) => {
    const images: Array<ImageData> = await ImageService.getAll();
    res.json(images);
});

router.get("/get/:id", async (req:express.Request, res:express.Response) => {
    const pk: number = parseInt(req.params.id);
    const image: ImageData | null = await ImageService.getByPk(pk);
    if(image) res.json(image);
    else res.sendStatus(400);
});

router.post("/create", upload.single("image"), async (req:express.Request, res:express.Response) => {
    const imgData: IImageAttributes = req.body;
    console.debug(imgData);
    const newImage: ImageData | undefined = await ImageService.createNewImageData(imgData, req.file);
    
    if(newImage){
        const images: Array<ImageData> = await ImageService.getAll();
        res.json(images);
    } 
    else res.sendStatus(400);
});

export { router as ImageController };

