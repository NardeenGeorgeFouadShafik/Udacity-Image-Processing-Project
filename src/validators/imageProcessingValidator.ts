import { Request } from 'express';
import { ImageProcessing } from '../models/image.model';

export class ImageProcessingValidator {
    constructor() {}
    public static validateImageProcessingParams(req: Request): ImageProcessing | undefined {
        const image: ImageProcessing = {
            fileName: req.query['fileName'] ? req.query['fileName'].toString() : '',
            height: req.query['height'] ? parseInt(req.query['height'] as string) : undefined,
            width: req.query['width'] ? parseInt(req.query['width'] as string) : undefined,
        };

        if (!image.fileName || !image.height || !image.width) {
            return undefined;
        }
        return image;
    }
}
