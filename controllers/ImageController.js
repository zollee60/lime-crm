import express from 'express';
import { ImageService } from '../services/ImageService';
import multer from 'multer';
const upload = multer();
const router = express.Router();
router.get("/all", async (req, res) => {
    const images = await ImageService.getAll();
    res.json(images);
});
router.get("/get/:id", async (req, res) => {
    const pk = parseInt(req.params.id);
    const image = await ImageService.getByPk(pk);
    if (image)
        res.json(image);
    else
        res.sendStatus(400);
});
router.post("/create", upload.single("image"), async (req, res) => {
    const imgData = req.body;
    console.debug(imgData);
    const newImage = await ImageService.createNewImageData(imgData, req.file);
    if (newImage) {
        const images = await ImageService.getAll();
        res.json(images);
    }
    else
        res.sendStatus(400);
});
export { router as ImageController };
