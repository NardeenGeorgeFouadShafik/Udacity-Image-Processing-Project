import {
    ImageProcessingLogger,
    ImageProcessingResponse,
    ResponseContentType,
    ResponseStatus,
} from '../models/image.model';

export class ImageProcessingHelper {
    constructor() {}

    public static imageProcessingErrorLogger(ImageProcessingLoggerType: number): ImageProcessingResponse {
        switch (ImageProcessingLoggerType) {
            case ImageProcessingLogger.ORIGINAL_IMAGE_NOTFOUND:
                return new ImageProcessingResponse(
                    `<p style='color: red; font-size: x-large'>This Image not exist</p>`,
                    ResponseStatus.BAD_REQUEST,
                    ResponseContentType.HTML,
                );
            case ImageProcessingLogger.MISSING_PARAMETERS:
                return new ImageProcessingResponse(
                    `<p style='color: red; font-size: large'>Please make sure that the url contains correct filename, height and width</p>
<h3>For Resizing Image Route</h3>
<a style="color: darkblue;  text-decoration: underline;">http://localhost:3001/api/resizeImage?fileName=Name&height=number&width=number</a></br>
<h3>For Listing Images Name</h3>
<a style="color: midnightblue; text-decoration: underline"> http://localhost:3001/api/image/listImagesName </a>`,
                    ResponseStatus.BAD_REQUEST,
                    ResponseContentType.HTML,
                );
            case ImageProcessingLogger.IMAGES_NAME:
                return new ImageProcessingResponse(
                    `<p style='color: red; font-size: large'>Images Name available are : </p><br>
                           <ul>`,
                    ResponseStatus.SUCCESS,
                    ResponseContentType.HTML,
                );
            case ImageProcessingLogger.GENERAL_ERROR:
            default:
                return new ImageProcessingResponse(
                    `<p style='color: red; font-size: x-large'>Something went wrong</p>`,
                    ResponseStatus.BAD_REQUEST,
                    ResponseContentType.HTML,
                );
        }
    }
}
