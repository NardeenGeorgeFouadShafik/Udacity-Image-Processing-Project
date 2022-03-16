"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var image_model_1 = require("./models/image.model");
var imageProcessingHelper_1 = require("./helpers/imageProcessingHelper");
var app = (0, express_1.default)();
app.listen(3001, function () {
    console.log("server started at http://localhost:3001/api");
});
app.use('/api', index_1.default);
app.use('/', function (req, res) {
    var imageProcessingResponse = imageProcessingHelper_1.ImageProcessingHelper.imageProcessingErrorLogger(image_model_1.ImageProcessingLogger.MISSING_PARAMETERS);
    res.status(imageProcessingResponse.status)
        .contentType(imageProcessingResponse.contentType)
        .send(imageProcessingResponse.body);
});
exports.default = app;
//# sourceMappingURL=server.js.map