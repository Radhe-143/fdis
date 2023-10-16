import express from 'express'
import controller from './controller'
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const router = express.Router()
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('./imgUplode')

router.post('/images', upload.single('image'), async (req, res) => {
    const file = req.file
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
    res.send({imagePath:`/images/${result.Key}`})
  })
  router.post('/uplode',upload.single('image'),controller.uploadImage)
  router.post('/update/:Id',upload.single('image'),controller.updateImage )

  export default router
