import express from 'express'
import controller from './controller'

// import { adminAuthentication } from '../../middleware';

const router = express.Router()

router.post('/', controller.create)
router.patch('/:id', controller.update)
router.get('/', controller.index)
router.post('/filter', controller.filter)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)
router.get('/active/:IsAnonymous', controller.index3)
router.get('/audit/:PerformerTypes_Id', controller.index4)
router.get('/filter/bothFilter/', controller.bothFilter)
router.get('/average/sixAudit/:AuditCode', controller.getLastSixAuditAverage)
router.get('/result/:IdAudit', controller.result)
router.patch('/updatePassword/:id',controller.updatePass)


export default router


     // using with Multer and AWS 
