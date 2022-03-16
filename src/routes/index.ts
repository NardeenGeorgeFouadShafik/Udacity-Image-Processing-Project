import express from 'express';
import imageRoute from './api/imageRoute';
import { ImageProcessingHelper } from '../helpers/imageProcessingHelper';
import { ImageProcessingLogger, ImageProcessingResponse } from '../models/image.model';

const routes = express.Router();
const imageProcessingResponse: ImageProcessingResponse = ImageProcessingHelper.imageProcessingErrorLogger(
    ImageProcessingLogger.MISSING_PARAMETERS,
);
/* routes.use('/image', (req, res) => {
    const imageProcessingResponse: ImageProcessingResponse = ImageProcessingHelper.imageProcessingErrorLogger(
        ImageProcessingLogger.IMAGES_NAME,
    );
    res.status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});*/

routes.use('/image', imageRoute);

routes.get('/', (req, res) => {
    res.status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});

routes.get('/*', (req, res) => {
    res.status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});

export default routes;
