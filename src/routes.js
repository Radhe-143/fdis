import { Router } from 'express'
import dashboardRoutes from './routes/dashboard'

export default () => {
  const api = Router();

  api.use('/api/v1/dashboard', dashboardRoutes)

  return api
}
