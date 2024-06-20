export const formatData = (data) => {
    if (!data.startsWith(',')) {
        data = `,${data}`;
    }
    if (!data.endsWith(',')) {
        data = `${data},`;
    }

    return data;
};


// import { v2 as cloudinary } from 'cloudinary';
// import { ResponseError } from '../error/response-error.js';


// // Configure Cloudinary with environment variables
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadImageToCloud = async (file) => {
//     file = file.image;

//     if (file !== null) {
//         console.log('file', file);
//         // url = `${Date.now()}-${file.md5 + file.name}`
//         // let uploadPath = path.join(__dirname, '/uploads/', url);

//         try {
//             // Upload the file directly to Cloudinary from buffer
//             cloudinary.uploader.upload_stream(
//                 { resource_type: 'image' },
//                 (error, result) => {
//                     if (error) {
//                         throw new ResponseError(500, error)
//                     }
//                     console.log('result.secure_url', result.secure_url);
//                     return result.secure_url;

//                 }
//             ).end(file.data);
//         } catch (uploadErr) {
//             throw new ResponseError(500, uploadErr);
//         }


//         // const result = await cloudinary.uploader
//         //     .upload(uploadPath)
//         //     .catch((err) => {
//         //         throw new ResponseError(500, err)
//         //     });
//         // console.log('result', result);
//         // console.log('result.secure_url', result.secure_url);

//     } else {
//         return null
//     };
//     // return url;
// }

// export default uploadImageToCloud;



// const myprojectTest = await prismaClient.myProject.findMany({
//     where: {
//         AND: [
//             {
//                 category: {

//                 }
//             }
//         ]
//     },
//     take: request.size,
//     skip: skip
// });
