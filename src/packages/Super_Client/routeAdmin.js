import express from 'express'
import controller from './controller'
// import { adminAuthentication } from '../../middleware';

const router = express.Router()

router.post('/', controller.create)
router.patch('/:id', controller.update)
router.patch('/pass/:id', controller.updatePass)

router.get('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)
router.get('/active/:IsAnonymous', controller.index1)


export default router
