import express from 'express'
import controller from './controller'
// import { adminAuthentication } from '../../middleware';

const router = express.Router()

router.get('/', controller.index)
router.get('/index', controller.index01)
router.get('/ErrorCategories', controller.index02)
router.get('/Audit', controller.index05)
router.get('/Errorkind', controller.findErrorkind)
router.get('/SixAudit', controller.getLastSixAudit)




export default router
