import { ImageProcessingService } from '../../services/imageProcessingService';
import {
    ImageProcessing,
    ImageProcessingResponse,
    ResponseContentType,
    ResponseStatus,
} from '../../models/image.model';
import { promises as fsPromises, Stats } from 'fs';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
describe('isImageExistence', async () => {
    beforeEach(() => {});

    afterEach(function () {});

    const fsStats: Stats = {} as Stats;

    it('send un existing Image Name Should return False', async () => {
        const fileStatSpy = spyOn(fsPromises, 'stat').and.throwError(new Error('error'));
        const res = await ImageProcessingService.isImageExist('fileName');
        expect(fileStatSpy.calls.count()).toEqual(1);
        expect(res).toEqual(false);
    });

    it('send existing Image Name Should return true', async () => {
        const fileStatSpy = spyOn(fsPromises, 'stat').and.resolveTo(fsStats);
        const res = await ImageProcessingService.isImageExist('fileName');
        expect(fileStatSpy.calls.count()).toEqual(1);
        expect(res).toEqual(true);
    });
});

describe('isImageExistenceInThumb', async () => {
    beforeEach(() => {});

    afterEach(function () {});

    const fsStats: Stats = {} as Stats;

    it('send un existing Image Name Should return False', async () => {
        const fileStatSpy = spyOn(fsPromises, 'stat').and.throwError(new Error('error'));
        const res = await ImageProcessingService.isImageExist('fileName');
        expect(fileStatSpy.calls.count()).toEqual(1);
        expect(res).toEqual(false);
    });

    it('send existing Image Name Should return true', async () => {
        const fileStatSpy = spyOn(fsPromises, 'stat').and.resolveTo(fsStats);
        const res = await ImageProcessingService.isImageExistenceInThumb('fileName');
        expect(fileStatSpy.calls.count()).toEqual(1);
        expect(res).toEqual(true);
    });
});

describe('resizeImage', async () => {
    beforeEach(() => {
        spyOnAllFunctions(sharp());
    });
    const ImagePath = `${path.resolve(__dirname, `../../../assets/images/music.jpg`)}`;

    const imageProcessingParams: ImageProcessing = {
        height: 100,
        width: 100,
        fileName: 'music',
    };

    it('send Image to Resize Should return response', async () => {
        const originalImage = await fs.readFile(ImagePath);
        const response: ImageProcessingResponse = new ImageProcessingResponse(
            originalImage,
            ResponseStatus.SUCCESS,
            ResponseContentType.JPG,
        );
        const readFileSpy = spyOn(fsPromises, 'readFile').and.resolveTo(originalImage);
        const writeFileSpy = spyOn(fsPromises, 'writeFile').and.resolveTo(<any>{});
        const res = await ImageProcessingService.resizeImage(ImagePath, imageProcessingParams, ImagePath);
        expect(res).toEqual(response);
        expect(readFileSpy.calls.count()).toEqual(2);
        expect(writeFileSpy.calls.count()).toEqual(1);
    });

    it('send read file throw error should return error response', async () => {
        const readFileSpy = spyOn(fsPromises, 'readFile').and.throwError('error');
        const writeFileSpy = spyOn(fsPromises, 'writeFile').and.resolveTo(<any>{});
        const res = await ImageProcessingService.resizeImage(ImagePath, imageProcessingParams, ImagePath);
        expect(res.status).toEqual(ResponseStatus.BAD_REQUEST);
        expect(readFileSpy.calls.count()).toEqual(1);
        expect(writeFileSpy.calls.count()).toEqual(0);
    });
});

describe('retrieveThumbImage', async () => {
    const ImagePath = `${path.resolve(__dirname, `../../../assets/images/music.jpg`)}`;

    const imageProcessingParams: ImageProcessing = {
        height: 100,
        width: 100,
        fileName: 'music',
    };

    it('Image is already in thumb resizeImage should not be called ', async () => {
        const originalImage = await fs.readFile(ImagePath);
        const response: ImageProcessingResponse = new ImageProcessingResponse(
            originalImage,
            ResponseStatus.SUCCESS,
            ResponseContentType.JPG,
        );
        const isImageExistenceInThumbSpy = spyOn(ImageProcessingService, 'isImageExistenceInThumb').and.resolveTo(true);
        const readFileSpy = spyOn(fsPromises, 'readFile').and.resolveTo(originalImage);
        const resizeImageSpy = spyOn(ImageProcessingService, 'resizeImage').and.resolveTo(response);
        const res = await ImageProcessingService.retrieveThumbImage(imageProcessingParams);
        expect(res).toEqual(response);
        expect(isImageExistenceInThumbSpy.calls.count()).toEqual(1);
        expect(readFileSpy.calls.count()).toEqual(1);
        expect(resizeImageSpy.calls.count()).toEqual(0);
    });

    it('Image is not in thumb resizeImage should be called ', async () => {
        const originalImage = await fs.readFile(ImagePath);
        const response: ImageProcessingResponse = new ImageProcessingResponse(
            originalImage,
            ResponseStatus.SUCCESS,
            ResponseContentType.JPG,
        );
        const isImageExistenceInThumbSpy = spyOn(ImageProcessingService, 'isImageExistenceInThumb').and.resolveTo(
            false,
        );
        const readFileSpy = spyOn(fsPromises, 'readFile').and.resolveTo(originalImage);
        const resizeImageSpy = spyOn(ImageProcessingService, 'resizeImage').and.resolveTo(response);
        const res = await ImageProcessingService.retrieveThumbImage(imageProcessingParams);
        expect(res).toEqual(response);
        expect(isImageExistenceInThumbSpy.calls.count()).toEqual(1);
        expect(readFileSpy.calls.count()).toEqual(0);
        expect(resizeImageSpy.calls.count()).toEqual(1);
    });
});

describe('listImagesName', async () => {
    beforeEach(() => {
        spyOnAllFunctions(sharp());
    });

    it('Read dir success Should return response with status 200', async () => {
        const readDirSpy = spyOn(fsPromises, 'readdir').and.resolveTo(<any>['music.jpg', 'sea.jpg']);
        const res = await ImageProcessingService.listImagesName();
        expect(res.status).toEqual(ResponseStatus.SUCCESS);
        expect(readDirSpy.calls.count()).toEqual(1);
    });

    it('Read dir throw error Should return response with status 400', async () => {
        const readDirSpy = spyOn(fsPromises, 'readdir').and.resolveTo(<any>null);
        const res = await ImageProcessingService.listImagesName();
        expect(res.status).toEqual(ResponseStatus.BAD_REQUEST);
        expect(readDirSpy.calls.count()).toEqual(1);
    });
});
