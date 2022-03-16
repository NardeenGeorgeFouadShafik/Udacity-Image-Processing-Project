export interface ImageProcessing {
    fileName: string | null;
    width: number | undefined;
    height: number | undefined;
}
export interface IImageProcessingResponse {
    body: string | Buffer;
    status: number;
    contentType: string;
}

export class ImageProcessingResponse implements IImageProcessingResponse {
    body: string | Buffer;
    status: number;
    contentType: string;
    constructor(body: string | Buffer, status: number, contentType: string) {
        this.body = body;
        this.status = status;
        this.contentType = contentType;
    }
}

export enum ImageProcessingLogger {
    ORIGINAL_IMAGE_NOTFOUND,
    MISSING_PARAMETERS,
    GENERAL_ERROR,
    IMAGES_NAME,
}
export enum ResponseStatus {
    BAD_REQUEST = 400,
    SUCCESS = 200,
}

export enum ResponseContentType {
    HTML = 'html',
    JPG = 'jpg',
}
