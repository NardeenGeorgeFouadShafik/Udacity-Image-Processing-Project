"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseContentType = exports.ResponseStatus = exports.ImageProcessingLogger = exports.ImageProcessingResponse = void 0;
var ImageProcessingResponse = /** @class */ (function () {
    function ImageProcessingResponse(body, status, contentType) {
        this.body = body;
        this.status = status;
        this.contentType = contentType;
    }
    return ImageProcessingResponse;
}());
exports.ImageProcessingResponse = ImageProcessingResponse;
var ImageProcessingLogger;
(function (ImageProcessingLogger) {
    ImageProcessingLogger[ImageProcessingLogger["ORIGINAL_IMAGE_NOTFOUND"] = 0] = "ORIGINAL_IMAGE_NOTFOUND";
    ImageProcessingLogger[ImageProcessingLogger["MISSING_PARAMETERS"] = 1] = "MISSING_PARAMETERS";
    ImageProcessingLogger[ImageProcessingLogger["GENERAL_ERROR"] = 2] = "GENERAL_ERROR";
    ImageProcessingLogger[ImageProcessingLogger["IMAGES_NAME"] = 3] = "IMAGES_NAME";
})(ImageProcessingLogger = exports.ImageProcessingLogger || (exports.ImageProcessingLogger = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
var ResponseContentType;
(function (ResponseContentType) {
    ResponseContentType["HTML"] = "html";
    ResponseContentType["JPG"] = "jpg";
})(ResponseContentType = exports.ResponseContentType || (exports.ResponseContentType = {}));
//# sourceMappingURL=image.model.js.map