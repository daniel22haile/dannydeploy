const mongoose = require('mongoose');


const GallerySchema = mongoose.Schema({
    imageUrl : {type : String},
    imageTitle : {type : String},
    imageDescription : {type : String},
    uploadedAt: {type : Date, default : Date.now()},
})

const GalleryModel = mongoose.model("gallery", GallerySchema);

class GalleryCollection {

static async createGallery(imageUrl, imageTitle, imageDescription){
    const image = GalleryModel({ imageTitle, imageDescription }, imageUrl);
    await image.save();
    return image;
}

}

module.exports = GalleryCollection;

