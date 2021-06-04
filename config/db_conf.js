//import { Sequelize } from "sequelize";
import { Sequelize } from 'sequelize-typescript';
import { ImageData } from '../models/ImageData';
export const seq = new Sequelize({
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    models: [ImageData]
});
await seq.sync();
