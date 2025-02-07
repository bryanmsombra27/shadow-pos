import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './upload-image.response';
// import streamifier from 'streamifier';
const streamifier = require('streamifier');

@Injectable()
export class UploadImageService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
        if (err) return reject(err);

        resolve(result);
      });

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
