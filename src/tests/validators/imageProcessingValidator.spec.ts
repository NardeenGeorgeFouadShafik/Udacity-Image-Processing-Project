import { ImageProcessing } from '../../models/image.model';
import { ImageProcessingValidator } from '../../validators/imageProcessingValidator';

describe('validateImageProcessingParams', async () => {
    beforeEach(() => {});

    afterEach(function () {});

    const req = {
        query: {
            height: 10,
            width: 10,
            fileName: 'test',
        },
    };
    const imageProcessing: ImageProcessing = {
        fileName: 'test',
        width: 10,
        height: 10,
    };

    const reqMissingParams = {
        query: {
            width: 10,
            fileName: 'test',
        },
    };

    it('request has all required parameters Should return ImageProcessing object', async () => {
        const res = ImageProcessingValidator.validateImageProcessingParams(<any>req);
        expect(res).toEqual(imageProcessing);
    });

    it('request has missing parameters Should return undefined', async () => {
        const res = ImageProcessingValidator.validateImageProcessingParams(<any>reqMissingParams);
        expect(res).toEqual(undefined);
    });
});
