import express, { Router } from 'express';
import imageRoute from './api/imageRoute';
import { ImageProcessingHelper } from '../helpers/imageProcessingHelper';
import { ImageProcessingLogger, ImageProcessingResponse } from '../models/image.model';

const routes: Router = express.Router();
const imageProcessingResponse: ImageProcessingResponse = ImageProcessingHelper.imageProcessingErrorLogger(
    ImageProcessingLogger.MISSING_PARAMETERS,
);
routes.use('/image', imageRoute);

routes.get('/', (req, res): express.Response<any, Record<string, any>> => {
    return res
        .status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});

routes.get('/*', (req, res): express.Response<any, Record<string, any>> => {
    return res
        .status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});

export default routes;
