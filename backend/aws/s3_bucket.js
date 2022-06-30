const S3 = require("aws-sdk/clients/s3");
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const { uuid } = require("uuidv4");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});


exports.uploadImage = function (file) {
const fileStream = fs.createReadStream(file.path);

const uploadParams = {
    Bucket : bucketName,
    Body : fileStream,
    Key : file.filename
}

return s3.upload(uploadParams).promise()
}

//download images from s3 bucket
exports.getImageStream = function(fileKey){
const downloadParams = {
    Key : fileKey,
    Bucket : bucketName
}
return s3.getObject(downloadParams).createReadStream();
}

