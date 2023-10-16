import express from 'express'
import controller from './controller'

const router = express.Router()

router.post('/create',controller.create)
router.patch('/:id', controller.update)
router.post('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)

export default router
