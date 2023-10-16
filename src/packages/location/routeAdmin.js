import express from 'express'
import controller from './controller'
import validator from '../validator'

const router = express.Router()

router.post('/', validator.location.create, controller.create)
router.patch('/:id', controller.update)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)
router.get('/filterLocation/:id', controller.filter)
router.get('/filterPerformer/:id', controller.filterPerformer)


export default router