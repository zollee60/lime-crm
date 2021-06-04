import { Table, Column, Model } from 'sequelize-typescript'
import { DataType } from 'sequelize-typescript';
import { IImageAttributes } from '../models/IImageAttributes'


@Table({timestamps: false})
export class ImageData extends Model<IImageAttributes>{

    @Column
    name!: string;

    @Column
    originalName!: string;

    @Column
    url!: string;

    @Column
    source!: string;

    @Column({type: DataType.FLOAT})
    size!: number;

    @Column
    dimensions!: string;

    @Column({type: DataType.TEXT})
    description!: string;

    @Column
    createdAt!: Date;
}