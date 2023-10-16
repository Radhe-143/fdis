import express from 'express';
import controller from './controller';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();



router.post('/', controller.create)
router.patch('/:id', controller.update)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)

export default router
