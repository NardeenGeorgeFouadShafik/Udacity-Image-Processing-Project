import { ImageProcessingService } from '../services/imageProcessingService';
import { Request } from 'express';
import { ImageProcessingValidator } from '../validators/imageProcessingValidator';
import { ImageProcessingLogger, ImageProcessingResponse } from '../models/image.model';
import { ImageProcessingHelper } from '../helpers/imageProcessingHelper';

export class ImageProcessingController {
    public static async processImage(req: Request): Promise<ImageProcessingResponse> {
        try {
            const imageProcessingParams = ImageProcessingValidator.validateImageProcessingParams(req);
            if (!imageProcessingParams) {
                return Promise.resolve(
                    ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.MISSING_PARAMETERS),
                );
            }
            const isRequiredImageExist = await ImageProcessingService.isImageExist(imageProcessingParams.fileName!);
            if (!isRequiredImageExist) {
                return Promise.resolve(
                    ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.ORIGINAL_IMAGE_NOTFOUND),
                );
            }
            return Promise.resolve(ImageProcessingService.retrieveThumbImage(imageProcessingParams));
        } catch (e) {
            return Promise.reject(
                ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.GENERAL_ERROR),
            );
        }
    }

    public static async listImagesName(): Promise<ImageProcessingResponse> {
        try {
            return await ImageProcessingService.listImagesName();
        } catch (e) {
            return Promise.reject(
                ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.GENERAL_ERROR),
            );
        }
    }
}
