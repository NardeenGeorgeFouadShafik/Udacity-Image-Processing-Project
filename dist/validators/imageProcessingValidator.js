"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessingValidator = void 0;
var ImageProcessingValidator = /** @class */ (function () {
    function ImageProcessingValidator() {
    }
    ImageProcessingValidator.validateImageProcessingParams = function (req) {
        var image = {
            fileName: req.query['fileName'] ? req.query['fileName'].toString() : '',
            height: req.query['height'] ? parseInt(req.query['height']) : undefined,
            width: req.query['width'] ? parseInt(req.query['width']) : undefined,
        };
        if (!image.fileName || !image.height || !image.width) {
            return undefined;
        }
        return image;
    };
    return ImageProcessingValidator;
}());
exports.ImageProcessingValidator = ImageProcessingValidator;
//# sourceMappingURL=imageProcessingValidator.js.map