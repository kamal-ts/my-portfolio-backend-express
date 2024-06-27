import path from 'path';
import { ResponseError } from '../error/response-error.js';

const uploadImage = async (file) => {

    let url = null;
    if (file !== null) {   
        file = file.image;
        const fileSize = file.size;
        const ext = path.extname(file.name);
        const fileName = `${Date.now()}-${file.md5 + ext}`;
        url = file ? `/uploads/${fileName}` : null; // URL or path to the image
        const allowedType = ['.png', '.jpg', '.jpeg'];
        if (!allowedType.includes(ext.toLocaleLowerCase())) {
            throw new ResponseError(422, "Invalid image");
        };
        if (fileSize > 5000000) {
            throw new ResponseError(422, "Image must be lest than 5 MB");
        }
        file.mv(`./uploads/${fileName}`, async (err) => {
            if (err) throw new ResponseError(500, err.message);
        });
    };

    return url;
};



export {
    uploadImage,
}