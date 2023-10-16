import express from 'express'
import controller from './controller'
// import { adminAuthentication } from '../../middleware';
import validator from '../validator'
const router = express.Router()

// router.post('/', controller.create)
// router.patch('/:id', controller.update)
// router.get('/', controller.index)
// router.post('/filter', controller.filter)
router.get('/', controller.index)
router.get('/Graph', controller.findAllJoin)
router.post('/feedback', controller.feedback)
router.post('/', controller.feedBack)
router.get('/:id', controller.show)
router.post('/',  controller.create)
router.get('/data',controller.index5)


export default router
