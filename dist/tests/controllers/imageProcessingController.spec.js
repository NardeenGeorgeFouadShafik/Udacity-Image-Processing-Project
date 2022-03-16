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
Object.defineProperty(exports, "__esModule", { value: true });
var ImageProcessingController_1 = require("../../controllers/ImageProcessingController");
var imageProcessingValidator_1 = require("../../validators/imageProcessingValidator");
var imageProcessingService_1 = require("../../services/imageProcessingService");
var image_model_1 = require("../../models/image.model");
var imageProcessingHelper_1 = require("../../helpers/imageProcessingHelper");
describe('processImage', function () { return __awaiter(void 0, void 0, void 0, function () {
    var imageProcessingParams, response, errorResponse, req;
    return __generator(this, function (_a) {
        beforeEach(function () { });
        afterEach(function () { });
        imageProcessingParams = {
            height: 100,
            width: 100,
            fileName: 'music',
        };
        response = new image_model_1.ImageProcessingResponse('file', image_model_1.ResponseStatus.SUCCESS, image_model_1.ResponseContentType.JPG);
        errorResponse = new image_model_1.ImageProcessingResponse('file', image_model_1.ResponseStatus.BAD_REQUEST, image_model_1.ResponseContentType.HTML);
        req = {
            query: {
                height: 10,
                width: 10,
                fileName: 'test',
            },
        };
        it('one of params not sent should return status 400', function () { return __awaiter(void 0, void 0, void 0, function () {
            var validateImageProcessingParamsSpy, isImageExistenceSpy, retrieveThumbImageSpy, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateImageProcessingParamsSpy = spyOn(imageProcessingValidator_1.ImageProcessingValidator, 'validateImageProcessingParams').and.returnValue(undefined);
                        isImageExistenceSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'isImageExist').and.resolveTo(false);
                        retrieveThumbImageSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'retrieveThumbImage').and.resolveTo(errorResponse);
                        return [4 /*yield*/, ImageProcessingController_1.ImageProcessingController.processImage(req)];
                    case 1:
                        res = _a.sent();
                        expect(validateImageProcessingParamsSpy.calls.count()).toEqual(1);
                        expect(isImageExistenceSpy.calls.count()).toEqual(0);
                        expect(retrieveThumbImageSpy.calls.count()).toEqual(0);
                        expect(res.status).toEqual(image_model_1.ResponseStatus.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Original image not exist should return status 400', function () { return __awaiter(void 0, void 0, void 0, function () {
            var validateImageProcessingParamsSpy, isImageExistenceSpy, retrieveThumbImageSpy, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateImageProcessingParamsSpy = spyOn(imageProcessingValidator_1.ImageProcessingValidator, 'validateImageProcessingParams').and.returnValue(imageProcessingParams);
                        isImageExistenceSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'isImageExist').and.resolveTo(false);
                        retrieveThumbImageSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'retrieveThumbImage').and.resolveTo(response);
                        return [4 /*yield*/, ImageProcessingController_1.ImageProcessingController.processImage(req)];
                    case 1:
                        res = _a.sent();
                        expect(validateImageProcessingParamsSpy.calls.count()).toEqual(1);
                        expect(isImageExistenceSpy.calls.count()).toEqual(1);
                        expect(retrieveThumbImageSpy.calls.count()).toEqual(0);
                        expect(res.status).toEqual(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Original image exists should return status 200', function () { return __awaiter(void 0, void 0, void 0, function () {
            var validateImageProcessingParamsSpy, isImageExistenceSpy, retrieveThumbImageSpy, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateImageProcessingParamsSpy = spyOn(imageProcessingValidator_1.ImageProcessingValidator, 'validateImageProcessingParams').and.returnValue(imageProcessingParams);
                        isImageExistenceSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'isImageExist').and.resolveTo(true);
                        retrieveThumbImageSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'retrieveThumbImage').and.resolveTo(response);
                        return [4 /*yield*/, ImageProcessingController_1.ImageProcessingController.processImage(req)];
                    case 1:
                        res = _a.sent();
                        expect(validateImageProcessingParamsSpy.calls.count()).toEqual(1);
                        expect(isImageExistenceSpy.calls.count()).toEqual(1);
                        expect(retrieveThumbImageSpy.calls.count()).toEqual(1);
                        expect(res.status).toEqual(image_model_1.ResponseStatus.SUCCESS);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Original image exist  resizing throw error should return status 400', function () { return __awaiter(void 0, void 0, void 0, function () {
            var validateImageProcessingParamsSpy, isImageExistenceSpy, retrieveThumbImageSpy, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateImageProcessingParamsSpy = spyOn(imageProcessingValidator_1.ImageProcessingValidator, 'validateImageProcessingParams').and.returnValue(imageProcessingParams);
                        isImageExistenceSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'isImageExist').and.resolveTo(true);
                        retrieveThumbImageSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'retrieveThumbImage').and.rejectWith(imageProcessingHelper_1.ImageProcessingHelper.imageProcessingErrorLogger(image_model_1.ImageProcessingLogger.GENERAL_ERROR));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ImageProcessingController_1.ImageProcessingController.processImage(req)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(validateImageProcessingParamsSpy.calls.count()).toEqual(1);
                        expect(isImageExistenceSpy.calls.count()).toEqual(1);
                        expect(retrieveThumbImageSpy.calls.count()).toEqual(1);
                        expect(e_1.status).toEqual(image_model_1.ResponseStatus.BAD_REQUEST);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
describe('listImagesName', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        response = new image_model_1.ImageProcessingResponse('file', image_model_1.ResponseStatus.SUCCESS, image_model_1.ResponseContentType.JPG);
        beforeEach(function () { });
        afterEach(function () { });
        it('listImagesName should return status 200', function () { return __awaiter(void 0, void 0, void 0, function () {
            var listImagesNameSpy, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listImagesNameSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'listImagesName').and.resolveTo(response);
                        return [4 /*yield*/, ImageProcessingController_1.ImageProcessingController.listImagesName()];
                    case 1:
                        res = _a.sent();
                        expect(listImagesNameSpy.calls.count()).toEqual(1);
                        expect(res.status).toEqual(image_model_1.ResponseStatus.SUCCESS);
                        return [2 /*return*/];
                }
            });
        }); });
        it('listImagesName should return status 400', function () { return __awaiter(void 0, void 0, void 0, function () {
            var listImagesNameSpy, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listImagesNameSpy = spyOn(imageProcessingService_1.ImageProcessingService, 'listImagesName').and.rejectWith(imageProcessingHelper_1.ImageProcessingHelper.imageProcessingErrorLogger(image_model_1.ImageProcessingLogger.GENERAL_ERROR));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ImageProcessingController_1.ImageProcessingController.listImagesName()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2);
                        expect(listImagesNameSpy.calls.count()).toEqual(1);
                        expect(e_2.status).toEqual(image_model_1.ResponseStatus.BAD_REQUEST);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=imageProcessingController.spec.js.map