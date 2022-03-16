"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessingService = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var image_model_1 = require("../models/image.model");
var promises_1 = __importDefault(require("fs/promises"));
var sharp_1 = __importDefault(require("sharp"));
var imageProcessingHelper_1 = require("../helpers/imageProcessingHelper");
var ImageProcessingService = /** @class */ (function () {
    function ImageProcessingService() {
    }
    ImageProcessingService.isImageExist = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var originalImagePath, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        originalImagePath = "".concat(path_1.default.resolve(__dirname, "../../assets/images/".concat(fileName, ".jpg")));
                        return [4 /*yield*/, fs_1.promises.stat(originalImagePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(true)];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, Promise.resolve(false)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageProcessingService.isImageExistenceInThumb = function (resizedImagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.stat(resizedImagePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(true)];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, Promise.resolve(false)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageProcessingService.resizeImage = function (resizedImagePath, imageProcessing, originalImagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var originalImage, resizedImage, _a, _b, _c, e_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, promises_1.default.readFile(originalImagePath)];
                    case 1:
                        originalImage = _d.sent();
                        return [4 /*yield*/, (0, sharp_1.default)(originalImage)
                                .resize(imageProcessing.width, imageProcessing.height)
                                .toBuffer()];
                    case 2:
                        resizedImage = _d.sent();
                        return [4 /*yield*/, promises_1.default.writeFile(resizedImagePath, resizedImage)];
                    case 3:
                        _d.sent();
                        _b = (_a = Promise).resolve;
                        _c = image_model_1.ImageProcessingResponse.bind;
                        return [4 /*yield*/, fs_1.promises.readFile(resizedImagePath)];
                    case 4: return [2 /*return*/, _b.apply(_a, [new (_c.apply(image_model_1.ImageProcessingResponse, [void 0, _d.sent(), image_model_1.ResponseStatus.SUCCESS,
                                image_model_1.ResponseContentType.JPG]))()])];
                    case 5:
                        e_3 = _d.sent();
                        return [2 /*return*/, Promise.resolve(imageProcessingHelper_1.ImageProcessingHelper.imageProcessingErrorLogger(image_model_1.ImageProcessingLogger.GENERAL_ERROR))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ImageProcessingService.retrieveThumbImage = function (imageProcessing) {
        return __awaiter(this, void 0, void 0, function () {
            var originalImagePath, resizedImagePath, imageExistenceInThumb, _a, _b, _c, e_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        originalImagePath = "".concat(path_1.default.resolve(__dirname, "../../assets/images/".concat(imageProcessing.fileName, ".jpg")));
                        resizedImagePath = "".concat(path_1.default.resolve(__dirname, "../../assets/thumb/".concat(imageProcessing.fileName, "--").concat(imageProcessing.width, "x").concat(imageProcessing.height, ".jpg")));
                        return [4 /*yield*/, this.isImageExistenceInThumb(resizedImagePath)];
                    case 1:
                        imageExistenceInThumb = _d.sent();
                        if (!imageExistenceInThumb) return [3 /*break*/, 3];
                        _b = (_a = Promise).resolve;
                        _c = image_model_1.ImageProcessingResponse.bind;
                        return [4 /*yield*/, fs_1.promises.readFile(resizedImagePath)];
                    case 2: return [2 /*return*/, _b.apply(_a, [new (_c.apply(image_model_1.ImageProcessingResponse, [void 0, _d.sent(), image_model_1.ResponseStatus.SUCCESS,
                                image_model_1.ResponseContentType.JPG]))()])];
                    case 3: return [2 /*return*/, Promise.resolve(this.resizeImage(resizedImagePath, imageProcessing, originalImagePath))];
                    case 4:
                        e_4 = _d.sent();
                        return [2 /*return*/, Promise.reject(e_4)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ImageProcessingService.listImagesName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var folderPathFullImage, files, imageProcessingResponse_1, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        folderPathFullImage = "".concat(path_1.default.resolve(__dirname, '../../assets/images'));
                        return [4 /*yield*/, promises_1.default.readdir(folderPathFullImage)];
                    case 1:
                        files = _a.sent();
                        if (files) {
                            imageProcessingResponse_1 = imageProcessingHelper_1.ImageProcessingHelper.imageProcessingErrorLogger(image_model_1.ImageProcessingLogger.IMAGES_NAME);
                            files.forEach(function (file) {
                                imageProcessingResponse_1.body += "<li>".concat(file.substring(0, file.length - 4), "</li>");
                            });
                            imageProcessingResponse_1.body += "</ul>";
                            return [2 /*return*/, Promise.resolve(imageProcessingResponse_1)];
                        }
                        return [2 /*return*/, imageProcessingHelper_1.ImageProcessingHelper.imageProcessingErrorLogger(image_model_1.ImageProcessingLogger.GENERAL_ERROR)];
                    case 2:
                        e_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(imageProcessingHelper_1.ImageProcessingHelper.imageProcessingErrorLogger(image_model_1.ImageProcessingLogger.GENERAL_ERROR))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageProcessingService.sharp = sharp_1.default;
    return ImageProcessingService;
}());
exports.ImageProcessingService = ImageProcessingService;
//# sourceMappingURL=imageProcessingService.js.map