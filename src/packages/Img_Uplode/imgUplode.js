// Import necessary libraries and dependencies
require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const path = require('path');

// Replace 'ImageSqe' with the actual import for your 'ImageSqe' model
// import { ImageSqe } from '../../models';

// Get environment variables
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// Create an S3 instance
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

// Function to upload a file to S3 with a .png extension
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const file_original = file.originalname;
  const Extention = path.extname(file_original);
  const Mimetype = file.mimetype;
  const ImageDataLocation = file.path + '.png'; // Always use .png extension
  console.log(`Mimetype =  ${Mimetype}`);
  console.log(`ImageData Location = ${ImageDataLocation}`);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename + '.png' // Always use .png extension
  };
  return s3.upload(uploadParams).promise();
}

// Function to get a file stream from S3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  };

  return s3.getObject(downloadParams).createReadStream();
}

module.exports = {
  uploadFile,
  getFileStream
};
