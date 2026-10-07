const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'dyyyuliii',
    api_key : '954827833349655',
    api_secret : 'BlXXh53-lF_n2TVlQJHPgvHETA8',
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto',
    })

    return result;
}   

const upload = multer({ storage });

module.exports = {
    upload,
    imageUploadUtil,
}