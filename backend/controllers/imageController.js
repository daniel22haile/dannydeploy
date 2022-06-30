const GalleryCollection = require('../models/imageModel');
const multer  = require('multer');
const upload = multer({dest : 'uploads/'})

const { uploadImage, getImageStream } = require("../aws/s3_bucket");

exports.createImage =  upload.single('file'), async (req, res, next) => {
    const file = req.file;
    const {  imageTitle, imageDescription } = req.body;
    const imageUrl = await uploadImage(file);
    console.log(`image url ${imageUrl}`);

    const image = await GalleryCollection.createGallery(
      imageUrl,
      imageTitle,
      imageDescription
    );
    res.json({ imagePath: `/images/${imageUrl.Key}`, data: image });
}

exports.getImage = (req, res, next) => {
    const Key = req.params.key;
    const readStream = getImageStream(Key)

    readStream.pipe(res)
}