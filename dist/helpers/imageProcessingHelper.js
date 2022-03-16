"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessingHelper = void 0;
var image_model_1 = require("../models/image.model");
var ImageProcessingHelper = /** @class */ (function () {
    function ImageProcessingHelper() {
    }
    ImageProcessingHelper.imageProcessingErrorLogger = function (ImageProcessingLoggerType) {
        switch (ImageProcessingLoggerType) {
            case image_model_1.ImageProcessingLogger.ORIGINAL_IMAGE_NOTFOUND:
                return new image_model_1.ImageProcessingResponse("<p style='color: red; font-size: x-large'>This Image not exist</p>", image_model_1.ResponseStatus.BAD_REQUEST, image_model_1.ResponseContentType.HTML);
            case image_model_1.ImageProcessingLogger.MISSING_PARAMETERS:
                return new image_model_1.ImageProcessingResponse("<p style='color: red; font-size: large'>Please make sure that the url contains correct filename, height and width</p>\n<h3>For Resizing Image Route</h3>\n<a style=\"color: darkblue;  text-decoration: underline;\">http://localhost:3001/api/resizeImage?fileName=Name&height=number&width=number</a></br>\n<h3>For Listing Images Name</h3>\n<a style=\"color: midnightblue; text-decoration: underline\"> http://localhost:3001/api/image/listImagesName </a>", image_model_1.ResponseStatus.BAD_REQUEST, image_model_1.ResponseContentType.HTML);
            case image_model_1.ImageProcessingLogger.IMAGES_NAME:
                return new image_model_1.ImageProcessingResponse("<p style='color: red; font-size: large'>Images Name available are : </p><br>\n                           <ul>", image_model_1.ResponseStatus.SUCCESS, image_model_1.ResponseContentType.HTML);
            case image_model_1.ImageProcessingLogger.GENERAL_ERROR:
            default:
                return new image_model_1.ImageProcessingResponse("<p style='color: red; font-size: x-large'>Something went wrong</p>", image_model_1.ResponseStatus.BAD_REQUEST, image_model_1.ResponseContentType.HTML);
        }
    };
    return ImageProcessingHelper;
}());
exports.ImageProcessingHelper = ImageProcessingHelper;
//# sourceMappingURL=imageProcessingHelper.js.map