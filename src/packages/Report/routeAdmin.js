import express from 'express'
import controller from './controller'
// import { adminAuthentication } from '../../middleware';

const router = express.Router()

  router.get('/', controller.index)
  //router.get('/filter', controller.filter)
  router.get('/:id', controller.show)



export default router
