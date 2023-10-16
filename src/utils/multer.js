import aws from 'aws-sdk'
import multer from 'multer'
import sharp from 'sharp'
import multerS3 from 'multer-s3-transform'
import path from 'path'
import crypto from 'crypto'
import config from '../configs'
import helper from './helper'
import { reverseString } from './string'
import { commonLocale } from '../locales'

aws.config.update({
  secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
})

const s3 = new aws.S3()
const invalidFile = commonLocale.invalidFile.message
const multerOptions = {
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    limits: {
      fileSize: config.media.imageSizeLimit.limit,
      files: 5
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: (req, file, cb) => {
      cb(null, /^image/i.test(file.mimetype))
    },
    transforms: [
      {
        id: 'origin',
        key: (req, file, cb) => {
          const encodeFileName = crypto.createHash('md5').update(file.originalname).digest('hex');
          const fileName = reverseString(encodeFileName + helper.getTime())
          const compactName = crypto.createHash('md5').update(fileName).digest('hex');
          const fileNameToSave = `public/images/${helper.getDate()}/${helper.getHour()}/${compactName}_origin`
          cb(null, fileNameToSave)
        },
        transform: (req, file, cb) => {
          cb(null, sharp().withMetadata())
        }
      }, {
        id: 'thumbnail',
        key: (req, file, cb) => {
          const encodeFileName = crypto.createHash('md5').update(file.originalname).digest('hex');
          const fileName = reverseString(encodeFileName + helper.getTime())
          const compactName = crypto.createHash('md5').update(fileName).digest('hex');
          const fileNameToSave = `public/images/${helper.getDate()}/${helper.getHour()}/${compactName}_800x800`
          cb(null, fileNameToSave)
        },
        transform: (req, file, cb) => {
          cb(
            null,
            sharp()
              .resize(config.imageDimensions.thumbnail)
              .withMetadata()
          )
        }
      },
      {
        id: 'feature',
        key: (req, file, cb) => {
          const encodeFileName = crypto.createHash('md5').update(file.originalname).digest('hex');
          const fileName = reverseString(encodeFileName + helper.getTime())
          const compactName = crypto.createHash('md5').update(fileName).digest('hex');
          const fileNameToSave = `public/images/${helper.getDate()}/${helper.getHour()}/${compactName}_1200`
          cb(null, fileNameToSave)
        },
        transform: (req, file, cb) => {
          cb(
            null,
            sharp()
              .resize(config.imageDimensions.feature)
              .withMetadata()
          )
        }
      },
      {
        id: 'avatar',
        key: (req, file, cb) => {
          const encodeFileName = crypto.createHash('md5').update(file.originalname).digest('hex');
          const fileName = reverseString(encodeFileName + helper.getTime())
          const compactName = crypto.createHash('md5').update(fileName).digest('hex');
          const fileNameToSave = `public/images/${helper.getDate()}/${helper.getHour()}/${compactName}_200x200`
          cb(null, fileNameToSave)
        },
        transform: (req, file, cb) => {
          cb(
            null,
            sharp()
              .resize(config.imageDimensions.avatar)
              .withMetadata()
          )
        }
      }
    ]
  }),
  storageDocs: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    limits: {
      fileSize: config.media.docs.limit,
      files: 5
    },
    key(req, file, cb) {
      const newFileName = `${Date.now()}-${file.originalname}`;
      const fullPath = `public/docs/${newFileName}`;
      cb(null, fullPath);
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${helper.getTime()}${path.extname(file.originalname)}`)
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  })
};

const uploadImages = multer({ storage: multerOptions.storage, fileFilter: imageFilter, limits: { fileSize: config.media.imageSizeLimit.limit } })

const uploadDocs = multer({
  storage: multerOptions.storageDocs,
  fileFilter: docsFilter,
  limits: { fileSize: config.media.docs.limit }
})

function imageFilter(req, file, callback) {
  const ext = path.extname(file.originalname)
  if (!config.media.imageSizeLimit.ext.includes(ext.toLowerCase())) {
    req.invalidFile = invalidFile
    return callback(null, false)
  }
  callback(null, true);
}

function docsFilter(req, file, callback) {
  const ext = path.extname(file.originalname)
  if (!config.media.docs.ext.includes(ext.toLowerCase())) {
    req.invalidFile = invalidFile
    return callback(null, false)
  }
  callback(null, true);
}


export {
  uploadImages,
  uploadDocs
}
