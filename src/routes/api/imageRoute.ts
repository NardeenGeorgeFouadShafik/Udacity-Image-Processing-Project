import express, { Request, Response } from 'express';
import { ImageProcessingController } from '../../controllers/ImageProcessingController';
import { ImageProcessingResponse } from '../../models/image.model';

const imageRoute = express.Router();

imageRoute.get('/resizeImage', async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const imageProcessingResponse: ImageProcessingResponse = await ImageProcessingController.processImage(req);
    return res
        .status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});

imageRoute.get('/listImagesName', async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const imageProcessingResponse: ImageProcessingResponse = await ImageProcessingController.listImagesName();
    return res
        .status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});

export default imageRoute;
