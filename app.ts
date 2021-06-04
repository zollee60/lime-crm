import express from 'express';
import cors from 'cors';
import { ImageController } from './controllers/ImageController';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/images'));
app.use('/api', ImageController);
app.use('/', express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.listen(4000, () => {
    console.log('The application is listening on port 4000!');
})