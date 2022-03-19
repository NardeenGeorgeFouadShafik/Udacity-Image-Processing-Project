import express from 'express';
import routes from './routes/index';
import { ImageProcessingLogger, ImageProcessingResponse } from './models/image.model';
import { ImageProcessingHelper } from './helpers/imageProcessingHelper';

const app = express();

app.listen(3001, () => {
    console.log(`server started at http://localhost:3001/api`);
});
app.use('/api', routes);

app.get('/', (req, res) => {
    const imageProcessingResponse: ImageProcessingResponse = ImageProcessingHelper.imageProcessingErrorLogger(
        ImageProcessingLogger.MISSING_PARAMETERS,
    );
    res.status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});

export default app;
