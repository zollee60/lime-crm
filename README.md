# Lime-CRM - Image manager web application backend

This project is a test assignment. This repository **contains only the backend** of the application. [See the live demo site here](https://tothmark.hu)

## Third party libraries used in this project:
- [dotenv](https://www.npmjs.com/package/dotenv): For loading environment variables
- [express](https://www.npmjs.com/package/express): Web framework
- [sequelize](https://www.npmjs.com/package/sequelize): ORM tool
- [mysql2](https://www.npmjs.com/package/mysql2): Database driver
- [multer_v2](https://www.npmjs.com/package/multer/v/2.0.0-alpha.7): Middleware to handle file uploading
- [image-size](https://www.npmjs.com/package/image-size): Module to get the dimensions of an image

The project was developed with NodeJS v16.

## Known issues (and solutions):
1. This project uses Multer v2 which uses [fs-temp](https://github.com/LinusU/fs-temp) to handle file creation. In Node v16 this package breaks. In order to solve the problem, you have to modify **fs-temp/lib/write-stream.js**:
   ```javascript
    WriteStream.call(this, null, options) 
   ```
   You have to put a string to the place of null
   ```javascript
    WriteStream.call(this, "null", options) 
   ```
    For further information [see this GitHub issue](https://github.com/LinusU/fs-temp/issues/5)

2. This project is written in Typescript and [ts-node](https://www.npmjs.com/package/ts-node) was used during the development process. But ts-node fails when ES Modules are in the dependency graph. I resolved the issue by using Node's experimental Loader hook with ts-node's experimental ESM Loader. Because this solution uses experimental features, it might break at any time. For further information:
   1. [#935 ts-node fails when ES Modules are in the dependency graph in Node.js 13+](https://github.com/TypeStrong/ts-node/issues/935)
   2. [#1007 ESM Support feedback](https://github.com/TypeStrong/ts-node/issues/1007)

