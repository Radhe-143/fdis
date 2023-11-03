import express from 'express'
import controller from './controller'
// import { adminAuthentication } from '../../middleware';
import validator from '../validator'
import repo from './repository'
import multer from 'multer'
import { AutoScaling } from 'aws-sdk'

const router = express.Router()
 // Create a new instance of multer middleware for this route
// router.post('/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const auditRecord = await repo.uploadImageById(id, req, res);
//       return auditRecord
//       // Handle the response
//     } catch (error) {
//       // Handle the error
//     }
//   });
const upload = multer().single('image');
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const auditRecord = await repo.uploadImageById(id, req, res);
      console.log('Audit record:', auditRecord); // Log the auditRecord
      res.status(200).json(auditRecord); // Send the auditRecord as JSON response
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error uploading image' }); // Send an error response
    }
  });
  
  
  
  
router.post('/', validator.audit.create,controller.create)
router.patch('/:id', controller.update)
router.get('/join', controller.indexJoin)
// router.get('/joinnew',controller.indexx)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)
router.delete('/',controller.deleteAllRecords)
router.get('/clientlocation',controller.locationbyclient)
router.get('/mobdata/:id', controller.indexx)
export default router
