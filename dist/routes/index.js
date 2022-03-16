"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageRoute_1 = __importDefault(require("./api/imageRoute"));
var imageProcessingHelper_1 = require("../helpers/imageProcessingHelper");
var image_model_1 = require("../models/image.model");
var routes = express_1.default.Router();
var imageProcessingResponse = imageProcessingHelper_1.ImageProcessingHelper.imageProcessingErrorLogger(image_model_1.ImageProcessingLogger.MISSING_PARAMETERS);
/* routes.use('/image', (req, res) => {
    const imageProcessingResponse: ImageProcessingResponse = ImageProcessingHelper.imageProcessingErrorLogger(
        ImageProcessingLogger.IMAGES_NAME,
    );
    res.status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});*/
routes.use('/image', imageRoute_1.default);
routes.get('/', function (req, res) {
    res.status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});
routes.get('/*', function (req, res) {
    res.status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});
exports.default = routes;
//# sourceMappingURL=index.js.map