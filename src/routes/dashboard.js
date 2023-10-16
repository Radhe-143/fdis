import { Router } from 'express'
import authenticator from '../packages/system/authenticator'
import categoryRouter from '../packages/category/routeAdmin'
import auditRouter from '../packages/audit/routeAdmin'
import floorRouter from '../packages/floor/routeAdmin'
import countryRouter from '../packages/country/routeAdmin'
import branchRouter from '../packages/branch/routeAdmin'
import userClientRouter from '../packages/userClient/routeAdmin'
import elementTypeRouter from '../packages/elementType/routeAdmin'
import errorTypeRouter from '../packages/errorType/routeAdmin'
import errorKindRouter from '../packages/errorKind/routeAdmin'
import errorCategoryRouter from '../packages/errorCategory/routeAdmin'
import areaRouter from '../packages/areaDescription/routeAdmin'
import kpiElementRouter from '../packages/kpiElement/routeAdmin'
import locationRouter from '../packages/location/routeAdmin'
import SuperRouter from '../packages/Super_Member/routeAdmin'
import SuperAdminRouter from '../packages/Super_Admin/routeAdmin'
import SuperClientRouter from '../packages/Super_Client/routeAdmin'
import SuperPerformerRouter from '../packages/Super_Performer/routeAdmin'
import createRouter from '../packages/Super_User/routeAdmin'
import Performer from  '../packages/Performer/routeAdmin'
import Report from '../packages/Report/routeAdmin'
import Mob from '../packages/mob_api/routeAdmin'
import Image from '../packages/Img_Uplode/routeAdmin'
import Modules from '../packages/Modules/routeAdmin'
import Graph  from '../packages/Graph/routeAdmin'
import area from '../packages/area/routeAdmin'
import user from '../packages/user/routeAdmin'
import sendgrid from '../packages/sendgrid/routeadmin'
import newPerformer from '../packages/newPerformer/routeAdmin'

const api = Router();

api.use('*', authenticator)

api.use('/newPerformer',newPerformer)

api.use('/area',area)

api.use('/areaDescription',areaRouter)

api.use('/category', categoryRouter)

api.use('/audit', auditRouter)

api.use('/floor', floorRouter)

api.use('/country', countryRouter)

api.use('/branch', branchRouter)

api.use('/userClient', userClientRouter)

api.use('/elementType', elementTypeRouter)

api.use('/errorType', errorTypeRouter)

api.use('/errorKind', errorKindRouter)

api.use('/errorCategory', errorCategoryRouter)

api.use('/areaDesc', areaRouter)

api.use('/kpiElement', kpiElementRouter)

api.use('/location', locationRouter)

api.use('/SuperUsers',SuperRouter)

api.use('/SuperCreate', createRouter)

api.use('/SuperAdmin',SuperAdminRouter)

api.use('/SuperClient', SuperClientRouter)

api.use('/SuperPerformer',SuperPerformerRouter)

api.use('/Performer',Performer)

api.use('/Report',Report)

api.use('/Mob',Mob)

api.use('/Image',Image)

api.use('/Module',Modules)

api.use('/Graph',Graph)

api.use('/user', user)

api.use('/sendgrid', sendgrid)

export default api
