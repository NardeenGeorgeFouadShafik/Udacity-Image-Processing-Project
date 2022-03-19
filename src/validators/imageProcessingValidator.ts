import { Request } from 'express';
import { ImageProcessing, ImageProcessingLogger, ImageProcessingResponse } from '../models/image.model';
import { ImageProcessingHelper } from '../helpers/imageProcessingHelper';

export class ImageProcessingValidator {
    constructor() {}

    public static validateImageProcessingParams(req: Request): ImageProcessing {
        const image: ImageProcessing = {
            fileName: req.query['fileName'] ? req.query['fileName'].toString() : '',
            height: parseInt(req.query['height'] as string) ? parseInt(req.query['height'] as string) : undefined,
            width: parseInt(req.query['width'] as string) ? parseInt(req.query['width'] as string) : undefined,
        };
        return image;
    }

    public static retrieveCorrectErrorMsg(image: ImageProcessing): ImageProcessingResponse {
        const imageProcessingResponse: ImageProcessingResponse = ImageProcessingHelper.imageProcessingErrorLogger(
            ImageProcessingLogger.MISSING_PARAMETERS,
        );

        if (!image.fileName) {
            imageProcessingResponse.body += `<p style='color: darkred; font-size: x-large'>FileName is Required, must be string and one of available ImagesName </p>`;
        }
        if (!image.width) {
            imageProcessingResponse.body += `<p style='color: darkred; font-size: x-large'>width is Required, must be a number</p>`;
        }

        if (!image.height) {
            imageProcessingResponse.body += `<p style='color: darkred; font-size: x-large'>height is Required, must be a number</p>`;
        }
        return imageProcessingResponse;
    }
}
