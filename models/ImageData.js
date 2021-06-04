var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
let ImageData = class ImageData extends Model {
};
__decorate([
    Column,
    __metadata("design:type", String)
], ImageData.prototype, "name", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], ImageData.prototype, "originalName", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], ImageData.prototype, "url", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], ImageData.prototype, "source", void 0);
__decorate([
    Column({ type: DataType.FLOAT }),
    __metadata("design:type", Number)
], ImageData.prototype, "size", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], ImageData.prototype, "dimensions", void 0);
__decorate([
    Column({ type: DataType.TEXT }),
    __metadata("design:type", String)
], ImageData.prototype, "description", void 0);
__decorate([
    Column,
    __metadata("design:type", Date)
], ImageData.prototype, "createdAt", void 0);
ImageData = __decorate([
    Table({ timestamps: false })
], ImageData);
export { ImageData };
