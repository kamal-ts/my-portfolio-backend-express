import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageToCloud = async (file) => {
    if (file !== null) {
        file = file.image;
        const result = await new Promise((resolve, reject) => {
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
        // returning url value of image that was uoploaded on cloudinary
        console.log('result', result)
        return result;
    } else {
        return null;
    };
};

const deleteImageCloud = async (public_id) => {
    if (public_id) {
        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(public_id, (error, result) => {
            if (error) {
                return error;
            }
            return result
        });
    }
    return null
};

const updateImageCloud = async (file, public_id) => {
    // Upload the file directly to Cloudinary from buffer

    if (file !== null) {
        const image = file.image
        if (!image.name || !image.data) {
            return res.status(400).send('Invalid file upload.');
        };
        // Upload the file directly to Cloudinary from buffer and overwrite the existing image
        const result = await new Promise((resolve, reject)=> {
            cloudinary.uploader.upload_stream(
                { public_id, overwrite: true, resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(image.data);
        })
        return result;
    }else {
        return null;
    }
}

export default {
    uploadImageToCloud,
    deleteImageCloud,
    updateImageCloud
};