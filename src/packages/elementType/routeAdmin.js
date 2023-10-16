import express from 'express'
import controller from './controller'
// import { adminAuthentication } from '../../middleware';
import validator from '../validator'

const router = express.Router()

router.post('/', validator.elementType.create, controller.create)
router.patch('/:id', controller.update)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)

export default router
