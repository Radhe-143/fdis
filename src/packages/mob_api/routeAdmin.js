import express from 'express'
import controller from './controller'
import repository from './repository'
import token from'./repository'
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const router = express.Router()
const upload = multer({ dest: 'uploads/' })


router.post('/login', controller.auth)

router.post('/logout', async (req, res) => {
  const token = req.headers['x-access-token']; // Extract token from request headers

  if (!token) {
    const response = {
      code: 400,
      Message: 'Token is missing in the request headers',
    };
    return res.status(400).json(response);
  }

  try {
    const logoutResponse = await repository.logout(token); // Call the logout function

    return res.status(logoutResponse.code).json(logoutResponse);
  } catch (error) {
    console.error('Logout error:', error);

    const response = {
      code: 500,
      Message: 'Internal server error',
    };
    return res.status(500).json(response);
  }
});


router.post('/auth', controller.authorizetion)
router.get('/auditlist',controller.Audit_list)
router.get('/companyDetail',controller.CompanyDetail)
router.get('/categorybyID/:id',controller.CategoryById)
router.get('/areaname/:id',controller.Areaname)
router.get('/elementcount/:id',controller.ElementCount)
router.get('/auditPresent/:id',controller.AuditPresent)
router.post('/uploadform',upload.fields([
    { name: 'LogbookImage'},
    { name: 'TechnicalAspectsImage'}
  ]),controller.createAudit)
 router.get('/ElementType/:id', controller.ElementType )
  router.get('/ErrorType', controller.ErrorType)
  router.get('/setting/:Id', controller.audits)
router.get ('/clientList/:Id', controller.clientName)
router.get('/client/F1171E76-37F9-42D4-8801-F450E35FB1B9',controller.client)
router.get('/Auditlistnew/:NameClient_Id', controller.list)
router.get('/userprofile/:Id', controller.userprofile)

router.get('/AreaDescId/:Id', controller.AreaDescId)
router.get('/getfeedback', controller.index5)

router.post('/feedback',controller.feedback)


export default router
