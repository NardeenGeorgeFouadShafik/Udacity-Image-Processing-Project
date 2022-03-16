import request from 'supertest';
import app from '../../server';
import { ResponseStatus } from '../../models/image.model';
import fs from 'fs/promises';
import path from 'path';
describe('GET /api/images', () => {
    afterAll(async function () {
        await fs.unlink(`${path.resolve(__dirname, `../../../assets/thumb/music--1x1.jpg`)}`);
    });

    it('request with no params', async () => {
        await request(app).get('/').expect(ResponseStatus.BAD_REQUEST);
    });

    it('error request', async () => {
        await request(app).get('/api/images').expect(ResponseStatus.BAD_REQUEST);
    });

    it('request with missing params', async () => {
        await request(app).get('/api/image/resizeImage?fileName=test&height=100').expect(ResponseStatus.BAD_REQUEST);
    });

    it('request with required params, not existing Image', async () => {
        await request(app)
            .get('/api/image/resizeImage?fileName=test&height=100&width=100')
            .expect(ResponseStatus.BAD_REQUEST);
    });

    it('request with required params, existing Image', async () => {
        await request(app).get('/api/image/resizeImage?fileName=music&height=1&width=1').expect(ResponseStatus.SUCCESS);
    });

    it('request without /image', async () => {
        await request(app).get('/api/image/listImagesName').expect(ResponseStatus.SUCCESS);
    });
});
