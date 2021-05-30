import express from 'express';
import { ImageController } from './controllers/ImageController';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('public/images'));
app.use('/api', ImageController);
app.use('/', express.static('public'));

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})