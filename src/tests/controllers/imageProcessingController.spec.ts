import { ImageProcessingController } from '../../controllers/ImageProcessingController';
import { ImageProcessingValidator } from '../../validators/imageProcessingValidator';
import { ImageProcessingService } from '../../services/imageProcessingService';
import {
    ImageProcessing,
    ImageProcessingLogger,
    ImageProcessingResponse,
    ResponseContentType,
    ResponseStatus,
} from '../../models/image.model';
import { ImageProcessingHelper } from '../../helpers/imageProcessingHelper';

describe('processImage', async () => {
    beforeEach(() => {});

    afterEach(function () {});

    const imageProcessingParams: ImageProcessing = {
        height: 100,
        width: 100,
        fileName: 'music',
    };
    const missingImageProcessingParams: ImageProcessing = {
        height: 0,
        width: 0,
        fileName: '',
    };
    const response: ImageProcessingResponse = new ImageProcessingResponse(
        'file',
        ResponseStatus.SUCCESS,
        ResponseContentType.JPG,
    );
    const errorResponse: ImageProcessingResponse = new ImageProcessingResponse(
        'file',
        ResponseStatus.BAD_REQUEST,
        ResponseContentType.HTML,
    );
    const req = {
        query: {
            height: 10,
            width: 10,
            fileName: 'test',
        },
    };

    it('one of params not sent should return status 400', async () => {
        const validateImageProcessingParamsSpy = spyOn(
            ImageProcessingValidator,
            'validateImageProcessingParams',
        ).and.returnValue(missingImageProcessingParams);
        const isImageExistenceSpy = spyOn(ImageProcessingService, 'isImageExist').and.resolveTo(true);
        const retrieveThumbImageSpy = spyOn(ImageProcessingService, 'retrieveThumbImage').and.resolveTo(errorResponse);
        const res = await ImageProcessingController.processImage(<any>req);
        expect(validateImageProcessingParamsSpy.calls.count()).toEqual(1);
        expect(isImageExistenceSpy.calls.count()).toEqual(0);
        expect(retrieveThumbImageSpy.calls.count()).toEqual(0);
        expect(res.status).toEqual(ResponseStatus.BAD_REQUEST);
    });

    it('Original image not exist should return status 400', async () => {
        const validateImageProcessingParamsSpy = spyOn(
            ImageProcessingValidator,
            'validateImageProcessingParams',
        ).and.returnValue(imageProcessingParams);
        const isImageExistenceSpy = spyOn(ImageProcessingService, 'isImageExist').and.resolveTo(false);
        const retrieveThumbImageSpy = spyOn(ImageProcessingService, 'retrieveThumbImage').and.resolveTo(response);
        const res = await ImageProcessingController.processImage(<any>req);
        expect(validateImageProcessingParamsSpy.calls.count()).toEqual(1);
        expect(isImageExistenceSpy.calls.count()).toEqual(1);
        expect(retrieveThumbImageSpy.calls.count()).toEqual(0);
        expect(res.status).toEqual(400);
    });

    it('Original image exists should return status 200', async () => {
        const validateImageProcessingParamsSpy = spyOn(
            ImageProcessingValidator,
            'validateImageProcessingParams',
        ).and.returnValue(imageProcessingParams);
        const isImageExistenceSpy = spyOn(ImageProcessingService, 'isImageExist').and.resolveTo(true);
        const retrieveThumbImageSpy = spyOn(ImageProcessingService, 'retrieveThumbImage').and.resolveTo(response);
        const res = await ImageProcessingController.processImage(<any>req);
        expect(validateImageProcessingParamsSpy.calls.count()).toEqual(1);
        expect(isImageExistenceSpy.calls.count()).toEqual(1);
        expect(retrieveThumbImageSpy.calls.count()).toEqual(1);
        expect(res.status).toEqual(ResponseStatus.SUCCESS);
    });

    it('Original image exist  resizing throw error should return status 400', async () => {
        const validateImageProcessingParamsSpy = spyOn(
            ImageProcessingValidator,
            'validateImageProcessingParams',
        ).and.returnValue(imageProcessingParams);
        const isImageExistenceSpy = spyOn(ImageProcessingService, 'isImageExist').and.resolveTo(true);
        const retrieveThumbImageSpy = spyOn(ImageProcessingService, 'retrieveThumbImage').and.rejectWith(
            ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.GENERAL_ERROR),
        );
        try {
            await ImageProcessingController.processImage(<any>req);
        } catch (e: any) {
            expect(validateImageProcessingParamsSpy.calls.count()).toEqual(1);
            expect(isImageExistenceSpy.calls.count()).toEqual(1);
            expect(retrieveThumbImageSpy.calls.count()).toEqual(1);
            expect(e.status).toEqual(ResponseStatus.BAD_REQUEST);
        }
    });
});

describe('listImagesName', async () => {
    const response: ImageProcessingResponse = new ImageProcessingResponse(
        'file',
        ResponseStatus.SUCCESS,
        ResponseContentType.JPG,
    );
    beforeEach(() => {});

    afterEach(function () {});

    it('listImagesName should return status 200', async () => {
        const listImagesNameSpy = spyOn(ImageProcessingService, 'listImagesName').and.resolveTo(response);
        const res = await ImageProcessingController.listImagesName();
        expect(listImagesNameSpy.calls.count()).toEqual(1);
        expect(res.status).toEqual(ResponseStatus.SUCCESS);
    });

    it('listImagesName should return status 400', async () => {
        const listImagesNameSpy = spyOn(ImageProcessingService, 'listImagesName').and.rejectWith(
            ImageProcessingHelper.imageProcessingErrorLogger(ImageProcessingLogger.GENERAL_ERROR),
        );
        try {
            await ImageProcessingController.listImagesName();
        } catch (e: any) {
            expect(listImagesNameSpy.calls.count()).toEqual(1);
            expect(e.status).toEqual(ResponseStatus.BAD_REQUEST);
        }
    });
});
