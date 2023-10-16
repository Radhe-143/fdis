import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      CompanyName: Joi.string().allow([null, '']).error(errorMessage()),
      ContactPerson: Joi.string().allow([null, '']).error(errorMessage()),
      Phone: Joi.string().allow([null, '']).error(errorMessage()),
      Mobile: Joi.string().allow([null, '']).error(errorMessage()),
      Fax: Joi.string().allow([null, '']).error(errorMessage()),
      StreetName: Joi.string().allow([null, '']).error(errorMessage()),
      ZipCode: Joi.string().allow([null, '']).error(errorMessage()),
      City: Joi.string().allow([null, '']).error(errorMessage()),
      State: Joi.string().allow([null, '']).error(errorMessage()),
      CountryId: Joi.string().allow([null, '']).error(errorMessage()),
      Branch_Id: Joi.string().allow([null, '']).error(errorMessage()),
      URLClientPortal: Joi.string().allow([null, '']).error(errorMessage()),
      ReportType: Joi.number().allow([null, '']).error(errorMessage()),
      Password: Joi.string().allow([null, '']).error(errorMessage()),
      ImageUrl: Joi.string().allow([null, '']).error(errorMessage())
    }
  }
}


