import { promises as fsPromises } from 'fs';
import path from 'path';
import {
    ImageProcessing,
    ImageProcessingLogger,
    ImageProcessingResponse,
    ResponseContentType,
    ResponseStatus,
} from '../models/image.model';
import fs from 'fs/promises';
import sharp from 'sharp';
import { ImageProcessingHelper } from '../helpers/imageProcessingHelper';

export class ImageProcessingService {
    constructor() {}

    public static sharp = sharp;
    public static async isImageExist(fileName: string): Promise<boolean> {
        try {
            const originalImagePath = `${path.resolve(__dirname, `../../assets/images/${fileName}.jpg`)}`;
            await fsPromises.stat(originalImagePath);
            return Promise.resolve(true);
        } catch (e) {
            return Promise.resolve(false);
        }
    }

    public static async isImageExistenceInThumb(resizedImagePath: string): Promise<boolean> {
        try {
            await fsPromises.stat(resizedImagePath);
            return Promise.resolve(true);
        } catch (e) {
            return Promise.resolve(false);
        }
    }
    public static async isThumbFolderExist(): Promise<void> {
        try {
            await fsPromises.stat(`${path.resolve(__dirname, `../../assets/thumb/`)}`);
        } catch (e) {
            await fs.mkdir(`${path.resolve(__dirname, `../../assets/thumb`)}`);
        }
    }

    public static async resizeImage(
        resizedImagePath: string,
        imageProcessing: ImageProcessing,
        originalImagePath: string,
    ): Promise<ImageProcessingResponse> {
        try {
            const originalImage: Buffer = await fs.readFile(originalImagePath);
            const resizedImage: Buffer = await sharp(originalImage)
                .resize(imageProcessing.width, imageProcessing.height)
                .toBuffer();
            await this.isThumbFolderExist();
            await fs.writeFile(resizedImagePath, resizedImage);
            return Promise.resolve(
                new ImageProcessingResponse(
                    await fsPromises.readFile(resizedImagePath),
                    ResponseStatus.SUCCESS,
                    ResponseContentType.JPG,
                ),
            );
        } catch (e) {
            return Promise.resolve(
                ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.GENERAL_ERROR),
            );
        }
    }

    public static async retrieveThumbImage(imageProcessing: ImageProcessing): Promise<ImageProcessingResponse> {
        try {
            const originalImagePath = `${path.resolve(
                __dirname,
                `../../assets/images/${imageProcessing.fileName}.jpg`,
            )}`;
            const resizedImagePath = `${path.resolve(
                __dirname,
                `../../assets/thumb/${imageProcessing.fileName}--${imageProcessing.width}x${imageProcessing.height}.jpg`,
            )}`;
            const imageExistenceInThumb = await this.isImageExistenceInThumb(resizedImagePath);
            if (imageExistenceInThumb) {
                return Promise.resolve(
                    new ImageProcessingResponse(
                        await fsPromises.readFile(resizedImagePath),
                        ResponseStatus.SUCCESS,
                        ResponseContentType.JPG,
                    ),
                );
            }
            return Promise.resolve(this.resizeImage(resizedImagePath, imageProcessing, originalImagePath));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public static async listImagesName(): Promise<ImageProcessingResponse> {
        try {
            const folderPathFullImage = `${path.resolve(__dirname, '../../assets/images')}`;

            const files: string[] | null = await fs.readdir(folderPathFullImage);
            if (files) {
                const imageProcessingResponse: ImageProcessingResponse =
                    ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.IMAGES_NAME);
                files.forEach((file: string): void => {
                    imageProcessingResponse.body += `<li>${file.substring(0, file.length - 4)}</li>`;
                });
                imageProcessingResponse.body += `</ul>`;
                return Promise.resolve(imageProcessingResponse);
            }
            return ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.GENERAL_ERROR);
        } catch (e) {
            return Promise.reject(
                ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.GENERAL_ERROR),
            );
        }
    }
}
