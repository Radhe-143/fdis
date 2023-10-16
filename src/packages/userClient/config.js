const ALLOWED_UPDATE_ATTRIBUTE = [
  'CompanyName',
  'ContactPerson',
  'Phone',
  'Mobile',
  'Fax',
  'StreetName',
  'ZipCode',
  'City',
  'State',
  'CountryId',
  'Id',
  'Branch_Id',
  'URLClientPortal',
  'ReportType',
  'User_Id',
  'ClientId',
  'Password',
  'Module_Id',
  'ImageUrl',
  'Active'

];

export default {
  limit: {
    index: 20
  },
  ALLOWED_UPDATE_ATTRIBUTE
}
