import { v2 as cloudinary } from 'cloudinary';
import { ResponseError } from '../error/response-error.js';


// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageToCloud = async (file) => {
    // console.log('file', file);
    let url = null;
    if (file !== null) {
        file = file.image;
        url = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(file.data);
        });
        return url.secure_url;
    } else {
        return url;
    };
}

export default uploadImageToCloud;