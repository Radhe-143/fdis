import express from 'express';
import multer from 'multer';
import controller from './controller';
import AWS from 'aws-sdk';
import { SuperAdminSeq } from '../../models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'

const router = express.Router();
dotenv.config();

// Configure AWS
AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: 'AKIASHWNAZJVCZMVS7OV',
    secretAccessKey: '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',
});
const S3 = new AWS.S3();

// Configure Multer
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: (req, file, done) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      done(null, true);
    } else {
      done(new Error('Unsupported file format. Only JPEG, PNG, and JPG formats are allowed.'), false);
    }
  },
});

// Function to upload to S3
const uploadToS3 = (fileData) => {
  const params = {
    Bucket: 'client-logoo',
    Key: `${Date.now().toString()}.png`,
    Body: fileData,
  };

  return new Promise((resolve, reject) => {
    S3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading image to S3:', err);
        reject(err);
      } else {
        console.log('S3 Upload Result:', data);
        resolve(data);
      }
    });
  });
};

// Route to handle image upload and data insertion
router.post('/Administrator', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image not provided' });
    }
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    const hashedPasswordSalt = await bcrypt.hash(req.body.PasswordSalt, 10);
    const s3UploadResult = await uploadToS3(req.file.buffer);

    const userClientData = {
        UserName: req.body.UserName,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        LoweredEmail: req.body.LoweredEmail,
        IsAnonymous: req.body.IsAnonymous,
        IsApproved: req.body.IsApproved,
        IsLockedOut: req.body.IsLockedOut,
        Verified:req.body.Verified,
        Description:req.body.Description,
        RoleName:'',
        LoweredRoleName:'',
        Password: hashedPassword,
        PasswordSalt: hashedPasswordSalt,
        CreateDate: new Date().toISOString(),
        ApplicationId: '04B61B6C-DB3B-49DB-B854-42F3654AD0D2',
        RoleId:'6BF066DD-C1CF-4F0B-B982-7555DE280212',
        ProfileImage: s3UploadResult.Location,

    };

    await SuperAdminSeq.create(userClientData); // Use .create() to insert data
    res.status(200).json({
      message: 'File uploaded and data inserted successfully',
      image: s3UploadResult.Location,
      data: userClientData,
    });
    return userClientData;
  } catch (error) {
    console.error('Error uploading image and creating data:', error);
    res.status(500).json({
      error: 'An error occurred while processing the request',
    });
  }
});


router.get('/Administrator',controller.indexxx)
router.get('/Administrator/:id',controller.showww)
router.patch('/Administrator/:id', controller.updatedata)
router.patch('/Administrator/Password/:id' , controller.UpdatePass)
router.delete('/Administrator/:id',controller.deleteRecorddata)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)
router.get('/get',controller.indexfind)


export default router
